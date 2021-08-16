import React, { useEffect,useState } from 'react';
import MaterialTable from 'material-table'
import useGetUpdatehooks from "../Customhooks/useGetUpdatehooks";
import CustomLoader from "./CustomLoader";
import ApiUrl from "../ServerApi/Api";

const RequirementTable =()=> {

    const urlData = ApiUrl+"/requirement/";
    const {alldata,updateData,deleteData,find} = useGetUpdatehooks(urlData);

    const [columns,setColumns] = useState([
      {title:"Requirement name",field:"requirement_name"},
      {title:"Requirement parent",field:"requirement_parent",lookup:{}},
    ]);

     useEffect(()=>{

       let temp = columns[1].lookup;
       if(Object.keys(temp).length === 0)
       {
         if(alldata.length !== 0)
         {
             let cdata = columns[1];

             alldata.forEach((obj,i)=>{
               let requirement_name = obj.requirement_name;
               cdata = {...cdata,lookup:{...cdata.lookup,[requirement_name]:requirement_name}};
             });

             let newData = columns.map((obj,index)=>{
               return index === 1 ? cdata : obj;
             });

             setColumns(newData);
         }
       }


     },[columns,alldata]);





        return (
          <div className="ms-content-wrapper">
              <div className="row">
                  <div className="col-md-12">
                      <div className="ms-panel">

                          <div>
                            {find !== true ? <CustomLoader/> :
                              <MaterialTable
                                title="Requirement table"
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
          </div>

        );
    }

export default RequirementTable;
