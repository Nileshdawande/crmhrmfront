import React,{useState} from 'react';
import ApiUrl from "../ServerApi/Api";
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";

const Designationmaster = () => {

    const urlData = ApiUrl+"/designation";
    const [loader,setLoader] = useState(false);
    const [msg,setMsg] = useState("");
    const [inputData,setInputData] = useState({
      designation_name:"",
    });

    const createDesignation=(event)=>
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
          setMsg("Designation created !");
          removeMsg();
          setInputData({
            designation_name:"",
          });
        });

        ajax.catch((error)=>{
          if(error)
          {
            $(".notice").removeClass("d-none");
            setMsg("Desination exists !");
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
                    <div className="col-md-1"></div>

                    <div className="col-md-10">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>DESIGNATION MASTER</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createDesignation}>
                                    <div className="form-group">
                                        <label>Designation name</label>
                                        <input type="text" name="designation_name" className="form-control" value={inputData.designation_name} onChange={handleInput}/>
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-danger rounded-0 create_btn">Submit</button>
                                    </div>

                                    <div className="alert alert-danger font-weight-bold rounded-0 text-center my-2 notice d-none">
                                    {msg}
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-1"></div>
                </div>
            </div>

        )
    }

export default Designationmaster;
