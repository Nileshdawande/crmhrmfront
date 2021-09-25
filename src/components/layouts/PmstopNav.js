import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';
import { Dropdown, NavLink } from 'react-bootstrap';
import 'react-perfect-scrollbar/dist/css/styles.css';
import costiclogo from '../../assets/img/costic/costic-logo-84x41.png';
import Notification from "./Notification";
import axios from "axios";
import TaskModal from "../sections/Basictable/TaskModal";
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Projectcontent from "../sections/Formelements/Projectcontent";
import ApiUrl from "../sections/ServerApi/Api";


class PmstopNav extends Component {


    addsidenavigation = () => {
        $('.ms-body').toggleClass('ms-aside-left-open');
        $('#ms-side-nav').toggleClass('ms-aside-open');
        $(".ms-aside-overlay.ms-overlay-left").toggleClass('d-block');
    }
    topbaropen = () => {
        $('#ms-nav-options').toggleClass('ms-slide-down');
    }

    state = {
      username:"",
      access:"",
      role:"",
      allAccess:["pms","crm","hrms"],
      msg:"",
      userid:"",
      taskmodalopen:false,
      allprojects:[],
      currentUrl:null,
      show:false,
    }

    componentDidMount()
    {
       this.getUserDetails();
    }

    getUserDetails=()=>
    {
       if(sessionStorage.getItem("user") !== null)
       {
          const json_str = sessionStorage.getItem("user");

          const json_obj = JSON.parse(atob(json_str));
          this.setState({username:json_obj.user,userid:json_obj.id});

          const access = json_obj.access;
          const role = json_obj.role;
          const newData = this.state.allAccess.filter((data,index)=>{
              return data !== access;
          });

          this.setState({allAccess:newData,role:role});

          this.getProjects(json_obj);
       }

       else
       {
          window.location = "/";
       }
    }

    changeDashboard=async(url)=>
    {
          $(".notice_url").removeClass("d-none");
          this.setState({msg:"Please wait...."});
          const ajax = await axios({
             method:"GET",
             url:ApiUrl+"/user/dashboardlogin",
             params:{
               email_id:this.state.username,
               url:url,
             }
          });

         if(ajax.data.access !== "" && ajax.data.role !== "employee")
         {
            this.setState({msg:""});
            const role = ajax.data.role;
            const access = ajax.data.access;
            const id = ajax.data.id;
            let obj = {user:this.state.username,access:access,role:role,status:true,id:id};
             let json_str = JSON.stringify(obj);
             sessionStorage.setItem("user",btoa(json_str));

             setTimeout(()=>{
               this.setState({msg:""});
               $(".notice_url").addClass("d-none");
             },2000);

             if(url === "crm")
             {
               window.location = "/crm-dashboard";
             }

             if(url === "hrms")
             {
                window.location = "/candidate-skill";
             }

             if(url === "pms")
             {
                window.location = "/pms-project-view";
             }


         }
         else
         {
            this.setState({msg:"You don`t have an access"});

            setTimeout(()=>{
              this.setState({msg:""});
              $(".notice_url").addClass("d-none");
            },2000);
         }


    }

    logout=()=>
    {
        $(".notice_url").removeClass("d-none");
        this.setState({msg:"Please wait...."});
        this.removeMsg();
        sessionStorage.clear();
        window.location = "/";
    }

    handleShowTaskModal=()=>
    {
       this.setState({taskmodalopen:true});
    }

    handleCloseTaskModal=()=>
    {
       this.setState({taskmodalopen:false});
    }


    getProjects=(userdata)=>
    {
       if(userdata.role === "management")
       {
         const ajax = axios({
           method:"GET",
           url:ApiUrl+"/project/",
         });

         ajax.then((response)=>{
           const data = response.data.data;
           this.setState({allprojects:data});
         });
       }

       if(userdata.role === "employee")
       {
         const ajax = axios({
           method:"GET",
           url:ApiUrl+"/project/"+userdata.id,
           params:{
             fetch_type:"userid"
           }
         });

         ajax.then((response)=>{
           const data = response.data.data;
           this.setState({allprojects:data});
         });
       }

    }

    handleShow = () =>
    {
       this.setState({show:true});
    }

    handleClose=()=>
    {
      this.setState({show:false});
    }

    removeMsg=()=>
    {
       setTimeout(()=>{
         $(".notice_url").addClass("d-none");
         this.setState({msg:""});
       },3000);
    }



    render() {
        return (
          <div>
            <nav className="navbar ms-navbar">
                <div className="ms-aside-toggler ms-toggler pl-0" onClick={this.addsidenavigation}>
                    <span className="ms-toggler-bar bg-primary" />
                    <span className="ms-toggler-bar bg-primary" />
                    <span className="ms-toggler-bar bg-primary" />
                </div>

                <div className="logo-sn logo-sm ms-d-block-sm">
                    <Link className="pl-0 ml-0 text-center navbar-brand mr-0" to="/"><img src={costiclogo} alt="logo" /> </Link>
                </div>

                <ul className="ms-nav-list ms-inline mb-0" id="ms-nav-options">

                    <li className="ms-nav-item ms-nav-user">
                      <button className="btn btn-dark rounded-0 p-0 m-0" onClick={this.handleShowTaskModal}>Create</button>
                    </li>

                    <li className="ms-nav-item ms-nav-user">
                      <Dropdown className="custom-dropdown">
                          <Dropdown.Toggle as={NavLink} id="userDropdown" className="p-0">
                              <span>Project</span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu dropdown-menu-right user-dropdown" aria-labelledby="userDropdown">
                            {
                            this.state.role === "management" &&
                            <div className="dropdown-menu-header px-2 d-flex flex-column">
                              <span onClick={this.handleShow} className="mb-2 d-flex" style={{cursor:"pointer"}}>
                                <span className="material-icons mr-2" style={{fontSize:"20px"}}>add_circle</span>
                                Create project
                              </span>

                              <Link to="/pms-project-view" className="d-flex">
                                <span className="material-icons mr-2" style={{fontSize:"20px"}}>
                                  visibility
                                </span>
                                <span>View all project</span>
                              </Link>

                            </div>
                           }

                              <div className="ms-dropdown-list">
                                  {
                                     this.state.allprojects.map((data,index)=>(
                                       <span className="media fs-14 p-2"  key={index}>
                                         <Link to={`/project-task-details/${btoa(JSON.stringify(data))}`}>
                                           <span>{data.project_name}</span>
                                         </Link>
                                       </span>
                                     ))
                                  }
                              </div>

                          </Dropdown.Menu>
                      </Dropdown>
                    </li>

                    <li className="ms-nav-item ms-nav-user dropdown">
                        <Dropdown className="custom-dropdown">
                            <Dropdown.Toggle as={NavLink} id="userDropdown" className="p-0">
                                <img className="ms-user-img ms-img-round" src="../assets/img/costic/customer-6.jpg" alt="people" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu dropdown-menu-right user-dropdown" aria-labelledby="userDropdown">

                                <div className="dropdown-menu-header">
                                  <h6 className="media fs-14 p-2">{this.state.username}</h6>
                                </div>

                                <div className="dropdown-divider" />

                                <div className="ms-dropdown-list">

                                    {
                                       this.state.allAccess.map((data,index)=>(
                                         <span className="media fs-14 p-2"  key={index} onClick={()=>{this.changeDashboard(data)}}>
                                           <span><i className="flaticon-user mr-2" />Login to {data}</span>
                                         </span>
                                       ))
                                    }
                                </div>

                                <div className="dropdown-divider" />

                                <div className="dropdown-menu-footer">
                                    <span className="media fs-14 p-2" onClick={this.logout}>
                                      <i className="fas fa-sign-out-alt mr-2"></i>Logout
                                    </span>
                                </div>

                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>

                <div className="ms-toggler ms-d-block-sm pr-0 ms-nav-toggler" onClick={this.topbaropen}>
                    <span className="ms-toggler-bar bg-primary" />
                    <span className="ms-toggler-bar bg-primary" />
                    <span className="ms-toggler-bar bg-primary" />
                </div>

            </nav>

            <Modal show={this.state.show} onHide={this.handleClose} size="lg">
              <Modal.Body>
                <Projectcontent/>
              </Modal.Body>
            </Modal>


          <TaskModal modal={this.state.taskmodalopen} closemodal={this.handleCloseTaskModal} projectId={0} data={this.props} />

          <Notification msg={this.state.msg}/>



          </div>
        );
    }
}

PmstopNav.propTypes = {
   addlatestTask:PropTypes.func,
}

PmstopNav.defaultProps = {
  addlatestTask: function(e){return e},
}


export default PmstopNav;
