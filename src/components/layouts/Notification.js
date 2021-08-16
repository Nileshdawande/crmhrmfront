import React from "react";

const Notification=(props)=>
{
   return(
     <div className="d-flex justify-content-center w-75" style={{position:"fixed",bottom:"10px",zIndex:"10000"}}>
       <div className="alert alert-danger rounded-0 w-50 notice_url d-none">
       <h6 className="text-center">{props.msg}</h6>
       </div>
    </div>
   )
}

export default Notification;
