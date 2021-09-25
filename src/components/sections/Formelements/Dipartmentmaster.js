import React,{useState} from 'react';
import ApiUrl from "../ServerApi/Api";
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";

const Dipartmentmaster =()=> {

  const urlData = ApiUrl+"/dipartment";
  const [loader,setLoader] = useState(false);
  const [msg,setMsg] = useState("");
  const [inputData,setInputData] = useState({
    dipartment_name:"",
    short_name:""
  });

  const createDepartment=(event)=>
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
        setMsg("Department created !");
        removeMsg();
        setInputData({
          dipartment_name:"",
          short_name:""
        });
      });

      ajax.catch((error)=>{
        if(error)
        {
          $(".notice").removeClass("d-none");
          setMsg("Department exists !");
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
                                <h6>Add Department</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createDepartment}>
                                    <div className="form-group">
                                        <label htmlFor="exampleEmail">Department name</label>
                                        <input type="text" name="dipartment_name" value={inputData.dipartment_name} onChange={handleInput} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="examplePassword">Short name</label>
                                        <input type="text" className="form-control"  name="short_name" value={inputData.short_name} onChange={handleInput}  />
                                    </div>

                                    <div className="form-group">
                                       <button className="btn btn-danger rounded-0 create_btn">Submit</button>
                                    </div>

                                    <div className="alert alert-danger rounded-0 font-weight-bold text-center d-none notice">
                                      {msg}
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-1"></div>
                </div>


            </div>

        );
    }


export default Dipartmentmaster;
