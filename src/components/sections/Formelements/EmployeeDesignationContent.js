import React,{useState,useEffect} from 'react';
import ApiUrl from "../ServerApi/Api";
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";

const EmployeeDesignationContent=()=>
{

      const urlData = ApiUrl+"/employee-designation";
      const [department,setDepartment] = useState([]);
      const [loader,setLoader] = useState(false);
      const [msg,setMsg] = useState("");
      const [inputData,setInputData] = useState({
        designation_name:"",
        department_id:"",
        status:"Active"
      });

       useEffect(()=>{
         const ajax = axios({
           method:"GET",
           url:ApiUrl+"/employee-department"
         });

         Promise.all([ajax]).then((response)=>{
           const res = response[0].data.data;
           setDepartment(res);
           const dep_id = res[0].id;
           setInputData({...inputData,department_id:dep_id});
         });

       },[]);


       const createEmployeeDesignation=(event)=>
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
             setMsg("Employee designation created !");
             removeMsg();
             setInputData({...inputData,designation_name:""});
           });

           ajax.catch((error)=>{
             if(error)
             {
               $(".notice").removeClass("d-none");
               setMsg("Employee designation exists !");
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
                                <h6>Create employee designation master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createEmployeeDesignation}>
                                <div className="row">

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Designation name</label>
                                   <input type="text" className="form-control" name="designation_name" value={inputData.designation_name} onChange={handleInput} required="required" />
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Department name</label>
                                   <select className="form-control" name="department_id" value={inputData.department_id} onChange={handleInput}>
                                   {
                                      department.map((final_data,index)=>(
                                        <option value={final_data.id} key={final_data.id}>{final_data.department_name}</option>
                                      ))
                                   }
                                   </select>
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
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Create Emp Designation</button>
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

export default EmployeeDesignationContent;
