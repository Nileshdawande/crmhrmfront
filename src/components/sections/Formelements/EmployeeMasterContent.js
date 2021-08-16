import React,{useState,useEffect} from 'react';
import axios from "axios";
import $ from "jquery";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const EmployeeMasterContent=()=>
{

      const urlData = ApiUrl+"/emp-master";
      const {addData,notice} = useAajaxhooks();

       const [candidateMaster,setCandidateMaster] = useState([]);
       const [department,setDepartment] = useState([]);
       const [EmployeeTypeMaster,setEmployeeTypeMaster] = useState([]);
       const [candidateDetails,setcandidateDetails] = useState([]);

       useEffect(()=>{
         getCandidate();
         getDepartment();
         getEmployeeType();
       },[]);


       const getCandidate=()=>
       {
            const ajax = axios({
              method:"GET",
              url:ApiUrl+"/candidate-master"
            });

            ajax.then((response)=>{
              const data = response.data.data;
              setCandidateMaster(data);
              setcandidateDetails([data[0]]);
            });
       }


       const getCandidateData=(event)=>
       {
           const select = event.target;
           const index  = select.selectedIndex;
           const alloption = $("option",select);
           const id = $(alloption[index]).val();

           const ajax = axios({
             method:"GET",
             url:ApiUrl+"/candidate-master/"+id
           });

           ajax.then((response)=>{
             const data = response.data.data;
             setcandidateDetails([data[0]]);
           });
       }

       const getDepartment=()=>
       {
            const ajax = axios({
              method:"GET",
              url:ApiUrl+"/employee-department"
            });

            ajax.then((response)=>{
              const data = response.data.data;
              setDepartment(data);
            });
       }

       const getEmployeeType=()=>
       {
            const ajax = axios({
              method:"GET",
              url:ApiUrl+"/employee-type-master"
            });

            ajax.then((response)=>{
              const data = response.data.data;
              setEmployeeTypeMaster(data);
            });
       }


       const nextSlide=(c_one,c_two)=>
       {
          validation(c_one,c_two)
       }

       const validation=(c_one,c_two)=>
       {
           let container = document.getElementsByClassName(c_one)[0];
           let input = container.getElementsByClassName("required");
           let temp = [];
           $(input).each(function(){

             if(this.value === "")
             {
                if($(this).next('.check_notice'))
                {
                   $(this).next().remove();
                }
                $("<span class='text-danger check_notice'>This field cant be empty</span>").insertAfter(this);
             }

             else
             {
                temp.push(this.value);
             }

           });

           $(input).each(function(){
             $(this).on("input",function(){
               if($(this).next('.check_notice'))
               {
                  $(this).next().remove();
               }
             });
           });

           if($(".check_notice").length === 0)
           {
              $("."+c_one).addClass("d-none");
              $("."+c_two).removeClass("d-none");
              $("."+c_two).addClass("animate__animated animate__slideInRight");
           }
       }

       const labelAnimation=(event)=>
       {
           let parent = event.target.parentElement;
           let label = parent.getElementsByTagName("label")[0];
           $(label).removeClass("d-none");
           $(label).addClass("animate__animated animate__backInUp");
           $(event.target).attr("placeholder","");
       }

       const backSlide=(c_one,c_two)=>
       {
         $("."+c_one).addClass("d-none");
         $("."+c_two).removeClass("d-none");
         $("."+c_two).addClass("animate__animated animate__slideInRight");
       }




        return (

            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create employee  master</h6>
                            </div>
                            <div className="ms-panel-body">
                              <form onSubmit={(event)=>{addData(event,urlData)}}>

                                  <div className="step-1">

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Employee code</label>
                                     <input type="number" className="form-control welcome_input rounded-0 required"  name="employee_code" placeholder="EMPLOYEE CODE" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label>Candidate name</label>
                                     <select className="form-control welcome_input rounded-0" name="candidate_id" onChange={(event)=>{getCandidateData(event)}}>
                                     {
                                        candidateMaster.map((final_data,index)=>(
                                          <option key={final_data.id} value={final_data.id}>{final_data.candidate_firstname}</option>
                                        ))
                                     }
                                     </select>
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Employee firstname</label>
                                     <input type="text" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].candidate_firstname : ''} className="form-control welcome_input rounded-0 required"  name="employee_firstname" placeholder="EMPLOYEE FIRSTNAME" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Employee middlename</label>
                                     <input type="text" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].candidate_middlename : ''} className="form-control welcome_input rounded-0 required"  name="employee_middlename" placeholder="EMPLOYEE MIDDLENAME" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Employee lastname</label>
                                     <input type="text" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].candidate_lastname : ''} className="form-control welcome_input rounded-0 required"  name="employee_lastname" placeholder="EMPLOYEE LASTNAME" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Employee city</label>
                                     <input type="text" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].city : ''} className="form-control welcome_input rounded-0 required"  name="city" placeholder="EMPLOYEE CITY" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden overflow-hidden">
                                      <button className="btn btn-danger float-right next-btn step-1-next-btn rounded-0" type="button" onClick={()=>{nextSlide("step-1","step-2")}}>
                                        Next
                                        <i className="fa fa-angle-double-right ml-2"></i>
                                      </button>
                                    </div>

                                  </div>

                                  <div className="step-2 d-none">

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Employee state</label>
                                     <input type="text" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].state : ''} className="form-control welcome_input rounded-0 required"  name="state" placeholder="EMPLOYEE STATE" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Employee country</label>
                                     <input type="text" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].country : ''} className="form-control welcome_input rounded-0 required" name="country" placeholder="EMPLOYEE COUNTRY" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Employee pincode</label>
                                     <input type="number" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].pincode : ''} className="form-control welcome_input rounded-0 required"  name="pincode" placeholder="EMPLOYEE PINCODE" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Employee dob</label>
                                     <input type="date" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].candidate_dob : ''} className="form-control welcome_input rounded-0 required"  name="dob" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Employee doj</label>
                                     <input type="date" className="form-control welcome_input rounded-0 required" name="employee_doj" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Employee qual 1</label>
                                     <input type="text" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].candidate_qual_one : ''} className="form-control welcome_input rounded-0 required" name="qual_one" placeholder="QUALIFICATION ONE" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden overflow-hidden">

                                      <button className="btn float-left back-btn step-2-back-btn btn-danger rounded-0" type="button" onClick={()=>{backSlide("step-2","step-1")}}>
                                        <i className="fa fa-angle-double-left mr-2"></i>
                                        Back
                                      </button>

                                      <button className="btn float-right next-btn step-2-next-btn btn-danger rounded-0" type="button" onClick={()=>{nextSlide("step-2","step-3")}}>
                                        Next
                                        <i className="fa fa-angle-double-right ml-2"></i>
                                      </button>
                                    </div>

                                  </div>

                                  <div className="step-3 d-none">

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Employee qual one details</label>
                                     <input type="text" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].qual_one_details : ''} className="form-control welcome_input rounded-0 required" name="qual_one_details" placeholder="QUALFICATION ONE DETAILS" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Employee qual 2</label>
                                     <input type="text" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].candidate_qual_two : ''} className="form-control welcome_input rounded-0 required"  name="qual_two" placeholder="QUALIFICATION TWO" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Employee qual two details</label>
                                     <input type="text" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].qual_two_details : ''} className="form-control welcome_input rounded-0 required"  name="qual_two_details" placeholder="QUALFICATION TWO DETAILS" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label>Department name</label>
                                     <select className="form-control welcome_input rounded-0" name="department_id">
                                     {
                                        department.map((final_data,index)=>(
                                          <option key={final_data.id} value={final_data.id}>{final_data.department_name}</option>
                                        ))
                                     }
                                     </select>
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label>Employee type name</label>
                                     <select className="form-control welcome_input rounded-0" name="employee_type_id">
                                     {
                                        EmployeeTypeMaster.map((final_data,index)=>(
                                          <option key={final_data.id} value={final_data.id}>{final_data.employee_type_name}</option>
                                        ))
                                     }
                                     </select>
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Date of leaving</label>
                                     <input type="date" className="form-control welcome_input rounded-0 required"  name="date_of_leaving" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden overflow-hidden">

                                      <button className="btn float-left back-btn step-3-back-btn btn-danger rounded-0" type="button" onClick={()=>{backSlide("step-3","step-2")}}>
                                        <i className="fa fa-angle-double-left mr-2"></i>
                                        Back
                                      </button>

                                      <button className="btn float-right next-btn step-3-next-btn btn-danger rounded-0" type="button" onClick={()=>{nextSlide("step-3","step-4")}}>
                                        Next
                                        <i className="fa fa-angle-double-right ml-2"></i>
                                      </button>
                                    </div>

                                  </div>

                                  <div className="step-4 d-none">

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Offer id</label>
                                     <input type="number" className="form-control welcome_input rounded-0 required" required="required" name="offer_id" placeholder="OFFER ID" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label>Status</label>
                                     <select className="form-control welcome_input rounded-0" name="status">
                                     <option defaultValue="active">Active</option>
                                     <option defaultValue="deactive">De Active</option>
                                     </select>
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Contact one</label>
                                     <input type="number" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].primary_contact : ''} className="form-control welcome_input rounded-0 required" required="required"  name="contact_one" placeholder="CONTACT ONE" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label className="d-none">Contact two</label>
                                     <input type="number" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].secondary_contact : ''} className="form-control welcome_input rounded-0"  name="contact_two" placeholder="CONTACT TWO" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label>Address 1</label>
                                     <input type="text" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].candidate_first_address : ''} className="form-control welcome_input rounded-0 required"  name="address_one" placeholder="ADDRESS 1" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label>Address 2</label>
                                     <input type="text" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].candidate_second_address : ''} className="form-control welcome_input rounded-0"  name="address_two" placeholder="ADDRESS 2" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden">
                                     <label>Address 3</label>
                                     <input type="text" defaultValue={candidateDetails.length !== 0 ? candidateDetails[0].candidate_third_address : ''} className="form-control welcome_input rounded-0"  name="address_three" placeholder="ADDRESS 3" onClick={(event)=>{labelAnimation(event)}} />
                                    </div>

                                    <div className="form-group mb-4 overflow-hidden overflow-hidden">

                                      <button className="btn float-left back-btn step-4-back-btn btn-dark rounded-0" type="button" onClick={()=>{backSlide("step-4","step-3")}}>
                                        <i className="fa fa-angle-double-left mr-2"></i>
                                        Back
                                      </button>

                                      <button className="btn float-right submit_btn btn-waring rounded-0 create_btn" type="submit">
                                        Create Emp master
                                      </button>
                                    </div>

                                    <div className="alert alert-danger rounded-round text-center notice d-none">
                                      {notice}
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

export default EmployeeMasterContent;
