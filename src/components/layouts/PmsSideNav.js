import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';
import Scrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import logo from '../../assets/img/costic/costic-logo-216x62.png';


class PmsSideNav extends Component {

  state = {
    project_name:null,
    user_role:null,
  }

    removeoverlay = () => {
        $('.ms-body').toggleClass('ms-aside-left-open');
        $('#ms-side-nav').toggleClass('ms-aside-open');
        $(".ms-aside-overlay.ms-overlay-left").toggleClass('d-block');
    }

    componentDidMount() {
      function setActiveMenuItem(){
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

      setActiveMenuItem();
      this.checkAuth();

      if(this.props.data)
      {
        const obj = this.props.data;
        const project_json_obj = JSON.parse(atob(obj.match.params.id));
        const project_name = project_json_obj.project_name;
        this.setState({project_name:project_name});
      }


    }

    checkAuth=()=>
    {

       if(sessionStorage.getItem("user") !== null)
       {
           const json = sessionStorage.getItem("user");
           const obj  = JSON.parse(atob(json));
           const role = obj.role;
           this.setState({user_role:role});
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
                    <div className="logo-sn ms-d-block-lg text-center pb-2 pt-4">
                      <span className="material-icons" style={{fontSize:"20px"}}>
                       account_circle
                      </span>
                      <h6>Hi {this.state.user_role === "management" ? 'Admin' : 'User'}</h6>
                    </div>
                    {/* Navigation */}

                <ul className="accordion ms-main-aside fs-14" id="side-nav-accordion">

                        <li className="menu-item">
                            <Link to="#">
                              <span className="active">
                                <i className="material-icons fs-16" >dashboard</i>
                                {this.state.project_name !== null && this.state.project_name }
                              </span>
                            </Link>
                        </li>

                        <li className="px-4">
                          <span className="material-icons mr-3" style={{fontSize:"16px"}}>
                          sticky_note_2
                          </span>
                          <Link to="#">
                            Tasks
                          </Link>
                        </li>

                   </ul>

                </Scrollbar >
            </div >
        );
    }
}

export default PmsSideNav;
