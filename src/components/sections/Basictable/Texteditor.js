import React from "react";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../../../assets/css/texteditor.css";
import { Editor } from 'react-draft-wysiwyg';

const Texteditor=(props)=>
{
    const {picupload} = props;
    return(
      <div>
        <Editor
          editorState={props.estate}
          onEditorStateChange={props.textupload}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            image: {
              uploadCallback:picupload,
              previewImage: true,
            },
          }}
        />
      </div>
    )
}

export default Texteditor;
