import React, { useState,useEffect } from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const Contractcontent =()=>
{
        let [company,setcompany]= useState([]);
        let [lead,setlead]= useState([]);
        let [requirement,setrequirement]= useState([]);

        const urlData = ApiUrl+"/contract";
        const {addData,notice} = useAajaxhooks();

        useEffect(()=>{
            getcompany();
            getrequirement();
            getlead();
        },[]);

        const getcompany=()=>
        {
            let ajax = axios({
                method:"GET",
                url:ApiUrl+"/company"
            });

            ajax.then(function(response){
                let data = response.data.data;
                setcompany(data);
            });
        }

        const getlead=()=>
        {
            let ajax = axios({
                method:"GET",
                url:ApiUrl+"/lead"
            });

            ajax.then(function(response){
                let data = response.data.data;
                setlead(data);
            });
        }

        const getrequirement=()=>
        {
            let ajax = axios({
                method:"GET",
                url:ApiUrl+"/requirement"
            });

            ajax.then(function(response){
                let data = response.data.data;
                setrequirement(data);

            });
        }



        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Contract</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                    <div className="row">
                                    <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Contract number</label>
                                    <input type="text" name="contract_number" className="form-control" required="required" />
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Company</label>
                                    <select className="form-control" name="company">
                                    {
                                        company.map((final)=>(
                                        <option key={final.id}>{final.company_name}</option>
                                        ))
                                    }
                                    </select>
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Lead</label>
                                    <select className="form-control" name="lead_id">
                                    {
                                        lead.map((final)=>(
                                        <option key={final.id} value={final.id}>{final.lead_details}</option>
                                        ))
                                    }

                                    </select>
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Requirement category</label>
                                    <select className="form-control" name="requirement_category">
                                    {
                                        requirement.map((final)=>(
                                        <option key={final.id}>{final.requirement_name}</option>
                                        ))
                                    }
                                    </select>
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Sales employee</label>
                                    <select className="form-control" name="sales_employee">
                                    <option>Testing</option>
                                    </select>
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Contract type</label>
                                    <select className="form-control" name="contract_type" required="required">
                                      <option>Fixed</option>
                                      <option>Time and Materials</option>
                                    </select>
                                    </div>
                                    </div>

                                    <div className="col-md-12">
                                    <div className="form-group">
                                    <label>Contract short description</label>
                                    <textarea className="form-control" name="contract_short_des"></textarea>
                                    </div>
                                    </div>

                                    <div className="col-md-12">
                                    <div className="form-group">
                                    <label>Detailed description</label>
                                    <textarea className="form-control" name="contract_detailed"></textarea>
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                    <div className="form-group">
                                    <button className="btn btn-danger rounded-0 create_btn">Submit</button>
                                    </div>
                                    </div>

                                    <div className="col-md-12">
                                    <div className="alert alert-danger rounded-0 text-center notice d-none ">
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

export default Contractcontent;
