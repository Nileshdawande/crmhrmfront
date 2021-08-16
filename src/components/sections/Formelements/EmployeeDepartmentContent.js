import React from 'react';
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const EmployeeDepartmentContent=()=>
{

    const urlData = ApiUrl+"/employee-department";
    const {addData,notice} = useAajaxhooks();

        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create employee department master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                <div className="row">

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Department name</label>
                                   <input type="text" className="form-control" name="department_name" required="required" />
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Status</label>
                                   <select className="form-control" name="status">
                                   <option defaultValue="active">Active</option>
                                   <option defaultValue="deactive">De Active</option>
                                   </select>
                                  </div>
                                  </div>

                                  <div className="col-md-12">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Create Emp Department</button>
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

export default EmployeeDepartmentContent;
