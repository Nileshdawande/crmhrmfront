import React from 'react';
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const LeaveTypeMasterContent=()=>
{
    const urlData = ApiUrl+"/emp-leave-master";
    const {addData,notice} = useAajaxhooks();

        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create leave type master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                <div className="row">

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Leave type name</label>
                                   <input type="text" className="form-control" name="leave_type_name" required="required" />
                                  </div>
                                  </div>

                                  <div className="col-md-12">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">
                                    Create leave type
                                    </button>
                                  </div>

                                </div>

                                </form>

                                <div className="alert alert-danger rounded-0 p-0 mt-2 d-none notice">
                                <h6 className="p-0 m-0 mt-1 text-center">{notice}</h6>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default LeaveTypeMasterContent;
