import React,{useState,useEffect} from 'react';
import axios from "axios";
import $ from "jquery";
import ApiUrl from "../ServerApi/Api";

const CandidateInterviewScheduleContent=()=>
{
        let [msg,setMsg] = useState("");
        let [interviewType,setInterviewType] = useState([]);
        let [interviewDetails,setInterviewDetails] = useState([]);
        const [imageError,setImageError] = useState("");
        const [imageUrl,setimageUrl] = useState("");

        useEffect(()=>{
          getInterviewType();
          getInterviewDetails();
        },[]);

        const getInterviewType=()=>
        {
            let ajax = axios({
              method:"GET",
              url:ApiUrl+"/interview-type"
            });

            ajax.then((response)=>{
                let data = response.data.data;
                setInterviewType(data);

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

        const createCanInterviewSchedule=(event)=>
        {
           event.preventDefault();
           let frm = event.target;
           $(".create_btn").attr("disabled",true);
           $(".notice").removeClass("d-none");
           setMsg("Please wait....");

           let input = document.querySelector(".attachment");
           var formdata = new FormData(event.target);
           formdata.append("attachments",input.files[0]);

           let ajax = axios({
              method:"POST",
              headers: {
              'Content-Type': 'multipart/form-data',
              },
              url:ApiUrl+"/candidate-interview-schedule",
              data:formdata
           });

           ajax.then((response)=>{
             frm.reset();
             setMsg("Interview schedule created");
             removeMsg();
           });

           ajax.catch((error)=>{
              if(error)
              {
                setMsg("Something went wrong try again");
                removeMsg();
              }
           });

        }

      const handleAttachment=(event)=>
      {
         const input = event.target.files[0];
         if(input.type === "image/jpeg" || input.type === "image/png" || input.type === "image/jpg" || input.type === "image/gif")
         {
           setImageError("");
           const url = URL.createObjectURL(input);
           setimageUrl(url);
         }
         else
         {
            setImageError("Upload image file only");
            event.target.value = "";
         }
      }

      const deleteAttachment=()=>
      {
         const confirm = window.confirm("Do you want to delete ?");
         if(confirm)
         {
           setImageError("");
           setimageUrl("");
           $(".attachment").val("");
         }
      }

        const removeMsg=()=>
        {
           setTimeout(()=>{
             setMsg("");
             $(".create_btn").attr("disabled",false);
             $(".notice").addClass("d-none");
           },3000);
        }

        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Candidate interview schedule</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createCanInterviewSchedule} encType="multipart/form-data">
                                    <div className="row">

                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>Interview details number</label>
                                          <select className="form-control rounded-0" name="interview_details_id">
                                            {
                                               interviewDetails.map((interviewDetails_data)=>(
                                                 <option key={interviewDetails_data.id} value={interviewDetails_data.id}>{interviewDetails_data.interview_details_number}</option>
                                               ))
                                            }
                                          </select>
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>Interview type name</label>
                                          <select className="form-control rounded-0" name="interview_type_id">
                                          {
                                             interviewType.map((interviewType_data)=>(
                                               <option key={interviewType_data.id} value={interviewType_data.id}>{interviewType_data.interview_type_name}</option>
                                             ))
                                          }
                                          </select>
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>Interview schedule date</label>
                                          <input type="date" name="interview_schedule_date" className="form-control rounded-0" required="required"  />
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>Interview schedule time</label>
                                          <input type="time" name="interview_schedule_time" className="form-control rounded-0" required="required"  />
                                        </div>
                                      </div>


                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>Interview actual date</label>
                                          <input type="date" name="interview_actual_date" className="form-control rounded-0" required="required"  />
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>Interview actual time</label>
                                          <input type="time" name="interview_actual_time" className="form-control rounded-0" required="required"  />
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>Interview points</label>
                                          <input type="number" className="form-control rounded-0" name="interview_points" required="required" />
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>Remarks</label>
                                          <input type="text" name="remarks" className="form-control rounded-0" required="required" />
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>Employee interviewer id</label>
                                          <input type="number" name="employee_interviewer_id" className="form-control rounded-0" required="required"   />
                                        </div>
                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>Upload attachment</label>
                                          <div className="custom-file">
                                            <label className="custom-file-label" htmlFor="attachment">Attachment</label>
                                            <input type="file" className="custom-file-input rounded-0 attachment" name="attachments" id="attachment" accept="image/*" required="required" onChange={handleAttachment}  />
                                          </div>
                                        </div>
                                        {imageError !== "" &&
                                        <div className="d-flex align-items-center">
                                          <span className='material-icons mr-2 text-danger'>error</span>
                                          <span className="text-danger">{imageError}</span>
                                        </div>
                                      }

                                      {imageUrl !== "" &&
                                      <div className="border p-2">
                                        <img src={imageUrl} width="100%" alt="attachment"/>
                                        <button className="btn btn-danger rounded-0" type="button" onClick={deleteAttachment}>Delete image</button>
                                      </div>
                                     }

                                      </div>

                                      <div className="col-md-6">
                                        <div className="form-group">
                                          <label>Interview result</label>
                                          <input type="text" name="interview_result" className="form-control rounded-0" required="required" />
                                        </div>
                                      </div>

                                      <div className="col-md-12">
                                         <button className="btn btn-danger rounded-0">Create candidate interview</button>
                                      </div>

                                    </div>
                                </form>

                                <div className="alert alert-danger rounded-0 p-0 mt-2 notice d-none">
                                  <h6 className="text-center p-0 py-2">{msg}</h6>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default CandidateInterviewScheduleContent;
