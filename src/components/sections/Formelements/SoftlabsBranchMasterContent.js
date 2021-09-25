import React,{useState} from 'react';
import ApiUrl from "../ServerApi/Api";
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";

const SoftlabsBranchMasterContent=()=>
{

    const urlData = ApiUrl+"/softlabs-branch-master";
    const [loader,setLoader] = useState(false);
    const [msg,setMsg] = useState("");

    const [inputData,setInputData] = useState({
      branch_code:"",
      branch_name:"",
      address_one:"",
      address_two:"",
      address_three:"",
      branch_pincode:"",
      branch_city:"",
      branch_state:"",
      branch_country:"",
      branch_start_date:"",
      date_of_decommissioning:"",
      branch_status:"Active",
      branch_head_office:"Yes"
    });

    const CreateBranch=(event)=>
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
          setMsg("Branch created !");
          removeMsg();
          setInputData({
            ...inputData,
            branch_code:"",
            branch_name:"",
            address_one:"",
            address_two:"",
            address_three:"",
            branch_pincode:"",
            branch_city:"",
            branch_state:"",
            branch_country:"",
            branch_start_date:"",
            date_of_decommissioning:"",
          });
        });

        ajax.catch((error)=>{
          if(error)
          {
            $(".notice").removeClass("d-none");
            setMsg("Branch  exists !");
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
                                <h6>Create branch master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={CreateBranch}>
                                <div className="row">

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch code</label>
                                      <input type="text"  className="form-control" required="required" name="branch_code" value={inputData.branch_code} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch name</label>
                                      <input type="text"  className="form-control" required="required" name="branch_name" value={inputData.branch_name} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch pincode</label>
                                      <input type="number"  className="form-control" required="required" name="branch_pincode" value={inputData.branch_pincode} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch city</label>
                                      <input type="text"  className="form-control" required="required" name="branch_city" value={inputData.branch_city} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch state</label>
                                      <input type="text"  className="form-control" required="required" name="branch_state" value={inputData.branch_state} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch country</label>
                                      <input type="text"  className="form-control" required="required" name="branch_country" value={inputData.branch_country} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch start date</label>
                                      <input type="date"  className="form-control" required="required" name="branch_start_date" value={inputData.branch_start_date} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Date of de commissioning</label>
                                      <input type="date"  className="form-control" required="required" name="date_of_decommissioning" value={inputData.date_of_decommissioning} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Branch status</label>
                                      <select className="form-control" name="branch_status" value={inputData.branch_status} onChange={handleInput}>
                                      <option>Active</option>
                                      <option>Deactive</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Head office</label>
                                      <select className="form-control" name="branch_head_office" value={inputData.branch_head_office} onChange={handleInput}>
                                      <option>Yes</option>
                                      <option>No</option>
                                      </select>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Address-1</label>
                                      <textarea className="form-control" required="required" name="address_one" value={inputData.address_one} onChange={handleInput}></textarea>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                       <label>Address-2</label>
                                       <textarea className="form-control" name="address_two" value={inputData.address_two} onChange={handleInput}></textarea>
                                    </div>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="form-group">
                                       <label>Address-3</label>
                                       <textarea className="form-control" name="address_three" value={inputData.address_three} onChange={handleInput}></textarea>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Create offer details</button>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="alert alert-danger rounded-0 p-0 mt-2 d-none notice">
                                    <h6 className="text-center p-0 mt-1">{msg}</h6>
                                    </div>
                                  </div>

                                </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default SoftlabsBranchMasterContent;
