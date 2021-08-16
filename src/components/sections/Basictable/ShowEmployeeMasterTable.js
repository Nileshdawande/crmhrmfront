import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const ShowEmployeeMasterTable=()=>
{
      const paginateurl = ApiUrl+"/emp-master?page=";
      const urlData = ApiUrl+"/emp-master/";
      const {total,alldata,notice,next,prev,limit,edit,save,handleInput,deleteData} = useAjaxhooks(paginateurl+1,1);

       const [department,setDepartment] = useState([]);
       const [EmployeeTypeMaster,setEmployeeTypeMaster] = useState([]);
       const [candidateMaster,setCandidateMaster] = useState([]);


       useEffect(()=>{
          getDepartment();
          getEmployeeType();
          getCandidate();
       },[]);


       const getDepartment=()=>
       {
            const ajax = axios({
              method:"GET",
              url:ApiUrl+"/employee-department"
            });

            ajax.then((response)=>{
              const data = response.data.data;
              setDepartment(data);
            });
       }

       const getEmployeeType=()=>
       {
            const ajax = axios({
              method:"GET",
              url:ApiUrl+"/employee-type-master"
            });

            ajax.then((response)=>{
              const data = response.data.data;
              setEmployeeTypeMaster(data);
            });
       }


       const getCandidate=()=>
       {
            const ajax = axios({
              method:"GET",
              url:ApiUrl+"/candidate-master"
            });

            ajax.then((response)=>{
              const data = response.data.data;
              setCandidateMaster(data);
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
                                                <th scope="col">Emp code</th>
                                                <th scope="col">Emp firstname</th>
                                                <th scope="col">Emp middlename</th>
                                                <th scope="col">Emp lastname</th>
                                                <th scope="col">Address1</th>
                                                <th scope="col">Address2</th>
                                                <th scope="col">Address3</th>
                                                <th scope="col">City</th>
                                                <th scope="col">State</th>
                                                <th scope="col">Country</th>
                                                <th scope="col">Pincode</th>
                                                <th scope="col">Dob</th>
                                                <th scope="col">Qaul-1</th>
                                                <th scope="col">Qaul-1-details</th>
                                                <th scope="col">Qaul-2</th>
                                                <th scope="col">Qaul-2-details</th>
                                                <th scope="col">Contact1</th>
                                                <th scope="col">Contact2</th>
                                                <th scope="col">Department name</th>
                                                <th scope="col">Emp type name</th>
                                                <th scope="col">Can name</th>
                                                <th scope="col">Date of leaving</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Offer id</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                           alldata.map((final_data,index)=>(
                                             <tr key={final_data.id}>
                                             <td>{index+1}</td>
                                             <td align="center">
                                               <input type="number" className="form-control" value={final_data.employee_code} name="employee_code" onChange={(event)=>handleInput(event,index)} style={{width:'110px'}} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.employee_firstname} name="employee_firstname" onChange={(event)=>handleInput(event,index)} style={{width:'110px'}} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.employee_middlename} name="employee_middlename" onChange={(event)=>handleInput(event,index)} style={{width:'110px'}} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.employee_lastname} name="employee_lastname" onChange={(event)=>handleInput(event,index)} style={{width:'110px'}} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.address_one} name="address_one"  onChange={(event)=>handleInput(event,index)} style={{width:'110px'}} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.address_two} name="address_two"  onChange={(event)=>handleInput(event,index)} style={{width:'110px'}} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.address_three} name="address_three" onChange={(event)=>handleInput(event,index)} style={{width:'110px'}} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.city} name="city" style={{width:'110px'}} onChange={(event)=>handleInput(event,index)} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.state} name="state" style={{width:'110px'}} onChange={(event)=>handleInput(event,index)} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.country} name="country" style={{width:'110px'}} onChange={(event)=>handleInput(event,index)} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="number" className="form-control" value={final_data.pincode} name="pincode" style={{width:'110px'}} onChange={(event)=>handleInput(event,index)} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="date" className="form-control" value={final_data.dob} name="dob" style={{width:'130px'}} onChange={(event)=>handleInput(event,index)} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.qual_one} name="qual_one" style={{width:'110px'}} onChange={(event)=>handleInput(event,index)} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.qual_one_details} name="qual_one_details" style={{width:'110px'}} onChange={(event)=>handleInput(event,index)} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.qual_two} name="qual_two" style={{width:'110px'}} onChange={(event)=>handleInput(event,index)} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.qual_two_details} name="qual_two_details" style={{width:'110px'}}  onChange={(event)=>handleInput(event,index)} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="number" className="form-control" value={final_data.contact_one} name="contact_one" style={{width:'110px'}} onChange={(event)=>handleInput(event,index)} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="number" className="form-control" value={final_data.contact_two} name="contact_two" style={{width:'110px'}} onChange={(event)=>handleInput(event,index)} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                             <select className="form-control" style={{width:'fit-content'}} value={final_data.department_id} name="department_id" onChange={(event)=>handleInput(event,index)} disabled="disabled">
                                             {
                                                department.map((final_data,index)=>(
                                                  <option key={final_data.id} value={final_data.id}>{final_data.department_name}</option>
                                                ))
                                             }
                                             </select>
                                             </td>

                                             <td align="center">
                                               <select className="form-control" style={{width:'fit-content'}} value={final_data.employee_type_id} name="employee_type_id" onChange={(event)=>handleInput(event,index)} disabled="disabled">
                                               {
                                                  EmployeeTypeMaster.map((final_data,index)=>(
                                                    <option key={final_data.id} value={final_data.id}>{final_data.employee_type_name}</option>
                                                  ))
                                               }
                                               </select>
                                             </td>

                                             <td align="center">
                                               <select className="form-control" value={final_data.candidate_id} name="candidate_id" style={{width:'fit-content'}} onChange={(event)=>handleInput(event,index)} disabled="disabled">
                                               {
                                                  candidateMaster.map((final_data,index)=>(
                                                    <option key={final_data.id} value={final_data.id}>{final_data.candidate_firstname}</option>
                                                  ))
                                               }
                                               </select>
                                             </td>

                                             <td align="center">
                                               <input type="date" className="form-control" value={final_data.date_of_leaving} name="date_of_leaving" style={{width:'130px'}} onChange={(event)=>handleInput(event,index)} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.status} name="status" style={{width:'110px'}} onChange={(event)=>handleInput(event,index)} disabled="disabled" />
                                             </td>

                                             <td align="center">
                                               <input type="number" className="form-control" value={final_data.offer_id} name="offer_id" style={{width:'110px'}} onChange={(event)=>handleInput(event,index)} disabled="disabled" />
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

export default ShowEmployeeMasterTable;
