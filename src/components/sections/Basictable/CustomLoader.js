import React from "react";
import "../../../assets/css/CustomLoader.css";

const CustomLoader=()=>
{
   return(
     <div className="beforeSendLoader">
       <div className="loader">
         <div className="loader_inner">L</div>
         <div className="circle_1">
           <div className="circle_2" />
         </div>
         <div className="loader_inner_1">ADING</div>
       </div>
     </div>
   )
}

export default CustomLoader;
