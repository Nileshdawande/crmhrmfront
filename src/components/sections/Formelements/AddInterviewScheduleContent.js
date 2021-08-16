import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const AddInterviewScheduleContent=()=>
{

       const urlData = ApiUrl+"/interview-schedule";
       const {addData,notice} = useAajaxhooks();

       let[getRecruitmentData,setRecruitementData] = useState([]);

       useEffect(()=>{
          getRecruitment()
       },[]);

       const getRecruitment=()=>
       {
          let ajax = axios({
            method:"GET",
            url:ApiUrl+"/recruitment_request",
          });

          ajax.then((response)=>{
             let data = response.data.data;
             setRecruitementData(data);
          });
       }



        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Add interview schedule</h6>
                            </div>
                            <div className="ms-panel-body">
                            <div className="w-75">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                    <div className="form-group">
                                        <label>Interview schedule number</label>
                                        <input type="number" className="form-control" placeholder="Interview schedule number" name="interview_schedule_number" required="required" />
                                    </div>

                                    <div className="form-group">
                                        <label>Interview schedule date</label>
                                        <input type="date" className="form-control" name="interview_schedule_date" required="required" />
                                    </div>

                                    <div className="form-group">
                                        <label>Interview schedule venue</label>
                                        <textarea name="interview_schedule_venue" className="form-control" required="required"></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleSelect">Recruitment name</label>
                                        <select className="form-control" name="recruitment_req_id">
                                            {
                                               getRecruitmentData.map((final_data)=>(
                                                  <option key={final_data.id} value={final_data.id}>{final_data.recruitment_name}</option>
                                               ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary rounded-0 create_btn">Create interview schedule</button>
                                    </div>
                                </form>
                            </div>
                            <div className="alert alert-danger rounded-0 p-0 d-none notice text-center">
                              {notice}
                            </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );

}

export default AddInterviewScheduleContent;
