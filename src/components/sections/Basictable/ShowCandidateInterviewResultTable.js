import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const ShowCandidateInterviewResultTable=()=>
{

  const paginateurl = ApiUrl+"/candidate-interview-result?page=";
  const urlData = ApiUrl+"/candidate-interview-result/";
  const {total,alldata,notice,next,prev,limit,edit,save,handleInput,deleteData} = useAjaxhooks(paginateurl+1,1);

  let [parameter,setParameter] = useState([]);

  useEffect(()=>{
     getParameterMaster();
  },[]);


  const getParameterMaster= async()=>
  {
      const ajax = await axios({
        method:"GET",
        url:ApiUrl+"/parameter"
      });

      setParameter(ajax.data.data);
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
                                    <table className="table table-hover thead-primary text-center tabled-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Parameter points</th>
                                                <th scope="col">Parameter name</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                          alldata.map((final_data,index)=>(
                                            <tr key={final_data.id}>
                                            <td>{index+1}</td>
                                            <td>
                                              <input type="text" value={final_data.parameter_points} name="parameter_points" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" className="form-control rounded-0" style={{width:'150px'}} />
                                            </td>

                                            <td>
                                                <select className="form-control" value={final_data.parameter_id} name="parameter_id" name="parameter_id" onChange={(event)=>{handleInput(event,index)}} disabled="disabled">
                                                 {
                                                    parameter.map((pdata)=>(
                                                      <option key={pdata.id} value={pdata.id}>{pdata.parameter_name}</option>
                                                    ))
                                                 }
                                                </select>
                                            </td>

                                            <EditDeleteSave edit={edit} deleteData={deleteData} save={save} urlData={urlData} index={index} final={final_data}/>

                                            </tr>
                                          ))
                                        }
                                        </tbody>
                                    </table>
                                    <div className="alert alert-danger rounded-0 p-0 notice d-none text-center">
                                      {notice}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default ShowCandidateInterviewResultTable;
