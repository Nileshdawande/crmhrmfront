import React from 'react';
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const ShowParametermasterTable=()=>
{

  const paginateurl = ApiUrl+"/parameter?page=";
  const urlData = ApiUrl+"/parameter/";
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
                                                <th scope="col">Parameter name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                          alldata.map((final_data,index)=>(
                                            <tr key={final_data.id}>
                                            <td>{index+1}</td>
                                            <td align="center">
                                              <input type="text" value={final_data.parameter_name} name="parameter_name" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" className=" form-control rounded-0" style={{width:'150px'}} />
                                            </td>

                                            <EditDeleteSave edit={edit} deleteData={deleteData} save={save} urlData={urlData} index={index} final={final_data}/>

                                            </tr>
                                          ))
                                        }
                                        </tbody>
                                    </table>
                                    <div className="alert alert-danger rounded-0 p-0 notice d-none">
                                    <h6 className="p-0 py-2 text-center">{notice}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default ShowParametermasterTable;
