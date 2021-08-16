import React from 'react';
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const AddInterviewTypes =()=>
{

    const urlData = ApiUrl+"/interview-type";

    const {addData,notice} = useAajaxhooks();

        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Add Interview type</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form className="w-50" onSubmit={(event)=>{addData(event,urlData)}}>
                                    <div className="form-group">
                                        <label>Interview Type name</label>
                                        <input type="text" className="form-control"  name="interview_type_name" placeholder="Interview type name" required="required" />
                                    </div>
                                    <div className="form-group">
                                      <button className="btn btn-primary rounded-0 create_btn" type="submit">Create interview type</button>
                                    </div>
                                </form>
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

export default AddInterviewTypes;
