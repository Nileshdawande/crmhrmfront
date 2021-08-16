import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const ShowEmpAnnulLeaveMasterTable=()=>
{
      const paginateurl = ApiUrl+"/emp-annual-leave-master?page=";
      const urlData = ApiUrl+"/emp-annual-leave-master/";
      const {total,alldata,notice,next,prev,limit,edit,save,handleInput,deleteData} = useAjaxhooks(paginateurl+1,1);

       const [branchName,setBranchName] = useState([]);
       const [leaveMaster,setLeaveMaster] = useState([]);


       useEffect(()=>{
          getBranchMaster();
          LeaveTypeMaster();
       },[]);

       const getBranchMaster= async()=>
       {
           const ajax = await axios({
             method:"GET",
             url:ApiUrl+"/softlabs-branch-master",
           });

           setBranchName(ajax.data.data);
       }

       const LeaveTypeMaster= async()=>
       {
           const ajax = await axios({
             method:"GET",
             url:ApiUrl+"/emp-leave-master",
           });

           setLeaveMaster(ajax.data.data);
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
                                                <th scope="col">Year</th>
                                                <th scope="col">Branch name</th>
                                                <th scope="col">Leave type name</th>
                                                <th scope="col">No of leaves</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                           alldata.map((final_data,index)=>(
                                             <tr key={final_data.id}>
                                             <td>{index+1}</td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.year} name="year" style={{width:'fit-content'}} disabled="disabled" onChange={(event)=>{handleInput(event,index)}} />
                                             </td>

                                             <td align="center">
                                               <select className="form-control" style={{width:'fit-content'}} value={final_data.branch_id} name="branch_id" disabled="disabled" onChange={(event)=>{handleInput(event,index)}}>
                                               {
                                                 branchName.map((final_data,index)=>(
                                                   <option key={final_data.id} value={final_data.id}>{final_data.branch_name}</option>
                                                 ))
                                               }
                                               </select>
                                             </td>

                                             <td align="center">
                                               <select className="form-control" style={{width:'fit-content'}} value={final_data.leave_type_id} name="leave_type_id" disabled="disabled" onChange={(event)=>{handleInput(event,index)}}>
                                               {
                                                 leaveMaster.map((final_data,index)=>(
                                                   <option key={final_data.id} value={final_data.id}>{final_data.leave_type_name}</option>
                                                 ))
                                               }
                                               </select>
                                             </td>

                                             <td align="center">
                                               <input type="number" className="form-control" value={final_data.no_of_leaves}  name="no_of_leaves" style={{width:'fit-content'}} disabled="disabled" onChange={(event)=>{handleInput(event,index)}} />
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

export default ShowEmpAnnulLeaveMasterTable;
