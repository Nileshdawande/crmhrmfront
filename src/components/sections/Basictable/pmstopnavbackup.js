import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';
import { Dropdown, NavLink } from 'react-bootstrap';
import 'react-perfect-scrollbar/dist/css/styles.css';
import costiclogo from '../../assets/img/costic/costic-logo-84x41.png';
import Notification from "./Notification";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import ApiUrl from "../ServerApi/Api";

class pmstopnavbackup extends Component {


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
      taskModal:false,
      taskStatus:[],
      taskType:[],
      project:[],
      users:[],
      projectNameUser:[],
      msg:"",
      userid:"",
      projectParent:[]
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

         if(ajax.data.access !== "")
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
               window.location = "/designation-master";
             }

             if(url === "hrms")
             {
                window.location = "/candidate-skill";
             }

             if(url === "pms")
             {
                window.location = "/pms-project";
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

    createProjectModalHandle=()=>
    {
       this.setState({taskModal:!this.state.taskModal});
       if(this.state.users.length === 0)
       {
         this.getTaskStatus();
         this.getTaskType();
         this.getUsers();
         this.getProjectParent();
       }
    }

    handleClose=()=>
    {
       this.setState({taskModal:false});
    }

    getTaskStatus=async()=>
    {
        const ajax = await axios({
          method:"GET",
          url:ApiUrl+"/task-status-master"
        });

        const data = ajax.data.data;
        this.setState({taskStatus:data});
    }

    getTaskType=async()=>
    {
        const ajax = await axios({
          method:"GET",
          url:ApiUrl+"/task-type-master"
        });

        const data = ajax.data.data;
        this.setState({taskType:data});
    }

    getProjectMaster=async()=>
    {
        if(this.state.role === "management")
        {
            const ajax = await axios({
              method:"GET",
              url:ApiUrl+"/project/",
            });

            const data = ajax.data.data;
            this.setState({project:data});
        }

        if(this.state.role === "employee")
        {
            const ajax = await axios({
              method:"GET",
              url:ApiUrl+"/project/"+this.state.userid,
              params:{
                fetch_type:"userid"
              }
            });

            const data = ajax.data.data;
            this.setState({project:data});
        }

    }

    getProjectParent=async()=>
    {
        const ajax = await axios({
          method:"GET",
          url:ApiUrl+"/pms-task"
        });

        const data = ajax.data.data;
        this.setState({projectParent:data});
    }

    getUsers=async()=>
    {
        const ajax = await axios({
          method:"GET",
          url:ApiUrl+"/user"
        });

        const data = ajax.data.data;
        this.setState({users:data});
        this.setState({projectNameUser:data});
        this.getProjectMaster();
    }

    projectNameHandle=()=>
    {
        const index = document.querySelector(".project_name").selectedIndex;
        if(index !== 0)
        {

          this.setState({msg:""});
          $(".notice").addClass("d-none");
          $(".create_btn").removeAttr("disabled");

           const alloption = $("option",".project_name");
           const project_in = $(alloption[index]).attr("index");
           const project = this.state.project[project_in];
           const temp = [];

            this.state.users.forEach((userobj,ind)=>{

              if(userobj.id === project.project_leader)
              {
                  temp.push(userobj);
              }

              else
              {
                JSON.parse(project.members).forEach((member)=>{

                  if(userobj.id === Number(member))
                  {
                     temp.push(userobj);
                  }
                });
              }

           });

           this.setState({projectNameUser:temp});
        }

        else
        {
           this.setState({msg:"Please select project name"});
           $(".notice").removeClass("d-none");
           $(".create_btn").attr("disabled","disabled");
        }
    }

    createProjectTask=async(event)=>
    {
         event.preventDefault();
         const frm = event.target;
         $(".create_btn").attr("disabled","disabled");
         $(".notice").removeClass("d-none");
         this.setState({msg:"Please wait...."});

         try
         {
           const ajax = await axios({
             method:"POST",
             url:ApiUrl+"/pms-task",
             data:new FormData(frm)
           });

           this.setState({msg:"Task created"});
           frm.reset();
           this.removeMsg();
           this.getProjectParent();

           setTimeout(()=>{
              this.setState({taskModal:!this.state.taskModal});
              this.props.addLastestTask(ajax.data.data);
           },1000);

         }

         catch (error)
         {
             if(error)
             {
               this.setState({msg:"Something went wrong try again"});
               this.removeMsg();
             }
         }
    }

    removeMsg=()=>
    {
       setTimeout(()=>{
         $(".notice").addClass("d-none");
         $(".create_btn").removeAttr("disabled");
         this.setState({msg:""});
       },3000);
    }

    logout=()=>
    {
        $(".notice_url").removeClass("d-none");
        this.setState({msg:"Please wait...."});
        this.removeMsg();
        sessionStorage.clear();
        window.location = "/";
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
                      <Link to="#"  onClick={this.createProjectModalHandle}>Create task</Link>
                    </li>

                    <li className="ms-nav-item ms-nav-user">
                      <Link to="/pms-project-view">Project</Link>
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
                                         <span className="media fs-14 p-2"  key={index} onClick={()=>{this.changeDashboard(data)}}> <span><i className="flaticon-user mr-2" />Login to {data}</span>
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

            <Modal show={this.state.taskModal} onHide={this.handleClose} size="lg">

              <Modal.Header closeButton>
                <h4 className="modal-title">Create task</h4>
              </Modal.Header>

              <Modal.Body>
              <form onSubmit={(event)=>{this.createProjectTask(event)}} style={{height:"80vh",overflowY:"auto"}}>

                <div className="form-group">
                  <label>Parent task</label>
                  <select className="form-control rounded-0" name="parent_task_id">
                    <option value="0">Select parent task</option>
                    {
                      this.state.projectParent.map((data,i)=>(
                        <option key={data.id} value={data.id}>{"#"+data.id+": "+data.summary}</option>
                      ))
                    }
                  </select>
                </div>

                <div className="form-group d-none">
                  <label>Created by</label>
                  <input type="text" defaultValue={this.state.userid} className="form-control rounded-0" name="created_by" />
                </div>

                <div className="form-group d-none">
                  <label>Updated by</label>
                  <input type="text" defaultValue={this.state.userid} className="form-control rounded-0" name="updated_by" />
                </div>

                <div className="form-group">
                  <label>Project name</label>
                  <select className="form-control rounded-0 project_name" name="project_id" onChange={()=>{this.projectNameHandle()}}>
                    <option value="0">Select project name</option>
                    {
                      this.state.project.map((projectData,i)=>(
                        <option key={projectData.id} value={projectData.id} index={i}>{projectData.project_name}</option>
                      ))
                    }
                  </select>
                </div>

                <div className="form-group">
                  <label>Task type</label>
                  <select className="form-control rounded-0" name="type_id">
                    {
                      this.state.taskType.map((taskTypData,i)=>(
                        <option key={taskTypData.id} value={taskTypData.id}>{taskTypData.type}</option>
                      ))
                    }
                  </select>
                </div>

                <div className="form-group">
                  <label>Task status</label>
                  <select className="form-control rounded-0" name="status_id">
                    {
                      this.state.taskStatus.map((taskStatusData,i)=>(
                        <option key={taskStatusData.id} value={taskStatusData.id}>{taskStatusData.status}</option>
                      ))
                    }
                  </select>
                </div>

                <div className="form-group">
                  <label>Summary</label>
                  <textarea className="form-control rounded-0" name="summary" required="required"></textarea>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-control rounded-0" name="description"></textarea>
                </div>

                <div className="form-group">
                  <label>Asignee</label>
                  <select className="form-control rounded-0" name="assignee">
                    {
                      this.state.projectNameUser.map((userData,i)=>(
                        <option key={userData.id} value={userData.id}>{userData.firstname}</option>
                      ))
                    }
                  </select>
                </div>

                <div className="form-group">
                  <label>Start date</label>
                  <input type="date" className="form-control rounded-0" name="start_date" />
                </div>

                <div className="form-group">
                  <label>End date</label>
                  <input type="date" className="form-control rounded-0" name="end_date"/>
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select className="form-control rounded-0" name="priority">
                    <option value="high">High</option>
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                  </select>
                </div>

                <div className="form-group">
                 <button type="submit" className="btn btn-danger rounded-0 create_btn">Create task</button>
                </div>

                <div className="form-group">
                  <div className="alert alert-danger rounded-0 text-center notice d-none">{this.state.msg}</div>
                </div>

              </form>
              </Modal.Body>

            </Modal>

            <Notification msg={this.state.msg}/>



          </div>
        );
    }
}

PmstopNav.propTypes = {
   addLastestTask:PropTypes.func,

}

PmstopNav.defaultProps = {
  addLastestTask: function(e){return e},
}

export default pmstopnavbackup;
