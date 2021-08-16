import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const EmployeeLeaveMasterContent=()=>
{

    const urlData = ApiUrl+"/emp-leaves";
    const {addData,notice} = useAajaxhooks();

     const [empMaster,setEmpMaster] = useState([]);
     const [leaveType,setLeaveType] = useState([]);

     useEffect(()=>{
       getEmployeeMaster();
       getEmployeeTypeMaster();
     },[]);

     const getEmployeeMaster=async()=>
     {
        const ajax = await axios({
          method:"GET",
          url:ApiUrl+"/emp-master"
        });

        let data = ajax.data.data;
        setEmpMaster(data);
     }

     const getEmployeeTypeMaster=async()=>
     {
        const ajax = await axios({
          method:"GET",
          url:ApiUrl+"/emp-leave-master"
        });

        let data = ajax.data.data;
        setLeaveType(data);
     }

        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create Employee Leaves Master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                  <div className="row">

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Employee name</label>
                                      <select className="form-control" name="employee_id">
                                      {
                                         empMaster.map((final_data)=>(
                                           <option key={final_data.id} value={final_data.id}>{final_data.employee_firstname}</option>
                                         ))
                                      }
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Date of leave</label>
                                    <input type="date" className="form-control" required="required" name="date_of_leave" />
                                    </div>
                                  </div>

                                  <div className="col-md-6 ">
                                    <div className="form-group">
                                      <label>Leave type</label>
                                      <select className="form-control" name="leave_type_id">
                                        {
                                           leaveType.map((final_data)=>(
                                             <option key={final_data.id} value={final_data.id}>{final_data.leave_type_name}</option>
                                           ))
                                        }
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6 ">
                                    <div className="form-group">
                                      <label>Leave</label>
                                      <select className="form-control" name="leave">
                                      <option value="fullday">Full day</option>
                                      <option value="halfday">Half day</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6 ">
                                      <button type="submit" className="btn btn-danger rounded-0 create_btn">
                                          Employee leave
                                      </button>
                                  </div>

                                  </div>
                                </form>

                                <div className="alert alert-danger rounded-0 p-0 mt-2 d-none notice text-center">
                                  {notice}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default EmployeeLeaveMasterContent;
