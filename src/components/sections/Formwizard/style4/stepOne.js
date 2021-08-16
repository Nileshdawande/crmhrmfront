import React, { useState,useEffect } from 'react';
import axios from "axios";
import ApiUrl from "../../ServerApi/Api";

export default ()  => {
   let [msg,setmsg] = useState("");
   let [lead,setLead]  = useState([]);
   let [leadcategory,setleadcategory]  = useState([]);
    useEffect(()=>{
      get_leadsource();
    },[]);

    function createlead(event)
    {
        event.preventDefault();
        setmsg("Please wait");
        let frm = event.target;
        let ajax = axios({
            method:"POST",
            url:ApiUrl+"/lead",
            data:new FormData(event.target)
        });

        ajax.then((response)=>{
           setmsg("Lead successfully created");
           removemsg();
           frm.reset();
        });
    }

    function removemsg()
    {
        setTimeout(()=>{
            setmsg("")
        },2000);
    }

  function get_leadsource()
  {
      let ajax = axios({
        method:"GET",
        url:ApiUrl+"/lead_source"
      });

      ajax.then(function(response){
        let data = response.data.data;
        setLead(data);
        get_leadcategory();
      });
  }

  function get_leadcategory()
  {
      let ajax = axios({
        method:"GET",
        url:ApiUrl+"/category"
      });

      ajax.then(function(response){
        let data = response.data.data;
        setleadcategory(data);
      });
  }

        return (
              <div className="ms-wizard-step">
                <form onSubmit={createlead}>
                <div className="form-row">
                <div className="col-md-6">
                <div className="form-group">
                    <label>Lead received date</label>
                    <input type="date" className="form-control" name="lead_received_date" required="required" />
                </div>
                </div>

                <div className="col-md-6">
                <div className="form-group">
                    <label>Lead source</label>
                    <select name="lead_source_id" className="form-control">
                    {
                      lead.map((data)=>
                        <option key={data.id} value={data.id}>{data.lead_source_name}</option>
                      )
                    }
                    </select>
                </div>
                </div>

                <div className="col-md-6">
                <div className="form-group">
                    <label>Lead category</label>
                    <select name="lead_cat_id" className="form-control">
                    {
                      leadcategory.map((data)=>
                        <option key={data.id} value={data.id}>{data.category}</option>
                      )
                    }
                    </select>
                </div>
                </div>

                <div className="col-md-6">
                <div className="form-group">
                    <label>Lead weight</label>

                    <select className="form-control" name="lead_weight" required="required">
                      <option>High Priority</option>
                      <option>Medium Priority</option>
                      <option>General Priority</option>
                    </select>
                </div>
                </div>

                <div className="col-md-12 mb-1">
                   <div className="form-group">
                    <input type="checkbox" name="domestic" value="domestic" /> Domestic
                    <input type="checkbox" name="offshore" value="offshore" className="ml-2" /> Offshore
                   </div>
                </div>

                <div className="col-md-6 mb-2">
                <label>Budget</label>
                <input type="number" className="form-control" name="budget" placeholder="0.00" />
                </div>

                <div className="col-md-6 mb-2">
                <label>Currency</label>
                <select className="form-control" name="currency">
                  <option>INR</option>
                  <option>USD</option>
                </select>
                </div>

                 <div className="col-md-12 mb-2">
                 <label>Lead details</label>
                 <textarea name="lead_details" required="required" className="form-control"></textarea>
                 </div>

        <div className="col-md-12 d-flex align-items-center justify-content-end">
          <button type="submit" className="btn btn-primary rounded-0" status="insert">Submit</button>
        </div>

        <div className="col-md-12">

          <div className="px-4">
          <div className="alert alert-danger rounded-0  text-center font-weight-bold my-2">{msg}</div>
          </div>
        </div>

      </div>
      </form>

    </div>
  )
}
