import React from 'react';
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const Leadstatuscontent=()=>
{

  const urlData = ApiUrl+"/lead_status";
  const {addData,notice} = useAajaxhooks();


       return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-1"></div>

                    <div className="col-md-10">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>LEAD STATUS</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                    <div className="form-group">
                                        <label htmlFor="status">Status</label>
                                        <input type="text" name="status" className="form-control" id="status" placeholder="Status" />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-danger rounded-0 create_btn" type="submit">Add status</button>
                                    </div>

                                    <div className="form-group">
                                        <div className="alert alert-danger rounded-0 text-center notice d-none">
                                          {notice}
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-1"></div>
                </div>
            </div>

        );
    }


export default Leadstatuscontent;
