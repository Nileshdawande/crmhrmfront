import React from "react";

const EditDeleteSave=(props)=>
{
   const {edit,save,deleteData,urlData,index,final} = props;
    return(
      <td>
      <span className="material-icons mr-2 display-6" style={{fontSize:"18px",cursor:"pointer"}} onClick={(event)=>{edit(event,final)}}>
           edit
       </span>
       <span className="material-icons mr-2 display-6 d-none" style={{fontSize:"18px",cursor:"pointer"}} onClick={(event)=>{save(event,urlData,index)}}>
            save
        </span>
        <span className="material-icons mr-2 display-6 d-none" style={{fontSize:"18px",cursor:"pointer"}}>
             sync
         </span>
      <span className="material-icons" style={{fontSize:"18px",cursor:"pointer"}} onClick={()=>{deleteData(index,urlData)}}>
           delete
       </span>
      </td>
    )
}

export default EditDeleteSave;
