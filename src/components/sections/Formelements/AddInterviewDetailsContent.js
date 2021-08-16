import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const AddInterviewDetailsContent=()=>
{

  const urlData = ApiUrl+"/interview-details";
  const {addData,notice} = useAajaxhooks();

     useEffect(()=>{
        getCandidateName();
        getInterviewSchedule();
     },[]);

     let [candidateName,setcandidateName] = useState([]);
     let [interviewSchedule,setInterviewSchedule] = useState([]);


     const getCandidateName=()=>
     {
        let ajax = axios({
          method:"GET",
          url:ApiUrl+"/candidate-master"
        });

        ajax.then((response)=>{
          let data = response.data.data;
          setcandidateName(data);
        });
     }

     const getInterviewSchedule=()=>
     {
        let ajax = axios({
          method:"GET",
          url:ApiUrl+"/interview-schedule"
        });

        ajax.then((response)=>{
          let data = response.data.data;
          setInterviewSchedule(data);
        });
     }

        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Add interview details</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                   <div className="row">

                                      <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Interview details number</label>
                                            <input type="number" className="form-control"  name="interview_details_number" placeholder="interview details number" required="required" />
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Interview date</label>
                                            <input type="date" className="form-control" name="interview_date" required="required" />
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                            <label >Interview schedule number</label>
                                            <select className="form-control"  name="interview_schedule_id">
                                                {
                                                   interviewSchedule.map((final_data)=>(
                                                     <option key={final_data.id} value={final_data.id}>{final_data.interview_schedule_number}</option>
                                                   ))
                                                }
                                            </select>
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label >Candidate name</label>
                                          <select className="form-control"  name="candidate_id">
                                              {
                                                candidateName.map((final_data)=>(
                                                  <option key={final_data.id} value={final_data.id}>{final_data.candidate_firstname}</option>
                                                ))
                                              }
                                          </select>
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Interview points</label>
                                            <input type="number" className="form-control"  name="interview_points" placeholder="interview points" required="required" />
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label >Interview status</label>
                                          <select className="form-control"  name="interview_passed">
                                              <option>Yes</option>
                                              <option>No</option>
                                          </select>
                                        </div>
                                      </div>

                                      <div className="col-md-12">
                                        <div className="form-group">
                                          <label >Interview remark</label>
                                          <textarea name="interview_remarks" className="form-control" required="required"></textarea>
                                        </div>
                                      </div>

                                      <div className="col-md-12">
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary rounded-0 create_btn">Create interview details</button>
                                        </div>
                                      </div>

                                   </div>

                                </form>

                                <div className="alert alert-danger rounded-0 p-0 notice text-center d-none">
                                  {notice}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default AddInterviewDetailsContent;
