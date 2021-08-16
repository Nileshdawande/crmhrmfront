import React, { useState,useEffect } from 'react';
import Breadcrumb from './Breadcrumb'
import MaterialTable from 'material-table';
import axios from "axios";
import ApiUrl from "../ServerApi/Api";

const Showskillstable =()=> {

let [getskill,setskill] = useState([]);

let [columns,setcolumns] = useState([
{
    title:'Skill',field:'skill_name',
    cellStyle: {
       width: 80,
       maxWidth: 80
     },
},

]);
    useEffect(()=>{
        get_skills();
    },[]);

    const get_skills=()=>
    {

        let ajax = axios({
            method:"GET",
            url:ApiUrl+"/skill-masters"
        });

        ajax.then(function(response){
            let data = response.data.data;
            setskill(data);
        });
    }


const delete_skill=()=>
{
    window.alert("Success");
}

        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Skills</h6>
                            </div>
                            <div className="ms-panel-body">

            <MaterialTable title="Skills" className="w-100"
            columns={columns}
            data={getskill}

            options={{
            paging: false,
            sorting: false,
            draggable: false,
            search:false,
            rowStyle: { backgroundColor: "#fff" },
            }}

            actions={[
            {
            icon: 'edit',
            tooltip: 'Edit User',
            cellStyle: {
            width: 20,
            maxWidth: 20
            },
            },

            {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick:delete_skill,
            cellStyle: {
            width: 20,
            maxWidth:20
            },
            }

            ]}

            />

                        </div>
                        </div>
                    </div>
                </div>
            </div>

        );

}

export default Showskillstable;
