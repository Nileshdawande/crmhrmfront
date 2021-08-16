import React, { useState,useEffect } from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const Recruitmentrequestwisecontent=()=>{

  const urlData = ApiUrl+"/recruitment_request_candidate";

  const {addData,notice} = useAajaxhooks();

let [recruitment,setrecruitment] = useState([]);
let [candidate,setcandidate] = useState([]);

useEffect(()=>{
    getrecruitment();
    getCandidate();
},[]);

const getrecruitment=()=>
{
    let ajax = axios({
        method:"GET",
        url:ApiUrl+"/recruitment_request",
    });

    ajax.then(function(response){
       setrecruitment(response.data.data);
    });

}

const getCandidate=()=>
{

    let ajax = axios({
        method:"GET",
        url:ApiUrl+"/candidate-master"
    });

    ajax.then(function(response){
      let data = response.data.data;
      setcandidate(data);
    });

}




        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Recruitment request wise candidate</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                    <div className="row">
                                    <div className="col-md-6">

                                    <div className="form-group">
                                        <label>Recruitment request</label>
                                        <select className="form-control" name="recruitment_request_id">
                                        {
                                            recruitment.map((final)=>(
                                            <option key={final.id} value={final.id}>{final.recruitment_name}</option>
                                            ))
                                        }
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Candidate</label>
                                        <select className="form-control" name="candidate_id">

                                        {
                                            candidate.map((final)=>(
                                            <option  key={final.id} value={final.id}>{final.candidate_firstname}</option>
                                            ))
                                        }

                                        </select>
                                    </div>

                                    </div>

                                    <div className="col-md-6">

                                    <div className="form-group mb-4">
                                        <label>Date of reg</label>
                                        <input type="date" name="date_of_reg" className="form-control" required="required" />
                                    </div>

                                    </div>

                                    <div className="col-md-12">
                                      <div className="form-group">
                                          <button className="btn btn-danger rounded-0 create_btn">Submit</button>
                                      </div>
                                    </div>


                                    <div className="col-md-12">
                                    <div className="alert alert-danger rounded-0 font-weight-bold text-center notice d-none">
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


export default Recruitmentrequestwisecontent;
