import React,{ useState,useEffect } from 'react'
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import ApiUrl from "../../ServerApi/Api";

const cvvtip = (
  <Tooltip>
    3 digit number at the back of your card
  </Tooltip>
);

export default () => {

let [designation_data,setdesingation] = useState([]);
let [dipartment,setDipartment] = useState([]);
let [msg,setmsg] = useState("");

useEffect(()=>{

    getDesignation();
    getdipartment();
  },[]);

// function getCategory()
// {
//   let ajax = axios({
//     method:"GET",
//     url:ApiUrl+"/contact"
//   });
//
//   ajax.then(function(response){
//     let data = response.data.data;
//     console.log(data);
//   });
// }

function getDesignation()
{
     var ajax = axios({
         method:"GET",
         url:ApiUrl+"/designation"
     });

     ajax.then(function(response){
         var data = response.data.data;
         setdesingation(data);
     });

}

function getdipartment()
{
    let ajax = axios({
        method:"GET",
        url:ApiUrl+"/dipartment"
   });

  ajax.then(function(response){
    let data = response.data.data;
    setDipartment(data);
  });
}

function create_contact(event)
{
    event.preventDefault();
    setmsg("Please wait....");
    let frm = event.target;
    let ajax = axios({
        method:"POST",
        url:ApiUrl+"/contact",
        data:new FormData(event.target)
   });

  ajax.then(function(response){
    // let data = response.data.data[0].id;
    // updatelead(data);
    setmsg("Contact successfully created");
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

// function updatelead(id)
// {
//     let lead_id = sessionStorage.getItem("lead_master");
//     let contact_id = id;
//
//     let ajax = axios({
//       method:"PUT",
//       url:ApiUrl+"/lead/"+lead_id,
//       data:{
//         fetch_type:"lead_contact_id",
//         contact_id:contact_id
//       }
//     });
//
//     ajax.then(function(response){
//       console.log(response);
//     });
//
// }





  return (
    <div className="ms-wizard-step">
      <form onSubmit={create_contact}>
      <div className="row">

        <div className="col-md-6">
        <div className="form-group">
        <label>First Name</label>
        <input type="text" name="firstname" className="form-control" placehoder="Firstname" />
        <input type="hidden" name="contact_type" defaultValue="lead_contact" />
        </div>
        </div>


        <div className="col-md-6">
        <div className="form-group">
        <label>Last Name</label>
        <input type="text" name="lastname" className="form-control" placehoder="Lastname" />
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Designation</label>
        <select className="form-control" name="designation_id">
          {
             designation_data.map((final)=>(
             <option key={final.id} value={final.id}>{final.designation_name}</option>
             ))
          }
        </select>
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Department</label>
        <select className="form-control" name="department_id">
        {
             dipartment.map((final)=>(
             <option key={final.id} value={final.id}>{final.dipartment_name}</option>
             ))
        }
        </select>
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>First Address</label>
        <input type="text" className="form-control" name="address_one" required="required" />
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Second Address</label>
        <input type="text" className="form-control" name="address_two" required="required" />
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>City</label>
        <input type="text" name="city" className="form-control" placehoder="City" />
        </div>
        </div>


        <div className="col-md-6">
        <div className="form-group">
        <label>State</label>
        <input type="text" name="state" className="form-control" placehoder="State" />
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Country</label>
        <input type="text" name="country" className="form-control" placehoder="Country" />
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Pincode</label>
        <input type="number" name="pincode" className="form-control" placehoder="Pincode" />
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Contact 1</label>
        <input type="number" name="contact_one" className="form-control"  />
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Contact 2</label>
        <input type="number" name="contact_two" className="form-control"  />
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" className="form-control" placehoder="Enter email id here"  />
        </div>
        </div>

        <div className="col-md-6">
        <div className="form-group">
        <label>Website</label>
        <input type="url" name="website" className="form-control"  />
        </div>
        </div>

        <div className="col-md-12 d-flex justify-content-end ">
          <button className="btn rounded-0 btn-dark" type="submit">Submit</button>
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
