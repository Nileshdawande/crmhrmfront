import React from 'react';
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const  LeadCategoryContent=()=> {


    const urlData = ApiUrl+"/category";
    const {addData,notice} = useAajaxhooks();

        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-1"></div>

                    <div className="col-md-10">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Category master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                    <div className="form-group">
                                        <label htmlFor="exampleEmail">Category</label>
                                        <input type="text" name="category" className="form-control" id="exampleEmail" placeholder="Website" />
                                    </div>

                                    <div className="form-group">
                                      <button className="btn btn-danger rounded-0 create_btn">Create category</button>
                                    </div>

                                    <div className="alert alert-danger rounded-0 text-center notice d-none">
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


export default LeadCategoryContent;
