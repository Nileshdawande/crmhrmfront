import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const EmpAnnulLeaveMasterContent=()=>
{

    const urlData = ApiUrl+"/emp-annual-leave-master";
    const {addData,notice} = useAajaxhooks();

      useEffect(()=>{
        getBranchMaster();
        LeaveTypeMaster();
      },[]);

       const [branchName,setBranchName] = useState([]);
       const [leaveMaster,setLeaveMaster] = useState([]);

       const getBranchMaster= async()=>
       {
           const ajax = await axios({
             method:"GET",
             url:ApiUrl+"/softlabs-branch-master",
           });

           setBranchName(ajax.data.data);
       }

       const LeaveTypeMaster= async()=>
       {
           const ajax = await axios({
             method:"GET",
             url:ApiUrl+"/emp-leave-master",
           });

           setLeaveMaster(ajax.data.data);
       }


        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create employee annual leave master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                <div className="row">

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Year</label>
                                   <select className="form-control" name="year">
                                   <option>2020</option>
                                   <option>2021</option>
                                   <option>2022</option>
                                   <option>2023</option>
                                   <option>2024</option>
                                   <option>2025</option>
                                   </select>
                                  </div>
                                  </div>

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
                                   <label>Leave type name</label>
                                   <select className="form-control" name="leave_type_id">
                                   {
                                     leaveMaster.map((final_data,index)=>(
                                       <option key={final_data.id} value={final_data.id}>{final_data.leave_type_name}</option>
                                     ))
                                   }
                                   </select>
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>No of leaves</label>
                                   <input type="number" className="form-control" required="required" name="no_of_leaves" />
                                  </div>
                                  </div>

                                  <div className="col-md-12">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Create Emp Leave</button>
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

export default EmpAnnulLeaveMasterContent;
