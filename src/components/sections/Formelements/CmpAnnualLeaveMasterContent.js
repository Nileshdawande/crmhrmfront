import React,{useState,useEffect} from 'react';
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";
import ApiUrl from "../ServerApi/Api";

const CmpAnnualLeaveMasterContent=()=>
{

       const urlData = ApiUrl+"/cmp-leave-master";
       const [branchName,setBranchName] = useState([]);
       const [loader,setLoader] = useState(false);
       const [msg,setMsg] = useState("");
       const [inputData,setInputData] = useState({
         year:"",
         branch_id:"",
         annual_leave_date:"",
         leave_on_account_of:"",
         leave_cancelled:"",
         reason_for_cancellation:""
       });

       useEffect(()=>{
         const ajax = axios({
           method:"GET",
           url:ApiUrl+"/softlabs-branch-master",
         });

         Promise.all([ajax]).then((response)=>{
           const res = response[0].data.data;
           setBranchName(res);
           const branch_id = res[0].id;
           setInputData({...inputData,branch_id:branch_id});
         });

       },[]);

       const createCmpAnnualLeave=(event)=>
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
             setMsg("Company annual leave created !");
             removeMsg();
             setInputData({
               ...inputData,
               year:"",
               annual_leave_date:"",
               leave_on_account_of:"",
               leave_cancelled:"",
               reason_for_cancellation:""
             });
           });

           ajax.catch((error)=>{
             if(error)
             {
               $(".notice").removeClass("d-none");
               setMsg("Branch office exists !");
               setLoader(false);
               removeMsg();
             }
           });
       }

       const handleInput=(event)=>
       {
          const name = event.target.name;
          const val  = event.target.value;
          setInputData({...inputData,[name]:val});
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
                                <h6>Create company annual master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createCmpAnnualLeave}>
                                <div className="row">

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Branch name</label>
                                   <select className="form-control" name="branch_id" value={inputData.branch_id} onChange={handleInput}>
                                     {
                                       branchName.map((final_data,index)=>(
                                         <option key={final_data.id} value={final_data.id}>{final_data.branch_name}</option>
                                       ))
                                     }
                                   </select>
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Year</label>
                                   <select className="form-control" name="year" value={inputData.year} onChange={handleInput}>
                                     <option>2020</option>
                                     <option>2021</option>
                                     <option>2022</option>
                                     <option>2023</option>
                                     <option>2024</option>
                                     <option>2025</option>
                                     <option>2026</option>
                                     <option>2027</option>
                                     <option>2028</option>
                                     <option>2029</option>
                                     <option>2030</option>
                                   </select>
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Leave on account of</label>
                                   <input type="text" className="form-control" required="required" name="leave_on_account_of"  value={inputData.leave_on_account_of} onChange={handleInput}/>
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Annual leave date</label>
                                   <input type="date" className="form-control" required="required" name="annual_leave_date" value={inputData.annual_leave_date} onChange={handleInput} />
                                  </div>
                                  </div>


                                  <div className="col-md-12">
                                  <div className="form-group">
                                   <label>Leave cancelled</label>
                                   <input type="number" className="form-control" required="required" name="leave_cancelled" value={inputData.leave_cancelled} onChange={handleInput} />
                                  </div>
                                  </div>

                                  <div className="col-md-12">
                                  <div className="form-group">
                                   <label>Reason for cancellation</label>
                                   <textarea className="form-control" required="required" name="reason_for_cancellation" value={inputData.reason_for_cancellation} onChange={handleInput}></textarea>
                                  </div>
                                  </div>

                                  <div className="col-md-12">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Create Cmp annual</button>
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

export default CmpAnnualLeaveMasterContent;
