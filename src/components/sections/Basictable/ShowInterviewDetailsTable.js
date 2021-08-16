import React,{useState,useEffect} from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import useGetUpdatehooks from "../Customhooks/useGetUpdatehooks";
import CustomLoader from "./CustomLoader";
import ApiUrl from "../ServerApi/Api";

const ShowInterviewDetailsTable=()=>
{

  const urlData = ApiUrl+"/interview-details/";

  const {alldata,updateData,deleteData,find} = useGetUpdatehooks(urlData);

  const [columns,setColumns] = useState([
    {title:"Int details number",field:"interview_details_number"},
    {title:"Int schedule number",field:"interview_schedule_id",lookup:{}},
    {title:"Candidate name",field:"candidate_id",lookup:{}},
    {title:"Int remark",field:"interview_remarks"},
    {title:"Int point",field:"interview_points"},
    {title:"Int status",field:"interview_passed",lookup:{Yes:'Yes',No:'No'}},
    {title:"Int date",field:"interview_date",editComponent: props => (
      <input
        type="date"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        className="border-0"
      />
  )},
  ]);


  useEffect(()=>{
    const ajax1 = axios({
      method:"GET",
      url:ApiUrl+"/interview-schedule",
    });

    const ajax2 = axios({
      method:"GET",
      url:ApiUrl+"/candidate-master",
    });

    Promise.all([ajax1,ajax2]).then((response)=>{
      const int_res = response[0].data.data;
      const can_res = response[1].data.data;

      let int_col = columns[1];
      let can_col = columns[2];

      int_res.forEach((data,i)=>{
        const id = data.id;
        const int_num = data.interview_schedule_number;
        int_col = {...int_col,lookup:{...int_col.lookup,[id]:int_num}};
      });

      can_res.forEach((data,i)=>{
        const id = data.id;
        const can_name = data.candidate_firstname;
        can_col = {...can_col,lookup:{...can_col.lookup,[id]:can_name}};
      });

      const update = [...columns];
      update[1] = int_col;
      update[2] = can_col;
      setColumns(update);

    });

  },[]);

        return (
          <div className="ms-content-wrapper">
              <div className="row">
                  <div className="col-md-12">
                      <div className="ms-panel">
                        {find !== true ? <CustomLoader/> :
                        <MaterialTable
                          title="Interview details"
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

export default ShowInterviewDetailsTable;
