import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const CmpAnnualLeaveMasterContent=()=>
{

       const urlData = ApiUrl+"/cmp-leave-master";
       const {addData,notice} = useAajaxhooks();
       const [branchName,setBranchName] = useState([]);

       useEffect(()=>{
         getBranchMaster();
       },[]);

       const getBranchMaster= async()=>
       {
           const ajax = await axios({
             method:"GET",
             url:ApiUrl+"/softlabs-branch-master",
           });

           setBranchName(ajax.data.data);
       }


        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create company annual master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                <div className="row">

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Branch name</label>
                                   <select className="form-control" name="branch_id">
                                     {
                                       branchName.map((final_data,index)=>(
                                         <option key={final_data.id} value={final_data.id}>{final_data.branch_name}</option>
                                       ))
                                     }
                                   </select>
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Year</label>
                                   <select className="form-control" name="year">
                                     <option>2020</option>
                                     <option>2021</option>
                                     <option>2022</option>
                                     <option>2023</option>
                                     <option>2024</option>
                                   </select>
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Leave on account of</label>
                                   <input type="number" className="form-control" required="required" name="leave_on_account_of" />
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Annual leave date</label>
                                   <input type="date" className="form-control" required="required" name="annual_leave_date" />
                                  </div>
                                  </div>


                                  <div className="col-md-12">
                                  <div className="form-group">
                                   <label>Leave cancelled</label>
                                   <input type="number" className="form-control" required="required" name="leave_cancelled" />
                                  </div>
                                  </div>

                                  <div className="col-md-12">
                                  <div className="form-group">
                                   <label>Reason for cancellation</label>
                                   <textarea className="form-control" required="required" name="reason_for_cancellation"></textarea>
                                  </div>
                                  </div>

                                  <div className="col-md-12">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Create Cmp annual</button>
                                  </div>

                                </div>

                                </form>

                                <div className="alert alert-danger rounded-0 p-0 mt-2 d-none notice">
                                <h6 className="p-0 m-0 mt-1 text-center">{notice}</h6>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default CmpAnnualLeaveMasterContent;
