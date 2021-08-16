import React, { useState,useEffect } from 'react';
import axios from "axios";
import ApiUrl from "../ServerApi/Api";

const Leadmastercontent =()=> {

   let [msg,setmsg] = useState("");
   let [lead,setLead]  = useState([]);

   useEffect(()=>{
      getCategory();
    },[]);

    function createlead(event)
    {
        event.preventDefault();
        setmsg("Please wait");

        let ajax = axios({
            method:"POST",
            url:ApiUrl+"/lead",
            data:new FormData(event.target)
        });

        ajax.then((response)=>{
           setmsg("Lead successfully created");
           removemsg();
        });
    }

    function removemsg()
    {
        setTimeout(()=>{
            setmsg("")
        },2000);
    }

  function getCategory()
  {
      let ajax = axios({
        method:"GET",
        url:ApiUrl+"/lead_source"
      });

      ajax.then(function(response){
        let data = response.data.data;
        setLead(data);
      });
  }

        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Lead master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createlead}>
                                <div className="row">
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

                                        <option value="1">Testing</option>
                                        </select>
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Lead weight</label>
                                        <input type="number" className="form-control" name="lead_weight" required="required" />
                                    </div>
                                    </div>

                                    <div className="col-md-12 mb-2">
                                        <input type="checkbox" name="domestic" value="domestic" /> Domestic
                                        <input type="checkbox" name="offshore" value="offshore" className="ml-2" /> Offshore
                                    </div>

                                     <div className="col-md-12 mb-2">
                                     <textarea name="lead_details" required="required" className="form-control"></textarea>
                                     </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Country</label>
                                        <input type="text" className="form-control" name="country" required="required" />
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" name="email" required="required" />
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Contact</label>
                                        <input type="number" className="form-control" name="contact_num" required="required" />
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Company</label>
                                        <select name="company_id" className="form-control">
                                            <option value="1">Testing</option>
                                        </select>
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Lead category</label>
                                        <select name="contact_id" className="form-control">
                                            <option value="1"> Testing</option>
                                        </select>
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Budget</label>
                                        <input type="text" className="form-control" name="budget" required="required" />
                                    </div>
                                    </div>

                                    <div className="col-md-12 d-flex justify-content-center align-items-center">
                                        <button className="btn btn-danger rounded-0">Submit</button>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="alert alert-danger rounded-0 font-wight-bold text-center my-2">{msg}</div>
                                    </div>

                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }


export default Leadmastercontent;
