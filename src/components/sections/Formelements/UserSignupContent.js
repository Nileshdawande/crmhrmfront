import React from 'react'
import {Link} from "react-router-dom";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import "../../../assets/css/signup.css";
import $ from "jquery";
import ApiUrl from "../ServerApi/Api";

const UserSignupContent = () => {
const urlData = ApiUrl+"/user/";
const {addData,notice} = useAajaxhooks();

const slide=(event)=>
{
   const input = event.target;
   const container = input.parentElement;
   $(input).attr("placeholder","");
   const label = container.getElementsByTagName("LABEL")[0];
   $(label).removeClass("d-none");
   $(label).addClass("animate__animated animate__backInUp");
}

  return (
    <div className="bg-white shadow-sm container my-4">
        <div className="row">
            <div className="col-md-6 welcome_image"></div>

            <div className="col-md-6 py-5">
                <div className="">
                    <div className="branding">
                        <h1>Softlabs</h1>
                        <p>Crm hrms pms solution</p>
                    </div>
                    <div className="p-4">
                    <form onSubmit={(event)=>{addData(event,urlData)}}>
                        <div className="form-group overflow-hidden ">
                          <label className="d-none">Firstname</label>
                          <input type="text" name="firstname" className="form-control rounded-0 signup_input" placeholder="FIRSTNAME" required="required" onClick={slide} />
                        </div>

                        <div className="form-group overflow-hidden">
                          <label className="d-none">Middlename</label>
                          <input type="text" name="middlename" className="form-control rounded-0 signup_input" placeholder="MIDDLENAME" required="required" onClick={slide} />
                        </div>

                        <div className="form-group overflow-hidden">
                          <label className="d-none">Lastname</label>
                          <input type="text" name="lastname" className="form-control rounded-0 signup_input" placeholder="LASTNAME" required="required" onClick={slide} />
                        </div>

                        <div className="form-group overflow-hidden">
                          <label className="d-none">Email</label>
                          <input type="email" name="email" className="form-control rounded-0 signup_input" placeholder="EMAIL" required="required" onClick={slide} />
                        </div>

                        <div className="form-group overflow-hidden">
                          <label className="d-none">Password</label>
                          <input type="password" name="password" className="form-control rounded-0 signup_input" placeholder="PASSWORD" required="required" onClick={slide} />
                        </div>

                        <div className="form-group overflow-hidden d-flex justify-content-between flex-wrap">
                          <button className="btn btn-danger rounded-0 create_btn submit_btn float-left" type="submit">
                            Sign up
                          </button>

                          <button className="btn btn-dark rounded-0  text-white" type="button">
                            <Link to="/login">Login</Link>
                          </button>

                        </div>

                        <div className="form-group overflow-hidden mt-4">
                          <div className="alert alert-danger rounded-0 notice d-none">
                            <h6 className="p-0 m-0 text-center">{notice}</h6>
                          </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default UserSignupContent
