import React from 'react';
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const SoftlabsBranchMasterContent=()=>
{

    const urlData = ApiUrl+"/softlabs-branch-master";
    const {addData,notice} = useAajaxhooks();

        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create branch master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                <div className="row">

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch code</label>
                                      <input type="text"  className="form-control" required="required" name="branch_code" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch name</label>
                                      <input type="text"  className="form-control" required="required" name="branch_name" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch pincode</label>
                                      <input type="number"  className="form-control" required="required" name="branch_pincode" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch city</label>
                                      <input type="text"  className="form-control" required="required" name="branch_city" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch state</label>
                                      <input type="text"  className="form-control" required="required" name="branch_state" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch country</label>
                                      <input type="text"  className="form-control" required="required" name="branch_country" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch start date</label>
                                      <input type="date"  className="form-control" required="required" name="branch_start_date" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Date of de commissioning</label>
                                      <input type="date"  className="form-control" required="required" name="date_of_decommissioning" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch status</label>
                                      <select className="form-control" name="branch_status">
                                      <option>Active</option>
                                      <option>Deactive</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Head office</label>
                                      <select className="form-control" name="branch_head_office">
                                      <option>Yes</option>
                                      <option>No</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Address-1</label>
                                      <textarea className="form-control" required="required" name="address_one"></textarea>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                       <label>Address-2</label>
                                       <textarea className="form-control" name="address_two"></textarea>
                                    </div>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="form-group">
                                       <label>Address-3</label>
                                       <textarea className="form-control" name="address_three"></textarea>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Create offer details</button>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="alert alert-danger rounded-0 p-0 mt-2 d-none notice">
                                    <h6 className="text-center p-0 mt-1">{notice}</h6>
                                    </div>
                                  </div>

                                </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default SoftlabsBranchMasterContent;
