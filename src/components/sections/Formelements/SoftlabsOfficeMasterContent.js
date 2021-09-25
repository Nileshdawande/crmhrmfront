import React,{useState} from 'react';
import ApiUrl from "../ServerApi/Api";
import CustomRequestLoader from "./CustomRequestLoader";
import axios from "axios";
import $ from "jquery";

const SoftlabsOfficeMasterContent=()=>
{

  const urlData = ApiUrl+"/softlabs-office-master";
  const [loader,setLoader] = useState(false);
  const [msg,setMsg] = useState("");

  const [inputData,setInputData] = useState({
      office_code:"",
      office_name:"",
      office_address_one:"",
      office_address_two:"",
      office_address_three:"",
      office_city:"",
      office_state:"",
      office_country:"",
      office_pincode:"",
      office_start_date:"",
      office_area:"",
      office_contact_one:"",
      office_contact_two:"",
      office_contact_person:"",
      office_con_per_phoneno:"",
      office_status:"Active",
      office_end_date:null
  });

  const createOfficeMaster=(event)=>
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
        setMsg("Branch office created !");
        removeMsg();
        setInputData({
            ...inputData,
            office_code:"",
            office_name:"",
            office_address_one:"",
            office_address_two:"",
            office_address_three:"",
            office_city:"",
            office_state:"",
            office_country:"",
            office_pincode:"",
            office_start_date:"",
            office_area:"",
            office_contact_one:"",
            office_contact_two:"",
            office_contact_person:"",
            office_con_per_phoneno:"",
            office_end_date:null
        });
      });

      ajax.catch((error)=>{
        if(error)
        {
          $(".notice").removeClass("d-none");
          setMsg("Branch office exists !");
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
                                <h6>Create office master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createOfficeMaster}>
                                <div className="row">

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office code</label>
                                      <input type="text"  className="form-control" required="required" name="office_code" value={inputData.office_code} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office name</label>
                                      <input type="text"  className="form-control" required="required" name="office_name" value={inputData.office_name} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office city</label>
                                      <input type="text"  className="form-control" required="required" name="office_city" value={inputData.office_city} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office state</label>
                                      <input type="text"  className="form-control" required="required" name="office_state" value={inputData.office_state} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office country</label>
                                      <input type="text"  className="form-control" required="required" name="office_country" value={inputData.office_country} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office pincode</label>
                                      <input type="number"  className="form-control" required="required" name="office_pincode" value={inputData.office_pincode} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office start date</label>
                                      <input type="date"  className="form-control" required="required" name="office_start_date" value={inputData.office_start_date} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office end date</label>
                                      <input type="date"  className="form-control"  name="office_end_date" value={inputData.office_end_date === null ? "" : inputData.office_end_date} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office area</label>
                                      <input type="text"  className="form-control" required="required" name="office_area" value={inputData.office_area} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office contact one</label>
                                      <input type="number"  className="form-control" required="required" name="office_contact_one" value={inputData.office_contact_one} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office contact two</label>
                                      <input type="number"  className="form-control" required="required" name="office_contact_two" value={inputData.office_contact_two} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office contact person name</label>
                                      <input type="text"  className="form-control" required="required" name="office_contact_person" value={inputData.office_contact_person} onChange={handleInput} />
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office contact person phone</label>
                                      <input type="text"  className="form-control" required="required" name="office_con_per_phoneno" value={inputData.office_con_per_phoneno} onChange={handleInput} />
                                    </div>
                                  </div>




                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Office status</label>
                                      <select className="form-control" name="office_status" value={inputData.office_status} onChange={handleInput}>
                                      <option>Active</option>
                                      <option>Deactive</option>
                                      </select>
                                    </div>
                                  </div>


                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Address-1</label>
                                      <textarea className="form-control" required="required" name="office_address_one" value={inputData.office_address_one} onChange={handleInput}></textarea>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                       <label>Address-2</label>
                                       <textarea className="form-control" name="office_address_two" value={inputData.office_address_two} onChange={handleInput}></textarea>
                                    </div>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="form-group">
                                       <label>Address-3</label>
                                       <textarea className="form-control" name="office_address_three" value={inputData.office_address_three} onChange={handleInput}></textarea>
                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Create offer details</button>
                                  </div>

                                  <div className="col-md-12">
                                    <div className="alert alert-danger rounded-0 p-0 mt-2 d-none notice">
                                    <h6 className="text-center p-0 mt-1">{msg}</h6>
                                    </div>
                                  </div>

                                </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}

export default SoftlabsOfficeMasterContent;
