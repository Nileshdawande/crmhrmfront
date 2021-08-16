import React from 'react';

const PaginationUi=(props)=>
{

   const {total,next,prev,search,limit,paginateurl,urlData} = props;
   return(

     <div className="d-flex justify-content-between">

       <div className="btn-group">

         <button className=" d-flex justify-content-center align-items-center border-0 p-1 px-2">
         <span className="text-dark p-1 d-flex justify-content-center align-items-center" style={{fontSize:'20px',cursor:'pointer',width:'50px',height:'33px'}}>Limit</span>
         <select className="form-control rounded-0" style={{width:'fit-content'}} onClick={(event)=>{limit(paginateurl+1,event.target.value)}}>
             <option>1</option>
             <option>2</option>
             <option>4</option>
             <option>8</option>
             <option>16</option>
             <option>20</option>
             <option>30</option>
             <option>50</option>
         </select>
         </button>

       </div>

       {search && <div className="flex-grow-1 px-2">
                <input type="text" name="search" className="form-control mt-2 border-top-0 border-left-0 border-right-0 rounded-0 pl-4" style={{borderStyle:'dashed'}} placeholder="Search here" onChange={(event)=>{search(urlData+event.target.value+"?page=1")}} />
              </div>
            }


       <div className="btn-group">
         <button className=" d-flex justify-content-center align-items-center border-0 p-1 px-2">
         <span className="material-icons border text-dark d-flex justify-content-center align-items-center" style={{fontSize:'30px',cursor:'pointer'}} onClick={()=>{prev(paginateurl)}}>
             keyboard_arrow_left
         </span>

         <span className="material-icons border text-dark  d-flex justify-content-center align-items-center" style={{fontSize:'30px',cursor:'pointer'}} onClick={()=>{next(paginateurl)}}>
             keyboard_arrow_right
         </span>

         <span className="border text-dark  d-flex justify-content-center align-items-center" style={{fontSize:'20px',cursor:'pointer',width:'20px',height:'32px'}}>
             {total}
         </span>
         </button>
       </div>

     </div>
   )
}

export default PaginationUi;
