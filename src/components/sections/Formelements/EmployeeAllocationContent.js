import React,{useState,useEffect} from 'react';
import axios from "axios";
import ApiUrl from "../ServerApi/Api";
import CustomRequestLoader from "./CustomRequestLoader";
import $ from "jquery";

const EmployeeAllocationContent=()=>
{

      const urlData = ApiUrl+"/emp-allocation";

       const [msg,setMsg] = useState("");
       const [employeeName,setEmployeeName] = useState([]);
       const [departmentName,setDepartmentName] = useState([]);
       const [filterDepartment,setfilterDepartment] = useState([]);
       const [designationName,setDesignationName] = useState([]);
       const [branchMasterName,setBranchMasterName] = useState([]);
       const [loader,setLoader] = useState(false);

       const [inputData,setInputData] = useState({
         employee_id:"",
         date_of_allocation:"",
         designation_id:"",
         department_id:"",
         branch_id:"",
         gross_salary:0,
         deduction:0,
         net_salary:0,
         allocation_type:"initial"
       });

       useEffect(()=>{
            if(branchMasterName.length === 0)
            {
              const ajax1 = axios({
                method:"GET",
                url:ApiUrl+"/emp-master"
              });

              const ajax2 = axios({
                method:"GET",
                url:ApiUrl+"/employee-department"
              });


              const ajax3 = axios({
                method:"GET",
                url:ApiUrl+"/employee-designation"
              });

              const ajax4 = axios({
                method:"GET",
                url:ApiUrl+"/softlabs-branch-master"
              });

              Promise.all([ajax1,ajax2,ajax3,ajax4]).then((response)=>{
                const employee_res = response[0].data.data;
                const department_res = response[1].data.data;
                const designation_res = response[2].data.data;
                const branch_res = response[3].data.data;

                setEmployeeName(employee_res);
                setDepartmentName(department_res);
                setDesignationName(designation_res);
                setBranchMasterName(branch_res);
                const depart_id = employee_res[0].department_id;

                setInputData({...inputData,employee_id:employee_res[0].id,department_id:depart_id,designation_id:designation_res[0].id,branch_id:branch_res[0].id});

                const newData = department_res.filter((data)=>{
                    return data.id === depart_id;
                });

                setfilterDepartment(newData);

              });
            }
       },[inputData,branchMasterName.length]);


       const inputDataHandle=(event)=>
       {
           const name = event.target.name;
           const val  = event.target.value;

           if(name !== "deduction" && name !== "net_salary" && name !== "gross_salary" && name !== "employee_id")
           {
             setInputData({...inputData,[name]:val});
           }

           else if(name === "employee_id")
           {
               HandleDepartmentFilter(name,val);
           }

           else if(name === "net_salary")
           {
              return false;
           }

           else if(name === "deduction" || name === "gross_salary")
           {
               if(name === "gross_salary")
               {
                 const deduction = inputData.deduction;
                 const max_val = Math.max(deduction, val);
                 if(max_val === Number(val))
                 {
                    const cal = val-deduction;
                    setInputData({...inputData,[name]:val,net_salary:cal});
                 }

                 if(max_val === deduction)
                 {
                   const cal = deduction-val;
                   setInputData({...inputData,[name]:val,net_salary:cal});
                 }

               }

               else
               {
                 const gross_salary = inputData.gross_salary;
                 const max_val = Math.max(gross_salary, val);
                 if(max_val === Number(val))
                 {
                    const cal = val-gross_salary;
                    setInputData({...inputData,[name]:val,net_salary:cal});
                 }

                 if(max_val === Number(gross_salary))
                 {
                   const cal = gross_salary-val;
                   setInputData({...inputData,[name]:val,net_salary:cal});
                 }
               }
           }
       }

       const createEmplloyeAllocation=(event)=>
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
             $(".notice").removeClass("d-none");
             setMsg("Employee allocation created !");
             removeMsg();
             setLoader(false);
             setInputData({
               ...inputData,
               date_of_allocation:"",
               gross_salary:0,
               deduction:0,
               net_salary:0
             });
           });

           ajax.catch((error)=>{
             if(error)
             {
               $(".notice").removeClass("d-none");
               setMsg("Employee allocation exists !");
               removeMsg();
               setLoader(false);
             }
           });

       }

       const HandleDepartmentFilter=(name,val)=>
       {

          const emp_data = employeeName.filter((item) => {
            return Number(val) === item.id;
          });


          const newData = departmentName.filter((item) =>
          {
            return item.id === emp_data[0].department_id;
          });
          console.log(newData);
          setInputData({...inputData,[name]:val,department_id:newData[0].id});
          setfilterDepartment(newData);
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

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Create employee allocation head master</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createEmplloyeAllocation}>
                                <div className="row">

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Employee name</label>
                                   <select className="form-control" name="employee_id" value={inputData.employee_id} onChange={inputDataHandle}>
                                   {
                                      employeeName.map((final_data)=>(
                                        <option key={final_data.id} value={final_data.id}>{final_data.employee_firstname}</option>
                                      ))
                                   }
                                   </select>
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Designation name</label>
                                   <select className="form-control" name="designation_id" value={inputData.designation_id} onChange={inputDataHandle}>
                                   {
                                      designationName.map((final_data)=>(
                                        <option key={final_data.id} value={final_data.id}>{final_data.designation_name}</option>
                                      ))
                                   }
                                   </select>
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Department name</label>
                                   <select className="form-control" name="department_id" value={inputData.department_id} onChange={inputDataHandle}>
                                   {
                                      filterDepartment.map((final_data)=>(
                                        <option key={final_data.id} value={final_data.id}>{final_data.department_name}</option>
                                      ))
                                   }
                                   </select>
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Branch name</label>
                                   <select className="form-control" name="branch_id" value={inputData.branch_id} onChange={inputDataHandle}>
                                   {
                                      branchMasterName.map((final_data)=>(
                                        <option key={final_data.id} value={final_data.id}>{final_data.branch_name}</option>
                                      ))
                                   }
                                   </select>
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Gross salary</label>
                                   <input type="number" className="form-control" required="required" name="gross_salary" value={inputData.gross_salary} onChange={inputDataHandle} />
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Deduction</label>
                                   <input type="number" className="form-control" required="required" name="deduction" value={inputData.deduction} onChange={inputDataHandle} />
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Net salary</label>
                                   <input type="number" className="form-control" required="required" name="net_salary" value={inputData.net_salary} onChange={inputDataHandle} />
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Allocation type</label>
                                   <select className="form-control" name="allocation_type" value={inputData.allocation_type} onChange={inputDataHandle}>
                                   <option>initial</option>
                                   <option>appraisal</option>
                                   <option>transfer</option>
                                   </select>
                                  </div>
                                  </div>

                                  <div className="col-md-6">
                                  <div className="form-group">
                                   <label>Date of allocation</label>
                                   <input type="date" className="form-control" required="required" name="date_of_allocation" value={inputData.date_of_allocation} onChange={inputDataHandle} />
                                  </div>
                                  </div>


                                  <div className="col-md-12">
                                    <button type="submit" className="btn btn-danger rounded-0 create_btn">Create Emp Allocation</button>
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
                {loader && <CustomRequestLoader/>}

            </div>

        );
}

export default EmployeeAllocationContent;
