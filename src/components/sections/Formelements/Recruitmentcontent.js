import React from 'react';
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const Recruitmentcontent =()=>
{

const urlData = ApiUrl+"/recruitment";

const {addData,notice} = useAajaxhooks();

    return (
    <div className="ms-content-wrapper">
    <div className="row">
        <div className="col-md-12">
            <div className="ms-panel">
                <div className="ms-panel-header">
                    <h6>Recruitment type</h6>
                </div>
                <div className="ms-panel-body">
                    <form onSubmit={(event)=>{addData(event,urlData)}}>

                        <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8 bg-white p-4">
                        <label>Recruitment type</label>
                        <input type="text" name="recruitment_type_name" className="form-control" />

                        <button className="btn btn-danger rounded-0 my-2 create_btn">Submit</button>

                        <div className="alert alert-danger rounded-0 font-weight-bold text-center notice d-none">
                        {notice}
                        </div>
                        </div>
                        <div className="col-md-2"></div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>

    );
}


export default Recruitmentcontent;
