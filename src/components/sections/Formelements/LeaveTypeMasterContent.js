import React,{useState} from 'react';
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";
import ApiUrl from "../ServerApi/Api";

const LeaveTypeMasterContent=()=>
{
    const urlData = ApiUrl+"/emp-leave-master";
    const [loader,setLoader] = useState(false);
    const [msg,setMsg] = useState("");
    const [inputData,setInputData] = useState({
      leave_type_name:""
    });

    const createLeaveTypeName=(event)=>
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
          setMsg("Leave type name created !");
          removeMsg();
          setInputData({
            leave_type_name:""
          });
        });

        ajax.catch((error)=>{
          if(error)
          {
            $(".notice").removeClass("d-none");
            setMsg("Leave type name exists !");
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
                                <h6>Create leave type master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createLeaveTypeName}>
                                <div className="row">

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Leave type name</label>
                                   <input type="text" className="form-control" name="leave_type_name" required="required" value={inputData.leave_type_name} onChange={handleInput} />
                                  </div>
                                  </div>

                                  <div className="col-md-12">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">
                                    Create leave type
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

export default LeaveTypeMasterContent;
