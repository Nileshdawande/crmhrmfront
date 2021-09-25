import React,{useState} from 'react';
import ApiUrl from "../ServerApi/Api";
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";

const EmployeeDepartmentContent=()=>
{

    const urlData = ApiUrl+"/employee-department";
    const [loader,setLoader] = useState(false);
    const [msg,setMsg] = useState("");

    const [inputData,setInputData] = useState({
      department_name:"",
      status:"Active"
    });

    const createEmployeeDepartment=(event)=>
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
          setMsg("Employee department created !");
          removeMsg();
          setInputData({
            ...inputData,
            department_name:"",
          });
        });

        ajax.catch((error)=>{
          if(error)
          {
            $(".notice").removeClass("d-none");
            setMsg("Employee department exists !");
            setLoader(false);
            removeMsg();
          }
        });
    }

    const handleInput=(event)=>
    {
       const name = event.target.name;
       const val  = event.target.value;
       setInputData({...inputData,[name]:val});
    }

    const removeMsg=()=>
    {
       setTimeout(()=>{
         $(".notice").addClass("d-none");
         setMsg("");
       },3000);
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
                                <h6>Create employee department master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createEmployeeDepartment}>
                                <div className="row">

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Department name</label>
                                   <input type="text" className="form-control" name="department_name" value={inputData.department_name} onChange={handleInput} required="required" />
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Status</label>
                                   <select className="form-control" name="status" value={inputData.status} onChange={handleInput}>
                                   <option>Active</option>
                                   <option>Deactive</option>
                                   </select>
                                  </div>
                                  </div>

                                  <div className="col-md-12">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Create Emp Department</button>
                                  </div>

                                </div>

                                </form>

                                <div className="alert alert-danger rounded-0 p-0 mt-2 d-none notice">
                                <h6 className="p-0 m-0 mt-1 text-center">{msg}</h6>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default EmployeeDepartmentContent;
