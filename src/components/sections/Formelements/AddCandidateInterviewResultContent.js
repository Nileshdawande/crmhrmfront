import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const AddCandidateInterviewResultContent=()=>
{

    const urlData = ApiUrl+"/candidate-interview-result";
    const {addData,notice} = useAajaxhooks();

      useEffect(()=>{
        getParameter();
        getInterviewSchedule();
      },[]);

      let [parameter,setparameter] = useState([]);
      let [interviewData,setinterviewData] = useState([]);


      const getParameter=()=>
      {
         let ajax = axios({
           method:"GET",
           url:ApiUrl+"/parameter"
         });

         ajax.then((response)=>{
           let data = response.data.data;
           setparameter(data);
         });
      }

      const getInterviewSchedule=()=>
      {
         let ajax = axios({
           method:"GET",
           url:ApiUrl+"/candidate-interview-schedule"
         });

         ajax.then((response)=>{
           let data = response.data.data;
           setinterviewData(data);
         });
      }



        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Candidate interview result</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                  <div className="row">

                                      <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Parameter name</label>
                                            <select className="rounded-0 form-control" name="parameter_id">
                                            {
                                               parameter.map((parameterdata)=>(
                                                 <option key={parameterdata.id} value={parameterdata.id}>{parameterdata.parameter_name}</option>
                                               ))
                                            }
                                            </select>
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Candidate int schedule</label>
                                            <select className="rounded-0 form-control" name="can_int_sch_id">
                                            {
                                               interviewData.map((interview_schedule_data)=>(
                                                 <option key={interview_schedule_data.id} value={interview_schedule_data.id}>{interview_schedule_data.id}</option>
                                               ))
                                            }
                                            </select>
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Parameter points</label>
                                            <input type="number" className="rounded-0 form-control" name="parameter_points" required="required" />
                                        </div>
                                      </div>
                                  </div>

                                    <div className="form-group">
                                      <button type="submit" className="btn btn-danger rounded-0 create_btn">Create interview result</button>
                                    </div>

                                </form>

                                <div className="alert alert-danger rounded-0 p-0 notice d-none">
                                   <h6 className="p-0 py-2 text-center">{notice}</h6>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
}

export default AddCandidateInterviewResultContent;
