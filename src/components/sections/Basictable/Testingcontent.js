import React, { useState } from 'react';
import Breadcrumb from './Breadcrumb'
import MaterialTable from 'material-table'
import "../../../assets/css/Table.css";
const Testingcontent =()=> 
{

     let data = [{
        name:"nilesh",
        roll:"101"
     }];

     let columns = [
     {
        title:"Name",
        field:'name'
     },

     {
        title:"Roll",
        field:'roll'
     }


     ];
      return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb />
                    </div>
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-body">
                                <div className="table-responsive">
                                <MaterialTable title="Contact master"   
                                data={data}
                                columns={columns}
                                options={{
                                    search:false,
                                    paging:true,
                                    filtering:true,
                                    exportButton:true
                                }}

                                 />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }


export default Testingcontent;