import React,{useState} from 'react';
import axios from "axios";
import $ from "jquery";
import ApiUrl from "../ServerApi/Api";

const AddParametermasterContent=()=>
{

      let [msg,setMsg] = useState("");
      const creactParameterMaster=(event)=>
      {
         event.preventDefault();
         let frm = event.target;
         $(".create_btn").attr("disabled",true);
         $(".notice").removeClass("d-none");
         setMsg("Please wait....");

         let ajax = axios({
            method:"POST",
            url:ApiUrl+"/parameter",
            data:new FormData(event.target)
         });

         ajax.then((response)=>{
           frm.reset();
           setMsg("Prameter created");
           removeMsg();
         });

         ajax.catch((error)=>{
            if(error)
            {
              setMsg("Something went wrong try again");
              removeMsg();
            }
         });

      }

      const removeMsg=()=>
      {
         setTimeout(()=>{
           setMsg("");
           $(".create_btn").attr("disabled",false);
           $(".notice").addClass("d-none");
         },3000);
      }

        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Parameter master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form className="w-50" onSubmit={creactParameterMaster}>
                                    <div className="form-group">
                                        <label>Parameter name</label>
                                        <input type="text" className="form-control"  placeholder="parameter name" name="parameter_name" required="required" />
                                    </div>
                                    <div className="form-group">
                                      <button type="submit" className="btn btn-danger rounded-0 create_btn">Create parameter</button>
                                    </div>
                                </form>
                                <div className="alert alert-danger rounded-0 p-0 notice d-none">
                                   <h6 className="p-0 py-2 text-center">{msg}</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
}

export default AddParametermasterContent;
