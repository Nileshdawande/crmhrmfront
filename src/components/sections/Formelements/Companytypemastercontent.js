import React,{useState} from 'react';
import ApiUrl from "../ServerApi/Api";
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";

const Companytypemastercontent =()=>
{
      const urlData = ApiUrl+"/cmptype";
      const [loader,setLoader] = useState(false);
      const [msg,setMsg] = useState("");
      const [inputData,setInputData] = useState({
        company_type_name:"",
      });

      const createCompanyType=(event)=>
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
            setMsg("Company type created !");
            removeMsg();
            setInputData({
              company_type_name:"",
            });
          });

          ajax.catch((error)=>{
            if(error)
            {
              $(".notice").removeClass("d-none");
              setMsg("Company type exists !");
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
                                  <h6>Company type master</h6>
                              </div>
                              <div className="ms-panel-body">
                                  <form className="w-50" onSubmit={createCompanyType}>
                                    <div className="form-group mb-2">
                                    <label>Company type name</label>
                                    <input type="text" className="form-control" name="company_type_name" value={inputData.company_type_name} onChange={handleInput} placeholder="Bank" required="required" />
                                    </div>
                                    <div className="form-group">
                                    <button className="btn btn-dark rounded-0 create_btn">Create company type</button>
                                    </div>

                                  </form>
                                  <div className="alert alert-danger rounded-0 notice text-center d-none">
                                    {msg}
                                  </div>
                              </div>
                          </div>
                      </div>
                    <div className="col-md-1"></div>
                </div>
            </div>

        );

}

export default Companytypemastercontent;
