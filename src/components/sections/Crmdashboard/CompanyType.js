import React,{useState,useEffect} from 'react';
import axios from "axios";
import ApiUrl from "../ServerApi/Api";
import $ from "jquery";

const CompanyType=()=>
{

   const urlData = ApiUrl+"/cmptype/";
   const [companyType,setCompanyType] = useState([]);
   const [show,setShow] = useState(false);
   const [colorSetting,setColorSetting] = useState("");

   useEffect(()=>{
     const ajax = axios({
       method:"GET",
       url:urlData
     });

     ajax.then((response)=>{
       const data = response.data.data;
       setCompanyType(data);
     });
   },[]);


   const viewMore=()=>
   {
      setShow(!show);
      setTimeout(()=>{
        setColor();
      },100);
   }

   const setColor=()=>
   {
       const color = ["bg-danger","bg-primary","bg-success","bg-info"];
       let i;
       for(i=0;i<4;i++)
       {
          const index = Math.floor(Math.random() * 3);;
          const colorData = color[index];
          setColorSetting(colorData);
       }
   }

    return(

        <div className="col-md-6 mb-3">
        <div className="card">
          <div className="card-body">

            <div className="d-flex justify-content-center mb-2">
             <i className="fa fa-user-circle" style={{fontSize:"40px"}}></i>
            </div>

            <div className="mb-2">
              <h6 className="text-center m-0">Company Type</h6>
              <p className="text-center">Total company type : {companyType.length}</p>
              <p className="text-info" onClick={viewMore} style={{cursor:"pointer"}}>View More</p>
            </div>

          {show &&
            <div className="p-2 animate__animated animate__zoomIn">
                <ul className="list-group rounded-0">
                  {
                     companyType.map((data,index)=>(
                       <li className={`list-group-item text-white ${colorSetting}`} key={data.id}>
                       {data.company_type_name}
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

export default CompanyType;