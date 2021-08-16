import React, { useState,useEffect } from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import Select from "react-select";
import ApiUrl from "../ServerApi/Api";

const Projectcontent =()=>
 {
       const urlData = ApiUrl+"/project";
       const {addData,notice} = useAajaxhooks();

        let [contract,setcontract] = useState([]);
        let [requirement,setrequirement] = useState([]);
        let [project_key,setkey] = useState("");
        let [users,setUsers] = useState([]);
        let [status,setStatus] = useState([]);
        const [option,setOption] = useState([]);

        useEffect(()=>{
            getcontract();
            getrequirement();
            getUsers();
            getTaskStatus();
        },[]);


        const getcontract=()=>
        {
            let ajax = axios({
                method:"GET",
                url:ApiUrl+"/contract",
            });

            ajax.then(function(response){
                let data = response.data.data;
                setcontract(data);
            });
        }

        const getrequirement=()=>
        {
            let ajax = axios({
                method:"GET",
                url:ApiUrl+"/requirement",
            });

            ajax.then(function(response){
                let data = response.data.data;
                setrequirement(data);
            });
        }



        const handleInput=(event)=>
        {
           if(event.target.value.indexOf(" ") !== -1)
           {
               const data = event.target.value;
               const split_data = data.split(" ");
               if(split_data[1] !== "")
               {
                 let string_data = split_data[1];
                 let key_name = data[0]+string_data[0];
                 setkey(key_name);
               }

           }

           else
           {
               let data = event.target.value;
               setkey(data);
           }

        }

        const getUsers=async()=>
        {
            const ajax = await axios({
              method:"GET",
              url:ApiUrl+"/user"
            });

            const data = ajax.data.data;
            setUsers(data);

            const newData = data.map((obj,i)=>{
              return {value:obj.id,label:obj.firstname};
            });

            setOption(newData);

        }

        const getTaskStatus=async()=>
        {
            const ajax = await axios({
              method:"GET",
              url:ApiUrl+"/task-status-master"
            });

            const data = ajax.data.data;
            setStatus(data);
        }




        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Project</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                    <div className="row">

                                        <div className="col-md-6">
                                        <div className="form-group">
                                        <label> Project name</label>
                                        <input type="text" name="project_name" className="form-control rounded-0" required="required" onChange={handleInput} />
                                        </div>
                                        </div>

                                        <div className="col-md-6">
                                        <div className="form-group">
                                        <label> Contract</label>
                                        <select name="contract_name" className="form-control rounded-0">
                                        {
                                            contract.map((final)=>(
                                            <option key={final.id}>{final.contract_number}</option>
                                            ))
                                        }
                                        </select>
                                        </div>
                                        </div>

                                        <div className="col-md-6">
                                        <div className="form-group">
                                        <label> Project start date</label>
                                        <input type="date" name="project_start_date" className="form-control rounded-0" required="required" />
                                        </div>
                                        </div>

                                        <div className="col-md-6">
                                        <div className="form-group">
                                        <label> Project expected end date</label>
                                        <input type="date" name="project_expected_date" className="form-control rounded-0" required="required" />
                                        </div>
                                        </div>

                                        <div className="col-md-6">
                                        <div className="form-group">
                                        <label>Requirement category</label>
                                        <select name="requirement_category" className="form-control rounded-0">
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
                                        <label> Project actual end date</label>
                                        <input type="date" name="project_actual_date" className="form-control rounded-0" required="required" />
                                        </div>
                                        </div>

                                        <div className="col-md-6">
                                        <div className="form-group">
                                          <label>Project leader</label>
                                          <select className="form-control rounded-0" name="project_leader">
                                          {
                                              users.map((data,i)=>(
                                              <option key={data.id} value={data.id}>{data.firstname}</option>
                                            ))
                                          }
                                          </select>
                                        </div>
                                        </div>

                                        <div className="col-md-6">
                                        <div className="form-group">
                                          <label>Status</label>
                                          <select className="form-control rounded-0" name="status">
                                            {
                                               status.map((data,i)=>(
                                                 <option key={data.id}>{data.status}</option>
                                               ))
                                            }
                                          </select>
                                        </div>
                                        </div>

                                        <div className="col-md-6">
                                        <div className="form-group">
                                         <Select name="members[]"
                                           options={option}
                                           isSearchable={true}
                                           isMulti={true} />
                                        </div>
                                        </div>

                                        <div className="col-md-6">
                                        <div className="form-group">
                                        <input type="hidden" name="project_key" value={project_key} />
                                        </div>
                                        </div>

                                        <div className="col-md-12">
                                        <div className="form-group">
                                        <label> Project details</label>
                                        <textarea name="project_details" className="form-control rounded-0" required="required"></textarea>
                                        </div>
                                        </div>

                                        <div className="col-md-12">
                                        <button className="btn btn-danger rounded-0 create_btn" type="submit">Submit</button>
                                        <div className="alert alert-danger rounded-0  my-2 text-center d-none notice">
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


export default Projectcontent;
