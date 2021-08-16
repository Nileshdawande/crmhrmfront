import React from 'react';
import MaterialTable from 'material-table'
import useGetUpdatehooks from "../Customhooks/useGetUpdatehooks";
import CustomLoader from "./CustomLoader";
import ApiUrl from "../ServerApi/Api";

const Interactiontable=()=>  {

  const urlData = ApiUrl+"/interaction/";
  const {alldata,updateData,deleteData,find} = useGetUpdatehooks(urlData);

  const columns = [
    {title:"Interaction method",field:"interaction_name"}
  ];

        return (
          <div className="ms-content-wrapper">
              <div className="row">
                  <div className="col-md-12">
                      <div className="ms-panel">
                        {find !== true ? <CustomLoader/> :
                        <MaterialTable
                          title="Interaction method"
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

export default Interactiontable;
