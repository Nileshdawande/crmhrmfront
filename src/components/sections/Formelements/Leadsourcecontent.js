import React, { useState,useEffect } from 'react';
import ApiUrl from "../ServerApi/Api";
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";

const Leadsourcecontent =()=> {

  const urlData = ApiUrl+"/lead_source";
  let [lead,setLead]  = useState([]);
  const [loader,setLoader] = useState(false);
  const [msg,setMsg] = useState("");
  const [inputData,setInputData] = useState({
    lead_source_name:"",
    lead_source_parent:""
  });

  useEffect(()=>{
      getCategory();
    },[]);

  const getCategory=()=>
  {
      let ajax = axios({
        method:"GET",
        url:ApiUrl+"/lead_source"
      });

      ajax.then(function(response){
        let data = response.data.data;
        setLead(data);
      });
  }

  const createLeadSource=(event)=>
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
        setMsg("Lead source created !");
        removeMsg();
        getCategory();
        setInputData({
          lead_source_name:"",
          lead_source_parent:""
        });
      });

      ajax.catch((error)=>{
        if(error)
        {
          $(".notice").removeClass("d-none");
          setMsg("Lead source exists !");
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
                                <h6>Add lead source</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createLeadSource}>
                                    <div className="form-group">
                                        <label htmlFor="exampleEmail">Lead source</label>
                                        <input type="text" className="form-control" placeholder="Lead source" name="lead_source_name" value={inputData.lead_source_name} onChange={handleInput} required="required" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleSelect">Lead source parent</label>
                                  <select className="form-control" name="lead_source_parent" value={inputData.lead_source_parent} onChange={handleInput} >
                                    <option value="">Select parent category</option>
                                    {
                                      lead.map((data)=>
                                        <option key={data.id} >{data.lead_source_name}</option>
                                      )
                                    }
                                  </select>
                                    </div>

                                    <div className="alert alert-danger rounded-0  text-center font-weight-bold notice d-none">
                                    {msg}
                                    </div>
                                  <button type="submit" className="btn btn-primary rounded-0 my-2 create_btn" status="insert">
                                      Submit
                                  </button>

                                </form>
                            </div>
                        </div>
                    </div>
                     <div className="col-md-1"></div>
                </div>
            </div>

        );
    }


export default Leadsourcecontent;
