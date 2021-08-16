import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const ShowBranchOfficeMasterTable=()=>
{

  const paginateurl = ApiUrl+"/branch-office-master?page=";
  const urlData = ApiUrl+"/branch-office-master/";
  const {total,alldata,notice,next,prev,limit,edit,save,handleInput,deleteData} = useAjaxhooks(paginateurl+1,1);

  let [branchMaster,setBranchMaster] = useState([]);
  let [officeMaster,setOfficeMaster] = useState([]);

  useEffect(()=>{
     getOfficeMaster();
     getBranchMaster();
  },[]);

  const getBranchMaster=()=>
  {
      let ajax = axios({
        method:"GET",
        url:ApiUrl+"/softlabs-branch-master"
      });

      ajax.then((response)=>{
        let data = response.data.data;
        setBranchMaster(data);
      });
  }

  const getOfficeMaster=()=>
  {
      let ajax = axios({
        method:"GET",
        url:ApiUrl+"/softlabs-office-master"
      });

      ajax.then((response)=>{
        let data = response.data.data;
        setOfficeMaster(data);
      });
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
                                    <table className="table table-hover thead-primary text-center tabled-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Branch name</th>
                                                <th scope="col">Office name</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Date of activation</th>
                                                <th scope="col">Date of de activation</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                          alldata.map((final_data,index)=>(
                                            <tr key={final_data.id}>
                                            <td>{index+1}</td>
                                            <td>
                                              <select className="form-control branch_name" value={final_data.branch_id} name="branch_id" onChange={(event)=>{handleInput(event,index)}} style={{width:"fit-content"}} disabled="disabled">
                                                {
                                                   branchMaster.map((branchdata,index)=>(
                                                     <option key={branchdata.id} value={branchdata.id}>{branchdata.branch_name}</option>
                                                   ))
                                                }
                                              </select>
                                            </td>

                                            <td>
                                              <select className="form-control" value={final_data.office_id} name="office_id" onChange={(event)=>{handleInput(event,index)}} style={{width:"fit-content"}} disabled="disabled">

                                              {
                                                 officeMaster.map((officedata,index)=>(
                                                   <option key={officedata.id} value={officedata.id}>{officedata.office_name}</option>
                                                 ))
                                              }

                                              </select>
                                            </td>

                                            <td>
                                              <select className="form-control" value={final_data.status} name="status" onChange={(event)=>{handleInput(event,index)}} style={{width:'fit-content'}} disabled="disabled">
                                                <option>Active</option>
                                                <option>De Active</option>
                                              </select>
                                            </td>

                                            <td>
                                              <input type="date" className="form-control rounded-0" value={final_data.date_of_activation} name="date_of_activation" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'130px'}} />
                                            </td>

                                            <td>
                                              <input type="date" className="form-control rounded-0" value={final_data.date_of_deactivation} name="date_of_deactivation" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'130px'}} />
                                            </td>

                                            <EditDeleteSave edit={edit} deleteData={deleteData} save={save} urlData={urlData} index={index} final={final_data}/>

                                            </tr>
                                          ))
                                        }
                                        </tbody>
                                    </table>
                                </div>

                                <div className="alert alert-danger rounded-0 p-0 notice d-none text-center">
                                     {notice}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default ShowBranchOfficeMasterTable;
