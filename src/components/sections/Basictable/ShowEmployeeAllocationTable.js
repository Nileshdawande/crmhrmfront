import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const ShowEmployeeAllocationTable=()=>
{

      const paginateurl = ApiUrl+"/emp-allocation?page=";
      const urlData = ApiUrl+"/emp-allocation/";
      const {total,alldata,notice,next,prev,limit,edit,save,handleInput,deleteData} = useAjaxhooks(paginateurl+1,1);

       const [employeeName,setEmployeeName] = useState([]);
       const [departmentName,setDepartmentName] = useState([]);
       const [designationName,setDesignationName] = useState([]);
       const [branchMasterName,setBranchMasterName] = useState([]);

       useEffect(()=>{
         getEmployeeName();
         getEmployeeDepartment();
         getEmployeeDesignationName();
         getEmployeeBranchMaster();
       },[]);


       const getEmployeeName=()=>
       {
           const ajax = axios({
             method:"GET",
             url:ApiUrl+"/emp-master"
           });

           ajax.then((response)=>{
             const data = response.data.data;
             setEmployeeName(data);
           });
       }

       const getEmployeeDepartment=()=>
       {
           const ajax = axios({
             method:"GET",
             url:ApiUrl+"/employee-department"
           });

           ajax.then((response)=>{
             const data = response.data.data;
             setDepartmentName(data);
           });
       }


       const getEmployeeDesignationName=()=>
       {
           const ajax = axios({
             method:"GET",
             url:ApiUrl+"/employee-designation"
           });

           ajax.then((response)=>{
             const data = response.data.data;
             setDesignationName(data);
           });
       }

       const getEmployeeBranchMaster=()=>
       {
           const ajax = axios({
             method:"GET",
             url:ApiUrl+"/softlabs-branch-master"
           });

           ajax.then((response)=>{
             const data = response.data.data;
             setBranchMasterName(data);
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
                                                <th scope="col">Employee name</th>
                                                <th scope="col">Designation name</th>
                                                <th scope="col">Department name</th>
                                                <th scope="col">Branch name</th>
                                                <th scope="col">Gross salary</th>
                                                <th scope="col">Deduction</th>
                                                <th scope="col">Net salary</th>
                                                <th scope="col">Allocation date</th>
                                                <th scope="col">Allocation type</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                           alldata.map((final_data,index)=>(
                                             <tr key={final_data.id}>
                                             <td>{index+1}</td>
                                             <td align="center">
                                             <select className="form-control" value={final_data.employee_id} name="employee_id" style={{width:"fit-content"}} onChange={(event)=>{handleInput(event,index)}} disabled="disabled">
                                             {
                                                employeeName.map((emp_data)=>(
                                                  <option key={emp_data.id} value={emp_data.id}>{emp_data.employee_firstname}</option>
                                                ))
                                             }
                                             </select>
                                             </td>

                                             <td align="center">
                                               <select className="form-control" value={final_data.designation_id} name="designation_id" style={{width:"fit-content"}} onChange={(event)=>{handleInput(event,index)}} disabled="disabled">
                                               {
                                                  designationName.map((designation_data)=>(
                                                    <option key={designation_data.id} value={designation_data.id}>{designation_data.designation_name}</option>
                                                  ))
                                               }
                                               </select>
                                             </td>

                                             <td align="center">
                                               <select className="form-control" value={final_data.department_id} name="department_id" style={{width:"fit-content"}} onChange={(event)=>{handleInput(event,index)}} disabled="disabled">
                                               {
                                                  departmentName.map((department_data)=>(
                                                    <option key={department_data.id} value={department_data.id}>{department_data.department_name}</option>
                                                  ))
                                               }
                                               </select>
                                             </td>

                                             <td align="center">
                                               <select className="form-control" value={final_data.branch_id} name="branch_id" style={{width:"fit-content"}} onChange={(event)=>{handleInput(event,index)}} disabled="disabled">
                                               {
                                                  branchMasterName.map((branch_data)=>(
                                                    <option key={branch_data.id} value={branch_data.id}>{branch_data.branch_name}</option>
                                                  ))
                                               }
                                               </select>
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" name="gross_salary" value={final_data.gross_salary} style={{width:'140px'}} disabled="disabled" onChange={(event)=>{handleInput(event,index)}} />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" name="deduction" value={final_data.deduction} style={{width:'140px'}} disabled="disabled" onChange={(event)=>{handleInput(event,index)}} />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" name="net_salary" value={final_data.net_salary} style={{width:'140px'}} disabled="disabled" onChange={(event)=>{handleInput(event,index)}} />
                                             </td>

                                             <td align="center">
                                               <input type="date" className="form-control" name="date_of_allocation" value={final_data.date_of_allocation} style={{width:'140px'}} disabled="disabled" onChange={(event)=>{handleInput(event,index)}} />
                                             </td>

                                             <td align="center">
                                               <select className="form-control" value={final_data.allocation_type} name="allocation_type" style={{width:"fit-content"}} onChange={(event)=>{handleInput(event,index)}} disabled="disabled">
                                               <option>initial</option>
                                               <option>appraisal</option>
                                               <option>transfer</option>
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

export default ShowEmployeeAllocationTable;
