import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Preloader from './components/layouts/Preloader';
// import Dashboard from './components/pages/Dashboard';
import "./assets/css/Table.css";
import Accordions from './components/pages/Accordions';
import Addproduct from './components/pages/Addproduct';
import Alerts from './components/pages/Alerts';
import Animations from './components/pages/Animations';
import Badges from './components/pages/Badges';
import Basictables from './components/pages/Basictables';
import Breadcrumbs from './components/pages/Breadcrumbs';
import Buttons from './components/pages/Buttons';
import Cards from './components/pages/Cards';
import Chartjs from './components/pages/Chartjs';
import Chat from './components/pages/Chat';
import Cropper from './components/pages/Cropper';
import Customerlist from './components/pages/Customerlist';
import Customerreview from './components/pages/Customerreview';
import Datatables from './components/pages/Datatables';
import Draggables from './components/pages/Draggables';
import Email from './components/pages/Email';
import Flaticons from './components/pages/Flaticons';
import Fontawesome from './components/pages/Fontawesome';
import Formelements from './components/pages/Formelements';


import Designationmasterelement from './components/pages/Designationmasterelement';
import Showdesignation from './components/pages/Showdesignationelement';
import Dipartmentmasterelement from './components/pages/Dipartmentmasterelement';
import Showdepartment from './components/pages/Showdepartmentelement';
import RequirementType from './components/pages/Requirementelement';
import Showrequirement from './components/pages/Showrequirementelement';
import ShowCompanytypemaster from './components/pages/ShowCompanytypemaster';
import Companytypemaster from './components/pages/Companytypemaster';
import Leadmaster from './components/pages/Leadmasterelement';
import Leadsource from './components/pages/Leadsource';
import Showleadsource from './components/pages/Showleadsourceelement';
import LeadCategory from './components/pages/LeadCategory';
import ShowLeadCategory from './components/pages/ShowLeadCategory';
import Leadstatus from './components/pages/Leadstatus';
import Showleadstatus from './components/pages/Showleadstatus';
import Interactionmethod from './components/pages/Interactionmethod';
import Showinteractionmethod from './components/pages/Showinteractionmethod';
import Leadfollowup from './components/pages/Leadfollowup';
import Leadreports from './components/pages/Leadreports';
import Followupreport from './components/pages/Followupreport';
import Contractelement from './components/pages/Contractelement';
import ShowContractelement from './components/pages/ShowContractelement';
import Projectelement from './components/pages/Projectelement';
import ShowProjectelement from './components/pages/ShowProjectelement';



import Pmsprojectcreate from "./components/pages/Pmsprojectcreate";
import Pmsprojectview from './components/pages/Pmsprojectview';
import Pmsprojecttaskdetails from './components/pages/Pmsprojecttaskdetails';

import TaskTypeMaster from './components/pages/TaskTypeMaster';
import ShowTaskTypeMaster from './components/pages/ShowTaskTypeMaster';
import TaskStatusMaster from './components/pages/TaskStatusMaster';
import ShowTaskStatusMaster from './components/pages/ShowTaskStatusMaster';
import CandidateMaster from './components/pages/CandidateMaster';
import CandidateSkill from './components/pages/CandidateSkill';
import ShowCandidateSkill from './components/pages/ShowCandidateSkill';
import Hrmwizard from './components/pages/Hrmwizard';
import Skillmaster from './components/pages/Skillmaster';
import Techonologywithskill from './components/pages/Techonologywithskill';
import Technologymaster from './components/pages/Technologymaster';
import Showskills from './components/pages/Showskills';
import Showtechnology from './components/pages/Showtechnology';
import Recruitment from './components/pages/Recruitmentelement';
import Showrecruitment from './components/pages/Showrecruitment';
import Recruitmentrequest from './components/pages/Recruitmentrequest';
import Recruitmentrequestwisecandidate from './components/pages/Recruitmentrequestwisecandidate';
import ShowRecreqwisecandidate from './components/pages/ShowRecreqwisecandidate';
import AddInterviewSchedule from './components/pages/AddInterviewSchedule';
import ShowInterviewSchedule from './components/pages/ShowInterviewSchedule';
import AddInterviewType from './components/pages/AddInterviewType';
import ShowInterviewType from './components/pages/ShowInterviewType';
import AddInterviewDetails from './components/pages/AddInterviewDetails';
import ShowInterviewDetails from './components/pages/ShowInterviewDetails';
import CandidateInterviewSchedule from './components/pages/CandidateInterviewSchedule';
import AddCandidateInterviewResult from './components/pages/AddCandidateInterviewResult';
import ShowCandidateInterviewResult from './components/pages/ShowCandidateInterviewResult';
import AddParametermaster from './components/pages/AddParametermaster';
import ShowParametermaster from './components/pages/ShowParametermaster';
import OfferDetails from './components/pages/OfferDetails';
import ShowOfferDetails from './components/pages/ShowOfferDetails';
import SoftlabsBranchMaster from './components/pages/SoftlabsBranchMaster';
import ShowSoftlabsBranchMaster from './components/pages/ShowSoftlabsBranchMaster';
import SoftlabsOfficeMaster from './components/pages/SoftlabsOfficeMaster';
import ShowSoftlabsOfficeMaster from './components/pages/ShowSoftlabsOfficeMaster';
import BranchOfficeMaster from './components/pages/BranchOfficeMaster';
import ShowBranchOfficeMaster from './components/pages/ShowBranchOfficeMaster';
import EmployeeTypeMaster from './components/pages/EmployeeTypeMaster';
import ShowEmployeeTypeMaster from './components/pages/ShowEmployeeTypeMaster';
import EmployeeDepartment from './components/pages/EmployeeDepartment';
import ShowEmployeeDepartment from './components/pages/ShowEmployeeDepartment';
import EmployeeDesignation from './components/pages/EmployeeDesignation';
import ShowEmployeeDesignation from './components/pages/ShowEmployeeDesignation';
import SalaryHead from './components/pages/SalaryHead';
import ShowSalaryHead from './components/pages/ShowSalaryHead';
import EmployeeMaster from './components/pages/EmployeeMaster';
import ShowEmployeeMaster from './components/pages/ShowEmployeeMaster';
import EmployeeAllocation from './components/pages/EmployeeAllocation';
import ShowEmployeeAllocation from './components/pages/ShowEmployeeAllocation';
import EmployeeAllocationDetails from './components/pages/EmployeeAllocationDetails';
import ShowEmployeeAllocationDetails from './components/pages/ShowEmployeeAllocationDetails';
import LeaveTypeMaster from './components/pages/LeaveTypeMaster';
import ShowLeaveTypeMaster from './components/pages/ShowLeaveTypeMaster';
import CmpAnnualLeaveMaster from './components/pages/CmpAnnualLeaveMaster';
import ShowCmpAnnualLeaveMaster from './components/pages/ShowCmpAnnualLeaveMaster';
import EmpAnnulLeaveMaster from './components/pages/EmpAnnulLeaveMaster';
import ShowEmpAnnulLeaveMaster from './components/pages/ShowEmpAnnulLeaveMaster';
import AttendanceDetailsMaster from './components/pages/AttendanceDetailsMaster';
import ShowAttendanceDetailsMaster from './components/pages/ShowAttendanceDetailsMaster';
import EmployeeLeaveMaster from './components/pages/EmployeeLeaveMaster';
import ShowEmployeeLeaveMaster from './components/pages/ShowEmployeeLeaveMaster';
import EmployeeSalary from './components/pages/EmployeeSalary';
import ShowEmployeeSalary from './components/pages/ShowEmployeeSalary';


import UserSignup from './components/pages/UserSignup';
import ShowRegisteredUser from './components/pages/ShowRegisteredUser';
import UserLogin from './components/pages/UserLogin';

import Formlayouts from './components/pages/Formlayouts';
import Formvalidation from './components/pages/Formvalidation';
import Formwizard from './components/pages/Formwizard';
import Googlemaps from './components/pages/Googlemaps';
import Invoicedetail from './components/pages/Invoicedetail';
import Invoicelist from './components/pages/Invoicelist';
import Materialize from './components/pages/Materialize';
import Menucatalogue from './components/pages/Menucatalogue';
import Menugrid from './components/pages/Menugrid';
import Menulist from './components/pages/Menulist';
import Modals from './components/pages/Modals';
import Googlechart from './components/pages/Googlechart';
import Orders from './components/pages/Orders';
import Pagination from './components/pages/Pagination';
import Preloaders from './components/pages/Preloaders';
import Productdetail from './components/pages/Productdetail';
import Progressbars from './components/pages/Progressbars';
import Rangeslider from './components/pages/Rangeslider';
import Rating from './components/pages/Rating';
import Restaurantlist from './components/pages/Restaurantlist';
import Sales from './components/pages/Sales';
import Sliders from './components/pages/Sliders';
import Socialactivity from './components/pages/Socialactivity';
import Sweetalerts from './components/pages/Sweetalerts';
import Tabs from './components/pages/Tabs';
import Toast from './components/pages/Toast';
import Todolist from './components/pages/Todolist';
import Tour from './components/pages/Tour';
import Typography from './components/pages/Typography';
import Vectormaps from './components/pages/Vectormaps';
import Widgets from './components/pages/Widgets';
import Clientmanagement from './components/pages/Clientmanagement';
import Comingsoon from './components/pages/Comingsoon';
import Defaultlogin from './components/pages/Defaultlogin';
import Defaultregister from './components/pages/Defaultregister';
import Error from './components/pages/Error';
import Faq from './components/pages/Faq';
import Invoice from './components/pages/Invoice';
import Lockscreen from './components/pages/Lockscreen';
import Modallogin from './components/pages/Modallogin';
import Modalregister from './components/pages/Modalregister';
import Portfolio from './components/pages/Portfolio';
import Stockmanagement from './components/pages/Stockmanagement';
import Userprofile from './components/pages/Userprofile';
import Webanalytics from './components/pages/Webanalytics';


function App() {
  const [access,setAccess] = useState("");
  const [role,setRole] = useState("");

  useEffect(()=>{
    checkAuth();
  },[]);

  const checkAuth=()=>
  {

     if(sessionStorage.getItem("user") !== null)
     {
         const json = sessionStorage.getItem("user");
         const obj  = JSON.parse(atob(json));
         const role = obj.role;
         const access = obj.access;
         setAccess(access);
         setRole(role);
     }


  }

  return (
    <Router>
      <Preloader/>
      <Switch>
        <Route exact path="/" component={UserSignup} />
        <Route exact path="/login" component={UserLogin} />


        <Route path="/accordions" component={Accordions} />
        <Route path="/add-product" component={Addproduct} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/animations" component={Animations} />
        <Route path="/badges" component={Badges} />
        <Route path="/basic-tables" component={Basictables} />
        <Route path="/breadcrumbs" component={Breadcrumbs} />
        <Route path="/buttons" component={Buttons} />
        <Route path="/cards" component={Cards} />
        <Route path="/chartjs" component={Chartjs} />
        <Route path="/chat" component={Chat} />
        <Route path="/cropper" component={Cropper} />
        <Route path="/customer-list" component={Customerlist} />
        <Route path="/customer-review" component={Customerreview} />
        <Route path="/data-tables" component={Datatables} />
        <Route path="/draggables" component={Draggables} />
        <Route path="/email" component={Email} />
        <Route path="/flaticons" component={Flaticons} />
        <Route path="/fontawesome" component={Fontawesome} />
        <Route path="/form-elements" component={Formelements} />
        <Route path="/form-layouts" component={Formlayouts} />
        <Route path="/form-validation" component={Formvalidation} />
        <Route path="/contacts" component={Formwizard} />
        <Route path="/google-maps" component={Googlemaps} />
        <Route path="/invoice-detail" component={Invoicedetail} />
        <Route path="/invoice-list" component={Invoicelist} />
        <Route path="/materialize" component={Materialize} />
        <Route path="/menu-catalogue" component={Menucatalogue} />
        <Route path="/menu-grid" component={Menugrid} />
        <Route path="/menu-list" component={Menulist} />
        <Route path="/modals" component={Modals} />
        <Route path="/google-chart" component={Googlechart} />
        <Route path="/orders" component={Orders} />
        <Route path="/pagination" component={Pagination} />
        <Route path="/preloaders" component={Preloaders} />
        <Route path="/product-detail" component={Productdetail} />
        <Route path="/progress-bars" component={Progressbars} />
        <Route path="/range-slider" component={Rangeslider} />
        <Route path="/rating" component={Rating} />
        <Route path="/restaurant-list" component={Restaurantlist} />
        <Route path="/sales" component={Sales} />
        <Route path="/sliders" component={Sliders} />
        <Route path="/social-activity" component={Socialactivity} />
        <Route path="/sweet-alerts" component={Sweetalerts} />
        <Route path="/tabs" component={Tabs} />
        <Route path="/toast" component={Toast} />
        <Route path="/todo-list" component={Todolist} />
        <Route path="/tour" component={Tour} />
        <Route path="/typography" component={Typography} />
        <Route path="/vector-maps" component={Vectormaps} />
        <Route path="/widgets" component={Widgets} />
        <Route path="/client-management" component={Clientmanagement} />
        <Route path="/coming-soon" component={Comingsoon} />
        <Route path="/default-login" component={Defaultlogin} />
        <Route path="/default-register" component={Defaultregister} />
        <Route path="/error" component={Error} />
        <Route path="/faq" component={Faq} />
        <Route path="/invoice" component={Invoice} />
        <Route path="/lock-screen" component={Lockscreen} />
        <Route path="/modal-login" component={Modallogin} />
        <Route path="/modal-register" component={Modalregister} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/stock-management" component={Stockmanagement} />
        <Route path="/user-profile" component={Userprofile} />
        <Route path="/web-analytics" component={Webanalytics} />
        { access === "crm" && role=== "management" &&
          <>
        <Route path="/designation-master" component={Designationmasterelement} />
        <Route path="/show-designation" component={Showdesignation} />
        <Route path="/dipartment-master" component={Dipartmentmasterelement} />
        <Route path="/show-department" component={Showdepartment} />
        <Route path="/requirement-type" component={RequirementType} />
        <Route path="/show-requirement" component={Showrequirement} />
        <Route path="/show-companytype" component={ShowCompanytypemaster} />
        <Route path="/add-companytype" component={Companytypemaster} />
        <Route path="/lead-master" component={Leadmaster} />
        <Route path="/lead-source" component={Leadsource} />
        <Route path="/lead-category" component={LeadCategory} />
        <Route path="/show-lead-category" component={ShowLeadCategory} />
        <Route path="/show-lead-source" component={Showleadsource} />
        <Route path="/lead-status" component={Leadstatus} />
        <Route path="/show-lead-status" component={Showleadstatus} />
        <Route path="/interactionmethod" component={Interactionmethod} />
        <Route path="/show-interaction" component={Showinteractionmethod} />
        <Route path="/leadfollowup/:data" component={Leadfollowup} />
        <Route path="/lead-report" component={Leadreports} />
        <Route path="/followup-report" component={Followupreport} />
        <Route path="/contract" component={Contractelement} />
        <Route path="/show-contract" component={ShowContractelement} />
        <Route path="/project" component={Projectelement} />
        <Route path="/show-project" component={ShowProjectelement} />

      </>
  }

        {access==="pms" && role !== ""   &&
        <>
            <Route path="/pms-project" component={Pmsprojectcreate} />
            <Route path="/pms-project-view" component={Pmsprojectview} />
            <Route path="/project-task-details/:id" component={Pmsprojecttaskdetails} />

        </>
      }


        {access === "hrms" && role === "management" &&
          <>
        <Route path="/show-users" component={ShowRegisteredUser} />
        <Route path="/add-task-type" component={TaskTypeMaster} />
        <Route path="/show-task-type" component={ShowTaskTypeMaster} />
        <Route path="/add-task-status" component={TaskStatusMaster} />
        <Route path="/show-task-status" component={ShowTaskStatusMaster} />


        <Route path="/hrmcontact" component={Hrmwizard} />
        <Route path="/candidate-contact" component={CandidateMaster} />
        <Route path="/candidate-skill" component={CandidateSkill} />
        <Route path="/show-candidate-skill" component={ShowCandidateSkill} />
        <Route path="/skill-master" component={Skillmaster} />
        <Route path="/technology-with-skill" component={Techonologywithskill} />
        <Route path="/technology-master" component={Technologymaster} />
        <Route path="/show-skill" component={Showskills} />
        <Route path="/show-technology" component={Showtechnology} />
        <Route path="/recruitment" component={Recruitment} />
        <Route path="/show-recruitment" component={Showrecruitment} />
        <Route path="/recruitment-request" component={Recruitmentrequest} />
        <Route path="/recruitment-request-candidate" component={Recruitmentrequestwisecandidate} />
        <Route path="/show-rec-req-candidate" component={ShowRecreqwisecandidate} />
        <Route path="/interview-schedule" component={AddInterviewSchedule} />
        <Route path="/show-interview-schedule" component={ShowInterviewSchedule} />
        <Route path="/interview-type" component={AddInterviewType} />
        <Route path="/show-interview-type" component={ShowInterviewType} />
        <Route path="/add-interview-details" component={AddInterviewDetails} />
        <Route path="/show-interview-details" component={ShowInterviewDetails} />
        <Route path="/add-canint-schedule" component={CandidateInterviewSchedule} />
        <Route path="/add-can-result" component={AddCandidateInterviewResult} />
        <Route path="/show-can-result" component={ShowCandidateInterviewResult} />
        <Route path="/add-parameter" component={AddParametermaster} />
        <Route path="/show-parameter" component={ShowParametermaster} />
        <Route path="/add-offerdetails" component={OfferDetails} />
        <Route path="/show-offerdetails" component={ShowOfferDetails} />
        <Route path="/softlabs-branchmaster" component={SoftlabsBranchMaster} />
        <Route path="/show-branchmaster" component={ShowSoftlabsBranchMaster} />
        <Route path="/softlabs-officemaster" component={SoftlabsOfficeMaster} />
        <Route path="/show-officemaster" component={ShowSoftlabsOfficeMaster} />
        <Route path="/branch-officemaster" component={BranchOfficeMaster} />
        <Route path="/show-branch-officemaster" component={ShowBranchOfficeMaster} />
        <Route path="/add-employee" component={EmployeeTypeMaster} />
        <Route path="/show-employee" component={ShowEmployeeTypeMaster} />
        <Route path="/employee-department" component={EmployeeDepartment} />
        <Route path="/show-employee-department" component={ShowEmployeeDepartment} />
        <Route path="/employee-designation" component={EmployeeDesignation} />
        <Route path="/show-employee-designation" component={ShowEmployeeDesignation} />
        <Route path="/add-salary" component={SalaryHead} />
        <Route path="/show-salary" component={ShowSalaryHead} />
        <Route path="/emp-master" component={EmployeeMaster} />
        <Route path="/show-emp-master" component={ShowEmployeeMaster} />
        <Route path="/emp-allocation" component={EmployeeAllocation} />
        <Route path="/show-emp-allocation" component={ShowEmployeeAllocation} />
        <Route path="/allocation-details" component={EmployeeAllocationDetails} />
        <Route path="/show-allocation-details" component={ShowEmployeeAllocationDetails} />
        <Route path="/leave-master" component={LeaveTypeMaster} />
        <Route path="/show-leave-master" component={ShowLeaveTypeMaster} />
        <Route path="/cmp-annual" component={CmpAnnualLeaveMaster} />
        <Route path="/show-cmp-annual" component={ShowCmpAnnualLeaveMaster} />
        <Route path="/emp-annual" component={EmpAnnulLeaveMaster} />
        <Route path="/show-emp-annual" component={ShowEmpAnnulLeaveMaster} />
        <Route path="/attendance-master" component={AttendanceDetailsMaster} />
        <Route path="/show-attendance-master" component={ShowAttendanceDetailsMaster} />
        <Route path="/emp-leave-master" component={EmployeeLeaveMaster} />
        <Route path="/show-emp-leave-master" component={ShowEmployeeLeaveMaster} />
        <Route path="/emp-salary" component={EmployeeSalary} />
        <Route path="/show-emp-salary" component={ShowEmployeeSalary} />
        </>
    }

      </Switch>
    </Router>
  );
}

export default App;
