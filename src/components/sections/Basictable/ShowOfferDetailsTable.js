import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAjaxhooks from "../Customhooks/useAajaxhooks";
import EditDeleteSave from "./EditDeleteSave";
import PaginationUi from "./PaginationUi";
import ApiUrl from "../ServerApi/Api";

const ShowOfferDetailsTable=()=>
{

  const paginateurl = ApiUrl+"/offer-details?page=";
  const urlData = ApiUrl+"/offer-details/";
  const {total,alldata,notice,next,prev,limit,edit,save,handleInput,deleteData} = useAjaxhooks(paginateurl+1,1);

  const [candididateName,setCandidateName] = useState([]);
  const [interviewDetails,setInterviewDetails] = useState([]);

  useEffect(()=>{
     getCandidateName();
     getInterviewDetails();
  },[]);



  const getCandidateName=()=>
  {
     let ajax = axios({
       method:"GET",
       url:ApiUrl+"/candidate-master"
     });

     ajax.then((response)=>{
       let data  = response.data.data;
       setCandidateName(data);
     });
  }

  const getInterviewDetails=()=>
  {
     let ajax = axios({
       method:"GET",
       url:ApiUrl+"/interview-details"
     });

     ajax.then((response)=>{
       let data = response.data.data;
       setInterviewDetails(data);
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
                                    <table className="table table-hover thead-primary text-center tabled-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Interview details</th>
                                                <th scope="col">Candidate name</th>
                                                <th scope="col">Offer date</th>
                                                <th scope="col">Gross salary</th>
                                                <th scope="col">Offer accepted</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                          alldata.map((final_data,index)=>(
                                            <tr key={final_data.id}>
                                            <td>{index+1}</td>
                                            <td>
                                              <select className="rounded-0 form-control interview_details" value={final_data.interview_details_id} name="interview_details_id" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'fit-content'}}>
                                                {
                                                  interviewDetails.map((intdata)=>(
                                                    <option value={intdata.id} key={intdata.id}>{intdata.interview_details_number}</option>
                                                  ))
                                                }
                                              </select>
                                            </td>

                                            <td>
                                              <select className="rounded-0 form-control candidate_name" name="interview_details_id" value={final_data.candidate_id} name="candidate_id" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'fit-content'}}>
                                                {
                                                  candididateName.map((candata)=>(
                                                    <option value={candata.id} key={candata.id}>{candata.candidate_firstname}</option>
                                                  ))
                                                }
                                              </select>
                                            </td>

                                            <td>
                                              <input type="date" className="form-control rounded-0" value={final_data.offer_date} name="offer_date" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'fit-content'}} />
                                            </td>

                                            <td>
                                              <input type="text" className="form-control rounded-0" value={final_data.gross_salary_offered} name="gross_salary_offered" onChange={(event)=>{handleInput(event,index)}}  disabled="disabled" style={{width:'fit-content'}} />
                                            </td>

                                            <td>
                                              <select className="form-control rounded-0" value={final_data.offer_accepted} name="offer_accepted" onChange={(event)=>{handleInput(event,index)}} disabled="disabled" style={{width:'fit-content'}}>
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

export default ShowOfferDetailsTable;
