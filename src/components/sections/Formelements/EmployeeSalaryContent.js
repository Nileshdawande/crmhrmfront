import React,{useState,useEffect} from 'react';
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";
import ApiUrl from "../ServerApi/Api";

const EmployeeSalaryContent=()=>
{

     const urlData = ApiUrl+"/emp-salary";
     const [loader,setLoader] = useState(false);
     const [msg,setMsg] = useState("");
     let [empMaster,setEmpMaster] = useState([]);
     const [inputData,setInputData] = useState({
       employee_id:"",
       month_of_year:"Jan",
       date_of_salary_processing:"",
       no_of_expected_wroking_days:"",
       no_of_days_worked:"",
       salary_deduction_amount:"",
       salary_deduction_type:"",
       net_amount:"",
       salary_transferred:"Yes",
       cal_salary:0
     });

      useEffect(()=>{
        const ajax1 = axios({
          method:"GET",
          url:ApiUrl+"/emp-allocation"
        });

        const ajax2 = axios({
          method:"GET",
          url:ApiUrl+"/emp-master"
        });

        Promise.all([ajax1,ajax2]).then((response)=>{
          const emp_allocation_res = response[0].data.data;
          const emp_master_res = response[1].data.data;
          let i;
          let j;
          const newData = [];
          for(j=0;j<emp_allocation_res.length;j++)
          {
            for(i=0;i<emp_master_res.length;i++)
            {
              if(emp_allocation_res[j].employee_id === emp_master_res[i].id)
              {
                 const f_name = emp_master_res[i].employee_firstname;
                 const emp_id = emp_master_res[i].id;
                 newData.push({...emp_allocation_res[j],firstname:f_name,employee_id:emp_id});
              }
            }
          }

          setEmpMaster(newData);
          const netSalary = newData[0].net_salary;
          const em_id = newData[0].employee_id;
          setInputData({...inputData,cal_salary:netSalary,net_amount:netSalary,employee_id:em_id});

        });

      },[]);

      const createEmployeeSalary=(event)=>
      {
          event.preventDefault();
          setLoader(true);
          const ajax = axios({
            method:"POST",
            url:urlData,
            data:{
              ...inputData
            }
          });

          ajax.then((response)=>{
            setLoader(false);
            $(".notice").removeClass("d-none");
            setMsg("Employee salary created !");
            removeMsg();
            setInputData({
              ...inputData,
              date_of_salary_processing:"",
              no_of_expected_wroking_days:"",
              no_of_days_worked:"",
              salary_deduction_amount:"",
              salary_deduction_type:""
            });
          });

          ajax.catch((error)=>{
            if(error)
            {
              $(".notice").removeClass("d-none");
              setMsg("Someting went wrong try again !");
              setLoader(false);
              removeMsg();
            }
          });
      }

      const handleInput=(event)=>
      {
         const name = event.target.name;
         const val  = event.target.value;

         if(name !== "employee_id" && name !== "salary_deduction_amount" && name !== "no_of_days_worked")
         {
           setInputData({...inputData,[name]:val});
         }

         else if(name === "employee_id")
         {
            const newData = empMaster.filter((item,index) => {
              return item.employee_id === Number(val);
            });

            const netSalary = newData[0].net_salary;
            setInputData({...inputData,[name]:val,net_amount:netSalary,cal_salary:netSalary});
         }

         else if(name === "salary_deduction_amount")
         {
            const net_a = inputData.cal_salary-val
            setInputData({...inputData,[name]:val,net_amount:net_a});
         }

         else if(name === "no_of_days_worked")
         {
            if(inputData.no_of_expected_wroking_days !== "")
            {
                const ex_w_d = inputData.no_of_expected_wroking_days;
                const big_num = Math.max(ex_w_d,val);
                if(big_num === Number(ex_w_d))
                {
                   const one_day_sal = Number(inputData.cal_salary)/ex_w_d;
                   const total_not_work_day = ex_w_d-val;
                   const total_deduct = total_not_work_day*one_day_sal;
                   let deduct_sal  = Number(inputData.cal_salary)-total_deduct;
                   deduct_sal = deduct_sal.toFixed(2);
                   setInputData({...inputData,[name]:val,net_amount:deduct_sal,salary_deduction_amount:total_deduct});
                }

                else
                {
                    const one_day_sal = Number(inputData.cal_salary)/ex_w_d;
                    const total_extra_work_day = val-ex_w_d;
                    const total_extra  = total_extra_work_day*one_day_sal;
                    let total_salary = Number(inputData.cal_salary)+total_extra;
                    total_salary = total_salary.toFixed(2);
                    setInputData({...inputData,[name]:val,net_amount:total_salary,salary_deduction_amount:0});
                }
            }
            else
            {
               window.alert("Please write expected working days");
            }
         }


      }

      const removeMsg=()=>
      {
         setTimeout(()=>{
           $(".notice").addClass("d-none");
           setMsg("");
         },3000);
      }


        return (
            <div className="ms-content-wrapper">
                <div className="row">
                  {
                    loader&&<CustomRequestLoader/>
                  }
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create employee salary master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createEmployeeSalary}>
                                  <div className="row">

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Employee name</label>
                                        <select className="form-control" name="employee_id" value={inputData.employee_id} onChange={handleInput}>
                                        {
                                            empMaster.map((final_data,index)=>(
                                              <option value={final_data.employee_id} key={final_data.employee_id}>{final_data.firstname}</option>
                                            ))
                                        }
                                        </select>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Month of year</label>
                                      <select className="form-control" required="required" name="month_of_year" value={inputData.month_of_year} onChange={handleInput}>
                                        <option>Jan</option>
                                        <option>Feb</option>
                                        <option>Mar</option>
                                        <option>Apr</option>
                                        <option>May</option>
                                        <option>Jun</option>
                                        <option>Jul</option>
                                        <option>Aug</option>
                                        <option>Sept</option>
                                        <option>Oct</option>
                                        <option>Nov</option>
                                        <option>Des</option>
                                      </select>
                                    </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Salary processing date</label>
                                      <input type="date" className="form-control" required="required" name="date_of_salary_processing" value={inputData.date_of_salary_processing} onChange={handleInput} />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Expected working days</label>
                                      <input type="number" className="form-control" required="required" name="no_of_expected_wroking_days" value={inputData.no_of_expected_wroking_days} onChange={handleInput} />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>No of days worked</label>
                                      <input type="number" className="form-control" required="required" name="no_of_days_worked" value={inputData.no_of_days_worked} onChange={handleInput} />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Salary deduction amount</label>
                                      <input type="number" className="form-control" required="required" name="salary_deduction_amount" value={inputData.salary_deduction_amount} onChange={handleInput} />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Salary deduction type</label>
                                      <input type="text" className="form-control" required="required" name="salary_deduction_type" value={inputData.salary_deduction_type} onChange={handleInput} />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Net Amount</label>
                                      <input type="number" className="form-control" required="required" name="net_amount" value={inputData.net_amount} onChange={handleInput} />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Salary transffered</label>
                                      <select className="form-control" name="salary_transferred" value={inputData.salary_transferred} onChange={handleInput}>
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
                                <h6 className="p-0 m-0 mt-1 text-center">{msg}</h6>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default EmployeeSalaryContent;
