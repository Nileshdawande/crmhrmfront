import React,{ useState,useEffect} from 'react';
import MaterialTable from 'material-table'
import useGetUpdatehooks from "../Customhooks/useGetUpdatehooks";
import CustomLoader from "./CustomLoader";
import ApiUrl from "../ServerApi/Api";

const Lead_source_content=()=>
{

     const urlData = ApiUrl+"/lead_source/";
     const {alldata,updateData,deleteData,find} = useGetUpdatehooks(urlData);

     const [columns,setColumns] = useState([
       {title:"Lead source name",field:"lead_source_name"},
       {title:"Lead source parent",field:"lead_source_parent",lookup:{}},
     ]);

     useEffect(()=>{

       let temp = columns[1].lookup;
       if(Object.keys(temp).length === 0)
       {
         if(alldata.length !== 0)
         {
            let columndata = columns[1];
            alldata.forEach((data,i)=>{
              let key_name = data.lead_source_parent;
              let key_val  = data.lead_source_parent;
              columndata = {...columndata,lookup:{...columndata.lookup,[key_name]:key_val}};
            });

            const update = [...columns];
            update[1] = columndata;
            setColumns(update);
         }
       }


     },[columns,alldata]);


          return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">
                          {find !== true ? <CustomLoader/> :
                          <MaterialTable
                            title="Lead source"
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

export default Lead_source_content;
