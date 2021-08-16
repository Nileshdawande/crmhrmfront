import React,{useState,useEffect} from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom";
import $ from "jquery";
import PmstopNav from '../../layouts/PmstopNav';
import { EditorState,convertToRaw,convertFromRaw } from 'draft-js';
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import Texteditor from "./Texteditor";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../../../assets/css/texteditor.css";
import CustomLoader from "./CustomLoader";
import ApiUrl from "../ServerApi/Api";

const PmsprojecttaskdetailsTable=(props)=>
{
    const obj = props.data;
    const project_json_obj = JSON.parse(atob(obj.match.params.id));
    const project_id = project_json_obj.id
    const project_name = project_json_obj.project_name;
    const [task,setTask] = useState([]);
    const [taskStatus,setTaskStatus] = useState([]);
    const [user,setUser] = useState([]);
    const [tempUser,setTempUser] = useState([]);
    const [modaldata,setmodaldata] = useState(null);
    const [LoginId,setLoginId] = useState(null);
    const [AllComment,SetAllComment] = useState([]);

    const [desIcon,setDesIcon] = useState(true);
    const [msg,setMsg] = useState("");
    const [show, setShow] = useState(false);
    const [summaryTitle, setsummaryTitle] = useState(true);
    const [dateNotice,setDateNotice] = useState(null);
    const [toggleComment,setToggleComment] = useState(true);

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [commenteditorState, setCommentEditorState] = useState(() => EditorState.createEmpty());
    const [showCommenteditorState, setshowCommenteditorState] = useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState(null);
    const [convertedContentComment, setConvertedContentComment] = useState(null);
    const [convertedContentEditComment, setConvertedContentEditComment] = useState(null);
    const [htmlContent, setHtmlContent] = useState(null);
    const [find,setFind] = useState(false);
    const [columns,setColumns] = useState([
      {title:"Type",field:'type_id',lookup:{}},
      {title:"Id",field:"id",editable:'never',render: rowData => <Link to="#" onClick={()=>{handleShow(rowData)}}>#{rowData.id}</Link>},
      {title:"Summary",field:'summary'},
      {title:"Status",field:'status_id',lookup:{}},
      {title:"Assignee",field:'assignee',lookup:{}},
      {title:"Priority",field:'priority',lookup:{'normal':'normal','low':'low','high':'high'}},

    ]);

    useEffect(()=>{

        const ajax1 = axios({
          method:"GET",
          url:ApiUrl+"/task-type-master"
        });

        const ajax2 = axios({
          method:"GET",
          url:ApiUrl+"/task-status-master"
        });

        const ajax3 = axios({
          method:"GET",
          url:ApiUrl+"/user"
        });

        const ajax4 = axios({
          method:"GET",
          url:ApiUrl+"/pms-task/"+project_id,
          params:{
            fetch_type:"project"
          }
        });

        Promise.all([ajax1,ajax2,ajax3,ajax4]).then((response)=>{

          const task_type = response[0];
          const task_status = response[1];
          const user = response[2];
          const taskdata = response[3];

          let task_type_obj = columns[0];
          let task_status_obj = columns[3];
          let user_obj = columns[4];

          const task_type_data = task_type.data.data;

          const task_status_data = task_status.data.data;
          setTaskStatus(task_status_data);
          const user_data = user.data.data;
          setUser(user_data);

          const task_res_data = taskdata.data.data;

          task_type_data.forEach((obj,i)=>{
            let id = obj.id;
            let type = obj.type;
            task_type_obj = {...task_type_obj,lookup:{...task_type_obj.lookup,[id]:type}};
          });


          task_status_data.forEach((obj,i)=>{
            let id = obj.id;
            let status = obj.status;
            task_status_obj = {...task_status_obj,lookup:{...task_status_obj.lookup,[id]:status}};
          });

          let temp = [];
          user_data.forEach((obj,i)=>{
            if(project_json_obj.project_leader === obj.id)
            {
                let id = obj.id;
                let firstname = obj.firstname;
                user_obj = {...user_obj,lookup:{...user_obj.lookup,[id]:firstname}};
                temp.push(obj);
            }

            else
            {
                let projectmember = JSON.parse(project_json_obj.members);
                projectmember.forEach((member)=>{

                  if(obj.id === Number(member))
                  {
                    let id = obj.id;
                    let firstname = obj.firstname;
                    user_obj = {...user_obj,lookup:{...user_obj.lookup,[id]:firstname}};
                    temp.push(obj);
                  }
                });
            }

          });

          setTempUser(temp);


          let newData = columns.map((cdata,index)=>{
            if(index===0)
            {
               return task_type_obj;
            }

            if(index===3)
            {
               return task_status_obj;
            }

            if(index===4)
            {
               return user_obj;
            }

            return cdata;

          });

          if(sessionStorage.getItem("user") !== null)
          {
              let userlogin = sessionStorage.getItem("user");
              userlogin = JSON.parse(atob(userlogin));
              let userLoginId = userlogin.id;
              setLoginId(userLoginId);
          }

          setColumns(newData);
          setTask(task_res_data);
          setFind(true);
        }).catch((error)=>{
          if(error)
          {
            setFind(true);
          }
        });

    },[project_id]);

    const addlatestTask=(data)=>
    {
       const newData = task.concat(data);
       setTask(newData);
    }

    const deleteData=(oldData,index,resolve)=>
    {
        const ajax = axios({
          method:"DELETE",
          url:ApiUrl+"/pms-task/"+oldData.id,
        });

        ajax.then((response)=>{

          const newData = task.filter((taskdata,i)=>{
            return index !== i;
          });

          setTask(newData);
          resolve();
        });
    }

    const updateData=(newData,oldData,index,resolve)=>
    {
        let user = sessionStorage.getItem("user");
        user = JSON.parse(atob(user));
        let userId = user.id;
        const ajax = axios({
          method:"PUT",
          url:ApiUrl+"/pms-task/"+oldData.id,
          data:{
            ...newData,
            updated_by:userId
          }
        });

        ajax.then((response)=>{
          const update = [...task];
          update[index] = newData;
          setTask([...update]);
          resolve();
        });

        ajax.catch((error)=>{
          if(error)
          {
            const update = [...task];
            update[index] = oldData;
            setTask([...update]);
            resolve();
          }
        });
    }

    const handleClose = () =>
    {
        setShow(false);
        SetAllComment([]);
    }

    const handleShow = (data) =>
    {

        let created_at_dt = new Date(data.created_at);
        created_at_dt = created_at_dt.toLocaleString();

        let update_at_dt = new Date(data.updated_at);
        update_at_dt = update_at_dt.toLocaleString();

        const obj = {...data,created_at:created_at_dt,updated_at:update_at_dt};

        setmodaldata(obj);
        setShow(true);
        getTaskComments(data.id);

        if(obj.description !== "" && obj.description !== null)
        {
            const des_data = EditorState.createWithContent(convertFromRaw(JSON.parse(obj.description)));
            setEditorState(des_data);
            const htmldata = draftToHtml(JSON.parse(obj.description));
            setHtmlContent(htmldata);
        }

        else
        {
           setEditorState(EditorState.createEmpty());
           setHtmlContent("");
        }

    }


    const getTaskComments=(id)=>
    {
        const ajax = axios({
           method:"GET",
           url:ApiUrl+"/comment/"+id,
           params:{
             fetch_type:"taskid"
           }
        });

        ajax.then((response)=>{
          const data = response.data.data;

          const newData = data.map((commentData)=>{

            let date = new Date(commentData.created_at);
            date = date.toLocaleString();

            let up_date = new Date(commentData.updated_at);
            up_date = date.toLocaleString();

            return {...commentData,created_at:date,updated_at:up_date,editor:false};
          });

          SetAllComment(newData);

        });
    }

    const handleInput =(event)=>
    {

         if($(event.target).attr("name") === "description")
         {
            setDesIcon(!desIcon);
         }

         if($(event.target).attr("name") === "summary")
         {
            setsummaryTitle(!summaryTitle);
         }



        let c_date = new Date();
        c_date = c_date.toLocaleString();
        let obj = modaldata;
        let index = obj.tableData.id;
        let name = event.target.name;
        let val  = event.target.value;
        let des  = convertedContent;
        let summary  = $(".summary_input").val();
        obj = {...obj,[name]:val,updated_at:c_date,description:des,summary:summary};
        setmodaldata(obj);

        let user = sessionStorage.getItem("user");
        user = JSON.parse(atob(user));
        let userId = user.id;

        if(event.target.name === "start_date")
        {
           const s_date = new Date(event.target.value);
           const e_date = new Date(obj.end_date);
           if(s_date>e_date)
           {
              $(".date_notice").removeClass("d-none");
              setDateNotice("Start date cant be bigger from end date");
              return false;
           }
           else
           {
              $(".date_notice").addClass("d-none");
              setDateNotice("");
           }
        }

        if(event.target.name === "end_date")
        {
           const e_date = new Date(event.target.value);
           const s_date = new Date(obj.start_date);
           if(e_date<s_date)
           {
              $(".date_notice").removeClass("d-none");
              setDateNotice("End date cant be less then from start date");
              return false;
           }
           else
           {
              $(".date_notice").addClass("d-none");
              setDateNotice("");
           }
        }

        $(".notification_update").removeClass("d-none");
        setMsg("Please wait....");

        const ajax = axios({
          method:"PUT",
          url:ApiUrl+"/pms-task/"+obj.id,
          data:{
            ...obj,
            updated_by:userId,
            description:des
          }
        });

        ajax.then((response)=>{
          const update = [...task];
          update[index] = obj;
          setTask(update);
          setMsg("Update success");
          removeMsg();
          let updateEditor = convertToRaw(editorState.getCurrentContent());
          updateEditor = draftToHtml(updateEditor);
          setHtmlContent(updateEditor);
        });

    }


    const createComment=(event)=>
    {
       event.preventDefault();
       $(".create_comment_btn").attr("disabled","disabled");
       $(".create_comment_btn").html("Please wait....");
       let formdata = new FormData(event.target);
       formdata.append("comments",convertedContentComment);
       const ajax = axios({
         method:"POST",
         url:ApiUrl+"/comment",
         data:formdata
       });

       ajax.then((response)=>{
         setToggleComment(true);
         let data = response.data.data;
         let create_date = new Date(data.created_at);
         create_date = create_date.toLocaleString(create_date);

         const newData = AllComment.concat({...data,created_at:create_date,editor:false});
         SetAllComment(newData);
         $(".create_comment_btn").removeAttr("disabled");
         $(".create_comment_btn").html("Send");
         setCommentEditorState(EditorState.createEmpty());
       });

       ajax.catch((error)=>{
         if(error)
         {
           $(".create_comment_btn").removeAttr("disabled");
           $(".create_comment_btn").html("Send");
         }
       });

    }


    const editComment=(index,event)=>
      {
         const obj = AllComment[index];
         if(LoginId === Number(obj.created_by))
         {
            const parent = event.target.parentElement;
            const con = $(".show_comments",parent);
            $(con).addClass("d-none");

            const newData = AllComment.map((commentData,i)=>{
                return index === i ? {...commentData,editor:true} : {...commentData,editor:false};
            });

            const comment_data = EditorState.createWithContent(convertFromRaw(JSON.parse(obj.comments)));
            setshowCommenteditorState(comment_data);

            SetAllComment(newData);
         }

      }

    const closeCommentsEditing=(event,index)=>
    {
        const newData = AllComment.map((commentData,i)=>{
            return index === i ? {...commentData,editor:false} : {...commentData};
        });

        SetAllComment(newData);
    }



    const saveComments=(event,index)=>
    {
        const obj = AllComment[index];
        const id = obj.id;
        const ajax = axios({
          method:"PUT",
          url:ApiUrl+"/comment/"+id,
          data:{
            ...obj,
            comments:convertedContentEditComment,
            updated_by:LoginId
          }
        });

        ajax.then((response)=>{
          const update  = [...AllComment];
          update[index] = {...obj,editor:false,comments:convertedContentEditComment};
          SetAllComment(update);
        });

    }

    const cancelComment=()=>
    {
      setToggleComment(true);
    }

    const handleDescription=()=>
    {
        setDesIcon(!desIcon);
    }

    const handleSummary=(event)=>
    {
       setsummaryTitle(!summaryTitle);
    }



    const removeMsg=()=>
    {
        setTimeout(()=>{
          setMsg("");
          $(".notification_update").addClass("d-none");
        },2000);
    }

    const handleEditorChange = (editorState) => {
      setDesIcon(false);
      setEditorState(editorState);
      let currentContentAsHTML = convertToRaw(editorState.getCurrentContent());
      setConvertedContent(JSON.stringify(currentContentAsHTML));
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

    const handleEditorChangeComment = (editorState) => {
      setCommentEditorState(editorState);
      let currentContentAsHTML = convertToRaw(editorState.getCurrentContent());
      setConvertedContentComment(JSON.stringify(currentContentAsHTML));
    }

    const handleEditorChangeEditComment=(editorState)=>
    {
        setshowCommenteditorState(editorState);
        let currentContentAsHTML = convertToRaw(editorState.getCurrentContent());
        currentContentAsHTML = JSON.stringify(currentContentAsHTML);
        setConvertedContentEditComment(currentContentAsHTML);
    }



    const createMarkup = (html) => {
      return  {
        __html: DOMPurify.sanitize(html)
      }
    }

    const createMarkupComments = (html) => {
      return  {
        __html: DOMPurify.sanitize(html)
      }
    }



    return(
      <div className="">
        <PmstopNav addlatestTask={addlatestTask} />
          <div className="row">

              <div className="col-md-12">
                  <div className="ms-panel-body">
                    {find !== true ? <CustomLoader/> :
                    <MaterialTable
                    title={project_name}
                    columns={columns}
                    data={task}

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
                }

                  </div>


                    <Modal show={show} onHide={handleClose} size="xl">

                      <Modal.Header closeButton>
                      <div className="d-flex flex-column w-100">
                        <p className={`text-info ${!summaryTitle ? 'd-none' : ''}`} onClick={handleSummary}>{modaldata !== null && "#"+modaldata.id+": "+modaldata.summary}</p>

                        <div className={`my-2 ${summaryTitle ? 'd-none' : ''}`}>

                        <input className="form-control rounded-0 border-0 summary_input" defaultValue={modaldata !== null ? modaldata.summary : ''} />


                          <span className="rounded-circle text-success mr-2"  style={{cursor:"pointer",fontSize:"30px"}}>
                            <i className="fa fa-check-circle" aria-hidden="true" name="summary" onClick={(event)=>{handleInput(event)}}></i>
                          </span>
                          <span className="rounded-circle text-danger" style={{cursor:"pointer",fontSize:"30px"}} onClick={handleSummary}>
                            <i className="fa fa-times-circle" aria-hidden="true"></i>
                          </span>

                        </div>

                      </div>

                      </Modal.Header>

                      <Modal.Body>
                        <div className="row">
                            <div className="col-md-6 border-top-0 border-bottom-0 border-left-0 border ada" style={{overflowY:"auto",height:"80vh"}}>
                                <form>

                                    <div className="notification_update text-center alert alert-success rounded-0 p-0 m-0 d-none" style={{position:"relative",top:"100px",zIndex:"10000"}}>
                                      {msg}
                                    </div>

                                    <div className="d-flex justify-content-between mb-2">
                                      <select className="form-control rounded-0" name="status_id" value={modaldata !== null ? modaldata.status_id : 0} style={{width:"fit-content"}} onChange={handleInput}>
                                        {
                                           taskStatus.map((data,i)=>(
                                             <option key={i} value={data.id}>{data.status}</option>
                                           ))
                                        }
                                      </select>
                                      <p className="p-0 m-0">
                                        Created by
                                        <span>
                                          {modaldata !== null && user.map((udata,i)=>(
                                            <span key={i}>
                                              {udata.id === modaldata.created_by ? <span className="mx-2 text-info">{udata.firstname}</span>:''}
                                            </span>

                                          ))}
                                        </span>

                                        Last updated on <span className="text-info">{modaldata !== null && modaldata.updated_at}</span>
                                      </p>
                                    </div>

                                    <h6>DESCRIPTION</h6>
                                    <hr/>
                                      <div className={desIcon ? 'd-none' : ''}>
                                        <Texteditor
                                          textupload={handleEditorChange}
                                          picupload={imageUploadCallback}
                                          estate={editorState}
                                          />
                                    </div>

                                    <div className="card rounded-0" className={desIcon ? '' : 'd-none'} onClick={()=>{setDesIcon(!desIcon)}}>
                                      <div className="card-body preview" dangerouslySetInnerHTML={createMarkup(htmlContent)}></div>
                                    </div>



                                  <div className="mt-2 mb-4">
                                      <div className={`float-right ${desIcon ? 'd-none' : ''}`}>
                                        <span className="rounded-circle text-success mr-2 span"  style={{cursor:"pointer",fontSize:"30px"}}>
                                          <i className="fa fa-check-circle" name="description" aria-hidden="true" onClick={(event)=>{handleInput(event)}}></i>
                                        </span>
                                        <span className="rounded-circle text-danger" style={{cursor:"pointer",fontSize:"30px"}} onClick={()=>{handleDescription()}}>
                                          <i className="fa fa-times-circle" aria-hidden="true"></i>
                                        </span>
                                      </div>
                                  </div>

                                   <h6>PEOPLE</h6>
                                  <hr/>

                                  <div className="d-flex justify-content-between mb-4">
                                    <p className="p-0 m-0">ASIGNEE</p>
                                      <select className="form-control rounded-0" name="assignee" value={modaldata !== null ? modaldata.assignee : 0} style={{width:"fit-content"}} onChange={handleInput}>
                                        {
                                           tempUser.map((data,i)=>(
                                             <option key={i} value={data.id}>{data.firstname}</option>
                                           ))
                                        }
                                      </select>
                                  </div>

                                  <h6>Details</h6>
                                   <hr/>
                                  <div className="mb-4">

                                    <div className="d-flex justify-content-between mb-2">
                                      <p className="p-0 m-0">Date</p>
                                      <input type="date" name="start_date" value={modaldata !== null && modaldata.start_date !== null ? modaldata.start_date : ''} onChange={handleInput} title="START DATE" />
                                      <input type="date" name="end_date" value={modaldata !== null && modaldata.end_date !== null ? modaldata.end_date : ''} onChange={handleInput} title="END DATE"/>
                                    </div>

                                    <div className="mb-4 alert alert border-0 rounded-0 p-0 m-0 date_notice d-none">
                                      <h6 className="d-flex align-items-center">
                                        <span className="material-icons mr-2 text-danger">error</span>
                                        <span className="text-danger">{dateNotice}</span>
                                      </h6>
                                    </div>

                                    <div className="d-flex">
                                      <p className="p-0 m-0 mr-5">PRIORITY</p>
                                      <select className="form-control ml-1" name="priority" value={modaldata !== null ? modaldata.priority : ''} style={{width:"fit-content"}} onChange={handleInput}>
                                        <option value="high">High</option>
                                        <option value="low">Low</option>
                                        <option value="normal">Normal</option>
                                      </select>
                                    </div>

                                  </div>

                                </form>

                            </div>

                            <div className="col-md-6 px-0" style={{overflowY:"auto",height:"80vh"}}>
                              <div className="px-3">
                              <h4 className="px-3">Activity</h4>
                              <div className="mt-4 mb-2">
                                {modaldata !== null && user.map((udata,i)=>(
                                  <div key={i}>
                                    {
                                      udata.id === modaldata.created_by ?
                                      <div className="px-3">
                                      <span className="rounded-circle bg-danger p-2 text-white mr-2">{udata.firstname[0]}</span>
                                      <span className="text-info">{udata.firstname} {udata.lastname}</span>
                                      <p className='mt-2 p-0'>Created on {modaldata !== null && modaldata.created_at}</p>
                                     </div>:''
                                    }
                                  </div>

                                ))}
                              </div>

                              <hr />

                            <div>
                                {
                                  AllComment.map((commentData,index)=>(
                                   <div className="card mb-2 rounded-0" key={commentData.id}>

                                    <div className="card-body overflow-auto">
                                      {
                                        user.map((userObj)=>(
                                          <span key={userObj.id} className={userObj.id === Number(commentData.created_by)?'mr-2':'d-none'}>
                                            <span className="rounded-circle bg-danger p-2 text-white mr-2">{userObj.id === Number(commentData.created_by) && userObj.firstname[0]}</span>
                                            <span className="text-info">{userObj.id === Number(commentData.created_by) && userObj.firstname+" "+userObj.lastname}</span>
                                        </span>
                                        ))
                                      }

                                      <p className="mt-2 p-0 mb-1">Created on {commentData.created_at}</p>

                                       <div>
                                         {
                                           commentData.editor === false &&
                                           <div className="m-0 p-0">
                                             <div className="preview" dangerouslySetInnerHTML={createMarkupComments(draftToHtml(JSON.parse(commentData.comments)))}></div>
                                               <span className="float-right">
                                               {LoginId===Number(commentData.created_by) && <i className="fa fa-edit" style={{cursor:"pointer"}} onClick={(event)=>{editComment(index,event)}}></i>}
                                               </span>
                                            </div>
                                          }


                                         <div className="editor">
                                           {
                                             commentData.editor !== false && <div>
                                                  <Texteditor
                                                    picupload={imageUploadCallback}
                                                    textupload={handleEditorChangeEditComment}
                                                    estate={showCommenteditorState}
                                                    />

                                                  <div className="mt-4">

                                                  <span className="border p-2 mr-2" style={{cursor:"pointer"}} onClick={(event)=>{saveComments(event,index)}}>
                                                    <i className="fa fa-check-circle mr-2 text-success"></i>
                                                    Save changes
                                                  </span>

                                                  <span className="border p-2" style={{cursor:"pointer"}} onClick={(event)=>{closeCommentsEditing(event,index)}}>
                                                    <i className="fa fa-times-circle text-danger mr-2"></i>
                                                    Cancel
                                                  </span>
                                                </div>
                                              </div>

                                           }
                                         </div>

                                       </div>


                                   </div>

                                   </div>
                                 ))
                              }
                            </div>

                              <div>
                                  <form onSubmit={createComment}>

                                    <div className={`mb-2 ${toggleComment ? '' : 'd-none'}`}>
                                      <div className="form-control rounded-0" onClick={()=>{setToggleComment(false)}}>
                                        <span style={{color:"#ccc"}}>Type your comments to notify another people</span>
                                      </div>
                                    </div>

                                    <div className="mb-2" className={`mb-2 ${toggleComment ? 'd-none' : ''}`}>
                                      <Texteditor
                                        picupload={imageUploadCallback}
                                        textupload={handleEditorChangeComment}
                                        estate={commenteditorState}
                                        />
                                    </div>

                                    <div className="mb-2 d-none">
                                      <input type="text" name="task_id" defaultValue={modaldata !== null ? modaldata.id : ''}/>
                                      <input type="text" name="created_by" defaultValue={LoginId !== null ? LoginId : ''}/>
                                      <input type="text" name="updated_by" defaultValue={LoginId !== null ? LoginId : ''}/>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                      <button className="btn btn-primary rounded-0 create_comment_btn" type="submit">Send</button>
                                      <button className="btn btn-dark rounded-0" type="button" onClick={()=>{cancelComment()}}>Cancel</button>
                                    </div>

                                  </form>
                              </div>
                            </div>
                            </div>

                        </div>
                      </Modal.Body>

                    </Modal>


              </div>

          </div>
      </div>
    )
}

export default PmsprojecttaskdetailsTable;
