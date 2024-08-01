
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import './FileUpload.css'
import axios from "axios";
import {json} from "react-router-dom";

 const FileUpload=({files,setFiles,removeFile})=> {
     console.log("files1",files)
     let group = [
         {
             "gender": "إناث و ذكور",

         },
         {
             "gender": "إناث",

         },
         {
             "gender": "ذكور",

         }
     ]
     const [className, setClassName] = useState('')
     const [section, setSections] = useState('')
     const [title, setTitle] = useState('');
     const [gender, setGender] = useState('');
     const [click, setClick] = useState('');
     const [typeClick, setTypeClick] = useState('');
     const [isError, setIsError] = useState(false);
     const [dropDownClass, setDropDownClass] = useState([])
     const [file1, setFile1] = useState('')
     const [dropDownSection, setDropDownSection] = useState([])
     console.log("click",click)
     console.log("title",title)
     console.log("gender",gender)
     console.log("section",section)
     console.log("className",className)
     const handleTitle = (event) => {
         setTitle(event.target.value);
     }
     const handleGender = (event) => {
         setGender(event.target.value)
         //  console.log(gender)
     }
     const handleClassName = (event) => {
         // console.log("llll"+event.target.value)
         setClassName(event.target.value)
         // setIdClassName(event.target.value.id)

     }
     const handleSection = (event) => {
         setSections(event.target.value)
         //  console.log(gender)
     }
     const handleClick =(event)=>{
         setClick(event.target.value);

         if(event.target.value==="m"){
         setTypeClick("1")
         }
         if(event.target.value==="c"){
             setTypeClick("2")
         }
         if(event.target.value==="s"){
             setTypeClick("3")
         }
     }
     const handelCheck = () => {
         if (gender !== '' || section !== '' ) {
             setGender("");
             setSections("");

         }
     }
     const handelCheck1 = () => {
         if (section !== '') {
             setSections("");

         }
     }
     //=================================================


     useEffect(() => {
         sendDropDownClass();
     }, [])

     const sendDropDownClass = async () => {
         // e.preventDefault();
         fetch('http://localhost:8000/api/showClass', {
             method: 'GET',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
         })
             .then(response => response.json())
             .then(data => setDropDownClass(data.data))
             .catch(error => console.error(error));

     }

     const sendDropDownSection = async (e) => {
         e.preventDefault();
         if (!className || !gender) {
             return setIsError(true);
         }
         setIsError(false);
         const formData = {
             'className': className,
             'gender': gender,
         }

         await fetch('http://localhost:8000/api/showSectionAds', {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 //  'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"] '),
             },
             body: JSON.stringify(formData)
         })

             .then(response => response.json())
             .then(data => setDropDownSection(data.data))
             .catch(error => console.error(error));
     }

     const UploadHandlerSave= (event) => {
         const file = event.target.files[0];
         // console.log("kkkk", file)
          file.isUploading = true;
          setFiles([...files, file])
         // setFiles( file)

         // console.log(files);
          setFile1(event.target.files[0])
         }

         const UploadHandler =  async (event) => {
             event.preventDefault();
             //upload file
             console.log("files1s", file1)
             // const formData = {
             //     'title': title,
             //     'typeClick': typeClick,
             //     'gender': gender,
             //     'className':className,
             //     'section':section,
             //      'file': file1,
             // }
             console.log("title", title)
             console.log("typeClick", typeClick)
             console.log("gender", gender)
             console.log("className", className)
             console.log("section", section)

             const formData = new FormData();

              formData.append('title', title)
              formData.append('typeClick', typeClick)
              formData.append('className', className)
              formData.append('gender', gender)
              formData.append('section', section)
             // for(let i=0;i<files.length;i++){
             formData.append('file', file1)
              // }

             try{ const response= await axios.post('http://localhost:8000/api/upload',formData)
                 //      {headers:{  'Accept': 'application/json',
                 //          'Content-Type': 'application/json',}}
                 // ))
                  .then(response =>{
                     // file1.is
                     console.log(response.data);
                     if(response.data.statusCode===200) {
                         Swal.fire({
                             icon: "success",
                             title: response.data.message,
                         })
                         setGender("");setClassName("");setSections("");
                         setTitle("");setFile1("");
                     }
                     else if (response.data.statusCode===400){
                         Swal.fire({
                             icon: "error",
                             title: response.data.message,
                             text:"تأكد من صحة المعلومات",
                         })
                     }
                     else
                         Swal.fire(
                             {icon: "error",
                                 title:response.data.message,
                                 text: "يوجد شيء خاطئ يرجى إعادة المحاولة"
                             })
                 })
             }catch(error){console.error(error);}
             // console.log("formData", formData)
             // axios.post('http://localhost:8000/api/upload',(formData,
             //      {headers:{  'Accept': 'application/json',
             //          'Content-Type': 'application/json',}}
             // ))
             // await fetch("http://localhost:8000/api/upload", {
             //     method: 'POST',
             //     headers: {
             //         'Accept': 'application/json',
             //         'Content-Type': 'application/json',
             //           // 'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"] '),
             //     },
             //     body: formData,
             // })
             //     .then(res =>  res.json()
             //         // file.isUploading = false;
             //         // setFiles([...files, file])
             //     )
             //     .then((data) => {
             //           console.log(data)
             //             if (data.statusCode === 200) {
             //                 Swal.fire({
             //                     icon: "success",
             //                     title: data.message,
             //                 })
             //             } else if (data.statusCode === 400) {
             //                 Swal.fire({
             //                     icon: "error",
             //                     title: data.message,
             //                     text: "تأكد من صحة المعلومات"
             //                 })
             //             }
             //     }
             //     ).catch ((error)=> {
             //         console.error(error);
             //         // removeFile(file.name)
             //     })
             // try {
             //    axios.post("http://localhost:8000/api/upload", formData)
             //         .then(response => {
             //             console.log(response.data);
             //         })
             //         .then((data) => {
             //                 console.log(data)
             //                 if (data.statusCode === 200) {
             //                     Swal.fire({
             //                         icon: "success",
             //                         title: data.message,
             //                     })
             //                 } else if (data.statusCode === 400) {
             //                     Swal.fire({
             //                         icon: "error",
             //                         title: data.message,
             //                         text: "تأكد من صحة المعلومات"
             //                     })
             //                 }
             //             }
             //         )
             //     // .catch(error){console.error(error);}
             //
             //     // }
             //     //  else {
             //     //     Swal.fire({
             //     //         icon: "error",
             //     //         title: data.message
             //     //     })
             //     // }
             //     // })
             //
             // } catch (error) {
             //     console.error(error);
             //     // removeFile(file.name)
             // }
         }
     const AddSchool =()=>{
         return(
             <>
             {/*<div className="div1">*/}
             {/*    <label className="lab">الجنس*/}
             {/*        <select className="d-select"*/}
             {/*                placeholder={"اختر الجنس"}*/}
             {/*                value={gender}*/}
             {/*                onChange={handleGender}>*/}
             {/*            <option className="g-option" disabled={true} hidden={true} value={""}>اختر الجنس*/}
             {/*            </option>*/}
             {/*            {group.map(element => <option className="g-option" key={element.id}*/}
             {/*            >{element.gender}</option>)}*/}

             {/*        </select>*/}
             {/*    </label>*/}
             {/*</div>*/}
                 <div style={{width:"200px", height:"50px", marginRight:"20px",marginTop:"20px"}}><h>اضغط زر الحفظ للإرسال </h></div>
             </>
         )
     }
     const AddClass =()=>{
         return(
             <>
             <div className="div1">

                 <label className="lab">الصف

                     <select className="d-select"

                             value={className}
                             onFocus={() => handelCheck()}
                             onChange={(event) => {
                                 handleClassName(event)
                             }}
                             placeholder={"اختر الصف"}>
                         <option className="g-option" disabled={true} hidden={true} value={""}>اختر الصف
                         </option>
                         {dropDownClass.length === 0 ? (
                             <option className="g-option" disabled> لا يوجد صفوف </option>
                         ) : (dropDownClass.map((element) => (
                             <option className="g-option" key={element.id}
                                     value={element.name}
                             >{element.name}</option>)))}

                     </select>
                 </label>
         {/*    </div>*/}

         {/*<div className="div1">*/}

             <label className="lab">الجنس
                 <select className="d-select"
                         onFocus={() => handelCheck1()}
                         placeholder={"اختر الجنس"}
                         value={gender}
                         onChange={handleGender}>
                     <option className="g-option" disabled={true} hidden={true} value={""}>اختر الجنس
                     </option>
                     {group.map(element => <option className="g-option" key={element.id}
                     >{element.gender}</option>)}

                 </select>
             </label>
         </div>
             </>
         )
     }
     const AddSction =()=>{
         return(
             <>
                 <div className="div1">

                     <label className="lab">الصف

                         <select className="d-select"

                                 value={className}
                                 onFocus={() => handelCheck()}
                                 onChange={(event) => {
                                     handleClassName(event)
                                 }}
                                 placeholder={"اختر الصف"}>
                             <option className="g-option" disabled={true} hidden={true} value={""}>اختر الصف
                             </option>
                             {dropDownClass.length === 0 ? (
                                 <option className="g-option" disabled> لا يوجد صفوف </option>
                             ) : (dropDownClass.map((element) => (
                                 <option className="g-option" key={element.id}
                                         value={element.name}
                                 >{element.name}</option>)))}

                         </select>
                     </label>
                 {/*<div className="div1">*/}

                 <label className="lab">الجنس
                     <select className="d-select"
                             onFocus={() => handelCheck1()}
                             placeholder={"اختر الجنس"}
                             value={gender}
                             onChange={handleGender}>
                         <option className="g-option" disabled={true} hidden={true} value={""}>اختر الجنس
                         </option>
                         {group.map(element => <option className="g-option" key={element.id}
                         >{element.gender}</option>)}

                     </select>
                 </label>
             {/*</div>*/}
             {/*    <div className="div1">*/}

                     <label className="lab">الشعبة
                         <select className="d-select"
                                 onClick={sendDropDownSection}
                                 value={section}
                                 placeholder={"اختر الشعبة"}
                                 onChange={(event) => {
                                     handleSection(event)
                                 }}>
                             <option className="g-option" disabled={true} hidden={true} value={""}>اختر الشعبة
                             </option>
                             {isError || dropDownSection.length === 0 ? (
                                 <option className="g-option" disabled> لا يوجد شعب </option>
                             ) : (
                                 dropDownSection.map(element => <option className="g-option" key={element.id}
                                                                        value={element.name}>{element.name}</option>))}

                         </select>
                     </label>
                 </div>
             </>
         )
     }

    return (
        <div className={"up"}>
        <div className={"out"}>
         <div className={"file-card"}>
            {/*<div className={"file-inputs"}>*/}
            {/*    /!*<input type={"file"}/>*!/*/}

            {/*    /!*<button>*!/*/}
            {/*    /!*    Upload*!/*/}
            {/*    <input   type="file" onChange={UploadHandler}*/}
            {/*    />*/}
            {/*        <i className="bi bi-cloud-plus-fill">*/}
            {/*        </i>*/}
            {/*    /!*</button>*!/*/}

            {/*</div>*/}
            <div className="image-upload">
                {/*<form  encType="multipart/form-data">*/}
                <label htmlFor="file-input">
                <img width={"80px"}
                src="https://icons.iconarchive.com/icons/iconshow/button-design-pack/128/07-Up-icon.png" alt={()=>{}}/> </label>
                <input id="file-input" type="file" name={"file"} multiple
                       onChange={(event)=>UploadHandlerSave(event)}
                />
                {/*</form>*/}
            </div>
             <p className="main">Support files</p>
             <p className="info">Pdf,JPG,PNG</p>
        </div>

            <div className="div1">

                <label className="lab">عنوان النص
                    <input
                        style={{marginTop:"20px",  height: "0.5cm"}}
                        className="input"
                        type="text"
                        value={title}
                        onChange={handleTitle}
                        autoComplete={"off"}
                    />
                </label>
            </div>

           <div style={{marginBottom:"10px"}}>
            <button className="button1"  value={"m"}  onClick={(event)=>{handleClick(event)}}> مدرسة</button>
            <button className="button1"  value={"c"} onClick={(event)=>{handleClick(event)}}>  صف</button>
            <button className="button1"   value={"s"} onClick={(event)=>{handleClick(event)}}>  شعبة</button>
        </div>

            <div>
                { click === "s" ?AddSction() :(click === "c" ?AddClass() :(click === "m" ?AddSchool():<></>)) }
            </div>
            <button className="buttonSave" value="حفظ" onClick={UploadHandler}>حفظ</button>
     </div>
        </div>
    )
}

export default FileUpload