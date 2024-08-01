
import React, {useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import FileItem from './../FileItem/FileItem'

const FileList=({files,removeFile})=> {
   const deleteFileHandler=(_name)=>{
       axios.delete(`http://localhost:8000/api/upload/${_name}`)
           .then((res)=>{
               console.log(res.data)
               removeFile(_name)
           })
           .catch((err)=> console.error(err))
   }
    return (
        <div className={"out1"}>
        <ul className="file-list">
            {
                files && files.map(f=>
                    <FileItem
                key={f.name}
                file={f}
                deleteFile={deleteFileHandler}
                />)
            }
        </ul>
        </div>
    )
}
export default FileList