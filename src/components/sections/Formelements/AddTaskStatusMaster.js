import React,{useState,useEffect} from 'react';
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import CustomRequestLoader from "./CustomRequestLoader";
import ApiUrl from "../ServerApi/Api";

const AddTaskTypeMaster =()=>
{
      const urlData = ApiUrl+"/task-status-master";

      const {addData,notice} = useAajaxhooks();

      const [userId,setUserId] = useState([]);

      useEffect(()=>{
          getUserDetails();
      },[]);

      const getUserDetails=()=>
      {
          if(sessionStorage.getItem("user") !== null)
          {
             const json_str = atob(sessionStorage.getItem("user"));
             const json_obj = JSON.parse(json_str);
             const id = json_obj.id;
             setUserId(id);
          }
      }

        return (
            <div className="ms-content-wrapper">
              
                <div className="row">
                    <div className="col-md-1"></div>
                      <div className="col-md-10">
                          <div className="ms-panel">
                              <div className="ms-panel-header">
                                  <h6>Task status master</h6>
                              </div>
                              <div className="ms-panel-body">
                                  <form className="w-50" onSubmit={(event)=>{addData(event,urlData)}}>

                                    <div className="form-group mb-2">
                                    <label>Task status name</label>
                                    <input type="text" name="status" className="form-control" placeholder="Progress" required="required" />
                                    </div>

                                    <div className="form-group mb-2 d-none">
                                    <label>Created by</label>
                                    <input type="text" name="created_by" className="form-control" defaultValue={userId} />
                                    </div>

                                    <div className="form-group mb-2 d-none">
                                    <label>Updated by</label>
                                    <input type="text" name="updated_by" className="form-control" defaultValue={userId} />
                                    </div>

                                    <div className="form-group">
                                    <button className="btn btn-danger rounded-0 create_btn">Create task status</button>
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

export default AddTaskTypeMaster;
