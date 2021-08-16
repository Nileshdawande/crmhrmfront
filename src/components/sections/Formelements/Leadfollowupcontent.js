import React, { useState,useEffect } from 'react';
import axios from "axios";
import $ from "jquery";
import ApiUrl from "../ServerApi/Api";

const Leadfollowupcontent=(pdata)=>
{
        let [msg,setmsg] = useState("");
        let [interaction,setinteraction] = useState([]);
        let [status,setstatus] = useState([]);
        let [contact,setContact] = useState([]);

        let [followupdata,setFollowup] = useState([]);

        useEffect(()=>{

          let urldata = "";
          if(typeof JSON.parse(atob(pdata.data.match.params.data)) === "object")
          {
            urldata = JSON.parse((atob(pdata.data.match.params.data)));
            setFollowup(urldata);
          }

            const ajax1 = axios({
                method:"GET",
                url:ApiUrl+"/interaction",
            });

            const ajax2 = axios({
                method:"GET",
                url:ApiUrl+"/lead_status",
            });

            const ajax3 = axios({
              method:"GET",
              url:ApiUrl+"/contact",
            });

            Promise.all([ajax1,ajax2,ajax3]).then((response)=>{

              const interaction_data = response[0].data.data;
              const lead_status_data = response[1].data.data;
              const contact_data     = response[2].data.data;

              contact_data.forEach((cdata)=>{
                  if(cdata.id === urldata.contact_id)
                  {
                     setContact([cdata]);
                  }
               });

               setinteraction(interaction_data);
               setstatus(lead_status_data);

            });


        },[pdata.data.match.params.data]);


        const createLeadFollowup=(event)=>
        {
              event.preventDefault();
              let frm = event.target;
              setmsg("please wait....");
              $(".create_btn").attr("disabled","disabled");
              $(".notice").removeClass("d-none");

              const ajax = axios({
                method:"POST",
                url:ApiUrl+"/followup",
                data:new FormData(event.target)
              });

              ajax.then((response)=>{

                const f_id = response.data.data;

                if(followupdata.apiurl === "interaction")
                {
                  updateLead(f_id)
                }

                if(followupdata.apiurl === "followup")
                {
                  updateFollowup(f_id)
                }

                setmsg("Followup created");
                removemsg();
                frm.reset();

              });
        }

        const updateLead=(id)=>
        {
            axios({
              method:"PUT",
              url:ApiUrl+"/lead/"+followupdata.id,
              data:{
                interaction_id:id,
                fetch_type:"interaction_id"
              }
            });

        }

        const updateFollowup=(id)=>
        {
            axios({
              method:"PUT",
              url:ApiUrl+"/followup/"+followupdata.id,
              data:{
                followup_id:id,
                update_type:"followup"
              }
            });

        }

        const removemsg=()=>
        {
            setTimeout(()=>{
                setmsg("");
                $(".create_btn").removeAttr("disabled");
                $(".notice").addClass("d-none");
            },3000);
        }



        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Lead follow up</h6>
                            </div>
                            <div className="ms-panel-body">
                                <form onSubmit={createLeadFollowup}>
                                    <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label>Interaction date</label>
                                        <input type="date" className="form-control" name="interaction_date" required="required" />
                                        </div>

                                        <div className="form-group d-none">
                                        <label>Interaction date</label>
                                        <input type="text" className="form-control" name="store_type" defaultValue={followupdata !== null ? followupdata.apiurl : ''} />
                                        </div>

                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label>Lead</label>
                                        <select name="lead_id" className="form-control">
                                          {
                                            contact.map((cdata,index)=>(
                                              <option value={cdata.id} key={cdata.id}>{cdata.firstname}</option>
                                            ))
                                          }
                                        </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label>Interacting using</label>
                                        <select name="interaction_name" className="form-control">
                                            {
                                              interaction.map((final)=>(
                                                <option key={final.id}>{final.interaction_name}</option>
                                                ))
                                            }
                                        </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label>Lead weight</label>
                                        <select className="form-control" name="lead_weight" required="required">
                                          <option>High Priority</option>
                                          <option>Medium Priority</option>
                                          <option>General Priority</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                        <label>Lead status</label>
                                        <select name="lead_status" className="form-control">
                                            {
                                              status.map((final)=>(
                                                <option key={final.id}>{final.status}</option>
                                                ))
                                            }
                                        </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">

                                        <div className="form-group">
                                        <label>Next followup date</label>
                                        <input type="date" className="form-control"  name="next_followup_date" required="required" />
                                        </div>

                                    </div>

                                    <div className="col-md-12">
                                        <label>Remarks</label>
                                        <textarea className="form-control" name="remarks"></textarea>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <button className="btn btn-danger rounded-0 create_btn" type="submit">Submit</button>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="alert alert-danger rounded-0 font-weight-bold text-center d-none notice">
                                        {msg}
                                        </div>
                                    </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        );
    }


export default Leadfollowupcontent;
