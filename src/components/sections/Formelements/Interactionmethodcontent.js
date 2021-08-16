import React from 'react';
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const Interactionmethodcontent =()=>
 {
     const urlData = ApiUrl+"/interaction";
     const {addData,notice} = useAajaxhooks();

        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-1"></div>

                    <div className="col-md-10">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Interaction method</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>

                                    <div className="form-group">
                                        <label htmlFor="interaction">Interaction method</label>
                                        <input type="text" name="interaction_name" className="form-control" id="interaction" placeholder="call" />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-danger rounded-0 create_btn">Submit</button>
                                    </div>

                                    <div className="form-group">
                                       <div className="alert alert-danger rounded-0 font-weight-bold text-center notice d-none">
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

export default Interactionmethodcontent;
