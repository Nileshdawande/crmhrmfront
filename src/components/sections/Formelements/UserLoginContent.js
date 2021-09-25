import React,{useState,useEffect} from 'react';
import axios from "axios";
import $ from "jquery";
import {Link} from "react-router-dom";
import "../../../assets/css/login.css";
import ApiUrl from "../ServerApi/Api";

const UserLoginContent = (props) => {

     const [msg,setMsg] = useState("");

     const [userData,setUserData] = useState({
       "email_id":"",
       "password":"",
       "url":"",
     });

      useEffect(()=>{
        if(userData.url === "")
        {
          //window.location.href

          const complete_url = "https://www.hrms.com".split("/");
          let check_url = "";

          if(complete_url[2].indexOf("crm") !== -1)
          {
             check_url = "crm";
          }

          if(complete_url[2].indexOf("hrms") !== -1)
          {
             check_url = "hrms";
          }

          if(complete_url[2].indexOf("pms") !== -1)
          {
             check_url = "pms";
          }

          setUserData({...userData,url:check_url});
        }


      },[userData]);



     const userLogin=async(event)=>
     {
         event.preventDefault();
         setMsg("Please wait....");

         $(".notice").removeClass("d-none");
         $(".create_btn").attr("disabled","disabled");
         try
         {
             const ajax = await axios({
                method:"GET",
                url:ApiUrl+"/user/login",
                params:{
                  ...userData
                }
             });

            if(ajax.data.access !== "")
            {
                const role = ajax.data.role;
                const access = ajax.data.access;
                const id = ajax.data.id;
                let obj = {user:userData.email_id,access:access,role:role,status:true,id:id};
                let json_str = JSON.stringify(obj);
                sessionStorage.setItem("user",btoa(json_str));

                setUserData({
                  "email_id":"",
                  "password":"",
                  "url":""
                });

                setMsg("Login Success");
                removeMsg();

                if(userData.url === "crm")
                {
                   window.location = "/crm-dashboard";
                }

                if(userData.url === "hrms")
                {
                   window.location = "/candidate-skill";
                }

                if(userData.url === "pms")
                {
                   window.location = "/pms-project-view";
                }
            }

            else
            {
               setMsg("You don`t have an access");
               removeMsg();
            }



         }

         catch(error)
         {
            if(error)
            {
               setMsg("Username or password is wrong");
               removeMsg();
            }
         }



     }

     const handleInput=(event)=>
     {
         const name = event.target.name;
         const val  = event.target.value;

         const newData = {...userData,[name]:val};
         setUserData(newData);
     }

     const removeMsg=()=>
     {
         setTimeout(()=>{
           $(".notice").addClass("d-none");
           $(".create_btn").removeAttr("disabled");
           setMsg("");
         },3000);
     }

        return (

            <div className="ms-content-wrapper container login_con">
                <div className="row">

                  <div className="col-md-1"></div>

                    <div className="col-md-4 left_con pr-0 d-flex justify-content-center align-items-center">
                      <h4 className="p-2 login_logo">SOFTLABS</h4>
                    </div>

                    <div className="col-md-6 bg-white pl-0 py-5">
                        <div>
                            <div className="ms-panel-header d-flex justify-content-between">
                                <h6>User Login</h6>
                                <Link to="/">SignUp</Link>
                            </div>
                            <div className="px-5 py-4">
                                <form onSubmit={(event)=>{userLogin(event)}}>
                                    <div className="form-group">
                                        <label>Email id</label>
                                        <input type="email" name="email_id" value={userData.email_id} onChange={(event)=>{handleInput(event)}} className="form-control" required="required"/>
                                    </div>

                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" name="password" value={userData.password} onChange={(event)=>{handleInput(event)}} className="form-control" required="required"/>
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-danger rounded-0 create_btn">Submit</button>
                                    </div>

                                    <div className="alert alert-danger font-weight-bold rounded-0 text-center my-2 notice d-none">
                                     <h6>{msg}</h6>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-1"></div>

                </div>
            </div>

        )
    }

export default UserLoginContent;
