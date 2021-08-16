import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const EmployeeDesignationContent=()=>
{

      const urlData = ApiUrl+"/employee-designation";
      const {addData,notice} = useAajaxhooks();

       const [department,setDepartment] = useState([]);

       useEffect(()=>{
         getDepartment();
       },[]);


       const getDepartment=()=>
       {
          const ajax = axios({
            method:"GET",
            url:ApiUrl+"/employee-department"
          });

          ajax.then((response)=>{
            let data = response.data.data;
            setDepartment(data);
          });
       }



        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create employee designation master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                <div className="row">

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Designation name</label>
                                   <input type="text" className="form-control" name="designation_name" required="required" />
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Department name</label>
                                   <select className="form-control" name="department_id">
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
                                   <select className="form-control" name="status">
                                   <option defaultValue="active">Active</option>
                                   <option defaultValue="deactive">De Active</option>
                                   </select>
                                  </div>
                                  </div>

                                  <div className="col-md-12">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Create Emp Designation</button>
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

export default EmployeeDesignationContent;
