import React, { useState,useEffect } from 'react';
import axios from "axios";
import MaterialTable from 'material-table'
import useGetUpdatehooks from "../Customhooks/useGetUpdatehooks";
import CustomLoader from "./CustomLoader";
import ApiUrl from "../ServerApi/Api";

const Showrec_req_wisecandidate_table =()=>
{


  const urlData = ApiUrl+"/recruitment_request_candidate/";
  const {alldata,updateData,deleteData,find} = useGetUpdatehooks(urlData);

  const [columns,setColumns] = useState([
    {title:"Candidate name",field:"candidate_id",lookup:{}},
    {title:"Recruitment request",field:"recruitment_request_id",lookup:{}},
    {title:"Date of registration",field:"date_of_reg",editComponent: props => (
      <input
        type="date"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        className="border-0"
      />
    )}
  ]);

  useEffect(()=>{
      let temp = columns[1].lookup;
      if(Object.keys(temp).length === 0)
      {

        const ajax1 = axios({
            method:"GET",
            url:ApiUrl+"/recruitment_request",
        });

        const ajax2 = axios({
            method:"GET",
            url:ApiUrl+"/candidate-master"
        });

        Promise.all([ajax1,ajax2]).then((response)=>{
          const recruitment_request = response[0].data.data;
          const candidate_master = response[1].data.data;

          let can_column = columns[0];
          let recruitment_column = columns[1];

          candidate_master.forEach((item,i)=>{
            let id = item.id;
            let can_name = item.candidate_firstname;
            can_column = {...can_column,lookup:{...can_column.lookup,[id]:can_name}};
          });

          recruitment_request.forEach((item,i)=>{
            let id = item.id;
            let rec_name = item.recruitment_name;
            recruitment_column = {...can_column,lookup:{...can_column.lookup,[id]:rec_name}};
          });

          const update = [...columns];
          update[0] = can_column;
          update[1] = recruitment_column;
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
                            title="Recruitment request with candidate"
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

export default Showrec_req_wisecandidate_table;
