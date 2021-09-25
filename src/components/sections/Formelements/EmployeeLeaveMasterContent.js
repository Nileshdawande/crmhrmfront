import React,{useState,useEffect} from 'react';
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";
import ApiUrl from "../ServerApi/Api";

const EmployeeLeaveMasterContent=()=>
{

    const urlData = ApiUrl+"/emp-leaves";
    const [loader,setLoader] = useState(false);
    const [msg,setMsg] = useState("");

     const [empMaster,setEmpMaster] = useState([]);
     const [leaveType,setLeaveType] = useState([]);

     const [inputData,setInputData] = useState({
       employee_id:"",
       leave_type_id:"",
       date_of_leave:"",
       leave:"fullday"
     });

     useEffect(()=>{
       const ajax1 = axios({
         method:"GET",
         url:ApiUrl+"/emp-master"
       });

       const ajax2 = axios({
         method:"GET",
         url:ApiUrl+"/emp-leave-master"
       });

       Promise.all([ajax1,ajax2]).then((response)=>{
         const emp_master_res = response[0].data.data;
         const emp_leave_res  = response[1].data.data;
         setEmpMaster(emp_master_res);
         setLeaveType(emp_leave_res);
         const emp_id = emp_master_res[0].id;
         const leave_id = emp_leave_res[0].id;
         setInputData({
           ...inputData,
           employee_id:emp_id,
           leave_type_id:leave_id,
         });
       });

     },[]);

     const createEmployeeLeaveMaster=(event)=>
     {
         event.preventDefault();
         setLoader(true);
         const ajax = axios({
           method:"POST",
           url:urlData,
           data:{
             ...inputData
           }
         });

         ajax.then((response)=>{
           setLoader(false);
           $(".notice").removeClass("d-none");
           setMsg("Employee leave created !");
           removeMsg();
           setInputData({
             ...inputData,
             date_of_leave:""
           });
         });

         ajax.catch((error)=>{
           if(error)
           {
             $(".notice").removeClass("d-none");
             setMsg("Someting went wrong try again !");
             setLoader(false);
             removeMsg();
           }
         });
     }

     const removeMsg=()=>
     {
        setTimeout(()=>{
          $(".notice").addClass("d-none");
          setMsg("");
        },3000);
     }

     const handleInput=(event)=>
     {
        const name = event.target.name;
        const val  = event.target.value;
        setInputData({...inputData,[name]:val});
     }


        return (
            <div className="ms-content-wrapper">
                <div className="row">
                  {
                    loader&&<CustomRequestLoader/>
                  }
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create Employee Leaves Master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createEmployeeLeaveMaster}>
                                  <div className="row">

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Employee name</label>
                                      <select className="form-control" name="employee_id" value={inputData.employee_id} onChange={handleInput}>
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
                                    <input type="date" className="form-control" required="required" name="date_of_leave" value={inputData.date_of_leave} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6 ">
                                    <div className="form-group">
                                      <label>Leave type</label>
                                      <select className="form-control" name="leave_type_id" value={inputData.leave_type_id} onChange={handleInput}>
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
                                      <select className="form-control" name="leave" value={inputData.leave} onChange={handleInput}>
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
                                  {msg}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default EmployeeLeaveMasterContent;
