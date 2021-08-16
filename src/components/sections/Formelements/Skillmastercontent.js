import React from 'react';
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const Skillmastercontent =()=>
{
    const urlData = ApiUrl+"/skill-masters";
    const {addData,notice} = useAajaxhooks();


        return (
            <div className="ms-content-wrapper">

                <form onSubmit={(event)=>{addData(event,urlData)}}>
                    <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 bg-white p-4">
                    <label>Skill name</label>
                    <input type="text" name="skill_name" className="form-control" />

                    <button className="btn btn-danger rounded-0 my-2 create_btn">Submit</button>

                    <div className="alert alert-danger rounded-0 font-weight-bold text-center notice d-none">
                      {notice}
                    </div>
                    </div>

                    <div className="col-md-2"></div>
                    </div>

                </form>

            </div>

        );
    }

export default Skillmastercontent;
