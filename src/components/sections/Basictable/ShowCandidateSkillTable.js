import React, { useState,useEffect } from 'react';
import MaterialTable from 'material-table'
import useGetUpdatehooks from "../Customhooks/useGetUpdatehooks";
import axios from "axios";
import CustomLoader from "./CustomLoader";
import ApiUrl from "../ServerApi/Api";

const ShowCandidateSkillTable=()=>
{

    const urlData = ApiUrl+"/candidate-skill/";

    const {alldata,updateData,deleteData,find} = useGetUpdatehooks(urlData);

    const [columns,setColumns] = useState([
      {title:"Candidate name",field:"candidate_id",editable:'never',lookup:{}},
      {title:"Candidate skill",field:"candidate_skill_id",lookup:{}},
      {title:"Level",field:"level"},
    ]);

    useEffect(()=>{
      let temp = columns[1].lookup;
      if(Object.keys(temp).length === 0)
      {
        const ajax1 = axios({
          method:"GET",
          url:ApiUrl+"/skill-masters/"
        });

        const ajax2 = axios({
          method:"GET",
          url:ApiUrl+"/candidate-master/"
        });

        Promise.all([ajax1,ajax2]).then((response)=>{
          const skill_master_data = response[0].data.data;
          const candidate_master  = response[1].data.data;

          let can_name  = columns[0];
          let can_skill_column = columns[1];

          skill_master_data.forEach((item, i) =>
          {
              let id = item.id;
              let val = item.skill_name;
              can_skill_column = {...can_skill_column,lookup:{...can_skill_column.lookup,[id]:val}};
          });

          candidate_master.forEach((item, i) =>
          {
              let id = item.id;
              let val = item.candidate_firstname;
              can_name = {...can_name,lookup:{...can_name.lookup,[id]:val}};
          });

          const update = [...columns];
          update[0] = can_name;
          update[1] = can_skill_column;
          setColumns(update);

        });

      }

    },[columns]);

        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                          {find !== true ? <CustomLoader/> :
                          <MaterialTable
                            title="Candidate Skill Master"
                            columns={columns}
                            data={alldata}
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


export default ShowCandidateSkillTable;
