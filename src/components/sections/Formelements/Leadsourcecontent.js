import React, { useState,useEffect } from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const Leadsourcecontent =()=> {

  let [lead,setLead]  = useState([]);

  const urlData = ApiUrl+"/lead_source";
  const {addData,notice} = useAajaxhooks();

  useEffect(()=>{
      getCategory();
    },[]);

  const getCategory=()=>
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

  const createLeadSource=(event)=>
  {
      const ajax = addData(event,urlData);
      Promise.all([ajax]).then(()=>{
        getCategory();
      });
  }


        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Add lead source</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createLeadSource}>
                                    <div className="form-group">
                                        <label htmlFor="exampleEmail">Lead source</label>
                                        <input type="text" className="form-control" placeholder="Lead source" name="lead_source_name" required="required" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleSelect">Lead source parent</label>
                                  <select className="form-control" name="lead_source_parent" >
                                    <option value="">Select parent category</option>
                                    {
                                      lead.map((data)=>
                                        <option key={data.id} >{data.lead_source_name}</option>
                                      )
                                    }
                                  </select>
                                    </div>

                                    <div className="alert alert-danger rounded-0  text-center font-weight-bold notice d-none">
                                    {notice}
                                    </div>
                                  <button type="submit" className="btn btn-primary rounded-0 my-2 create_btn" status="insert">
                                      Submit
                                  </button>

                                </form>
                            </div>
                        </div>
                    </div>
                     <div className="col-md-1"></div>
                </div>
            </div>

        );
    }


export default Leadsourcecontent;
