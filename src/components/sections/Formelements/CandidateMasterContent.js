import React,{useState,useEffect} from 'react';
import $ from "jquery";
import axios from "axios";
import "../../../assets/css/candidate-master.css";
import useAajaxhooks from "../Customhooks/useAajaxhooks";
import ApiUrl from "../ServerApi/Api";

const CandidateMasterContent=()=> {

  const urlData = ApiUrl+"/candidate-master";

  const {addData,notice} = useAajaxhooks();
  const [lastSalary,setLastSalary] = useState(false);

  useEffect(()=>{
    getTechnology();
  },[]);

  let[technology,setTechnology] = useState([]);
  const getTechnology=()=>
  {
     let ajax = axios({
       method:"GET",
       url:ApiUrl+"/technology-master",
     });

     ajax.then((response)=>{
       let data = response.data.data;
       setTechnology(data);
     })
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

  const lastSalaryToggle=(event)=>
  {
      if(event.target.value === "Fresher")
      {
         setLastSalary(false);
      }
      else
      {
        setLastSalary(true);
      }
  }

        return (
          <div className="ms-content-wrapper">

          <div className="p-2">
            <div className="bg-white row my-2 p-3 overflow-hidden">
            <div className="col-md-12 px-4">
            <form onSubmit={(event)=>{addData(event,urlData)}}>

              <div className="step-1">

                <div className="form-group  my-4 overflow-hidden">
                  <label className="d-none">Candidate firstname</label>
                  <input type="text" className="form-control welcome_input  rounded-0 required" name="candidate_firstname" placeholder="CANDIDATE FIRSTNAME" onClick={labelAnimation} />
                </div>

                <div className="form-group  mb-4 overflow-hidden">
                  <label className="d-none">Candidate middlename</label>
                  <input type="text" className="form-control welcome_input required rounded-0" name="candidate_middlename" placeholder="CANDIDATE MIDDLENAME" onClick={labelAnimation} />
                </div>

                <div className="form-group  mb-4 overflow-hidden">
                  <label className="d-none">Candidate lastname</label>
                  <input type="text" className="form-control welcome_input required rounded-0" name="candidate_lastname" placeholder="CANDIDATE LASTNAME" onClick={labelAnimation} />
                </div>

                <div className="form-group mb-4 overflow-hidden">
                  <label className="d-none">Candidate first address</label>
                  <input type="text" name="candidate_first_address" className="form-control welcome_input required rounded-0" placeholder="ADDRESS" onClick={labelAnimation} />
                </div>

                <div className="form-group mb-4 overflow-hidden">
                  <label className="d-none">Candidate second address</label>
                  <input type="text" name="candidate_second_address" className="form-control welcome_input required rounded-0" placeholder="ADDRESS" onClick={labelAnimation} />
                </div>

                <div className="form-group mb-4 overflow-hidden">
                  <label className="d-none">Candidate third address</label>
                  <input type="text" name="candidate_third_address" className="form-control welcome_input required rounded-0" placeholder="ADDRESS" onClick={labelAnimation} />
                </div>

                <div className="form-group overflow-hidden mb-4">
                  <label className="d-none">Pincode</label>
                  <input type="number" className="form-control welcome_input required rounded-0" name="pincode" placeholder="PINCODE" onClick={labelAnimation} />
                </div>

                <div className="form-group overflow-hidden mb-4">
                  <label className="d-none">City</label>
                  <input type="text" className="form-control welcome_input required rounded-0 " name="city" placeholder="CITY" onClick={labelAnimation} />
                </div>

                <div className="form-group overflow-hidden mb-4">
                  <label className="d-none">State</label>
                  <input type="text" className="form-control welcome_input  rounded-0 required" name="state"  placeholder="STATE" onClick={labelAnimation} />
                </div>

                <div className="form-group overflow-hidden mb-4">
                  <label className="d-none">Country</label>
                  <input type="text" className="form-control welcome_input  rounded-0 required" name="country"  placeholder="COUNTRY" onClick={labelAnimation} />
                </div>

                <div className="form-group overflow-hidden mb-4">
                  <label className="d-none">Candidate dob</label>
                  <input type="date" className="form-control welcome_input  rounded-0 required" name="candidate_dob" onClick={labelAnimation} />
                </div>

                <div className="form-group overflow-hidden">
                  <button className="btn btn-light float-right next-btn step-1-next-btn" type="button" onClick={()=>nextSlide("step-1","step-2")}>
                    Next
                    <i className="fa fa-angle-double-right ml-2"></i>
                  </button>
                </div>

              </div>

              <div className="step-2 d-none">
                <div className="form-group overflow-hidden my-4">
                  <label className="d-none">Candidate qual 1</label>
                  <input type="text" className="form-control welcome_input  rounded-0 required" name="candidate_qual_one" placeholder="CANDIDATE QUAL 1" onClick={labelAnimation} />
                </div>

                <div className="form-group overflow-hidden mb-4">
                  <label className="d-none">Qualification details</label>
                  <input type="text" className="form-control welcome_input  rounded-0 required" name="qual_one_details" placeholder="QUALFICATION DETAILS" onClick={labelAnimation} />
                </div>

                <div className="form-group overflow-hidden mb-4">
                  <label className="d-none">Candidate qual 2</label>
                  <input type="text" className="form-control welcome_input  rounded-0 required" name="candidate_qual_two" placeholder="CANDIDATE QUAL 2" onClick={labelAnimation} />
                </div>

                <div className="form-group overflow-hidden mb-4">
                  <label className="d-none">Qualification details</label>
                  <input type="text" className="form-control welcome_input  rounded-0 required" name="qual_two_details"  placeholder="QUALFICATION DETAILS" onClick={labelAnimation} />
                </div>

                <div className="form-group overflow-hidden mb-4">
                  <label className="d-none">Primary contact</label>
                  <input type="number" className="form-control welcome_input  rounded-0 required" name="primary_contact" placeholder="PRIMARY CONTACT" onClick={labelAnimation} />
                </div>

                <div className="form-group overflow-hidden mb-4">
                <label className="d-none">Secondary contact</label>
                <input type="number" className="form-control welcome_input  rounded-0 required" name="secondary_contact" placeholder="SECONDARY CONTACT" onClick={labelAnimation} />
                </div>

                <div className="form-group overflow-hidden mb-4">
                  <label className="d-none">Candidate reg date</label>
                  <input type="date" className="form-control welcome_input  rounded-0 required" name="candidate_reg_date" onClick={labelAnimation}  />
                </div>


                <div className="form-group overflow-hidden">

                  <button className="btn float-left back-btn step-2-back-btn btn-light" type="button" onClick={()=>backSlide("step-2","step-1")}>
                    <i className="fa fa-angle-double-left mr-2"></i>
                    Back
                  </button>

                  <button className="btn float-right next-btn step-2-next-btn btn-light" type="button" onClick={()=>nextSlide("step-2","step-3")}>
                    Next
                    <i className="fa fa-angle-double-right ml-2"></i>
                  </button>
                </div>

              </div>

              <div className="step-3 d-none">
                <div className="form-group overflow-hidden mb-4">
                  <label>Job type</label>
                  <select className="form-control welcome_input required" name="job_type" onChange={(event)=>{lastSalaryToggle(event)}}>
                    <option>Fresher</option>
                    <option>Experience</option>
                  </select>
                </div>

                {lastSalary &&
                <div className="form-group overflow-hidden my-4">
                  <label className="d-none">Last salary</label>
                  <input type="number"  className="form-control welcome_input  rounded-0" name="last_salary" placeholder="LAST SALARY" id="last_salary" onClick={labelAnimation} />
                </div>
              }
                <div className="form-group overflow-hidden mb-4">
                  <label className="d-none">Candidate email</label>
                  <input type="email" className="form-control welcome_input  rounded-0 required" name="candidate_email" placeholder="CANDIDATE EMAIL" onClick={labelAnimation} />
                </div>

                <div className="form-group overflow-hidden mb-4">
                  <label className="d-none">Candidate linkedin profile</label>
                  <input type="text" className="form-control welcome_input  rounded-0" name="candidate_linkedin_profile" placeholder="CANDIDATE LINKEDIN PROFILE" onClick={labelAnimation} />
                </div>

                <div className="form-group overflow-hidden mb-4">
                  <label>Technology</label>
                  <select className="form-control welcome_input required" name="technology_id" onClick={labelAnimation}>
                    {
                       technology.map((final_data)=>(
                         <option key={final_data.id} value={final_data.id}>{final_data.technology_name}</option>
                       ))
                    }
                  </select>
                </div>

                <div className="form-group overflow-hidden">

                  <button className="btn float-left back-btn step-3-back-btn btn-dark" type="button" onClick={()=>backSlide("step-3","step-2")}>
                    <i className="fa fa-angle-double-left mr-2"></i>
                    Back
                  </button>

                  <button className="btn float-right submit_btn btn-dark create_btn" type="submit">
                    Submit
                  </button>
                </div>

              </div>

            <div className="alert alert-danger rounded-0 d-none d-none notice">
              {notice}
            </div>
            </form>
            </div>
            </div>
          </div>

            </div>

        );
}

export default CandidateMasterContent;
