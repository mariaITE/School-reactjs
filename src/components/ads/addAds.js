
import './ads.css'
import React, {useState} from "react";
import Swal from "sweetalert2";
import FileUpload from './FileUpload/FileUpload'
import FileList from './FileList/FileList'
export default function AddAds() {

    let group = [
        {
            "gender":"إناث",

        },
        {
            "gender":"ذكور",

        }
    ]
const [files,setFiles]=useState([])
 const RemoveFile=(fileName)=>{
        setFiles(files.filter(file => file.name !== fileName))

 }
    // const AddStudent = async (e) => {
    //     e.preventDefault();
    //
    //     const formData={
    //     }
    //     console.log(formData)
    //     await fetch('http://localhost:8000/api/store',{
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //             //  'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"] '),
    //         },
    //         body: JSON.stringify(formData)
    //     })
    //
    //         .then(response => response.json())
    //         .then(data => {
    //             if(data.statusCode===200) {
    //                 Swal.fire({
    //                     icon: "success",
    //                     title: data.message
    //                 })
    //             }
    //             else if (data.statusCode===400){
    //                 Swal.fire({
    //                     icon: "error",
    //                     title: data.message,
    //                     text:"تأكد من صحة المعلومات"
    //                 })
    //             }
    //
    //             else
    //                 Swal.fire({
    //                     icon: "error",
    //                     title:data.message,
    //                     text: "يوجد شيء خاطئ يرجى إعادة المحاولة"
    //                 })
    //         })
    //         .catch(error => console.error(error));
    //
    //
    // // console.log(formData)
    //
    // }
    console.log(files);

    return (

        <div className="addStudent">

            <div className="da-container">
                <label  className="title">إضافة إعلان</label>
                {/*<button className="button" value="حفظ" onClick={()=>{}}>حفظ</button>*/}
                <hr></hr>
                <div className="form-scr up">

                {/*    /!*<div className={"div1"}>*!/*/}
                {/*    <div className={"upload"}>*/}
                {/*        /!*<button type={"button"} className={"btn-warning"}>*!/*/}
                {/*        /!*<i className ="bi bi-upload " style={{color:"red"}}>*!/*/}
                {/*        /!*</i>*!/*/}

                {/*        <input*/}
                {/*             className="upload-box"*/}
                {/*               type={"file"}*/}
                {/*               // autoComplete="off"*/}
                {/*               // required*/}
                {/*               // onChange={() => {}}*/}
                {/*        />*/}
                {/*        <i className ="bi bi-upload " ></i>*/}
                {/*        /!*</button>*!/*/}
                {/*    </div>*/}
                {/*    /!*</div>*!/*/}
                {/*</div>*/}

                      {/*<div>*/}
                    {/*<button className="button1" variant="primary" block="block" type="submit"*/}
                    {/*        onClick={AddStudent}> حفظ*/}
                    {/*</button>*/}


                    <FileUpload files={files} setFiles={setFiles} removeFile={RemoveFile}/>
                    <FileList files={files}  removeFile={RemoveFile}/>
            </div>

            </div>

        </div>
    )
}