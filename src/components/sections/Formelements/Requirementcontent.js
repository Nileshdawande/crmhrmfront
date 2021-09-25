import React, { useState,useEffect } from 'react';
import ApiUrl from "../ServerApi/Api";
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";

const Requirementcontent=()=>
{

     const urlData = ApiUrl+"/requirement";
     let [requirementdata,setrequirement] = useState([]);
     const [loader,setLoader] = useState(false);
     const [msg,setMsg] = useState("");
     const [inputData,setInputData] = useState({
       requirement_name:"",
       requirement_parent:""
     });


      useEffect(()=>{
        getrequirement();
       },[]);

        const getrequirement=()=>
        {
            let ajax = axios({
                method:"GET",
                url:ApiUrl+"/requirement",
            });

            ajax.then((response)=>{
              let data = response.data.data;
              setrequirement(data);
            });
        }

        const createRequirements=(event)=>
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
              setMsg("Requirement created !");
              getrequirement();
              removeMsg();
              setInputData({
                requirement_name:"",
                requirement_parent:""
              });
            });

            ajax.catch((error)=>{
              if(error)
              {
                $(".notice").removeClass("d-none");
                setMsg("Requirement exists !");
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
                    <div className="col-md-2"></div>

                    <div className="col-md-8">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Requirement type</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createRequirements}>

                                    <div className="form-group">
                                        <label >Requirement type</label>
                                        <input type="text" className="form-control" name="requirement_name" value={inputData.requirement_name} onChange={handleInput}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Parent type</label>
                                        <select className="form-control" name="requirement_parent" value={inputData.requirement_parent} onChange={handleInput}>
                                          <option value="">Select requirement type</option>
                                            {
                                                requirementdata.map((final,i)=>(
                                                    <option key={final.id}>{final.requirement_name}</option>
                                                    ))
                                            }

                                        </select>
                                    </div>

                                    <div className="form-group">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Submit</button>
                                    </div>

                                    <div className="form-group">
                                       <div className="alert alert-danger rounded-0 text-center font-weight-bold notice d-none">
                                       {msg}
                                       </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2"></div>

                    <div className="col-md-1"></div>
                    <div className="col-md-10">

                    </div>

                    <div className="col-md-1"></div>

                </div>
            </div>

        );
    }


export default Requirementcontent;
