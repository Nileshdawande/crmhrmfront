import React, { useState,useEffect } from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const Recruitmentrequestcontent =()=> {

  const urlData = ApiUrl+"/recruitment_request";

  const {addData,notice} = useAajaxhooks();

  let [recruitment,setrecruitment] = useState([]);
  let [technology,settechnology] = useState([]);


  useEffect(()=>{
      get_technology();
      get_recruitment();
  },[]);

const get_recruitment=()=>
{
    let ajax = axios({
        method:"GET",
        url:ApiUrl+"/recruitment"
    });

    ajax.then(function(response){
        setrecruitment(response.data.data);
    });
}

const get_technology=()=>
{
    let ajax = axios({
        method:"GET",
        url:ApiUrl+"/technology-master"
    });

    ajax.then(function(response){
        settechnology(response.data.data);

    });
}



return (
    <div className="ms-content-wrapper">
        <div className="row">
            <div className="col-md-12">
                <div className="ms-panel">
                    <div className="ms-panel-header">
                        <h6>Recruitment request</h6>
                    </div>
                    <div className="ms-panel-body">
                        <form onSubmit={(event)=>{addData(event,urlData)}}>
                            <div className="row">
                                <div className="col-md-6">

                                    <div className="form-group">
                                        <label>Recruitment type</label>
                                        <select className="form-control" name="recruitment_type_id">
                                          {
                                            recruitment.map((final)=>(
                                            <option key={final.id} value={final.id}>{final.recruitment_type_name}</option>
                                            ))
                                          }
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Request date</label>
                                        <input type="date" className="form-control" name="recruitment_req_date" />
                                    </div>

                                    <div className="form-group">
                                        <label>Technology</label>
                                        <select className="form-control" name="technology_id">
                                          {
                                            technology.map((final)=>(
                                            <option key={final.id} value={final.id}>{final.technology_name}</option>
                                            ))
                                          }
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Minimum experience</label>
                                        <input type="number" className="form-control" name="min_exp" required="required" />
                                    </div>

                                    <div className="form-group">
                                        <label>Offered salary from</label>
                                        <input type="number" className="form-control" name="salary_from" required="required" />
                                    </div>

                                    <div className="form-group">
                                        <label>No of candidate</label>
                                        <input type="number" className="form-control" name="no_of_candidate" required="required" />
                                    </div>

                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Recruitment name</label>
                                        <input type="text" className="form-control" name="recruitment_name" required="required" />
                                    </div>

                                    <div className="form-group">
                                        <label>To be completed by</label>
                                        <input type="date" className="form-control" name="recruitment_end_date" />
                                    </div>

                                    <div className="form-group">
                                        <label>Client</label>
                                        <select className="form-control" name="client_id">
                                          <option value="1">Testing</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Maximum experience</label>
                                        <input type="number" className="form-control" name="max_exp" required="required" />
                                    </div>

                                    <div className="form-group">
                                        <label>Offered salary to</label>
                                        <input type="number" className="form-control" name="salary_to" required="required" />
                                    </div>
                                </div>

                                <div className="col-md-12">

                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" name="description" required="required"></textarea>
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-danger rounded-0 create_btn">Submit</button>
                                    </div>

                                    <div className="alert alert-danger rounded-0 font-weight-bold text-center d-none notice">
                                      {notice}
                                    </div>

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


export default Recruitmentrequestcontent;
