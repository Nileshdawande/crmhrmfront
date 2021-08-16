import React,{useState,useEffect} from 'react';
import axios from "axios";
import MaterialTable from 'material-table'
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import TaskModal from "./TaskModal";

import $ from "jquery";
import ApiUrl from "../ServerApi/Api";

const ShowProjectelementTable=()=>
{

    const [alldata,setAlldata] = useState([]);
    const [allusers,setAllusers] = useState([]);
    const [contract,setContract] = useState([]);
    const [status,setStatus] = useState([]);
    const [requirement,setRequirement] = useState([]);

    const [modaldata,setModaldata] = useState(null);
    const [show, setShow] = useState(false);
    const [defaultUsers,setDefaultUsers] = useState([]);
    const [remainingUsers,setremainingUsers] = useState([]);
    const [msg,setMsg] = useState("");

    const [taskmodalopen,settaskmodalopen] = useState(false);
    const [projectId,setProjectId] = useState("");

    const [columns,setColumns] = useState([
      {title:"Project name",field:"project_name"},
      {title:"Contract number",field:"contract_name",lookup:{}},
      {
        title:"Project start date",field:"project_start_date",editComponent: props => (
          <input
            type="date"
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
            className="border-0"
          />
        )

      },

      {
        title:"Project expected date",field:"project_expected_date",editComponent: props => (
            <input
              type="date"
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
              className="border-0"
            />
          )
     },

      {
        title:"Project actual date",field:"project_actual_date",editComponent: props => (
            <input
              type="date"
              value={props.value}
              onChange={e => props.onChange(e.target.value)}
              className="border-0"
            />
          )
      },
      {title:"Requirement category",field:"requirement_category",lookup:{}},
      {title:"Project leader",field:"project_leader",lookup:{}},
      {title:"Status",field:"status",lookup:{}},
      {title:"Project key",field:"project_key"},
      {title:"Create activity",render:rowData=><button className='btn btn-primary rounded-0 p-0 py-2' onClick={()=>{handleShowTaskModal(rowData.id)}}>Create activity</button>}
    ]);


    useEffect(()=>{
      let temp = columns[1].lookup;
      if(Object.keys(temp).length === 0)
      {

        const ajax1 = axios({
            method:"GET",
            url:ApiUrl+"/contract",
        });

        const ajax2 = axios({
            method:"GET",
            url:ApiUrl+"/requirement",
        });

        const ajax3 = axios({
          method:"GET",
          url:ApiUrl+"/task-status-master"
        });

        const ajax4 = axios({
          method:"GET",
          url:ApiUrl+"/user"
        });

        const ajax5 = axios({
          method:"GET",
          url:ApiUrl+"/project/"
        });


        Promise.all([ajax1,ajax2,ajax3,ajax4,ajax5]).then((response)=>{
            const contract_res = response[0];
            setContract(contract_res.data.data);

            const req_res = response[1];
            setRequirement(req_res.data.data);

            const status_res = response[2];
            setStatus(status_res.data.data);

            const users = response[3];
            setAllusers(users.data.data);

            const project_res = response[4];
            const contract_data = contract_res.data.data;
            let contract_column = columns[1];

            contract_data.forEach((contract_obj,i)=>{
               let key = contract_obj.contract_number;
               contract_column = {...contract_column,lookup:{...contract_column.lookup,[key]:key}};
            });

            const req_data = req_res.data.data;
            let req_column = columns[5];

            req_data.forEach((req_obj,i)=>{
               let key = req_obj.requirement_name;
               req_column = {...req_column,lookup:{...req_column.lookup,[key]:key}};
            });

            const status_data = status_res.data.data;
            let status_column = columns[7];

            status_data.forEach((status_obj,i)=>{
               let key = status_obj.status;
               status_column = {...status_column,lookup:{...status_column.lookup,[key]:key}};
            });

            const user_data = users.data.data;
            let user_column = columns[6];

            user_data.forEach((user_obj,i)=>{
               let key = user_obj.id;
               let val = user_obj.firstname;
               user_column = {...user_column,lookup:{...user_column.lookup,[key]:val}};
            });



            setAlldata(project_res.data.data);
            const allcolumn = [...columns];
            allcolumn[1] = contract_column;
            allcolumn[5] = req_column;
            allcolumn[7] = status_column;
            allcolumn[6] = user_column;
            setColumns(allcolumn);

        });


      }

    },[columns]);


    const updateProjectData=(newData, oldData,resolve,index)=>
    {

         const ajax = axios({
           method:"PUT",
           url:ApiUrl+"/project/"+oldData.id,
           data:{
             ...newData,
           }
         });

         ajax.then((response)=>{
           const index = oldData.tableData.id;
           const update = [...alldata];
           update[index] = {...newData};
           setAlldata(update);
           resolve();
         });

         ajax.catch((error)=>{
           if(error)
           {
             const index = oldData.tableData.id;
             const update = [...alldata];
             update[index] = oldData;
             setAlldata(update);
             resolve();
           }
         });

    }

    const deleteProject=(oldData,index,resolve)=>
    {
         const ajax = axios({
           method:"DELETE",
           url:ApiUrl+"/project/"+oldData.id
         });

         ajax.then((response)=>{
           const newData = alldata.filter((obj,i)=>{
             return index !== i;
           });
           setAlldata(newData);
           resolve();
         });
    }

    const handleModal=(rowData)=>
    {

       const members = JSON.parse(rowData.members);
       const temp_user = [];

       members.forEach((member,i)=>{

         allusers.map((userobj,index)=>{
           if(userobj.id === Number(member))
           {
              temp_user.push({value:userobj.id,label:userobj.firstname});
           }
         });

       });


       const rem_user = allusers.map((user_obj,i)=>{
         return {value:user_obj.id,label:user_obj.firstname};
       });

       setDefaultUsers(temp_user);
       setremainingUsers(rem_user);
       setShow(true);
       setModaldata(rowData);

    }

    const handleInput=(event)=>
    {
       const name = event.target.name;
       const val  = event.target.value;
       const newData = {...modaldata,[name]:val};
       setModaldata(newData);
    }

    const updateModalData=(event)=>
    {
        event.preventDefault();
        $(".notice").removeClass("d-none");
        setMsg("Please wait....");
        $(".update_btn").attr("disabled","disabled");
        const frm = event.target;

        const ajax = axios({
          method:"PUT",
          url:ApiUrl+"/project/"+modaldata.id,
          data:{
            ...modaldata
          }
        });

        ajax.then((response)=>{
          setMsg("Update Success");
          $(".notice").addClass("alert-success");
          frm.reset();
          const index = modaldata.tableData.id;
          const update = [...alldata];
          update[index] = modaldata;
          setAlldata(update);
          setTimeout(()=>{
            $(".notice").addClass("d-none");
            $(".notice").removeClass("alert-success");
            setMsg("");
            $(".update_btn").removeAttr("disabled");
            setShow(false);
          },2000);
        });

        ajax.catch((error)=>{
          if(error)
          {
            setMsg("update failed");
            $(".notice").addClass("alert-danger");
            setTimeout(()=>{
              $(".notice").addClass("d-none");
              $(".notice").removeClass("alert-danger");
              setMsg("");
              $(".update_btn").removeAttr("disabled");
            },2000);
          }
        });

    }

    const handleMember=(event)=>
    {
        let members_data = event.map((data)=>{
          return data.value.toString();
        });

        members_data = JSON.stringify(members_data);
        const newData = {...modaldata,members:members_data};
        setModaldata(newData);
    }

    const handleClose = () => setShow(false);


    const handleShowTaskModal=(id)=>
    {
       settaskmodalopen(true);
       setProjectId(id);

    }

    const handleCloseTaskModal=()=>
    {
       settaskmodalopen(false);
    }

    return (
        <div className="ms-content-wrapper">
            <div className="row">
                <div className="col-md-12">
                    <div className="ms-panel-body">

                      <MaterialTable
                        title="Project master"
                        columns={columns}
                        data={alldata}
                        actions={[
                          {
                            icon: 'visibility',
                            tooltip: 'View more',
                            onClick: (event, rowData) => {handleModal(rowData)}
                          }
                        ]}
                        editable={{

                          onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                                  const index = oldData.tableData.id
                                  updateProjectData(newData, oldData,resolve,index);
                              }, 1000)
                            }),
                          onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                              setTimeout(() => {
                              const index = oldData.tableData.id;
                               deleteProject(oldData,index,resolve);
                              }, 1000)
                            }),
                        }}
                        />

                      <Modal show={show} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                          <h6>Project : {modaldata !== null && modaldata.project_name}</h6>
                        </Modal.Header>
                        <Modal.Body>
                        <form onSubmit={(event)=>{updateModalData(event)}}>
                          <div className="row">

                          <div className="col-md-6">
                            <div className="form-group">
                            <label>Project name</label>
                            <input type="text" className="form-control rounded-0" name="project_name" value={modaldata !== null && modaldata.project_name} onChange={handleInput} />
                            </div>

                            <div className="form-group">
                            <label>Project start date</label>
                            <input type="date" className="form-control rounded-0" name="project_start_date" value={modaldata !== null && modaldata.project_start_date} onChange={handleInput} />
                            </div>

                            <div className="form-group">
                            <label>Project actual date</label>
                            <input type="date" className="form-control rounded-0" name="project_actual_date" value={modaldata !== null && modaldata.project_actual_date} onChange={handleInput} />
                            </div>

                            <div className="form-group">
                            <label>Project leader</label>
                            <select className="form-control rounded-0" name="project_leader" value={modaldata !== null && modaldata.project_leader} onChange={handleInput}>
                            {
                              allusers.map((user_data,i)=>(
                                <option key={user_data.id} value={user_data.id}>{user_data.firstname}</option>
                              ))
                            }
                            </select>
                            </div>

                            <div className="form-group">
                            <label>Project status</label>
                            <select className="form-control rounded-0" name="status" value={modaldata !== null && modaldata.status} onChange={handleInput}>
                            {
                              status.map((status_data,i)=>(
                                <option key={status_data.id}>{status_data.status}</option>
                              ))
                            }
                            </select>
                            </div>

                          </div>

                          <div className="col-md-6">

                          <div className="form-group">
                          <label>Contract number</label>
                          <select className="form-control rounded-0" name="contract_name" value={modaldata !== null && modaldata.contract_name} onChange={handleInput}>
                          {
                            contract.map((contract_data,i)=>(
                              <option key={contract_data.id}>{contract_data.contract_number}</option>
                            ))
                          }
                          </select>
                          </div>

                          <div className="form-group">
                          <label>Project expected date</label>
                          <input type="date" className="form-control rounded-0" name="project_expected_date" value={modaldata !== null && modaldata.project_expected_date} onChange={handleInput} />
                          </div>

                          <div className="form-group">
                          <label>Requiement category</label>
                          <select className="form-control rounded-0" name="requirement_category" value={modaldata !== null && modaldata.requirement_category} onChange={handleInput}>
                          {
                            requirement.map((requirement_data,i)=>(
                              <option key={requirement_data.id}>{requirement_data.requirement_name}</option>
                            ))
                          }
                          </select>
                          </div>

                          <div className="form-group">
                          <label>Members</label>
                          <Select
                          defaultValue={defaultUsers}
                          isMulti={true}
                          options={remainingUsers}
                          onChange={handleMember}
                          />
                          </div>

                          <div className="form-group">
                          <label>Project key</label>
                          <input type="text" className="form-control rounded-0" name="project_key" value={modaldata !== null && modaldata.project_key} onChange={handleInput} />
                          </div>

                          </div>

                          <div className="col-md-12">

                          <div className="form-group">
                          <label>Project details</label>
                          <textarea className="form-control" name="project_details" value={modaldata !== null && modaldata.project_details} onChange={handleInput}></textarea>
                          </div>

                          <div className="form-group">
                          <button className="btn btn-danger rounded-0 update_btn" type="submit">Save changes</button>
                          </div>

                          <div className="alert notice rounded-0 text-center d-none">
                          {msg}
                          </div>

                          </div>

                          </div>

                        </form>
                        </Modal.Body>

                      </Modal>

                      <TaskModal modal={taskmodalopen} closemodal={handleCloseTaskModal} projectId={projectId} />

                    </div>
                </div>
            </div>
        </div>
    );

}

export default ShowProjectelementTable;
