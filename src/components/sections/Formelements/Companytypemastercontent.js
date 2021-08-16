import React from 'react';
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const Companytypemastercontent =()=>
{
      const urlData = ApiUrl+"/cmptype";

      const {addData,notice} = useAajaxhooks();

        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-1"></div>
                      <div className="col-md-10">
                          <div className="ms-panel">
                              <div className="ms-panel-header">
                                  <h6>Company type master</h6>
                              </div>
                              <div className="ms-panel-body">
                                  <form className="w-50" onSubmit={(event)=>{addData(event,urlData)}}>
                                    <div className="form-group mb-2">
                                    <label>Company type name</label>
                                    <input type="text" name="company_type_name" className="form-control" placeholder="Bank" required="required" />
                                    </div>
                                    <div className="form-group">
                                    <button className="btn btn-dark rounded-0 create_btn">Create company type</button>
                                    </div>

                                  </form>
                                  <div className="alert alert-danger rounded-0 notice text-center d-none">
                                    {notice}
                                  </div>
                              </div>
                          </div>
                      </div>
                    <div className="col-md-1"></div>
                </div>
            </div>

        );

}

export default Companytypemastercontent;
