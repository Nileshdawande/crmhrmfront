import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const BranchOfficeMasterContent=()=>
{

      const urlData = ApiUrl+"/branch-office-master";
      const {addData,notice} = useAajaxhooks();

       const [branchMaster,setBranchMaster] = useState([]);
       const [officeMaster,setOfficeMaster] = useState([]);

       useEffect(()=>{
         getBranchMaster();
         getOfficeMaster();
       },[]);


       const getBranchMaster=()=>
       {
           let ajax = axios({
             method:"GET",
             url:ApiUrl+"/softlabs-branch-master"
           });

           ajax.then((response)=>{
             let data = response.data.data;
             setBranchMaster(data);
           });
       }

       const getOfficeMaster=()=>
       {
           let ajax = axios({
             method:"GET",
             url:ApiUrl+"/softlabs-office-master"
           });

           ajax.then((response)=>{
             let data = response.data.data;
             setOfficeMaster(data);
           });
       }


        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create branch office master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                <div className="row">

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Branch name</label>
                                      <select className="form-control" name="branch_id">
                                      {
                                         branchMaster.map((final_data,index)=>(
                                           <option key={final_data.id} value={final_data.id}>{final_data.branch_name}</option>
                                         ))
                                      }
                                      </select>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Office name</label>
                                      <select className="form-control" name="office_id">

                                      {
                                         officeMaster.map((final_data,index)=>(
                                           <option key={final_data.id} value={final_data.id}>{final_data.office_name}</option>
                                         ))
                                      }
                                      </select>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Date of activation</label>
                                      <input type="date" className="form-control" name="date_of_activation" required="required" />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Date of deactivation</label>
                                      <input type="date" className="form-control" name="date_of_deactivation" required="required" />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Status</label>
                                      <select className="form-control" name="status">
                                      <option defaultValue="active">Active</option>
                                      <option defaultValue="deactive">De active</option>
                                      </select>
                                      </div>
                                    </div>

                                    <div className="col-md-12">
                                      <button className="btn btn-danger rounded-0 create_btn" type="submit">Submit</button>
                                    </div>

                                  </div>

                                </form>

                                <div className="alert alert-danger rounded-0 p-0 mt-1 d-none notice">
                                <h6 className="p-0 m-0 mt-1 text-center">{notice}</h6>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default BranchOfficeMasterContent;
