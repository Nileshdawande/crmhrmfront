import React from 'react';
import Designation from "./Designation";
import Department from "./Department";
import Requirement from "./Requirement";
import LeadStatus from "./LeadStatus";
import Interaction from "./Interaction";
import LeadSource from "./LeadSource";
import CompanyType from "./CompanyType";
import Project from "./Project";

const Content=()=>
{
    return(
      <div className="ms-content-wrapper">

          <div className="row">
                <div className="col-md-12">
                    <div className="ms-panel">

                        <div className="ms-panel-header">
                            <h6>CRM DASHBOARD</h6>
                        </div>

                        <div className="ms-panel-body">

                          <div className="row">
                            <Designation/>
                            <Department/>
                            <Requirement/>
                            <LeadStatus/>
                            <Interaction/>
                            <LeadSource/>
                            <CompanyType/>
                            <Project/>
                          </div>

                        </div>
                    </div>
                </div>
          </div>
      </div>
    )
}

export default Content;
