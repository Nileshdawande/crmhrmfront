import React, { useState,useEffect } from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const Technology_with_skill_content =()=>
{

    const urlData = ApiUrl+"/technology-skill";

    const {addData,notice} = useAajaxhooks();

    let [getskill,setskill] = useState([]);
    let [technology,settechnology] = useState([]);

    useEffect(()=>{
        get_technology();
        get_skills();
    },[]);


    const get_skills=()=>
    {

        let ajax = axios({
            method:"GET",
            url:ApiUrl+"/skill-masters"
        });

        ajax.then(function(response){
            let data = response.data.data;
            setskill(data);
        });
    }


    const get_technology=()=>
    {

        let ajax = axios({
            method:"GET",
            url:ApiUrl+"/technology-master"
        });

        ajax.then(function(response){
            let data = response.data.data;
            settechnology(data);

        });
    }

      return (
            <div className="ms-content-wrapper">

                <form onSubmit={(event)=>{addData(event,urlData)}}>
                    <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 bg-white p-4">

                    <div className="form-group">
                     <label>Techonology</label>
                     <select className="form-control" name="technology_id">
                    {
                        technology.map((final)=>(
                            <option value={final.id} key={final.id}>{final.technology_name}</option>
                            ))
                    }

                     </select>
                    </div>

                    <div className="form-group">
                    <label>Skill name</label>
                    <select className="form-control" name="skills_id">
                    {
                        getskill.map((final)=>(
                            <option value={final.id} key={final.id}>{final.skill_name}</option>
                            ))
                    }
                    </select>
                    </div>

                    <button className="btn btn-danger rounded-0 my-2 create_btn">Submit</button>

                    <div className="alert alert-danger rounded-0 text-center d-none notice">
                      {notice}
                    </div>
                    </div>
                    <div className="col-md-2"></div>
                    </div>

                </form>

            </div>

        );
    }


export default Technology_with_skill_content;
