
import {Link, useNavigate} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import  {jsPDF}  from "jspdf";
import  'jspdf-autotable';
import file from "./AAAGoldenLotus Stg1_Ver1 Regular.ttf";
import MyPdf from "./myPDF";
import MakePdf from "./makePDF";

export default function ShowStudent() {


    const navigate = useNavigate();

    let time = [
        {
            "name": "ماريا نذير سري"
        },
        {
            "name": "رغد الزعبي"
        },
        {
            "name": "رغد الخطيب"
        },
        {
            "name": "بيان السيد اللحام"
        },

    ]
    let group = [
        {
            "name": "ماريا",
            "gender":"إناث",
            "class":"السابع"
        },
        {
            "name": "three",
            "gender":"ذكور",
            "class":"الثامن"
        }
    ]
    const [className, setClassName] = useState('')
    const [gender, setGender] = useState('')
    const [section, setSections] = useState('')
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);
    const [dropDownSection, setDropDownSection] = useState([])
    const [dropDownClass, setDropDownClass] = useState([])
    const [student, setStudent] = useState([])
    const [detaileStudent, setDetaileStudent] = useState([])
    console.log(detaileStudent)
    const handleClassName = (event) => {
        setClassName(event.target.value)
        // console.log(className)
    }
    const handleGender = (event) => {
        setGender(event.target.value)
        //  console.log(gender)
    }
    const handleSection = (event) => {
        setSections(event.target.value)
        //  console.log(gender)
    }
    //===============================================================
    const handelCheck =()=>{
        if(gender !== '' || section !== '' ){
            setGender("");
            setSections("");

        }
    }
    //====================================
    const handelCheck1 = () => {
        if (section !== '') {
            setSections("");

        }
    }
    //------------------------------------------------------------------------
    const sendDropDownSection = async (e) => {
        e.preventDefault();
        if (!className || !gender ) {
            return setIsError(true);
        }
        setIsError(false);
        const formData={
            'className': className,
            'gender':gender,
        }

        await fetch('http://localhost:8000/api/showSection',{
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

    //===============================================================================
    useEffect(()=>{
        sendDropDownClass()
    },[])

    const sendDropDownClass  = async () => {
        // e.preventDefault();
        fetch('http://localhost:8000/api/showClass',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setDropDownClass(data.data))
            .catch(error => console.error(error));
        // await axios.get(`http://localhost:8000/api/showClass`).then(({data}) => {
        //     console.log(data)
        //     setDropDownClass(data)
        // })
    }
    //-------------------------------------------------------------------
    const showStudent = async (e) => {
        e.preventDefault();
        if (!className || !gender || !section) {
            setIsError(true);
            setError('الرجاء تعبئة المعلومات  ');

            Swal.fire({
                icon: "warning",
                text :'الرجاء تعبئة المعلومات  ',
                // "يوجد شيء خاطئ يرجى إعادة المحاولة"
            })
            return
        }
        setIsError(false);
        const formData={
            'section':section,
            'class': className,
            'gender':gender,
        }
         console.log(formData);
        await fetch('http://localhost:8000/api/showStudent',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //  'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"] '),
            },
            body: JSON.stringify(formData)
        })

            .then(response => response.json())
            .then(data =>
                setStudent(data)
            )
            .catch(error => console.error(error));
        //console.log(showDelay);
    }
    const containsMessageAttribute = student  && Array.isArray(student) && student.some((item) => 'message' in item)  ;
    //=======================================================================================================
    const detailStudent = async (studentId) => {
        // e.preventDefault();
        //console.log(studentId);
       await fetch(`http://localhost:8000/api/detailStudent/${studentId}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setDetaileStudent(data))
            .catch(error => console.error(error));
        // await axios.get(`http://localhost:8000/api/showClass`).then(({data}) => {
        //     console.log(data)
        //     setDropDownClass(data)
        // })
        //console.log(detaileStudent);
    }
    //==========================================================================================
    const deleteStudent = async (e,id) => {
        e.preventDefault();
        await fetch(`http://localhost:8000/api/deleteStudent/${id}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //  'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"] '),
            },
            // body: JSON.stringify(formData)
        })

            .then(response => response.json())
            .then(data => {
                if(data.statusCode===200) {
                    Swal.fire({
                        icon: "success",
                        title: data.message
                    })
                }
                else if (data.statusCode===400){
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                       // text:"تأكد من صحة المعلومات"
                    })
                }

                else
                    Swal.fire({
                        icon: "error",
                        title:data.message,
                        text: "يوجد شيء خاطئ يرجى إعادة المحاولة"
                    })
            })
            .catch(error => console.error(error));

    }
    //=========================================================================================

  const goPDF=(id)=>{
        console.log("jh",id);
      // <MyPdf id={ids}/>
      // <Link to={`components/students/myPDF/${id}`}/>
       navigate(`/components/students/myPDF?id1=${id}`)
    }

    return (

        <div className="showStudent">

            <div className="da-container" >
                <label  className="title">عرض الطلاب </label>
                <hr></hr>
                <form>
                    <div>

                        <div className="div1">

                            <label className="lab">الصف

                                <select className="d-select"
                                        value={ className }
                                        onFocus={()=>handelCheck()   }
                                        onChange={ (event)=>{handleClassName(event)}}
                                        placeholder={"اختر الصف"}>
                                    <option className="g-option"  disabled={true} hidden={true} value={""} >اختر الصف</option>
                                    {dropDownClass.length ===0 ? (
                                        <option className="g-option"  disabled  > لا يوجد صفوف </option>
                                    ):(dropDownClass.map((element)=>(
                                        <option className="g-option" key={element.id}
                                        >{element.name}</option>)))}

                                </select>
                            </label>
                        </div>

                        <div className="div1">

                            <label className="lab">الجنس
                                <select className="d-select"
                                        placeholder={"اختر الجنس"}
                                        onFocus={() => handelCheck1()}
                                        value={gender}
                                        onChange={handleGender}>
                                    <option className="g-option" disabled={true} hidden={true} value={""}>اختر الجنس </option>
                                    {group.map(element => <option className="g-option" key={element.id}
                                    >{element.gender}</option>)}

                                </select>
                            </label>
                        </div>
                        <div className="div1">

                            <label className="lab">الشعبة
                                <select className="d-select"
                                        onClick={sendDropDownSection}
                                        value={ section }
                                        placeholder={"اختر الشعبة"}
                                        onChange={ (event)=>{handleSection(event)}}>
                                    <option className="g-option" disabled={true} hidden={true} value={""} >اختر الشعبة</option>
                                    { isError || dropDownSection.length === 0? (
                                        <option className="g-option"  disabled  > لا يوجد شعب </option>
                                    ):(
                                        dropDownSection.map(element => <option className="g-option" key={element.id}
                                                                               value={element.name}>{element.name}</option>))}

                                </select>
                            </label>
                        </div>

                        <br></br>
                        <br></br>
                        <button className="button1"  value="بحث" onClick={showStudent}> بحث</button>

                    </div>
                </form>

                <div className="tableFixHead">
                    <table>
                        <thead>
                        <tr>
                            <th>الاسم </th>
                            {/*<th>الصف </th>*/}
                            <th>الكود </th>
                            <th> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            containsMessageAttribute  ? (
                                    student.map((e) =>((<tr style={{ textAlign: 'center',fontSize: '20px',fontWeight: 'thin',}}>
                                        <td colSpan={3}>{e.message}</td></tr>))))
                                :
                                ( student.map((val) =>(
                                        <tr key={val.id}>
                                            <td>{val.name+' '+val.fatherName+' '+val.nickname}</td>
                                            <td>{val.password}</td>

                                            <td>
                                                <button className="button2 color1" value="حذف" onClick={(e)=>deleteStudent(e,val.id)  }> حذف</button>
                                                <button className="button2" value="التفاصيل" onClick={()=>{goPDF(val.id) } }> التفاصيل</button>
                                            </td>
                                        </tr>
                                    ))

                                )}
                        </tbody>
                        {/*{student.map((val, key) => (*/}
                        {/*        <tr key={key}>*/}
                        {/*            <td>{val.name+' '+val.fatherName+' '+val.nickname}</td>*/}
                        {/*             <td>{val.password}</td>*/}

                        {/*            <td>*/}
                        {/*            <button className="button2 color" value="التفاصيل" onClick={()=>{}  }> التعديل</button>*/}
                        {/*                <button className="button2" value="التفاصيل" onClick={()=> { }}> التفاصيل</button>*/}
                        {/*            </td>*/}
                        {/*        </tr>*/}

                        {/*))}*/}

                        {/*<tr>  {time.map(e =>*/}
                        {/*    <td>{e.name}</td>*/}
                        {/*)}</tr>*/}

                        {/*<tr>  {time.map(e =>*/}
                        {/*    <td>{e.name}</td>*/}
                        {/*)}</tr>*/}

                        {/*<tr>  {time.map(e =>*/}
                        {/*    <td>{e.name}</td>*/}
                        {/*)}</tr>*/}

                    </table>

                </div>

            </div>

        </div>
    )
}