import React,{useState} from 'react';
import ApiUrl from "../ServerApi/Api";
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";

const Interactionmethodcontent =()=>
 {
     const urlData = ApiUrl+"/interaction";
     const [loader,setLoader] = useState(false);
     const [msg,setMsg] = useState("");
     const [inputData,setInputData] = useState({
       interaction_name:"",
     });

     const createInterAction=(event)=>
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
           setMsg("Interaction method created !");
           removeMsg();
           setInputData({
             interaction_name:"",
           });
         });

         ajax.catch((error)=>{
           if(error)
           {
             $(".notice").removeClass("d-none");
             setMsg("Interaction method exists !");
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
                                <h6>Interaction method</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createInterAction}>

                                    <div className="form-group">
                                        <label htmlFor="interaction">Interaction method</label>
                                        <input type="text" className="form-control" name="interaction_name" value={inputData.interaction_name} onChange={handleInput} placeholder="call" />
                                    </div>

                                    <div className="form-group">
                                        <button className="btn btn-danger rounded-0 create_btn">Submit</button>
                                    </div>

                                    <div className="form-group">
                                       <div className="alert alert-danger rounded-0 font-weight-bold text-center notice d-none">
                                         {msg}
                                       </div>
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

export default Interactionmethodcontent;
