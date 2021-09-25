import React from 'react';
import MaterialTable from 'material-table'
import useGetUpdatehooks from "../Customhooks/useGetUpdatehooks";
import CustomLoader from "./CustomLoader";
import ApiUrl from "../ServerApi/Api";


const Dipartmentmastertable=()=>
{

  const urlData = ApiUrl+"/dipartment/";

  const {alldata,updateData,deleteData,find} = useGetUpdatehooks(urlData);

  const columns = [
    {title:"Department name",field:"dipartment_name"},
    {title:"Short name",field:"short_name"},
  ];


        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="ms-panel">

                            <div>
                              {find !== true ? <CustomLoader/> :
                                <MaterialTable
                                  title="Department table"
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


export default Dipartmentmastertable;
