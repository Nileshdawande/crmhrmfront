import React,{useState,useEffect} from 'react';
import axios from "axios";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const EmployeeAllocationDetailsContent=()=>
{

    const urlData = ApiUrl+"/emp-allocation-details";
    const {addData,notice} = useAajaxhooks();

       useEffect(()=>{
         getSalaryHead();
       },[]);

       const [salaryHead,setSalaryHead] = useState([]);

       const getSalaryHead=async()=>
       {
           let ajax = await axios({
             method:"GET",
             url:ApiUrl+"/salary-head"
           });

           let data = ajax.data.data;
           setSalaryHead(data);
       }


        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create employee allocation details</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={(event)=>{addData(event,urlData)}}>
                                <div className="row">

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Salary head</label>
                                   <select className="form-control" name="salary_head_id">
                                    {
                                       salaryHead.map((finalData,index)=>(
                                         <option key={finalData.id} value={finalData.id}>{finalData.salary_head_name}</option>
                                       ))
                                    }
                                   </select>
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Amount</label>
                                   <input type="number" className="form-control" name="amount" />
                                  </div>
                                  </div>


                                  <div className="col-md-12">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Create Emp Allocation</button>
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

export default EmployeeAllocationDetailsContent;
