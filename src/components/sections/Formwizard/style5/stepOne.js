import React,{useState} from 'react';
import axios from "axios";

export default () => {
let [msg,setmsg] = useState("");
const create_employee_edu=(event)=>
{
     let frm = event.target;
     event.preventDefault();
     setmsg("Please wait....");
     //let contact_id = sessionStorage.getItem("employee_id");
     let formdata = new FormData(event.target);
     // formdata.append("contact_id",contact_id);

     let ajax = axios({
       method:"POST",
       url:"http://44.233.245.97:10040/employee-education",
       data:formdata
     });

     ajax.then(function(response){
        setmsg("Education created");
        removemsg();
        frm.reset();
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
      <div className="form-row">
      <form onSubmit={create_employee_edu}>
        <div className="row">
          <div className="col-md-6">
          <div className="form-group">
          <label>Qualification-1</label>
          <select className="form-control" name="qualification_one"><option>BSC</option></select>
          </div>
          </div>

          <div className="col-md-6">
          <div className="form-group">
          <label>Qualification-1 Percentage</label>
          <input type="number" name="qualification_one_per" className="form-control" required="required" />
          </div>
          </div>

          <div className="col-md-6">
          <div className="form-group">
          <label>Qualification-2</label>
          <select className="form-control" name="qualification_two"><option>BSC</option></select>
          </div>
          </div>

          <div className="col-md-6">
          <div className="form-group">
          <label>Qualification-2 Percentage</label>
          <input type="number" name="qualification_two_per" className="form-control" required="required" />
          </div>
          </div>

          <div className="col-md-12">
            <button className="btn btn-danger rounded-0">Submit</button>
          </div>

          <div className="col-md-12 my-2">
            <div className="alert alert-danger rounded-0">{msg}</div>
          </div>

        </div>
      </form>
      </div>
    </div>
  )
}
