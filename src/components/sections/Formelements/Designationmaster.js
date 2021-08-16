import React from 'react';
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const Designationmaster = () => {

    const urlData = ApiUrl+"/designation";
    const {addData,notice} = useAajaxhooks();

        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-1"></div>

                    <div className="col-md-10">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>DESIGNATION MASTER</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                    <div className="form-group">
                                        <label>Designation name</label>
                                        <input type="text" name="designation_name" className="form-control"/>
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-danger rounded-0 create_btn">Submit</button>
                                    </div>

                                    <div className="alert alert-danger font-weight-bold rounded-0 text-center my-2 notice d-none">
                                    {notice}
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-1"></div>
                </div>
            </div>

        )
    }

export default Designationmaster;
