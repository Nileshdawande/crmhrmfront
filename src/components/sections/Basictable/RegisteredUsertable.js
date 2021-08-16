import React,{useState,useEffect} from 'react';
import axios from "axios";
import MaterialTable from 'material-table'
import Select from 'react-select';
import CustomLoader from "./CustomLoader";
import ApiUrl from "../ServerApi/Api";

const RegisteredUsertable=()=>
{
    const [alldata,setAlldata] = useState([]);
    const [find,setFind] = useState(false);
    const useraccess = [{value:"crm",label:"crm"},{value:"hrms",label:"hrms"},{value:"pms",label:"pms"}];
     const columns = [
       {title:"Username",field:"firstname"},
       {title:"Email id",field:"email"},
       {title:"Status",field:"status",lookup:{1:"Active",0:"Deactive"}},
       {title:"Role",field:"role",lookup:{"management":"management","employee":"employee"}},
       {title:"Access",field:"access",cellStyle: {width: '350px',},
       render: rowData => <Select isMulti={true} />,
       editComponent: props => (
         <Select isMulti={true}
           options={useraccess}
           onChange={e => props.onChange(e)}
           defaultValue={props.rowData.access}
           />
       )}
     ];

     useEffect(()=>{
       const ajax1 = axios({
         method:"GET",
         url:ApiUrl+"/user"
       });

       Promise.all([ajax1]).then((response)=>{

         const data = response[0].data.data;
         const userdata = [];
         data.forEach((user_obj)=>{
           const newData = JSON.parse(user_obj.access).map((accessdata)=>{
             return {value:accessdata.url,label:accessdata.url};
           });
           userdata.push({...user_obj,access:newData});
         });

         setAlldata(userdata);
         setFind(true);
       }).catch((error)=>{
         if(error)
         {
            setFind(true);
         }
       });

     },[]);

     const updateUserManagement=(newData,oldData,index,resolve)=>
     {

           const json = sessionStorage.getItem("user");
           const obj  = JSON.parse(atob(json));
           const loginId = obj.id;

         const a_data = newData.access.map((accessdata,i)=>{
           return {"url":accessdata.value};
         });
         const data = {...newData,access:a_data};

         const ajax = axios({
           method:"PUT",
           url:ApiUrl+"/user/"+oldData.id,
           data:{
             ...data,
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

     const deleteUsers=(oldData,index,resolve)=>
     {
         const ajax = axios({
           method:"DELETE",
           url:ApiUrl+"/user/"+oldData.id
         });

         ajax.then((response)=>{
           const newData = alldata.filter((data,i)=>{
              return index !== i;
           });
           setAlldata(newData);
           resolve();
         });

         ajax.catch((error)=>{
           if(error)
           {
             resolve();
           }
         });
     }

        return (
            <div className="ms-content-wrapper">
                <div className="row">

                    <div className="col-md-12">
                        <div className="ms-panel">
                          {find !== true ? <CustomLoader/> :
                          <MaterialTable
                            title="User management"
                            columns={columns}
                            data={alldata}
                            editable={{

                              onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                  setTimeout(() => {
                                    const index = oldData.tableData.id;
                                    updateUserManagement(newData,oldData,index,resolve);
                                  }, 1000)
                                }),
                              onRowDelete: oldData =>
                                new Promise((resolve, reject) => {
                                  setTimeout(() => {
                                    const index = oldData.tableData.id;
                                    deleteUsers(oldData,index,resolve);
                                  }, 1000)
                                }),
                            }}

                            />
                        }
                        </div>

                    </div>
                </div>
            </div>

        );

}

export default RegisteredUsertable;
