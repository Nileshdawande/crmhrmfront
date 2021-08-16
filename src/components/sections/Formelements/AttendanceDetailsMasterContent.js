import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const AttendanceDetailsMasterContent=()=>
{
    const urlData = ApiUrl+"/attendance_details";
    const {addData,notice} = useAajaxhooks();

      useEffect(()=>{
        getEmployeeMaster();
        getOfficeMaster();
      },[]);

      let [empMaster,setEmpMaster] = useState([]);
      let [officeMaster,setOfficeMaster] = useState([]);


      const getEmployeeMaster= async()=>
      {
          const ajax = await axios({
            method:"GET",
            url:ApiUrl+"/emp-master"
          });

          let data = ajax.data.data;
          setEmpMaster(data);
      }

      const getOfficeMaster= async()=>
      {
          const ajax = await axios({
            method:"GET",
            url:ApiUrl+"/softlabs-office-master"
          });

          let data = ajax.data.data;
          setOfficeMaster(data);
      }



        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create attendance master </h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                  <div className="row">

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Employee name</label>
                                      <select className="form-control" name="employee_id">
                                      {
                                          empMaster.map((final_data,index)=>(
                                            <option value={final_data.id} key={final_data.id}>{final_data.employee_firstname}</option>
                                          ))
                                      }
                                      </select>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Office name</label>
                                      <select className="form-control" name="office_id">
                                      {
                                          officeMaster.map((final_data,index)=>(
                                            <option value={final_data.id} key={final_data.id}>{final_data.office_name}</option>
                                          ))
                                      }
                                      </select>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Working date</label>
                                      <input type="date" className="form-control" required="required" name="work_date" />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Working</label>
                                      <select className="form-control" name="working">
                                      <option value="halfday">Half day</option>
                                      <option value="fullday">Full day</option>
                                      </select>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <button type="submit" className="btn btn-danger rounded-0 create_btn">
                                        Create Attendance
                                      </button>
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

export default AttendanceDetailsMasterContent;
