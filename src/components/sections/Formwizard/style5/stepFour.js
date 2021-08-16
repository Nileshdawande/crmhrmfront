import React,{useState} from 'react';
import axios from "axios";

export default () => {

 let [msg,setmsg] = useState("");

  function createcompany(event)
  {
     let frm = event.target;
     event.preventDefault();
     setmsg("Please wait....");

     var ajax = axios({
        method:"POST",
        url:"http://44.233.245.97:10040/company",
        data:new FormData(event.target)
     });

     ajax.then(function(response){
       // let cmp_id = response.data.data[0].id;
        //sessionStorage.setItem("emp_cmp",cmp_id);
        //let id = sessionStorage.getItem("employee_id");

        //updatecontact(cmp_id,id);
        setmsg("Company successfully created");
        removemsg();
        frm.reset();
     });
  }

  function removemsg()
  {

    setTimeout(()=>{
      setmsg("");
    },2000);

  }

  // function updatecontact(cmp_id,id)
  // {
  //     let ajax = axios({
  //       method:"PUT",
  //       url:"http://44.233.245.97:10040/company/"+cmp_id,
  //       data:{
  //         contact_id:id,
  //         update_type:"contact"
  //       }
  //     });
  //
  //     ajax.then(function(response){
  //         console.log(response);
  //     });
  // }


  return (
    <div className="ms-wizard-step">

      <form onSubmit={createcompany}>
      <div className="row">

        <div className="col-md-12">
        <div className="form-group">
        <label>Company name</label>
          <input type="text" name="company_name" className="form-control" placeholder="Company name" required="required" />
        </div>
        </div>

       <div className="col-md-6">
        <div className="form-group">
        <label>Company type</label>
        <select className="form-control" name="company_type">
          <option>Testing company</option>
        </select>
        <input type="hidden" name="system_type" defaultValue="hrms_company" />
        </div>
        </div>

       <div className="col-md-6">
        <div className="form-group">
        <label>Parent company</label>
        <select className="form-control" name="parent_company">
          <option>Testing</option>
        </select>
        </div>
        </div>

       <div className="col-md-6">
        <div className="form-group">
        <label>Office address</label>
        <input type="text" name="address_first" className="form-control" required="required"/>
        </div>
        </div>

       <div className="col-md-6">
        <div className="form-group">
        <label>Office address</label>
        <input type="text" name="address_second" className="form-control" required="required"/>
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>City</label>
        <input type="text" name="city" className="form-control" placehoder="City" required="required"/>
        </div>
        </div>


        <div className="col-md-6">
        <div className="form-group">
        <label>State</label>
        <input type="text" name="state" className="form-control" placehoder="State" required="required"/>
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Country</label>
        <input type="text" name="country" className="form-control" placehoder="Country" required="required"/>
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Pincode</label>
        <input type="number" name="pincode" className="form-control" placehoder="Pincode" required="required"/>
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Contact 1</label>
        <input type="number" name="contact_one"  className="form-control" required="required"/>
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Contact 2</label>
        <input type="number" name="contact_two" className="form-control" required="required"/>
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" className="form-control" placehoder="Enter email id here"   required="required"/>
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Website</label>
        <input type="url" name="website" className="form-control" required="required" />
        </div>
        </div>

        <div className="col-md-12 d-flex justify-content-around ">
          <button className="btn rounded-0 btn-primary" type="reset">Add more company</button>
          <button className="btn rounded-0 btn-dark" type="submit">Add Company</button>
        </div>

        <div className="col-md-12">
            <div className="alert alert-danger rounded-0 my-2 text-center font-weight-bold">
              {msg}
            </div>
        </div>


      </div>
      </form>


    </div>
  )
}
