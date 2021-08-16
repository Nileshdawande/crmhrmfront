import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const OfferDetailsContent=()=>
{
      const urlData = ApiUrl+"/offer-details";
      const {addData,notice} = useAajaxhooks();

       const [candidate,setCandidate] = useState([]);
       const [interviewDetails,setInterviewDetails] = useState([]);

       useEffect(()=>{
         getCandidate();
         getInterviewDetails();
       },[]);



       const getCandidate=()=>
       {
           const ajax = axios({
             method:"GET",
             url:ApiUrl+"/candidate-master",
           });

           ajax.then((response)=>{
             let data = response.data.data;
             setCandidate(data);

           });
       }

       const getInterviewDetails=()=>
       {
           const ajax = axios({
             method:"GET",
             url:ApiUrl+"/interview-details",
           });

           ajax.then((response)=>{
             let data = response.data.data;
             console.log(data);
             setInterviewDetails(data);
           });
       }



        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create offer details</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                <div className="row">

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Candidate name</label>
                                      <select className="form-control" name="candidate_id" required="required">
                                      {
                                         candidate.map((final_data)=>(
                                           <option key={final_data.id} value={final_data.id}>{final_data.candidate_firstname}</option>
                                         ))
                                      }
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Interview details</label>
                                      <select className="form-control" name="interview_details_id" required="required">
                                      {
                                        interviewDetails.map((final_data)=>(
                                          <option key={final_data.id} value={final_data.id}>{final_data.interview_details_number}</option>
                                        ))
                                      }
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Offer date</label>
                                      <input type="date" className="form-control" name="offer_date" required="required" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Gross salary offered</label>
                                      <input type="text" className="form-control" name="gross_salary_offered" required="required" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Offer accepted</label>
                                      <select className="form-control" name="offer_accepted">
                                      <option>Yes</option>
                                      <option>No</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Liasing employee id</label>
                                      <select className="form-control" name="liasing_employee_id">
                                      <option>1</option>
                                      <option>2</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Create offer details</button>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="alert alert-danger rounded-0 p-0 mt-2 d-none notice">
                                    <h6 className="text-center p-0">{notice}</h6>
                                    </div>
                                  </div>

                                </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default OfferDetailsContent;
