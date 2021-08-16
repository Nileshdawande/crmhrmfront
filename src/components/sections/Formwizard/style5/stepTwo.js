import React,{useState,useEffect} from 'react';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
const cvvtip = (
  <Tooltip>
    3 digit number at the back of your card
  </Tooltip>
);

export default () => {

let [msg,setmsg] = useState("");
let [technology,settechnology] = useState([]);
let [skill,setskill] = useState([]);

    useEffect(()=>{
        get_technology();
        get_skill();
    },[]);

const create_employee_salary=(event)=>
{
     event.preventDefault();
     setmsg("Please wait....");
     let contact_id = sessionStorage.getItem("employee_id");
     let formdata = new FormData(event.target);

     let ajax = axios({
       method:"POST",
       url:"http://44.233.245.97:10040/employee-salary",
       data:formdata
     });

     ajax.then(function(response){
        setmsg("Salary created");
        removemsg();
     });

}

    const get_technology=()=>
    {

        let ajax = axios({
            method:"GET",
            url:"http://44.233.245.97:10040/technology-master"
        });

        ajax.then(function(response){
            console.log(response);
            let data = response.data.data;
            settechnology(data);
        });
    }


    const get_skill=()=>
    {

        let ajax = axios({
            method:"GET",
            url:"http://44.233.245.97:10040/skill-masters"
        });

        ajax.then(function(response){
            console.log(response);
            let data = response.data.data;
            setskill(data);
        });
    }

const removemsg=()=>
{
   setTimeout(()=>{
     setmsg("");
   },3000);
}

  return (
    <div className="ms-wizard-step">
        <form onSubmit={create_employee_salary}>
            <div className="row">

            <div className="col-md-6">
            <div className="form-group">
            <label>Last salary drawn</label>
            <input type="text" name="last_drawn_salary" className="form-control" required="required" />
            </div>
            </div>

            <div className="col-md-6">
            <div className="form-group">
            <label>Employee type</label>
            <select className="form-control" name="employee_type">
            <option>Fresher</option>
            <option>Experience</option>
            </select>
            </div>
            </div>

            <div className="col-md-6">
            <div className="form-group">
            <label>Technology</label>
            <select className="form-control" name="technology_id">
                {
                    technology.map((final)=>(
                        <option value={final.id} key={final.id}>{final.technology_name}</option>
                        ))
                }
            </select>
            </div>
            </div>


            <div className="col-md-6">
            <div className="form-group">
            <label>Skill</label>
            <select className="form-control" name="skill_id">
                {
                    skill.map((final)=>(
                        <option value={final.id} key={final.id}>{final.skill_name}</option>
                        ))
                }
            </select>
            </div>
            </div>

            <div className="col-md-6">
            <div className="form-group">
            <label>Level</label>
            <input type="text" name="level" className="form-control" required="required" />
            </div>
            </div>

            <div className="col-md-6">
            <div className="form-group">
            <label>Linkedin profile</label>
            <input type="text" name="linkedin_profile" className="form-control" required="required" />
            </div>
            </div>

            <div className="col-md-12">
            <button className="btn btn-danger rounded-0">Submit</button>
            </div>

            <div className="col-md-12 my-2">
                <div className="alert alert-danger rounded-0 font-weight-bold text-center">
                {msg}
                </div>
            </div>

            </div>
        </form>
    </div>
  )
}
