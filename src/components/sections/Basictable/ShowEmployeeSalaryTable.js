import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const ShowEmployeeSalaryTable=()=>
{

  const paginateurl = ApiUrl+"/emp-salary?page=";
  const urlData = ApiUrl+"/emp-salary/";
  const {total,alldata,notice,next,prev,limit,edit,save,handleInput,deleteData} = useAjaxhooks(paginateurl+1,1);

  const [EmpName,setEmpName] = useState([]);

       useEffect(()=>{
         getEmployeeMaster();
       },[]);

       const getEmployeeMaster=async()=>
       {
            const ajax = await axios({
              method:"GET",
              url:ApiUrl+"/emp-master"
             });

             let data = ajax.data.data;
             setEmpName(data);
       }



        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <PaginationUi total={total} next={next} prev={prev} limit={limit}  paginateurl={paginateurl} urlData={urlData}/>
                            </div>
                            <div className="ms-panel-body">

                                <div className="table-responsive">
                                    <table className="table table-hover thead-primary text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Employee name</th>
                                                <th scope="col">Month of year</th>
                                                <th scope="col">Salary processing date</th>
                                                <th scope="col">Expected work days</th>
                                                <th scope="col">Days work</th>
                                                <th scope="col">Deduction amount</th>
                                                <th scope="col">Deduction type</th>
                                                <th scope="col">Net amount</th>
                                                <th scope="col">Salary transffered</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                           alldata.map((final_data,index)=>(
                                             <tr key={final_data.id}>

                                               <td align="center">{index+1}</td>

                                               <td align="center">
                                               <select className="form-control" style={{width:'fit-content'}} name="employee_id" value={final_data.employee_id} onChange={(event)=>{handleInput(event,index)}} disabled="disabled">
                                               {
                                                  EmpName.map((empData)=>(
                                                    <option key={empData.id} value={empData.id}>{empData.employee_firstname}</option>
                                                  ))
                                               }
                                               </select>
                                               </td>

                                               <td align="center">
                                                 <select className="form-control"  name="month_of_year" value={final_data.month_of_year} onChange={(event)=>{handleInput(event,index)}} disabled="disabled">
                                                   <option>Jan</option>
                                                   <option>Feb</option>
                                                   <option>Mar</option>
                                                   <option>Apr</option>
                                                   <option>May</option>
                                                   <option>Jun</option>
                                                   <option>Jul</option>
                                                   <option>Aug</option>
                                                   <option>Sept</option>
                                                   <option>Oct</option>
                                                   <option>Nov</option>
                                                   <option>Des</option>
                                                 </select>

                                             </td>

                                               <td align="center">
                                               <input type="date" className="form-control" name="date_of_salary_processing" value={final_data.date_of_salary_processing} onChange={(event)=>{handleInput(event,index)}} disabled="disabled" />
                                               </td>

                                               <td align="center">
                                               <input type="number" className="form-control" name="no_of_expected_wroking_days" value={final_data.no_of_expected_wroking_days} onChange={(event)=>{handleInput(event,index)}} disabled="disabled" />
                                               </td>

                                               <td align="center">
                                               <input type="number" className="form-control" name="no_of_days_worked" value={final_data.no_of_days_worked} onChange={(event)=>{handleInput(event,index)}} disabled="disabled" />
                                               </td>

                                               <td align="center">
                                               <input type="number" className="form-control" name="salary_deduction_amount" value={final_data.salary_deduction_amount} onChange={(event)=>{handleInput(event,index)}} disabled="disabled" />
                                               </td>

                                               <td align="center">
                                               <input type="text" className="form-control" name="salary_deduction_type" value={final_data.salary_deduction_type} onChange={(event)=>{handleInput(event,index)}} disabled="disabled" />
                                               </td>

                                               <td align="center">
                                               <input type="number" className="form-control" name="net_amount" value={final_data.net_amount} onChange={(event)=>{handleInput(event,index)}} disabled="disabled" />
                                               </td>

                                               <td align="center">
                                               <select className="form-control" name="salary_transferred" value={final_data.salary_transferred} onChange={(event)=>{handleInput(event,index)}} disabled="disabled">
                                               <option>Yes</option>
                                               <option>No</option>
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

export default ShowEmployeeSalaryTable;
