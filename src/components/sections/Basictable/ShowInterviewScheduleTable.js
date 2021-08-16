import React, { useState,useEffect } from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import useGetUpdatehooks from "../Customhooks/useGetUpdatehooks";
import CustomLoader from "./CustomLoader";
import ApiUrl from "../ServerApi/Api";

const ShowInterviewScheduleTable =()=>
 {

   const urlData = ApiUrl+"/interview-schedule/";
   const {alldata,updateData,deleteData,find} = useGetUpdatehooks(urlData);

   const [columns,setColumns] = useState([
     {title:"Schedule number",field:"interview_schedule_number"},
     {title:"Recruitment name",field:"recruitment_req_id",lookup:{}},
     {title:"Schedule date",field:"interview_schedule_date",editComponent: props => (
       <input
         type="date"
         value={props.value}
         onChange={e => props.onChange(e.target.value)}
         className="border-0"
       />
   )},
     {title:"Schedule venue",field:"interview_schedule_venue"}
   ]);

   useEffect(()=>{
     const ajax = axios({
       method:"GET",
       url:ApiUrl+"/recruitment_request",
     });

     ajax.then((response)=>{
       const data = response.data.data;
       let col = columns[1];
       data.forEach((item)=>{
         let id = item.id;
         let r_name = item.recruitment_name;
         col = {...col,lookup:{...col.lookup,[id]:r_name}};
       });

       const newData = columns.map((data,index)=>{
         return index === 1 ? col : data;
       });

       setColumns(newData);

     });
   },[]);


        return (
          <div className="ms-content-wrapper">
              <div className="row">
                  <div className="col-md-12">
                      <div className="ms-panel">
                        {find !== true ? <CustomLoader/> :
                        <MaterialTable
                          title="Interview schedule"
                          columns={columns}
                          data = {alldata}
                          editable={{
                            onRowUpdate: (newData, oldData) =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const index = oldData.tableData.id;
                                  updateData(newData,oldData,index,resolve);
                                }, 1000)
                              }),
                            onRowDelete: oldData =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const index = oldData.tableData.id;
                                  deleteData(oldData,index,resolve);
                                }, 1000)
                              }),
                          }}


                          />
                      }
                      </div>
                  </div>
              </div>
          </div>
        );

}

export default ShowInterviewScheduleTable;
