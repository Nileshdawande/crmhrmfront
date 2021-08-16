import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const EmployeeSalaryContent=()=>
{

     const urlData = ApiUrl+"/emp-salary";
     const {addData,notice} = useAajaxhooks();

      useEffect(()=>{
        getEmployeeMaster();
      },[]);

      let [empMaster,setEmpMaster] = useState([]);

      const getEmployeeMaster= async()=>
      {
          const ajax = await axios({
            method:"GET",
            url:ApiUrl+"/emp-master"
          });

          let data = ajax.data.data;
          setEmpMaster(data);
      }


        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create employee salary master</h6>
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
                                      <label>Month of year</label>
                                      <select className="form-control" required="required" name="month_of_year">
                                        <option>2020</option>
                                        <option>2021</option>
                                        <option>2022</option>
                                        <option>2023</option>
                                        <option>2024</option>
                                        <option>2025</option>
                                      </select>
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Salary processing date</label>
                                      <input type="date" className="form-control" required="required" name="date_of_salary_processing" />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Expected working days</label>
                                      <input type="number" className="form-control" required="required" name="no_of_expected_wroking_days" />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>No of days worked</label>
                                      <input type="number" className="form-control" required="required" name="no_of_days_worked" />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Salary deduction amount</label>
                                      <input type="number" className="form-control" required="required" name="salary_deduction_amount" />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Salary deduction type</label>
                                      <input type="text" className="form-control" required="required" name="salary_deduction_type" />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Net Amount</label>
                                      <input type="number" className="form-control" required="required" name="net_amount" />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Salary transffered</label>
                                      <select className="form-control" name="salary_transferred" >
                                      <option>Select option</option>
                                      <option>Yes</option>
                                      <option>No</option>
                                      </select>
                                      </div>
                                    </div>

                                    <div className="col-md-12">
                                      <button type="submit" className="btn btn-danger rounded-0 create_btn">
                                        Create emp salary
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

export default EmployeeSalaryContent;
