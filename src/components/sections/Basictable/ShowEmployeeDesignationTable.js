import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const ShowEmployeeDesignationTable=()=>
{
      const paginateurl = ApiUrl+"/employee-designation?page=";
      const urlData = ApiUrl+"/employee-designation/";
      const {total,alldata,notice,next,prev,limit,edit,save,handleInput,deleteData} = useAjaxhooks(paginateurl+1,1);

       const [EmployeeDepartment,setEmployeeDepartment] = useState([]);

       useEffect(()=>{
          getEmployeeDepartment();
       },[]);



       const getEmployeeDepartment=()=>
       {
           const ajax = axios({
             method:"GET",
             url:ApiUrl+"/employee-department"
           });

           ajax.then((response)=>{
             const data = response.data.data;
             setEmployeeDepartment(data);
           });
       }



        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                              <PaginationUi total={total} next={next} prev={prev} limit={limit} paginateurl={paginateurl} urlData={urlData}/>
                            </div>
                            <div className="ms-panel-body">

                                <div className="table-responsive">
                                    <table className="table table-hover thead-primary text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Designation name</th>
                                                <th scope="col">Department name</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                           alldata.map((final_data,index)=>(
                                             <tr key={final_data.id}>
                                             <td>{index+1}</td>
                                             <td align="center">
                                               <input type="text" className="form-control rounded-0" value={final_data.designation_name} name="designation_name" onChange={(event)=>{handleInput(event,index)}} style={{width:'fit-content'}} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <select className="form-control rounded-0" value={final_data.department_id} name="department_id" onChange={(event)=>{handleInput(event,index)}} disabled="disabled">
                                                  {
                                                     EmployeeDepartment.map((departmentData)=>(
                                                       <option key={departmentData.id} value={departmentData.id}>{departmentData.department_name}</option>
                                                     ))
                                                  }
                                               </select>
                                             </td>

                                             <td align="center">
                                               <select className="form-control" value={final_data.status} onChange={(event)=>{handleInput(event,index)}} name="status" disabled="disabled">
                                                 <option>Active</option>
                                                 <option>De active</option>
                                               </select>
                                             </td>

                                             <EditDeleteSave edit={edit} deleteData={deleteData} save={save} urlData={urlData} index={index} final={final_data}/>

                                             </tr>
                                           ))
                                        }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="alert alert-danger rounded-0 p-0 mt-1 notice d-none text-center">
                                  {notice}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );

}

export default ShowEmployeeDesignationTable;
