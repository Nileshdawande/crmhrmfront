import {useState,useEffect} from "react";
import axios from "axios";

const useGetUpdatehooks=(url)=>
{
     const [alldata,setAlldata]  = useState([]);
     const [loginId,setLoginId]  = useState("");
     const [find,setFind] = useState(false);
     useEffect(()=>{

       if(sessionStorage.getItem("user") !== null)
       {
           const json = sessionStorage.getItem("user");
           const obj  = JSON.parse(atob(json));
           const id   = obj.id;
           setLoginId(id);
       }

       const ajax = axios({
         method:"GET",
         url:url,
       });

       ajax.then((response)=>{
         let data = response.data.data;
         setAlldata(data);
         setFind(true);
       });

       ajax.catch((error)=>{
         if(error)
         {
           setFind(true);
         }
       });

     },[url]);

     const updateData=(newData,oldData,index,resolve)=>
     {
         const ajax = axios({
           method:"PUT",
           url:url+oldData.id,
           data:{
             ...newData,
             updated_by:loginId
           }
         });

         ajax.then((response)=>{
           const update = [...alldata];
           update[index] = newData;
           setAlldata(update);
           resolve();
         });

         ajax.catch((error)=>{
           if(error)
           {
             const update = [...alldata];
             update[index] = oldData;
             setAlldata(update);
             resolve();
           }
         });
     }

     const deleteData=(oldData,index,resolve)=>
     {
         const ajax = axios({
           method:"DELETE",
           url:url+oldData.id,
         });

         ajax.then((response)=>{
           const newData = alldata.filter((data,i)=>{
             return index !== i;
           });

           setAlldata(newData);
           resolve();

         });
     }

     return {
       alldata:alldata,
       updateData:updateData,
       deleteData:deleteData,
       find:find
     }


}

export default useGetUpdatehooks;
