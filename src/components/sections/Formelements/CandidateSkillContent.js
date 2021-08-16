import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const CandidateSkillContent=()=> {

    const urlData = ApiUrl+"/candidate-skill";
    const {addData,notice} = useAajaxhooks();

      useEffect(()=>{
        getCandidateData();
        getCandidateSkill();
      },[]);

      let [getCandidate,setCandidate] = useState([]);
      let [getSkill,setSkill] = useState([]);

      const getCandidateData=()=>
      {
         let ajax = axios({
           method:"GET",
           url:ApiUrl+"/candidate-master",
         });

         ajax.then((response)=>{
           let data = response.data.data;
           setCandidate(data);

         });
      }

      const getCandidateSkill=()=>
      {
         let ajax = axios({
           method:"GET",
           url:ApiUrl+"/skill-masters",
         });

         ajax.then((response)=>{
           let data = response.data.data;
           setSkill(data);
         });
      }


        return (
            <div className="ms-content-wrapper">
                <div className="row">
                <div className="col-md-12">
                    <div className="ms-panel">
                        <div className="ms-panel-header">
                            <h6>Candidate skill </h6>
                        </div>
                        <div className="ms-panel-body">

                        <form onSubmit={(event)=>{addData(event,urlData)}}>

                          <div className="form-group">
                            <label>Candidate name</label>
                            <select name="candidate_id" className="form-control w-75" required="required">
                            {
                              getCandidate.map((final_data)=>(
                                <option key={final_data.id} value={final_data.id}>{final_data.candidate_firstname} {final_data.candidate_lastname}</option>
                              ))
                            }
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Candidate skill</label>
                            <select name="candidate_skill_id" className="form-control w-75" required="required">
                            {
                              getSkill.map((final_data)=>(
                                <option key={final_data.id} value={final_data.id}>{final_data.skill_name}</option>
                              ))
                            }
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Candidate level</label>
                            <input type="number" name="level" className="form-control rounded-0 w-75" required="required" />
                          </div>

                          <div className="form-group">
                            <button className="btn btn-danger rounded-0 create_btn">Submit</button>
                          </div>

                        </form>

                        <div className="alert alert-danger rounded-0 text-center d-none notice">
                          {notice}
                        </div>

                        </div>
                    </div>
                </div>
                </div>
            </div>

        );
}

export default CandidateSkillContent;
