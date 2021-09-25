import React,{useState} from 'react'
import {Link} from "react-router-dom";
import "../../../assets/css/signup.css";
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";
import ApiUrl from "../ServerApi/Api";

const UserSignupContent = () => {

const urlData = ApiUrl+"/user/";

const [loader,setLoader] = useState(false);
const [msg,setMsg] = useState("");
const [inputData,setInputData] = useState({
  firstname:"",
  middlename:"",
  lastname:"",
  email:"",
  password:""
});

const slide=(event)=>
{
   const input = event.target;
   const container = input.parentElement;
   $(input).attr("placeholder","");
   const label = container.getElementsByTagName("LABEL")[0];
   $(label).removeClass("d-none");
   $(label).addClass("animate__animated animate__backInUp");
}


const CreateUserSignUp=(event)=>
{
    event.preventDefault();
    setLoader(true);
    const ajax = axios({
      method:"POST",
      url:urlData,
      data:{
        ...inputData
      }
    });

    ajax.then((response)=>{
      setLoader(false);
      $(".notice").removeClass("d-none");
      $(".notice").addClass("alert-success");
      setMsg("Sign up success");
      removeMsg();
      setInputData({
        firstname:"",
        middlename:"",
        lastname:"",
        email:"",
        password:""
      });
    });

    ajax.catch((error)=>{
      if(error)
      {
        $(".notice").removeClass("d-none");
        $(".notice").addClass("alert-danger");
        setMsg("You are already registerd with us");
        setLoader(false);
        removeMsg();
      }
    });
}

const handleInput=(event)=>
{
   const name = event.target.name;
   const val  = event.target.value;
   setInputData({...inputData,[name]:val});
}

const removeMsg=()=>
{
   setTimeout(()=>{
     $(".notice").addClass("d-none");
     setMsg("");
   },3000);
}

  return (
    <div className="bg-white shadow-sm container my-4">
        <div className="row">
          {
            loader&&<CustomRequestLoader/>
          }
            <div className="col-md-6 welcome_image"></div>

            <div className="col-md-6 py-5">
                <div className="">
                    <div className="branding">
                        <h1>Softlabs</h1>
                        <p>Crm hrms pms solution</p>
                    </div>
                    <div className="p-4">
                    <form onSubmit={CreateUserSignUp}>
                        <div className="form-group overflow-hidden ">
                          <label className="d-none">Firstname</label>
                          <input type="text" name="firstname" value={inputData.firstname} onChange={handleInput} className="form-control rounded-0 signup_input" placeholder="FIRSTNAME" required="required" onClick={slide} />
                        </div>

                        <div className="form-group overflow-hidden">
                          <label className="d-none">Middlename</label>
                          <input type="text" name="middlename" value={inputData.middlename} onChange={handleInput} className="form-control rounded-0 signup_input" placeholder="MIDDLENAME" required="required" onClick={slide} />
                        </div>

                        <div className="form-group overflow-hidden">
                          <label className="d-none">Lastname</label>
                          <input type="text" name="lastname" value={inputData.lastname} onChange={handleInput} className="form-control rounded-0 signup_input" placeholder="LASTNAME" required="required" onClick={slide} />
                        </div>

                        <div className="form-group overflow-hidden">
                          <label className="d-none">Email</label>
                          <input type="email" name="email" value={inputData.email} onChange={handleInput} className="form-control rounded-0 signup_input" placeholder="EMAIL" required="required" onClick={slide} />
                        </div>

                        <div className="form-group overflow-hidden">
                          <label className="d-none">Password</label>
                          <input type="password" name="password" value={inputData.password} onChange={handleInput} className="form-control rounded-0 signup_input" placeholder="PASSWORD" required="required" onClick={slide} />
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
                          <div className="alert rounded-0 notice d-none">
                            <h6 className="p-0 m-0 text-center">{msg}</h6>
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
