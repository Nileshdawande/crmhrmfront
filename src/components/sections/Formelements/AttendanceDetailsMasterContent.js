import React,{useState,useEffect} from 'react';
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";
import ApiUrl from "../ServerApi/Api";

const AttendanceDetailsMasterContent=()=>
{
    const urlData = ApiUrl+"/attendance_details";
    const [loader,setLoader] = useState(false);
    const [msg,setMsg] = useState("");
    let [empMaster,setEmpMaster] = useState([]);
    let [officeMaster,setOfficeMaster] = useState([]);

    const [inputData,setInputData] = useState({
      employee_id:"",
      office_id:"",
      work_date:"",
      working:"halfday"
    });

      useEffect(()=>{
        const ajax1 = axios({
          method:"GET",
          url:ApiUrl+"/emp-master"
        });

        const ajax2 = axios({
          method:"GET",
          url:ApiUrl+"/softlabs-office-master"
        });

        Promise.all([ajax1,ajax2]).then((response)=>{
            const emp_master_res = response[0].data.data;
            const office_master_res = response[1].data.data;
            setEmpMaster(emp_master_res);
            setOfficeMaster(office_master_res);
            const emp_id = emp_master_res[0].id;
            const office_id = office_master_res[0].id;
            setInputData({...inputData,employee_id:emp_id,office_id:office_id});
        });

      },[]);

      const createAttendanceMaster=(event)=>
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
            setMsg("Attendance created !");
            removeMsg();
            setInputData({
              ...inputData,
              work_date:""
            });
          });

          ajax.catch((error)=>{
            if(error)
            {
              $(".notice").removeClass("d-none");
              setMsg("Someting went wrong try again !");
              setLoader(false);
              removeMsg();
            }
          });
      }

      const removeMsg=()=>
      {
         setTimeout(()=>{
           $(".notice").addClass("d-none");
           setMsg("");
         },3000);
      }

      const handleInput=(event)=>
      {
         const name = event.target.name;
         const val  = event.target.value;
         setInputData({...inputData,[name]:val});
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
                                <h6>Create attendance master </h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createAttendanceMaster}>
                                  <div className="row">

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Employee name</label>
                                      <select className="form-control" name="employee_id" value={inputData.employee_id} onChange={handleInput}>
                                      {
                                          empMaster.map((final_data,index)=>(
                                            <option value={final_data.id} key={final_data.id}>{final_data.employee_firstname}</option>
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
                                            <option value={final_data.id} key={final_data.id}>{final_data.office_name}</option>
                                          ))
                                      }
                                      </select>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Working date</label>
                                      <input type="date" className="form-control" required="required" name="work_date" value={inputData.work_date} onChange={handleInput} />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                      <label>Working</label>
                                      <select className="form-control" name="working" value={inputData.working} onChange={handleInput}>
                                      <option value="halfday">Half day</option>
                                      <option value="fullday">Full day</option>
                                      </select>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <button type="submit" className="btn btn-danger rounded-0 create_btn">
                                        Create Attendance
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

export default AttendanceDetailsMasterContent;
