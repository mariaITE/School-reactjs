import React, {useState} from "react";
import Swal from "sweetalert2";
import './FileItem.css'
import axios from "axios";


const FileItem=({file,deleteFile})=> {

    return (
        // <div style={{border: "3px dashed white"}}>
        <li className="list-item"
            key={file.name}>
            <i className="bi bi-file-earmark-text-fill"/>
              <p>{file.name}</p>
            <div className="actions">
                {!file.isUploading &&
                    <i className="bi bi-arrow-counterclockwise fa-spin"/>
                }
                {file.isUploading &&
                    <i className="bi bi-trash-fill"
                       onClick={()=>deleteFile(file.name)}/>
                }
            </div>
        </li>
        // </div>
    )
}
export default FileItem