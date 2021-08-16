import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const ShowCmpAnnualLeaveMasterTable=()=>
{

       const [branchName,setBranchName] = useState([]);
       const paginateurl = ApiUrl+"/cmp-leave-master?page=";
       const urlData = ApiUrl+"/cmp-leave-master/";
       const {total,alldata,notice,next,prev,limit,edit,save,handleInput,deleteData} = useAjaxhooks(paginateurl+1,1);

       useEffect(()=>{
         getBranchMaster();
       },[]);

       const getBranchMaster= async()=>
       {
           const ajax = await axios({
             method:"GET",
             url:ApiUrl+"/softlabs-branch-master",
           });

           setBranchName(ajax.data.data);
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
                                                <th scope="col">Branch Name</th>
                                                <th scope="col">Annual leave date</th>
                                                <th scope="col">Leave on account of</th>
                                                <th scope="col">Leave cancelled</th>
                                                <th scope="col">Reason for cancellation</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                           alldata.map((final_data,index)=>(
                                             <tr key={final_data.id}>
                                             <td>{index+1}</td>
                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.year} name="year" style={{width:'fit-content'}} disabled="disabled" onChange={(event)=>handleInput(event,index)} />
                                             </td>

                                             <td align="center">
                                               <select className="form-control" style={{width:'fit-content'}} value={final_data.branch_id} name="branch_id" disabled="disabled" onChange={(event)=>handleInput(event,index)}>
                                                {
                                                    branchName.map((data,index)=>(
                                                      <option key={data.id} value={data.id}>{data.branch_name}</option>
                                                    ))
                                                }
                                               </select>
                                             </td>

                                             <td align="center">
                                               <input type="date" className="form-control" value={final_data.annual_leave_date} name="annual_leave_date" style={{width:'fit-content'}} disabled="disabled" onChange={(event)=>handleInput(event,index)} />
                                             </td>

                                             <td align="center">
                                               <input type="number" className="form-control" value={final_data.leave_on_account_of} name="leave_on_account_of" style={{width:'fit-content'}} disabled="disabled" onChange={(event)=>handleInput(event,index)} />
                                             </td>

                                             <td align="center">
                                               <input type="number" className="form-control" value={final_data.leave_cancelled} name="leave_cancelled" style={{width:'fit-content'}} disabled="disabled" onChange={(event)=>handleInput(event,index)} />
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.reason_for_cancellation} name="reason_for_cancellation" style={{width:'fit-content'}} disabled="disabled" onChange={(event)=>handleInput(event,index)} />
                                             </td>

                                             <EditDeleteSave edit={edit} deleteData={deleteData} save={save} urlData={urlData} index={index} final={final_data}/>

                                             </tr>
                                           ))
                                        }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="alert alert-danger rounded-0 p-0 mt-1 notice d-none">
                                <h6 className="text-center mt-1">{notice}</h6>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );

}

export default ShowCmpAnnualLeaveMasterTable;
