import React from 'react';
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const Dipartmentmaster =()=> {

  const urlData = ApiUrl+"/dipartment";
  const {addData,notice} = useAajaxhooks();


        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-1"></div>

                    <div className="col-md-10">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Add Department</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                    <div className="form-group">
                                        <label htmlFor="exampleEmail">Department name</label>
                                        <input type="text" name="dipartment_name" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="examplePassword">Short name</label>
                                        <input type="text" className="form-control"  name="short_name"  />
                                    </div>

                                    <div className="form-group">
                                       <button className="btn btn-danger rounded-0 create_btn">Submit</button>
                                    </div>

                                    <div className="alert alert-danger rounded-0 font-weight-bold text-center d-none notice">
                                      {notice}
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


export default Dipartmentmaster;
