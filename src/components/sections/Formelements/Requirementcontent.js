import React, { useState,useEffect } from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const Requirementcontent=()=>
{
     let [requirementdata,setrequirement] = useState([]);

     const urlData = ApiUrl+"/requirement";
     const {addData,notice} = useAajaxhooks();

      useEffect(()=>{
        getrequirement();
       },[]);

        const getrequirement=()=>
        {
            let ajax = axios({
                method:"GET",
                url:ApiUrl+"/requirement",
            });

            ajax.then((response)=>{
              let data = response.data.data;
              setrequirement(data);
            });
        }

        const createRequirements=(event)=>
        {
            const ajax = addData(event,urlData);
            Promise.all([ajax]).then(()=>{
              getrequirement();
            });
        }


        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-2"></div>

                    <div className="col-md-8">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Requirement type</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{createRequirements(event)}}>

                                    <div className="form-group">
                                        <label >Requirement type</label>
                                        <input type="text" className="form-control" name="requirement_name"/>
                                    </div>

                                    <div className="form-group">
                                        <label>Parent type</label>
                                        <select className="form-control" name="requirement_parent">
                                          <option value="">Select requirement type</option>
                                            {
                                                requirementdata.map((final,i)=>(
                                                    <option key={final.id}>{final.requirement_name}</option>
                                                    ))
                                            }

                                        </select>
                                    </div>

                                    <div className="form-group">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Submit</button>
                                    </div>

                                    <div className="form-group">
                                       <div className="alert alert-danger rounded-0 text-center font-weight-bold notice d-none">
                                       {notice}
                                       </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2"></div>

                    <div className="col-md-1"></div>
                    <div className="col-md-10">

                    </div>

                    <div className="col-md-1"></div>

                </div>
            </div>

        );
    }


export default Requirementcontent;
