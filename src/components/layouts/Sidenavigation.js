import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';
import Scrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

import logo from '../../assets/img/costic/costic-logo-216x62.png';


class Sidenavigation extends Component {

    state = {
          access:"",
          role:""
    }

    removeoverlay = () => {
        $('.ms-body').toggleClass('ms-aside-left-open');
        $('#ms-side-nav').toggleClass('ms-aside-open');
        $(".ms-aside-overlay.ms-overlay-left").toggleClass('d-block');
    }

    componentDidMount() {
        this.checkAuth();
        this.setActiveMenuItem();
    }

    componentDidUpdate(prevProps, prevState){
      if(this.state.access !==prevState.access)
      {
         this.setActiveMenuItem();
      }
    }

    setActiveMenuItem=()=>{
        $('.ms-main-aside .menu-item>a').on('click', function () {
            $(this).removeAttr('href');
            var element = $(this).parent('li');
            if (element.hasClass('active')) {
                element.removeClass('active');
                element.find('li').removeClass('active');
                element.find('.collapse').slideUp();
            } else {
                element.addClass('active');
                element.children('.collapse').slideDown();
                element.siblings('li').children('.collapse').slideUp();
                element.siblings('li').removeClass('active');
                element.siblings('li').find('li').removeClass('active');
                element.siblings('li').find('.collapse').slideUp();
            }
        });
    }

    checkAuth=()=>
    {

       if(sessionStorage.getItem("user") !== null)
       {
           const json = sessionStorage.getItem("user");
           const obj  = JSON.parse(atob(json));
           const role = obj.role;
           const access = obj.access;
           this.setState({access:access,role:role});
       }


       else
       {
          window.location = "/";
       }

    }

    render() {

        return (
            <div>
                <div className="ms-aside-overlay ms-overlay-left ms-toggler" onClick={this.removeoverlay}></div>
                <div className="ms-aside-overlay ms-overlay-right ms-toggler"></div>
                <Scrollbar id="ms-side-nav" className="side-nav fixed ms-aside-scrollable ms-aside-left">
                    {/* Logo */}
                    <div className="logo-sn ms-d-block-lg">
                        <Link className="pl-0 ml-0 text-center" to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    {/* Navigation */}

                <ul className="accordion ms-main-aside fs-14" id="side-nav-accordion">

                    {
                      this.state.access === "crm" && this.state.role === "management" &&
                          <>
                          <li className="menu-item">
                              <Link to="/crm-dashboard" >
                                <span><i className="material-icons fs-16" >dashboard</i>Dashboard</span>
                              </Link>
                          </li>

                        <li className="menu-item">
                            <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>All master</span>
                            </Link>
                            <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">
                            <li className="menu-item" >
                                <Link to="/designation-master">
                                Add Designation
                                </Link>
                            </li>

                            <li className="menu-item" >
                                <Link to="/show-designation">
                                Show Designation
                                </Link>
                            </li>

                            <li className="menu-item" >
                            <Link to="/dipartment-master">
                            Add Department
                            </Link>
                            </li>

                            <li className="menu-item" >
                            <Link to="/show-department">
                            Show Department
                            </Link>
                            </li>

                            <li className="menu-item" >
                            <Link to="/requirement-type">
                            Requirement type
                            </Link>
                            </li>

                            <li className="menu-item" >
                            <Link to="/show-requirement">
                            Show Requirement
                            </Link>
                            </li>

                            <li className="menu-item" >
                            <Link to="/lead-status">
                            Add lead status
                            </Link>
                            </li>

                            <li className="menu-item" >
                            <Link to="/show-lead-status">
                            Show lead status
                            </Link>
                            </li>

                            <li className="menu-item" >
                            <Link to="/interactionmethod">
                            Add interaction
                            </Link>
                            </li>

                            <li className="menu-item" >
                            <Link to="/show-interaction">
                            Show interaction
                            </Link>
                            </li>

                            <li className="menu-item" >
                                <Link to="/lead-source">
                               Add Lead source
                                </Link>
                            </li>
                            < li className="menu-item" >
                            <Link to="/show-lead-source">
                               Show Lead source
                            </Link>
                            </li>

                            <li className="menu-item" >
                                <Link to="/lead-category">
                               Add Lead category
                                </Link>
                            </li>

                          < li className="menu-item" >
                          <Link to="/show-lead-category">
                             Show Lead category
                          </Link>
                          </li>

                          <li className="menu-item" >
                          <Link to="/add-companytype">
                             Add company type
                          </Link>
                          </li>

                          <li className="menu-item" >
                          <Link to="/show-companytype">
                             Show company type
                          </Link>
                          </li>

                          <li className="menu-item" >
                          <Link to="contract">Add contract</Link>
                          </li>

                          <li className="menu-item" >
                          <Link to="show-contract">Show contract</Link>
                          </li>

                          <li className="menu-item" >
                          <Link to="project">Add project</Link>
                          </li>

                          <li className="menu-item" >
                          <Link to="show-project">Show project</Link>
                          </li>

                            </ul>
                        </li>

                      <li className="menu-item" >
                           <Link to="/contacts" className=""> <span><i className="material-icons fs-16">input</i>Add lead</span>
                           </Link>
                       </li>


                  <li className="menu-item">
                    <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Reports</span>
                    </Link>
                    <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                    <li className="menu-item" >
                    <Link to="/lead-report">
                    Lead reports
                    </Link>
                    </li>

                    <li className="menu-item" >
                    <Link to="/followup-report">
                    Followup reports
                    </Link>
                    </li>
                    </ul>
                  </li>
    </>

}




{ this.state.access === "hrms" && this.state.role === "management" &&
                      <>
                      <hr />


                        <li className="menu-item" >
                            <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>User management</span>
                            </Link>
                            <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">
                                <li className="menu-item" >
                                <Link to="show-users">
                                User management
                                </Link>
                                </li>
                           </ul>
                        </li>

                        <li className="menu-item" >
                            <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Pms task status master</span>
                            </Link>
                            <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">
                                <li className="menu-item" >
                                <Link to="/add-task-status">
                                  Add task status
                                </Link>
                                </li>

                                <li className="menu-item" >
                                <Link to="/show-task-status">
                                  Show task status
                                </Link>
                                </li>
                           </ul>
                        </li>

                        <li className="menu-item" >
                            <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Pms tast type master</span>
                            </Link>
                            <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">
                                <li className="menu-item" >
                                <Link to="/add-task-type">
                                  Add task type
                                </Link>
                                </li>

                                <li className="menu-item" >
                                <Link to="/show-task-type">
                                  Show task type
                                </Link>
                                </li>

                           </ul>
                        </li>


                        <li className="menu-item" >
                            <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Candidate master</span>
                            </Link>
                            <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">
                                <li className="menu-item" >
                                <Link to="candidate-contact">
                                Add candidate
                                </Link>
                                </li>
                          </ul >
                        </li>

                        <li className="menu-item" >
                            <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Candidate skill</span>
                            </Link>
                            <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">
                                <li className="menu-item" >
                                <Link to="candidate-skill">
                                Add candidate skill
                                </Link>
                                </li>

                                <li className="menu-item" >
                                <Link to="show-candidate-skill">
                                Show candidate skill
                                </Link>
                                </li>
                          </ul >
                        </li>

                            <li className="menu-item" >
                                <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Skills master</span>
                                </Link>
                                <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">
                                    <li className="menu-item" >
                                    <Link to="skill-master">
                                    Add skills
                                    </Link>
                                    </li>

                                    <li className="menu-item" >
                                    <Link to="show-skill">
                                    Show skills
                                    </Link>
                                  </li>
                              </ul >
                            </li>

                            < li className="menu-item" >
                            <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Technology</span>
                            </Link>
                            <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                            <li className="menu-item" >
                            <Link to="technology-master">
                            Add technology master
                            </Link>
                            </li>

                            <li className="menu-item" >
                            <Link to="show-technology">
                            Show technology skills
                            </Link>
                            </li>

                            </ul >
                            </li>

                            <li className="menu-item" >
                            <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Technology with skill</span>
                            </Link>
                            <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                            <li className="menu-item" >
                            <Link to="technology-with-skill">
                            Add technology skills
                            </Link>
                            </li>

                            </ul >
                            </li>

                            <li className="menu-item" >
                            <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Recruitment type</span>
                            </Link>
                            <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                            <li className="menu-item" >
                            <Link to="recruitment">
                            Add Recruitment
                            </Link>
                            </li>

                            <li className="menu-item" >
                            <Link to="show-recruitment">
                            Show Recruitment
                            </Link>
                            </li>

                            </ul>
                            </li>

                            < li className="menu-item" >
                            <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Recruitment request</span>
                            </Link>
                            <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                            <li className="menu-item" >
                            <Link to="recruitment-request">
                              Add request
                            </Link>
                            </li>
                            </ul>
                            </li>

                            <li className="menu-item">
                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Rec req wise candidate</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="recruitment-request-candidate">
                                  Add request
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-rec-req-candidate">
                                  Show request
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Interview Schedule</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="interview-schedule">
                                  Add interview schedule
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-interview-schedule">
                                  Show interview schedule
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Interview type</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="interview-type">
                                  Add interview type
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-interview-type">
                                  Show interview type
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Interview Details</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="add-interview-details">
                                  Add interview details
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-interview-details">
                                  Show interview details
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Candidate int schedule</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="add-canint-schedule">
                                  Add can int schedule
                                </Link>
                              </li>


                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Parameter master</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="add-parameter">
                                  Add parameter master
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-parameter">
                                  Show parameter master
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Candidate int result</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="add-can-result">
                                  Add candidate result
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-can-result">
                                  Show candidate result
                                </Link>
                              </li>

                              </ul>

                            </li>


                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Offer details</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="add-offerdetails">
                                  Add offer details
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-offerdetails">
                                  Show offer details
                                </Link>
                              </li>

                              </ul>

                            </li>

                        <hr />
                        <li className="menu-item px-4">
                            <span><i className="fas fa-clipboard-list fs-16 mr-2" />Employee management</span>
                        </li>
                        <hr />

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Branch master</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="softlabs-branchmaster">
                                  Add branch master
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-branchmaster">
                                  Show branch master
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Office master</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="softlabs-officemaster">
                                  Add office master
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-officemaster">
                                  Show office master
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Branch office master</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="branch-officemaster">
                                  Add branch office master
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-branch-officemaster">
                                  Show branch office master
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Employee type master</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="add-employee">
                                  Add employee type master
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-employee">
                                  Show employee type master
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Employee department</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="employee-department">
                                  Add employee department
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-employee-department">
                                  Show employee department
                                </Link>
                              </li>

                              </ul>

                            </li>


                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Employee designation</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="employee-designation">
                                  Add employee designation
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-employee-designation">
                                  Show employee designation
                                </Link>
                              </li>

                              </ul>

                            </li>


                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Salary head</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="add-salary">
                                  Add salary head
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-salary">
                                  Show salary head
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Employee master</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="emp-master">
                                  Add employee master
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-emp-master">
                                  Show employee master
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Employee allocation</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="emp-allocation">
                                  Add employee allocation
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-emp-allocation">
                                  Show employee allocation
                                </Link>
                              </li>

                              </ul>

                            </li>


                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Allocation details</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="allocation-details">
                                  Add allocation details
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-allocation-details">
                                  Show allocation details
                                </Link>
                              </li>

                              </ul>

                            </li>


                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Leave type master</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="leave-master">
                                  Add leave type master
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-leave-master">
                                  Show leave type master
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Company annual leave</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="cmp-annual">
                                  Add cmp leave master
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-cmp-annual">
                                  Show cmp leave master
                                </Link>
                              </li>

                              </ul>

                            </li>


                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Employee annual leave</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="emp-annual">
                                  Add emp leave master
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-emp-annual">
                                  Show emp leave master
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <hr />
                            <li className="menu-item px-4">
                                <span><i className="fas fa-clipboard-list fs-16 mr-2" />Attendance management</span>
                            </li>
                            <hr />

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Attendance master</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="attendance-master">
                                  Add attendance master
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-attendance-master">
                                  Show attendance master
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Emp leave master</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="emp-leave-master">
                                  Add emp leave master
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-emp-leave-master">
                                  Show emp leave master
                                </Link>
                              </li>

                              </ul>

                            </li>

                            <li className="menu-item">

                              <Link to="#" className="has-chevron"> <span><i className="material-icons fs-16">input</i>Employee salary</span>
                              </Link>
                              <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">

                              <li className="menu-item" >
                                <Link to="emp-salary">
                                  Add employee salary
                                </Link>
                              </li>

                              <li className="menu-item" >
                                <Link to="show-emp-salary">
                                  Show employee salary
                                </Link>
                              </li>

                              </ul>

                            </li>
                            </>
}

                   </ul>

                </Scrollbar >
            </div >
        );
    }
}

export default Sidenavigation;
