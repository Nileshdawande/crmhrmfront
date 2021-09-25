import React,{useState} from 'react';
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";
import ApiUrl from "../ServerApi/Api";

const SalaryHeadContent=()=>
{

  const urlData = ApiUrl+"/salary-head";
  const [loader,setLoader] = useState(false);
  const [msg,setMsg] = useState("");
  const [inputData,setInputData] = useState({
    salary_head_name:"",
    type:"",
  });

  const createSalaryHead=(event)=>
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
        setMsg("Salary head created !");
        removeMsg();
        setInputData({
          salary_head_name:"",
          type:"",
        });
      });

      ajax.catch((error)=>{
        if(error)
        {
          $(".notice").removeClass("d-none");
          setMsg("Salary head exists !");
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
                                <h6>Create salary head</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createSalaryHead}>
                                <div className="row">

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Salary head name</label>
                                   <input type="text" className="form-control" name="salary_head_name" value={inputData.salary_head_name} onChange={handleInput} required="required" />
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Salary type</label>
                                   <input type="text" className="form-control" name="type" value={inputData.type} onChange={handleInput} required="required" />
                                  </div>
                                  </div>

                                  <div className="col-md-12">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Create salary head</button>
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

export default SalaryHeadContent;
