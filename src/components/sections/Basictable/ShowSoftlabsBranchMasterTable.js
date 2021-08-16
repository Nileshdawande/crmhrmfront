import React from 'react';
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const ShowSoftlabsBranchMasterTable=()=>
{

  const paginateurl = ApiUrl+"/softlabs-branch-master?page=";
  const urlData = ApiUrl+"/softlabs-branch-master/";
  const {total,alldata,notice,next,prev,limit,edit,save,handleInput,deleteData} = useAjaxhooks(paginateurl+1,1);

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
                                    <table className="table table-hover thead-primary text-center tabled-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Branch code</th>
                                                <th scope="col">Branch name</th>
                                                <th scope="col">Address-1</th>
                                                <th scope="col">Address-2</th>
                                                <th scope="col">Address-3</th>
                                                <th scope="col">Pincode</th>
                                                <th scope="col">City</th>
                                                <th scope="col">State</th>
                                                <th scope="col">Country</th>
                                                <th scope="col">Start date</th>
                                                <th scope="col">Decommissioning</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Head office</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                          alldata.map((final_data,index)=>(
                                            <tr key={final_data.id}>
                                            <td>{index+1}</td>
                                            <td>
                                              <input type="text" className="form-control" value={final_data.branch_code} name="branch_code" onChange={(event)=>{handleInput(event,index)}} style={{width:"100px"}} disabled="disabled" />
                                            </td>

                                            <td>
                                                <input type="text" className="form-control" value={final_data.branch_name} name="branch_name" onChange={(event)=>{handleInput(event,index)}} style={{width:"100px"}} disabled="disabled"  />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.address_one} name="address_one" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.address_two} name="address_two" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.address_three} name="address_three" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="number" className="form-control rounded-0" value={final_data.branch_pincode} name="branch_pincode" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.branch_city} name="branch_city" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.branch_state} name="branch_state" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.branch_country} name="branch_country" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="date" className="form-control rounded-0" value={final_data.branch_start_date} name="branch_start_date" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'140px'}} />
                                            </td>

                                            <td>
                                              <input type="date" className="form-control rounded-0" value={final_data.date_of_decommissioning} name="date_of_decommissioning" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'140px'}} />
                                            </td>

                                            <td>
                                              <select className="form-control rounded-0" value={final_data.branch_status} name="branch_status" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}}>
                                                <option>Active</option>
                                                <option>Deactive</option>
                                              </select>
                                          </td>

                                            <td>
                                              <select className="form-control rounded-0" value={final_data.branch_head_office} name="branch_head_office" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}}>
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

export default ShowSoftlabsBranchMasterTable;
