import React,{useState,useEffect} from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import {Link} from "react-router-dom";
import CustomLoader from "./CustomLoader";
import ApiUrl from "../ServerApi/Api";

const PmsprojectviewTable=()=>
 {

   const [project,setProject] = useState([]);
   const [find,setFind] = useState(false);
   const [column,setColumn] = useState([
     {title:"Project name",field:"project_name"},
     {title:"Project key",field:"project_key"},
     {title:"Project leader",field:"project_leader",lookup:{}},
     {title:"Details",field:"details",render: rowData => <Link to={`/project-task-details/${btoa(JSON.stringify(rowData))}`}>View more</Link>}
   ]);

   useEffect(()=>{

     let temp = column[2].lookup;
     if(Object.keys(temp).length === 0)
     {

       if(sessionStorage.getItem("user") !== null)
       {
          let user = JSON.parse(atob(sessionStorage.getItem("user")));
          let ajax1;

          if(user.role === "management")
          {
              ajax1 = axios({
                method:"GET",
                url:ApiUrl+"/project/",
              });
          }

          if(user.role === "employee")
          {
              ajax1 = axios({
                method:"GET",
                url:ApiUrl+"/project/"+user.id,
                params:{
                  fetch_type:"userid"
                }
              });
          }

          const ajax2 = axios({
            method:"GET",
            url:ApiUrl+"/user/",
          });

          Promise.all([ajax1,ajax2]).then((response)=>{

            const project_res = response[0].data.data;
            const user_res  = response[1].data.data;

            let usercolumn = column[2];

             user_res.forEach((userobj,index)=>{
               let id = userobj.id;
               let firstname = userobj.firstname;
               usercolumn = {...usercolumn,lookup:{...usercolumn.lookup,[id]:firstname}};
             });

             const newData = column.map((columndata,i)=>{
               return i===2 ? usercolumn : columndata;
             });

            setColumn(newData);
            setProject(project_res);
            setFind(true);
          }).catch((error)=>{
            if(error)
            {
              setFind(true);
            }
          });


       }

     }


   },[column]);



        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                      <div className="ms-panel-body">
                        {find !== true ? <CustomLoader/> :
                          <MaterialTable
                            title="Projects"
                            columns={column}
                            data={project}
                            />
                        }
                        </div>

                      </div>

                </div>
            </div>

        );
    }

export default PmsprojectviewTable;
