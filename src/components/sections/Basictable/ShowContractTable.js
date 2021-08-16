import React,{useState,useEffect} from 'react';
import axios from "axios";
import MaterialTable from 'material-table'
import useGetUpdatehooks from "../Customhooks/useGetUpdatehooks";
import ApiUrl from "../ServerApi/Api";

const ShowContractTable=()=>
{

    const urlData = ApiUrl+"/contract/";
    const {alldata,updateData,deleteData} = useGetUpdatehooks(urlData);
    const [columns,setColumns] = useState([
      {title:"Contract number",field:"contract_number"},
      {title:"Company name",field:"company",lookup:{}},
      {title:"Lead details",field:"lead_id",lookup:{}},
      {title:"Requirement",field:"requirement_category",lookup:{}},
      {title:"Sales employee",field:"sales_employee"},
      {title:"Contract type",field:"contract_type",lookup:{"Time and Materials":"Time and Materials","Fixed":"Fixed"}},
      {title:"Contract description",field:"contract_short_des"},
      {title:"Contract details",field:"contract_detailed"}
    ]);

  useEffect(()=>{

    let temp = columns[3].lookup;
    if(Object.keys(temp).length === 0)
    {
        const ajax1 = axios({
          method:"GET",
          url:ApiUrl+"/company"
        });

        const ajax2 = axios({
          method:"GET",
          url:ApiUrl+"/lead"
        });

        const ajax3 = axios({
          method:"GET",
          url:ApiUrl+"/requirement"
        });

        Promise.all([ajax1,ajax2,ajax3]).then((response)=>{
           const company_res = response[0].data.data;
           const lead_res = response[1].data.data;
           const requirement_res = response[2].data.data;

           let company_column = columns[1];

           company_res.forEach((item, i) =>
           {
               let company_name = item.company_name;
               company_column = {...company_column,lookup:{...company_column.lookup,[company_name]:company_name}};
           });

           let lead_column = columns[2];
           lead_res.forEach((item, i) =>
           {
               let id = item.id;
               let lead_details = item.lead_details;
               lead_column = {...lead_column,lookup:{...lead_column.lookup,[id]:lead_details}};
           });

           let requirement_column = columns[3];
           requirement_res.forEach((item, i) =>
           {
               let r_name = item.requirement_name;
               requirement_column = {...requirement_column,lookup:{...requirement_column.lookup,[r_name]:r_name}};
           });

           const update = [...columns];
           update[1] = company_column;
           update[2] = lead_column;
           update[3] = requirement_column;
           setColumns(update);

        });
    }

  },[columns]);


  return (
    <div className="ms-content-wrapper">
        <div className="row">
            <div className="col-md-12">
                <div className="ms-panel">

                    <div>
                        <MaterialTable
                          title="Requirement table"
                          columns={columns}
                          data={alldata}
                          editable={{
                            onRowUpdate: (newData, oldData) =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const index = oldData.tableData.id;
                                   updateData(newData,oldData,index,resolve);
                                }, 1000)
                              }),
                            onRowDelete: oldData =>
                              new Promise((resolve, reject) => {
                                setTimeout(() => {
                                  const index = oldData.tableData.id;
                                  deleteData(oldData,index,resolve);
                                }, 1000)
                              }),
                          }}

                          />
                    </div>

                </div>
            </div>
        </div>
    </div>

  );
}

export default ShowContractTable;
