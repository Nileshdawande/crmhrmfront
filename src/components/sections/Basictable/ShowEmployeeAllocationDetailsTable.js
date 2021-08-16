import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const ShowEmployeeAllocationDetailsTable=()=>
{

       const [salaryHead,setSalaryHead] = useState([]);
       const paginateurl = ApiUrl+"/emp-allocation-details?page=";
       const urlData = ApiUrl+"/emp-allocation-details/";
       const {total,alldata,notice,next,prev,limit,edit,save,handleInput,deleteData} = useAjaxhooks(paginateurl+1,1);

       useEffect(()=>{
         getSalaryHead();
       },[]);


       const getSalaryHead=async()=>
       {
           let ajax = await axios({
             method:"GET",
             url:ApiUrl+"/salary-head"
           });

           let data = ajax.data.data;
           setSalaryHead(data);
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
                                                <th scope="col">Salary head name</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                           alldata.map((final_data,index)=>(
                                             <tr key={final_data.id}>
                                             <td>{index+1}</td>
                                             <td align="center">
                                               <select className="form-control" disabled="disabled" value={final_data.salary_head_id} name="salary_head_id" onChange={(event)=>{handleInput(event,index)}}>
                                               {
                                                  salaryHead.map((finalData,index)=>(
                                                    <option key={finalData.id} value={finalData.id}>{finalData.salary_head_name}</option>
                                                  ))
                                               }
                                               </select>
                                             </td>

                                             <td align="center">
                                               <input type="text" className="form-control" value={final_data.amount} name="amount" style={{width:'fit-content'}} disabled="disabled"  onChange={(event)=>{handleInput(event,index)}} />
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

export default ShowEmployeeAllocationDetailsTable;
