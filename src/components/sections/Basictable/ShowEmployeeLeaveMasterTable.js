import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const ShowEmployeeLeaveMasterTable=()=>
{

      const paginateurl = ApiUrl+"/emp-leaves?page=";
      const urlData = ApiUrl+"/emp-leaves/";
      const {total,alldata,notice,next,prev,limit,edit,save,handleInput,deleteData} = useAjaxhooks(paginateurl+1,1);

       const [leaveType,setLeaveType] = useState([]);
       const [EmpName,setEmpName] = useState([]);

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
             setEmpName(data);
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
                                <PaginationUi total={total} next={next} prev={prev} limit={limit} paginateurl={paginateurl} urlData={urlData}/>
                            </div>
                            <div className="ms-panel-body">

                                <div className="table-responsive">
                                    <table className="table table-hover thead-primary text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Employee name</th>
                                                <th scope="col">Leave type name</th>
                                                <th scope="col">Date of leave</th>
                                                <th scope="col">Leave</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {
                                             alldata.map((final_data,index)=>(
                                               <tr key={final_data.id}>

                                                <td>{index+1}</td>

                                                <td>
                                                    <select className="form-control" value={final_data.employee_id} name="employee_id" onChange={(event)=>{handleInput(event,index)}} disabled="disabled">
                                                    {
                                                      EmpName.map((emp_data)=>(
                                                        <option key={emp_data.id} value={emp_data.id}>{emp_data.employee_firstname}</option>
                                                      ))
                                                    }
                                                    </select>
                                                </td>

                                                <td>
                                                    <select className="form-control" value={final_data.leave_type_id} name="leave_type_id" onChange={(event)=>{handleInput(event,index)}} disabled="disabled">
                                                    {
                                                       leaveType.map((leave_data)=>(
                                                         <option key={leave_data.id} value={leave_data.id}>{leave_data.leave_type_name}</option>
                                                       ))
                                                    }
                                                    </select>
                                                </td>

                                                <td>
                                                    <input type="date" className="form-control" value={final_data.date_of_leave} name="date_of_leave" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" />
                                                </td>

                                                <td>
                                                    <select className="form-control" value={final_data.leave} name="leave" onChange={(event)=>{handleInput(event,index)}} disabled="disabled">
                                                    <option value="halfday">Half day</option>
                                                    <option value="fullday">Full day</option>
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

export default ShowEmployeeLeaveMasterTable;
