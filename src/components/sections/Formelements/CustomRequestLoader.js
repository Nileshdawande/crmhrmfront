import React from "react";
import "../../../assets/css/CustomRequestLoader.css";

const CustomRequestLoader=()=>
{
   return(
     <div className="fullpageloader">
       <div className="lds-spinner">
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
         <div></div>
       </div>
     </div>
   )
}

export default CustomRequestLoader;
