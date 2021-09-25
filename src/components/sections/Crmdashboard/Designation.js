import React,{useState,useEffect} from 'react';
import axios from "axios";
import ApiUrl from "../ServerApi/Api";

const Designation=()=>
{

   const urlData = ApiUrl+"/designation/";
   const [designation,setDesignation] = useState([]);
   const [show,setShow] = useState(false);

   useEffect(()=>{
     const ajax = axios({
       method:"GET",
       url:urlData
     });

     ajax.then((response)=>{
       const data = response.data.data;
       setDesignation(data);
     });
   },[]);


   const viewMore=()=>
   {
      setShow(!show);
   }

    return(

        <div className="col-md-6 mb-3">
        <div className="card">
          <div className="card-body">

            <div className="d-flex justify-content-center mb-2">
             <i className="fa fa-user-circle" style={{fontSize:"40px"}}></i>
            </div>

            <div className="mb-2">
              <h6 className="text-center m-0">Designation</h6>
              <p className="text-center">Total designation : {designation.length}</p>
              <p className="text-info" onClick={viewMore} style={{cursor:"pointer"}}>View More</p>
            </div>

          {show &&
            <div className="p-2 animate__animated animate__zoomIn">
                <ul className="list-group rounded-0">
                  {
                     designation.map((data)=>(
                       <li className="list-group-item d-flex justify-content-between align-items-center" key={data.id}>
                       {data.designation_name}
                       <i className={`fa fa-circle ${data.status ? 'text-success':'text-danger'}`}></i>
                       </li>
                     ))
                  }
                </ul>
            </div>
          }
          </div>
        </div>
        </div>
    )
}

export default Designation;
