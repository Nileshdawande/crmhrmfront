import React,{useEffect,useState} from 'react';
import axios from "axios";
import ApiUrl from "../../ServerApi/Api";

export default () => {

useEffect(()=>{
  getcompany_type();
},[]);

let [msg,setmsg] = useState("");
let [company_type,setcompany_type] = useState([]);

function getcompany_type()
{
   const ajax = axios({
     method:"GET",
     url:ApiUrl+"/cmptype"
   });

   ajax.then(function(response){
     const data = response.data.data;
     setcompany_type(data);
   });
}


  function createcompany(event)
  {
     event.preventDefault();
     setmsg("Please wait....");
     let frm = event.target;
     var ajax = axios({
        method:"POST",
        url:ApiUrl+"/company",
        data:new FormData(event.target)
     });

     ajax.then(function(response){
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

           <div className="col-md-12">
            <div className="form-group">
            <label>Company type</label>
            <select className="form-control" name="company_type_id">
              <option value="0">Select company type</option>
              {
                 company_type.map((final_data)=>(
                   <option key={final_data.id} value={final_data.id}>{final_data.company_type_name}</option>
                 ))
              }
            </select>
            <input type="hidden" name="system_type" defaultValue="crm_company" />
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

            <div className="col-md-12 d-flex justify-content-end ">
              <button className="btn rounded-0 btn-dark" type="submit">Add company</button>
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
