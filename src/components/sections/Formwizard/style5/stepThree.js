import React,{useState} from 'react';
import axios from "axios";
export default () => {
let [msg,setmsg] = useState("");
function create_contact(event)
{
    let frm  = event.target;
    event.preventDefault();
    setmsg("Please wait....");
    let formdata = new FormData(event.target);
    // formdata.append("contact_type","employee_contact");
    let ajax = axios({
        method:"POST",
        url:"http://44.233.245.97:10040/contact",
        data:formdata
   });

  ajax.then(function(response){
    //let data = response.data.data[0].id;
    //sessionStorage.setItem("employee_id",data);
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

  return (
    <div className="ms-wizard-step">
      <div className="form-row">
      <form onSubmit={create_contact}>
      <input type="hidden" name="contact_type" value="employee_contact" />
      <div className="row">

        <div className="col-md-6">
        <div className="form-group">
        <label>Firstname</label>
        <input type="text" name="firstname" className="form-control" placehoder="Firstname" />

        </div>
        </div>


        <div className="col-md-6">
        <div className="form-group">
        <label>Lastname</label>
        <input type="text" name="lastname" className="form-control" placehoder="Lastname" />
        </div>
        </div>

        <div className="col-md-12">
        <div className="form-group">
        <label>Address</label>
        <textarea className="form-control" name="address_one"></textarea>
        </div>
        </div>

        <div className="col-md-12">
        <div className="form-group">
        <label>Address</label>
        <textarea className="form-control" name="address_two"></textarea>
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
        <label>Registration date</label>
        <input type="date" name="registration_date" className="form-control" placehoder="Enter email id here"  />
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
    </div>
  )
}
