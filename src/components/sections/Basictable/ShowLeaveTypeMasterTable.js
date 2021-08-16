import React from 'react';
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const ShowLeaveTypeMasterTable=()=>
{

       const paginateurl = ApiUrl+"/emp-leave-master?page=";
       const urlData = ApiUrl+"/emp-leave-master/";
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
                                    <table className="table table-hover thead-primary text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Leave name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                           alldata.map((final_data,index)=>(
                                             <tr key={final_data.id}>
                                             <td>{index+1}</td>
                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.leave_type_name} name="leave_type_name" onChange={(event)=>{handleInput(event,index)}} style={{width:'fit-content'}} disabled="disabled" />
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

export default ShowLeaveTypeMasterTable;
