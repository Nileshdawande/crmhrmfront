import React,{useState,useEffect} from "react";
import Modal from 'react-bootstrap/Modal';
import $ from "jquery";
import axios from "axios";
import PropTypes from 'prop-types';
import { EditorState,convertToRaw} from 'draft-js';
import Texteditor from "./Texteditor";
import ApiUrl from "../ServerApi/Api";

const TaskModal=(props)=>
{

   const prop_data = props;
   const [taskModal,setTaskModal] = useState(false);
   const [msg,setMsg] = useState("Please select project name");
   const [projectParent,setProjectParent] = useState([]);
   const [userid,setuserid] = useState("");
   const [users,setUser] = useState([]);
   const [taskStatus,settaskStatus] = useState([]);
   const [taskType,setTaskType] = useState([]);
   const [project,setProject] = useState([]);
   const [projectNameUser,setprojectNameUser] = useState([]);
   const [startDate,setStartDate] = useState("");
   const [endDate,setEndDate] = useState("");
   const [dateNotice,setDateNotice] = useState(true);

   const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
   const [editorContent,seteditorContent] = useState("");

   useEffect(()=>{

     if(props.modal === true)
     {

         if(sessionStorage.getItem("user") !== null)
         {
            const json_str = sessionStorage.getItem("user");
            const json_obj = JSON.parse(atob(json_str));
            const role = json_obj.role;
            const user_id = json_obj.id;
            setuserid(user_id);

            const ajax1 = axios({
              method:"GET",
              url:ApiUrl+"/pms-task"
            });

            ajax1.then((response)=>{
              const pmstaskdata = response.data.data;
              setProjectParent(pmstaskdata);
            });

            const ajax2 = axios({
              method:"GET",
              url:ApiUrl+"/task-status-master"
            });

            const ajax3 = axios({
              method:"GET",
              url:ApiUrl+"/task-type-master"
            });

            let ajax4;

            if(role === "management" && props.projectId === 0)
            {
                const ajaxdata = axios({
                  method:"GET",
                  url:ApiUrl+"/project/",
                });

                ajax4 = ajaxdata;
            }

            if(role === "employee" && props.projectId === 0)
            {
                const ajaxdata = axios({
                  method:"GET",
                  url:ApiUrl+"/project/"+user_id,
                  params:{
                    fetch_type:"userid"
                  }
                });
                ajax4 = ajaxdata;
            }

            if(props.projectId !== 0)
            {
                const ajaxdata = axios({
                  method:"GET",
                  url:ApiUrl+"/project/"+props.projectId,
                });

                ajax4 = ajaxdata;
            }

            const ajax5 = axios({
              method:"GET",
              url:ApiUrl+"/user"
            });

            Promise.all([ajax2,ajax3,ajax4,ajax5]).then((response)=>{

              const taskstatusdata = response[0].data.data;
              settaskStatus(taskstatusdata);

              const taskTypedata = response[1].data.data;
              setTaskType(taskTypedata);

              const projectData = response[2].data.data;
              setProject(projectData);

              const userdata = response[3].data.data;

              if(props.projectId !== 0)
              {
                 const alloption = $("option",".project_name");
                 alloption[0].remove();
                 setMsg("");
                 $(".create_btn").removeAttr("disabled");
                 const users_short_project = [];
                 projectData.forEach((projectObj)=>{

                   if(projectObj.id === props.projectId)
                   {
                        userdata.forEach((userobj)=>{
                          if(projectObj.project_leader === userobj.id)
                          {
                             users_short_project.push(userobj);
                          }
                          else
                          {
                              JSON.parse(projectObj.members).forEach((member)=>{

                                if(userobj.id === Number(member))
                                {
                                   users_short_project.push(userobj);
                                }
                              });
                          }

                        });
                   }

                 });

                 setprojectNameUser(users_short_project);
              }

              setUser(userdata);

            });


         }

         else
         {
            window.location = "/";
         }
     }



   },[props.projectId,props.modal]);


   const createProjectTask=(event)=>
   {

        event.preventDefault();
        const frm = event.target;

        $(".create_btn").attr("disabled","disabled");
        $(".notice").removeClass("d-none");
        setMsg("Please wait....");
          let newData = new FormData(event.target);
          newData.append("description",editorContent);
          const ajax = axios({
            method:"POST",
            url:ApiUrl+"/pms-task",
            data:newData
          });

          ajax.then((response)=>{
            prop_data.data.addlatestTask(response.data.data);
            setMsg("Task created");
            $(".notice").addClass("alert-success");
            frm.reset();
            removeMsg();
            setEditorState(EditorState.createEmpty());
            setStartDate("");
            setEndDate("");
            seteditorContent("");
            setTimeout(()=>{
               setTaskModal(!taskModal);
               props.closemodal();
            },1000);
          });

          ajax.catch((error)=>{
            if(error)
            {
              setMsg("Something is wrong try again");
              $(".notice").addClass("alert-danger");
              removeMsg();
            }
          })


   }



   const projectNameHandle=()=>
   {
       const index = document.querySelector(".project_name").selectedIndex;
       if(index !== 0)
       {

         setMsg("");
         $(".notice").addClass("d-none");
         $(".create_btn").removeAttr("disabled");

          const alloption = $("option",".project_name");
          const project_in = $(alloption[index]).attr("index");
          const project_d = project[project_in];
          const temp = [];

           users.forEach((userobj,ind)=>{

             if(userobj.id === project_d.project_leader)
             {
                 temp.push(userobj);
             }

             else
             {
               JSON.parse(project_d.members).forEach((member)=>{

                 if(userobj.id === Number(member))
                 {
                    temp.push(userobj);
                 }
               });
             }

          });

          setprojectNameUser(temp);
       }

       else
       {
          setMsg("Please select project name");
          $(".notice").removeClass("d-none");
          $(".create_btn").attr("disabled","disabled");
       }
   }


   const handleStartDateInput=(event)=>
   {
       const s_date = event.target.value;
       setStartDate(s_date);
       if(endDate !== "")
       {
         const start_date = new Date(s_date);
         const end_date = new Date(endDate);
         if(start_date<=end_date)
         {
            setDateNotice(true);
            $(".create_btn").removeAttr("disabled");
         }

         else
         {
             setDateNotice(false);
             $(".create_btn").attr("disabled","disabled");
         }
       }
   }

   const handleEndDateInput=(event)=>
   {
       const e_date = event.target.value;
       setEndDate(e_date);
       if(startDate !== "")
       {
           const start_date = new Date(startDate);
           const end_date = new Date(e_date);
            if(start_date<=end_date)
            {
               setDateNotice(true);
               $(".create_btn").removeAttr("disabled");
            }

            else
            {
                setDateNotice(false);
                $(".create_btn").attr("disabled","disabled");
            }
       }
   }

   const handleEditorChange=(editorState)=>
   {
      setEditorState(editorState);
      let currentContentAsHTML = convertToRaw(editorState.getCurrentContent());
      seteditorContent(JSON.stringify(currentContentAsHTML));
   }

   const getFileBase64 = (file, callback) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = error => {};
  };

   const imageUploadCallback = file => new Promise(
     (resolve, reject) => getFileBase64(
       file,
       data => resolve({ data: { link: data } })
     )
   );


   const removeMsg=()=>
   {
      setTimeout(()=>{
        $(".notice").addClass("d-none");
        $(".notice").removeClass("alert-danger alert-success");
        $(".create_btn").removeAttr("disabled");
        setMsg("");
      },3000);
   }

    return(
      <div>
      <Modal show={props.modal} onHide={props.closemodal} size="lg">

        <Modal.Header closeButton>
          <h4 className="modal-title">Create task</h4>
        </Modal.Header>

        <Modal.Body>
        <form onSubmit={(event)=>{createProjectTask(event)}} style={{height:"80vh",overflowY:"auto"}}>

          <div className="form-group">
            <label>Parent task</label>
            <select className="form-control rounded-0" name="parent_task_id">
              <option value="0">Select parent task</option>
              {
                projectParent.map((data,i)=>(
                  <option key={data.id} value={data.id}>{"#"+data.id+": "+data.summary}</option>
                ))
              }
            </select>
          </div>

          <div className="form-group d-none">
            <label>Created by</label>
            <input type="text" defaultValue={userid} className="form-control rounded-0" name="created_by" />
          </div>

          <div className="form-group d-none">
            <label>Updated by</label>
            <input type="text" defaultValue={userid} className="form-control rounded-0" name="updated_by" />
          </div>

          <div className="form-group">
            <label>Project name</label>
            <select className="form-control rounded-0 project_name" name="project_id" onChange={projectNameHandle}>
              <option value="0">Select project name</option>
              {
                project.map((projectData,i)=>(
                  <option key={projectData.id} value={projectData.id} index={i}>{projectData.project_name}</option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label>Task type</label>
            <select className="form-control rounded-0" name="type_id">
              {
                taskType.map((taskTypData,i)=>(
                  <option key={taskTypData.id} value={taskTypData.id}>{taskTypData.type}</option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label>Task status</label>
            <select className="form-control rounded-0" name="status_id">
              {
                taskStatus.map((taskStatusData,i)=>(
                  <option key={taskStatusData.id} value={taskStatusData.id}>{taskStatusData.status}</option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label>Summary</label>
            <textarea className="form-control rounded-0" name="summary" required="required"></textarea>
          </div>

          <div className="form-group">
            <label>Description</label>
            <Texteditor
              textupload={handleEditorChange}
              picupload={imageUploadCallback}
              estate={editorState}
              />
          </div>

          <div className="form-group">
            <label>Asignee</label>
            <select className="form-control rounded-0" name="assignee" required="required">
              {
                projectNameUser.map((userData,i)=>(
                  <option key={userData.id} value={userData.id}>{userData.firstname}</option>
                ))
              }
            </select>
          </div>

          <div className="form-group">
            <label>Start date</label>
            <input type="date" className="form-control rounded-0" name="start_date" value={startDate} onChange={(event)=>{handleStartDateInput(event)}} />
          </div>

          <div className="form-group">
            <label>End date</label>
            <input type="date" className="form-control rounded-0" name="end_date" value={endDate} onChange={(event)=>{handleEndDateInput(event)}}/>
          </div>

          <div className={`form-group ${dateNotice ? 'd-none' : ''}`}>
            <span className="material-icons text-danger mr-2 float-left">error</span>
            <span className="text-danger">End date cant be less then from start date </span>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select className="form-control rounded-0" name="priority">
              <option value="high">High</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
            </select>
          </div>

          <div className="form-group">
           <button type="submit" className="btn btn-danger rounded-0 create_btn" disabled="disabled">Create task</button>
          </div>

          <div className="form-group">
            <div className="alert rounded-0 text-center notice">{msg}</div>
          </div>

        </form>
        </Modal.Body>

      </Modal>
      </div>
    )
}

TaskModal.propTypes = {
   data:PropTypes.object,
}

TaskModal.defaultProps = {
  data: {
   addlatestTask:function(e){return e},
}

}

export default TaskModal;
