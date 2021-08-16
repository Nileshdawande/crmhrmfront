import React from 'react';
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const SoftlabsOfficeMasterTable=()=>
{

  const paginateurl = ApiUrl+"/softlabs-office-master?page=";
  const urlData = ApiUrl+"/softlabs-office-master/";
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
                                                <th scope="col">Office code</th>
                                                <th scope="col">Office name</th>
                                                <th scope="col">Address-1</th>
                                                <th scope="col">Address-2</th>
                                                <th scope="col">Address-3</th>
                                                <th scope="col">Pincode</th>
                                                <th scope="col">City</th>
                                                <th scope="col">State</th>
                                                <th scope="col">Country</th>
                                                <th scope="col">Start date</th>
                                                <th scope="col">End date</th>
                                                <th scope="col">Office area</th>
                                                <th scope="col">Office con 1</th>
                                                <th scope="col">Office con 2</th>
                                                <th scope="col">Office con person</th>
                                                <th scope="col">Office person phone</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                          alldata.map((final_data,index)=>(
                                            <tr key={final_data.id}>
                                            <td>{index+1}</td>
                                            <td>
                                              <input type="text" className="form-control" value={final_data.office_code} name="office_code" onChange={(event)=>{handleInput(event,index)}} style={{width:"100px"}} disabled="disabled" />
                                            </td>

                                            <td>
                                                <input type="text" className="form-control" value={final_data.office_name} name="office_name" onChange={(event)=>{handleInput(event,index)}} style={{width:"100px"}} disabled="disabled"  />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.office_address_one} name="office_address_one" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.office_address_two} name="office_address_two" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.office_address_three} name="office_address_three" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="number" className="form-control rounded-0" value={final_data.office_pincode} name="office_pincode" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.office_city}  name="office_city" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.office_state} name="office_state" onChange={(event)=>{handleInput(event,index)}}  disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.office_country} name="office_country" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="date" className="form-control rounded-0" value={final_data.office_start_date} name="office_start_date" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'140px'}} />
                                            </td>

                                            <td>
                                              <input type="date" className="form-control rounded-0" value={final_data.office_end_date} name="office_end_date" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'140px'}} />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.office_area} name="office_area" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="number" className="form-control rounded-0" value={final_data.office_contact_one} name="office_contact_one" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="number" className="form-control rounded-0" value={final_data.office_contact_two} name="office_contact_two" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.office_contact_person} name="office_contact_person" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>
                                              <input type="number" className="form-control rounded-0" value={final_data.office_con_per_phoneno} name="office_con_per_phoneno" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}} />
                                            </td>

                                            <td>

                                              <select className="form-control rounded-0" value={final_data.office_status} name="office_status" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'100px'}}>
                                                <option>Active</option>
                                                <option>Deactive</option>
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

export default SoftlabsOfficeMasterTable;
