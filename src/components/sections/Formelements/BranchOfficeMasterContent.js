import React,{useState,useEffect} from 'react';
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";
import ApiUrl from "../ServerApi/Api";

const BranchOfficeMasterContent=()=>
{

      const urlData = ApiUrl+"/branch-office-master";
      const [loader,setLoader] = useState(false);
      const [msg,setMsg] = useState("");

      const [branchMaster,setBranchMaster] = useState([]);
      const [officeMaster,setOfficeMaster] = useState([]);

      const [inputData,setInputData] = useState({
        branch_id:"",
        office_id:"",
        status:"Active",
        date_of_activation:"",
        date_of_deactivation:null
      });

       useEffect(()=>{
         let ajax1 = axios({
           method:"GET",
           url:ApiUrl+"/softlabs-branch-master"
         });

         let ajax2 = axios({
           method:"GET",
           url:ApiUrl+"/softlabs-office-master"
         });

         Promise.all([ajax1,ajax2]).then((response)=>{
           const branch_res = response[0].data.data;
           const office_res = response[1].data.data;
           setBranchMaster(branch_res);
           setOfficeMaster(office_res);

           const branch_id  = branch_res[0].id;
           const offiece_id = office_res[0].id;
           setInputData({...inputData,branch_id:branch_id,office_id:offiece_id});

         });

       },[]);


       const createBranchOffice=(event)=>
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
             setMsg("Branch office created !");
             removeMsg();
             setInputData({...inputData,date_of_activation:"",date_of_deactivation:null});
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
                                <h6>Create branch office master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createBranchOffice}>
                                <div className="row">

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Branch name</label>
                                      <select className="form-control" name="branch_id" value={inputData.branch_id} onChange={handleInput}>
                                      {
                                         branchMaster.map((final_data,index)=>(
                                           <option key={final_data.id} value={final_data.id}>{final_data.branch_name}</option>
                                         ))
                                      }
                                      </select>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Office name</label>
                                      <select className="form-control" name="office_id" value={inputData.office_id} onChange={handleInput}>

                                      {
                                         officeMaster.map((final_data,index)=>(
                                           <option key={final_data.id} value={final_data.id}>{final_data.office_name}</option>
                                         ))
                                      }
                                      </select>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Date of activation</label>
                                      <input type="date" className="form-control" name="date_of_activation" required="required" value={inputData.date_of_activation} onChange={handleInput} />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Date of deactivation</label>
                                      <input type="date" className="form-control" name="date_of_deactivation" value={inputData.date_of_deactivation !== null ? inputData.date_of_deactivation:''} onChange={handleInput} />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Status</label>
                                      <select className="form-control" name="status" value={inputData.status} onChange={handleInput}>
                                      <option>Active</option>
                                      <option>Deactive</option>
                                      </select>
                                      </div>
                                    </div>

                                    <div className="col-md-12">
                                      <button className="btn btn-danger rounded-0 create_btn" type="submit">Submit</button>
                                    </div>

                                  </div>

                                </form>

                                <div className="alert alert-danger rounded-0 p-0 mt-1 d-none notice">
                                <h6 className="p-0 m-0 mt-1 text-center">{msg}</h6>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default BranchOfficeMasterContent;
