import React, { useState,useEffect } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import MaterialTable from 'material-table';
import CustomLoader from "./CustomLoader";
import ApiUrl from "../ServerApi/Api";

const FollowupreportTable =()=> {

  const columns = [
    {title:"LI ID",field:"id"},
    {title:"NEXT FOLLOWUP DATE",field:"next_followup_date"},
    {title:"LEAD DETAILS",field:"lead_details"},
    {title:"IN DATE",field:"interaction_date"},
    {title:"REMARKS",field:"remarks"},
    {title:"IN NAME",field:"interaction_name"},
    {title:"LEAD STATUS",field:"lead_status"},
    {title:"LEAD WEIGHT",field:"lead_weight"},
    {title:"LEAD CATEGORY",field:"lead_category"},
    {title:"City",field:"city"},
    {title:"State",field:"state"},
    {title:"Country",field:"country"},
    {title:"Email",field:"email"},
    {title:"Contact number",field:"contact_number"},
    {title:"Contact name",field:"contact_name"},
    {title:"Company name",field:"company_name"},
    {title:"Action",field:"custom",render: rowData => <Link className="btn btn-danger rounded-0" to={`/leadfollowup/${btoa(JSON.stringify({...rowData,apiurl:"followup"}))}`}>Followup</Link>}
  ]

  const [followupdata,setFollowUpData] = useState([]);
  const [find,setFind] = useState(false);

  useEffect(()=>{
    getLeadFollowupdata();
  },[]);

  const getLeadFollowupdata=()=>
  {
      const ajax1 = axios({
        method:"GET",
        url:ApiUrl+"/followup/",
        params:{
          fetch_type:"report"
        }
      });

      const ajax2 = axios({
        method:"GET",
        url:ApiUrl+"/lead",
      });

      const ajax3 = axios({
        method:"GET",
        url:ApiUrl+"/contact",
      });

      const ajax4 = axios({
        method:"GET",
        url:ApiUrl+"/company",
      });

      const ajax5 = axios({
        method:"GET",
        url:ApiUrl+"/category",
      });



      Promise.all([ajax1,ajax2,ajax3,ajax4,ajax5]).then((response)=>{

        const follow_data   = response[0].data.data;
        const lead_data     = response[1].data.data;
        const contact_data  = response[2].data.data;
        const company_data  = response[3].data.data;
        const category_data = response[4].data.data;

        let i;
        let j;
        let k;
        let l;

        let temp = [];

        follow_data.forEach((followupobj,ind)=>{

          for(i=0;i<lead_data.length;i++)
          {
             if(followupobj.lead_id === lead_data[i].id)
             {
                let contact_id = lead_data[i].contact_id;
                let company_id = lead_data[i].company_id;
                let category_id = lead_data[i].lead_cat_id;
                let lead_details = lead_data[i].lead_details;

                for(j=0;j<contact_data.length;j++)
                {
                   if(contact_id === contact_data[j].id)
                   {
                      const contact_name = contact_data[j].firstname;
                      const city = contact_data[j].city;
                      const state = contact_data[j].state;
                      const country = contact_data[j].country;
                      const email = contact_data[j].email;
                      const contact_number = contact_data[j].contact_one;
                      let company_name = "";
                      let lead_category = "";

                      for(k=0;k<company_data.length;k++)
                      {
                         if(company_id === company_data[k].id)
                         {
                             company_name = company_data[k].company_name;
                         }
                      }

                      for(l=0;l<category_data.length;l++)
                      {
                         if(category_id === category_data[l].id)
                         {
                            lead_category = category_data[l].category;
                         }
                      }

                      temp.push({
                        ...followupobj,
                        contact_name:contact_name,
                        city:city,
                        state:state,
                        country:country,
                        email:email,
                        contact_number:contact_number,
                        lead_details:lead_details,
                        company_name:company_name,
                        lead_category:lead_category,
                        contact_id:contact_id
                      })

                   }
                }

             }
          }
        });

        setFollowUpData(temp);
        setFind(true);

      }).catch((error)=>{
        if(error)
        {
           setFind(true);
        }
      });

  }


        return (
          <div className="ms-content-wrapper">
              <div className="row">
                  <div className="col-md-12">
                      <div className="ms-panel">
                        {find !== true ? <CustomLoader/> :
                        <MaterialTable
                          title="Followup"
                          columns={columns}
                          data={followupdata}
                          />
                      }
                      </div>
                  </div>
              </div>
          </div>
        );
    }

export default FollowupreportTable;
