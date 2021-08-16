import React, { useState,useEffect } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import MaterialTable from 'material-table';
import CustomLoader from "./CustomLoader";
import ApiUrl from "../ServerApi/Api";

const Leadreporttable =()=>
{

   const [leaddata,setleadData] = useState([]);
   const [find,setFind] = useState(false);
   const [columns,setColumns] = useState([
     {title:"Lead id",field:"id"},
     {title:"Lead rec date",field:"lead_received_date"},
     {title:"Lead source",field:"lead_source_id",lookup:{}},
     {title:"Lead category",field:"lead_cat_id",lookup:{}},
     {title:"Lead weight",field:"lead_weight"},
     {title:"Lead details",field:"lead_details"},
     {title:"Budget",field:"budget",type: 'numeric'},
     {title:"Currency",field:"currency"},
     {title:"Company name",field:"company_id",lookup:{}},
     {title:"Contact number",field:"contact_id",lookup:{}},
     {title:"Contact name",field:"contact_id",lookup:{}},
     {title:"City",field:"contact_id",lookup:{}},
     {title:"State",field:"contact_id",lookup:{}},
     {title:"Country",field:"contact_id",lookup:{}},
     {title:"Email",field:"contact_id",lookup:{}},
     {title:"Action",field:"custom",render: rowData => <Link className="btn btn-danger rounded-0" to={`/leadfollowup/${btoa(JSON.stringify({...rowData,apiurl:"interaction"}))}`}>Followup</Link>}
   ]);



   useEffect(()=>{

     let temp = columns[14].lookup;

     if(leaddata.length === 0 && Object.keys(temp).length === 0)
     {

       const ajax1 = axios({
         method:"GET",
         url:ApiUrl+"/lead/",
         params:{
           fetch_type:"report"
         }
       });

       const ajax2 = axios({
         method:"GET",
         url:ApiUrl+"/lead_source",
       });

       const ajax3 = axios({
         method:"GET",
         url:ApiUrl+"/category",
       });

       const ajax4 = axios({
         method:"GET",
         url:ApiUrl+"/company",
       });

       const ajax5 = axios({
         method:"GET",
         url:ApiUrl+"/contact",
       });


       Promise.all([ajax1,ajax2,ajax3,ajax4,ajax5]).then((response)=>{

           const lead_data_res = response[0];
           const lead_data = lead_data_res.data.data;

           const lead_source_res = response[1].data.data;
           let lead_source_column = columns[2];

           lead_source_res.forEach((l_source_obj,i)=>{
             let key_name = l_source_obj.id;
             let key_val  = l_source_obj.lead_source_name;
             lead_source_column = {...lead_source_column,lookup:{...lead_source_column.lookup,[key_name]:key_val}};
           });

           const lead_category_res = response[2].data.data;
           let lead_category_column = columns[3];

           lead_category_res.forEach((l_category_obj,i)=>{
             let key_name = l_category_obj.id;
             let key_val  = l_category_obj.category;
             lead_category_column = {...lead_category_column,lookup:{...lead_category_column.lookup,[key_name]:key_val}};
           });

           const company_res = response[3].data.data;
           let company_column = columns[8];

           company_res.forEach((company_obj,i)=>{
             let key_name = company_obj.id;
             let key_val  = company_obj.company_name;
             company_column = {...company_column,lookup:{...company_column.lookup,[key_name]:key_val}};
           });

           const contact_num_res = response[4].data.data;
           let contact_num_column = columns[9];
           let contact_name_column = columns[10];
           let contact_city_column = columns[11];
           let contact_state_column = columns[12];
           let contact_country_column = columns[13];
           let contact_email_column = columns[14];

           contact_num_res.forEach((contact_num_obj,i)=>{
             let key_name = contact_num_obj.id;
             let contact_num  = contact_num_obj.contact_one;
             let contact_name = contact_num_obj.firstname;
             let contact_cty = contact_num_obj.city;
             let contact_state = contact_num_obj.state;
             let contact_country = contact_num_obj.country;
             let contact_email = contact_num_obj.email;

             contact_num_column = {...contact_num_column,lookup:{...contact_num_column.lookup,[key_name]:contact_num}};

             contact_name_column = {...contact_name_column,lookup:{...contact_name_column.lookup,[key_name]:contact_name}};

             contact_city_column = {...contact_city_column,lookup:{...contact_city_column.lookup,[key_name]:contact_cty}};

             contact_state_column = {...contact_state_column,lookup:{...contact_state_column.lookup,[key_name]:contact_state}};

             contact_country_column = {...contact_country_column,lookup:{...contact_country_column.lookup,[key_name]:contact_country}};

             contact_email_column = {...contact_email_column,lookup:{...contact_email_column.lookup,[key_name]:contact_email}};

           });

           const update = [...columns];
           update[2]  = lead_source_column;
           update[3]  = lead_category_column;
           update[8]  = company_column;
           update[9]  = contact_num_column;
           update[10] = contact_name_column;
           update[11] = contact_city_column;
           update[12] = contact_state_column;
           update[13] = contact_country_column;
           update[14] = contact_email_column;
           setColumns(update);
           setleadData(lead_data);
           setFind(true);
       }).catch((error)=>{
         if(error)
         {
            setFind(true);
         }
       });



     }

   },[leaddata,columns]);


        return (
          <div className="ms-content-wrapper">
              <div className="row">
                  <div className="col-md-12">
                      <div className="ms-panel">
                        {find !== true ? <CustomLoader/> :
                        <MaterialTable
                          title="Lead reports"
                          columns={columns}
                          data={leaddata}
                          />
                      }
                      </div>
                  </div>
              </div>
          </div>


        );
    }


export default Leadreporttable;
