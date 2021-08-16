import {useState,useEffect} from 'react';
import axios from "axios";
import $ from "jquery";
const useAajaxhooks=(url_link='',limit='')=>
{
     const [msg,setMsg] = useState("");
     const [alldata,setAlldata] = useState([]);
     const [total,setTotal] = useState(0);
     const [last_page,setLastPage] = useState(0);
     const [page,setPage] = useState(1);
     const [s_limit,settinglimit] = useState(0);
     const [tempData,setTempData] = useState([]);


     useEffect(()=>{

       if(url_link !== "" && limit !== "")
       {
          getPaginationData(url_link,limit);
       }

     },[url_link,limit]);

     const storeData=async(event,url)=>
     {
          event.preventDefault();
          const frm = event.target;
          setMsg("Please wait....");
          $(".notice").removeClass("d-none");
          $(".create_btn").attr("disabled",true);
          try
          {
            const ajax = await axios({
              method:"POST",
              url:url,
              data:new FormData(event.target)
            });
            setMsg("Recrord created");
            frm.reset();
            removeMsg(alert);
            return ajax;
          }

          catch(error)
          {
              if(error)
              {
                 setMsg("Something went wrong try again");
                 removeMsg();
              }
          }

     }


     const getPaginationData=async(url_link,limit)=>
     {
          settinglimit(limit);
          const ajax = await axios({
             method:"GET",
             url:url_link,
             params:{
               limit:limit
             }
           });

           let data = ajax.data.data.data;
           let total = ajax.data.data.total;
           let last_n = ajax.data.data.last_page;
           setTotal(total);
           setLastPage(last_n);
           setAlldata(data);

     }

     const nextData=(url)=>
     {
          if(page<last_page)
          {
             let p_no = page+1;
             setPage(p_no);
             getPaginationData(url+p_no,s_limit);
          }

          else
          {
              setPage(1);
              getPaginationData(url+1,s_limit);
          }
     }

     const prevData=(url)=>
     {
          if(page>1)
          {
             let p_no = page-1;
             setPage(p_no);
             getPaginationData(url+p_no,s_limit);
          }

          else
          {
              setPage(last_page);
              getPaginationData(url+last_page,s_limit);
          }
     }

     const setLimit=(url,limit)=>
     {
         getPaginationData(url,limit);
     }

     const searchData=(url)=>
     {
         getPaginationData(url,s_limit);
     }

     const editPaginate=(event,object)=>
     {
         const edit_btn = event.target;
         $(edit_btn).addClass("d-none");
         const tr = edit_btn.parentElement.parentElement;
         const span = tr.getElementsByTagName("SPAN");
         const input = tr.getElementsByTagName("INPUT");
         const select = tr.getElementsByTagName("SELECT");
         $(span[1]).removeClass("d-none");
         let i;
         for(i=0;i<input.length;i++)
         {
            input[i].disabled = false;
         }

         for(i=0;i<select.length;i++)
         {
            select[i].disabled = false;
         }

         if(input[0])
         {
            input[0].focus();
         }
         else
         {
            select[0].focus();
         }

         setTempData([object]);

     }

     const saveData=async(event,url,index)=>
     {
         const obj = alldata[index];
         const save_btn = event.target;
         $(save_btn).addClass("d-none");
         const tr = save_btn.parentElement.parentElement;
         const span = tr.getElementsByTagName("SPAN");
         const input = tr.getElementsByTagName("INPUT");
         const select = tr.getElementsByTagName("SELECT");

         try
         {
            $(span[2]).removeClass("d-none");
             const ajax = await axios({
               method:"PUT",
               url:url+obj.id,
               data:{
                 ...obj,
               }
             });

             console.log(ajax);

             let i;
             for(i=0;i<input.length;i++)
             {
                input[i].disabled = true;
             }

             for(i=0;i<select.length;i++)
             {
                select[i].disabled = true;
             }

             $(span[2]).addClass("d-none");
             $(span[0]).removeClass("d-none");

         }

         catch(error)
         {
            if(error)
            {
                $(span[2]).addClass("d-none");
                $(span[1]).removeClass("d-none");
                input[0] ? input[0].focus() : select[0].focus();
                let newData = alldata.map((obj,i)=>{
                   return index===i ? tempData[0] : obj;
                });

                setAlldata(newData);
            }
         }


     }

     const deleteData=async(index,url)=>
     {
         const confirm = window.confirm("Do you want to delete ?");
         const object = alldata[index];
         if(confirm)
         {
            $(".notice").removeClass("d-none");
            setMsg("Please wait....");

            await axios({
              method:"DELETE",
              url:url+object.id
            });

            setMsg("Delete Success");
            removeMsg(".notice");
            setTotal(total-1);
            let newData = alldata.filter((obj,i)=>{
               return index !== i;
            });

            setAlldata(newData);

         }
     }


     const handleInput=(event,index)=>
     {
         let name = event.target.name;
         let val  = event.target.value;

         let newData = alldata.map((obj,i)=>{
           return index===i ? {...obj,[name]:val} : obj;
         });

         setAlldata(newData);
     }

     const removeMsg=()=>
     {
         setTimeout(()=>{
           setMsg("");
           $(".notice").addClass("d-none");
           $(".create_btn").removeAttr("disabled");
         },3000);
     }


     return {
       addData:storeData,
       notice:msg,
       total:total,
       alldata:alldata,
       next:nextData,
       prev:prevData,
       limit:setLimit,
       search:searchData,
       edit:editPaginate,
       save:saveData,
       deleteData:deleteData,
       handleInput:handleInput
     }


}

export default useAajaxhooks;
