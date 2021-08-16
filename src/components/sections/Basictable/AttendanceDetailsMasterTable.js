import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const AttendanceDetailsMasterTable=()=>
{

      const paginateurl = ApiUrl+"/attendance_details?page=";
      const urlData = ApiUrl+"/attendance_details/";
      const {total,alldata,notice,next,prev,limit,edit,save,handleInput,deleteData} = useAjaxhooks(paginateurl+1,1);

       const [EmpName,setEmpName] = useState([]);
       const [OfficeName,setOfficeName] = useState([]);

       useEffect(()=>{
         getEmployeeMaster();
         getOfficeMaster();
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

       const getOfficeMaster=async()=>
       {
            const ajax = await axios({
              method:"GET",
              url:ApiUrl+"/softlabs-office-master"
             });

             let data = ajax.data.data;
             setOfficeName(data);
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
                                                <th scope="col">Office name</th>
                                                <th scope="col">Work date</th>
                                                <th>Worked</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {
                                             alldata.map((final_data,index)=>(
                                               <tr key={final_data.id}>

                                                 <td align="center">
                                                 {index+1}
                                                 </td>

                                                 <td align="center">
                                                 <select className="form-control" value={final_data.employee_id} name="employee_id" onChange={(event)=>{handleInput(event,index)}}  disabled="disabled">
                                                   {
                                                      EmpName.map((emp_data,index)=>(
                                                        <option key={emp_data.id} value={emp_data.id}>{emp_data.employee_firstname}</option>
                                                      ))
                                                   }
                                                 </select>
                                                 </td>

                                                 <td align="center">
                                                 <select className="form-control" value={final_data.office_id} name="office_id" onChange={(event)=>{handleInput(event,index)}}  disabled="disabled">
                                                   {
                                                       OfficeName.map((office_data,index)=>(
                                                         <option key={office_data.id} value={office_data.id}>{office_data.office_name}</option>
                                                       ))
                                                   }
                                                 </select>
                                                 </td>

                                                 <td align="center">
                                                 <input type="date" className="form-control" value={final_data.work_date} name="work_date"  disabled="disabled" onChange={(event)=>{handleInput(event,index)}} />
                                                 </td>

                                                 <td align="center">
                                                   <select className="form-control" value={final_data.working} name="working" onChange={(event)=>{handleInput(event,index)}} disabled="disabled">
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

export default AttendanceDetailsMasterTable;
