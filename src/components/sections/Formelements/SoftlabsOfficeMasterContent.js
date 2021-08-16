import React from 'react';
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const SoftlabsOfficeMasterContent=()=>
{

  const urlData = ApiUrl+"/softlabs-office-master";
  const {addData,notice} = useAajaxhooks();

        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create office master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                <div className="row">

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office code</label>
                                      <input type="text"  className="form-control" required="required" name="office_code" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office name</label>
                                      <input type="text"  className="form-control" required="required" name="office_name" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office city</label>
                                      <input type="text"  className="form-control" required="required" name="office_city" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office state</label>
                                      <input type="text"  className="form-control" required="required" name="office_state" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office country</label>
                                      <input type="text"  className="form-control" required="required" name="office_country" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office pincode</label>
                                      <input type="number"  className="form-control" required="required" name="office_pincode" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office start date</label>
                                      <input type="date"  className="form-control" required="required" name="office_start_date" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office end date</label>
                                      <input type="date"  className="form-control" required="required" name="office_end_date" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office area</label>
                                      <input type="text"  className="form-control" required="required" name="office_area" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office contact one</label>
                                      <input type="number"  className="form-control" required="required" name="office_contact_one" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office contact two</label>
                                      <input type="number"  className="form-control" required="required" name="office_contact_two" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office contact person name</label>
                                      <input type="text"  className="form-control" required="required" name="office_contact_person" />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office contact person phone</label>
                                      <input type="text"  className="form-control" required="required" name="office_con_per_phoneno" />
                                    </div>
                                  </div>




                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office status</label>
                                      <select className="form-control" name="office_status">
                                      <option>Active</option>
                                      <option>Deactive</option>
                                      </select>
                                    </div>
                                  </div>


                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Address-1</label>
                                      <textarea className="form-control" required="required" name="office_address_one"></textarea>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                       <label>Address-2</label>
                                       <textarea className="form-control" name="office_address_two"></textarea>
                                    </div>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="form-group">
                                       <label>Address-3</label>
                                       <textarea className="form-control" name="office_address_three"></textarea>
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

export default SoftlabsOfficeMasterContent;
