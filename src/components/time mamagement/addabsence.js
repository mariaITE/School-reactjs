
import './delay.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Swal from 'sweetalert2';

export default function Addabsence() {


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
            "name": "الأول",
            "gender":"إناث",
            "class":"السابع"
        },
        {
            "name": "الثاني",
            "gender":"ذكور",
            "class":"الثامن"
        }
    ]
    const [semester, setSemester] = useState('')
    const [className, setClassName] = useState('');
    const [gender, setGender] = useState('');
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState('');
    const [section, setSections] = useState('');
    const [reason, setReason] = useState('');
    const [student, setStudent] = useState([])
    const [dropDownSection, setDropDownSection] = useState([]);
    const [dropDownClass, setDropDownClass] = useState([]);

    // console.log(student);
    // console.log("reason",reason);

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
    const handleSemester = (event) => {
        setSemester(event.target.value)
        //  console.log(gender)
    }
    //------------------------------------------------------------------------
    const handelCheck =()=>{
        if(gender !== '' || section !== '' ){
            setGender("");
            setSections("");

        }
    }
    //===========================================
    const handelCheck1 = () => {
        if (section !== '') {
            setSections("");

        }
    }
    //=================================================
    const [selected, setSelected] = useState(null)
    const [isAvaiable, setIsAvaiable] = useState(false);
    const [disabledRows, setDisabledRows] = useState([]);
     const [isChecked, setIsChecked] = useState(false);
  //  console.log("selected",selected);
    // console.log("isChecked",isChecked);
    console.log("disabledRows",disabledRows);

    const [idChecked1, setIdChecked1] = useState([]);
    const [idChecked2, setIdChecked2] = useState([]);
    const handleCheckboxChange = (event,index,e) => {
    //      setIsChecked(!isChecked);
    //   setSelected(event.target.value)
    //     // console.log("selected",selected);
    // if(event.target.value === "0"){
    //     console.log("lllllllllllll")
    //     setIsAvaiable(false);
    //     setReason("");
    // }
    // else {
         console.log("value",event.target.value)
    //     setIsAvaiable(true);
    // }
       // const {s}=event.target.value;
        const option = {
            student_id: index,
            check:null,
            reason:"",
        }
        if(!e){
            if(event.target.value=== "1"){
                setIdChecked1(idChecked1.filter(item=> item !== index));
                const j = disabledRows.findIndex((item) => item.student_id === option.student_id);
                disabledRows.splice(j, 1);
            }
            if(event.target.value=== "0")
            setIdChecked2(idChecked2.filter(item=> item !== index));
            const j = disabledRows.findIndex((item) => item.student_id === option.student_id);
            disabledRows.splice(j, 1);
        }
        else{
            // setIdChecked1([...idChecked1,index])
            // if(idChecked1.includes(index))
            // {
            //     setIdChecked1( idChecked1.filter(item=> item !== index));
            // }
        if(event.target.value=== "1"){
            setIdChecked1([...idChecked1,index])
             setIdChecked2(idChecked2.filter(item=> item !== index));
            // const j = disabledRows.findIndex((item) => item.student_id === option.student_id);
            // disabledRows.splice(j, 1);
            // if(idChecked1.includes(index))
            // {
            //     setIdChecked1( idChecked1.filter(item=> item !== index));
            // }
            // console.log("yes")
            // setChecked(true);
            // console.log(checked)
           option['check']=true;
        }
        if(event.target.value=== "0"){
            setIdChecked2([...idChecked2,index])
            setIdChecked1(idChecked1.filter(item=> item !== index));
            // const j = disabledRows.findIndex((item) => item.student_id === option.student_id);
            // disabledRows.splice(j, 1);
            // if(idChecked2.includes(index))
            // {
            //     setIdChecked2( idChecked2.filter(item=> item !== index));
            // }
            option['check']=false;
            // setChecked(false);
        }

        console.log("index",index);
        if (disabledRows.length === 0) {
            // console.log("fffffffff");
            setDisabledRows([...disabledRows, option]);
        }
            //     console.log("fffffffff",checkboxValues.includes(option));
            // const i=checkboxValues.filter((item) => item.permission_id === option.permission_id);

        else {
            // const k = disabledRows.find((item)=>  item.student_id === option.student_id && item.check === option.check) !==undefined ;
            // console.log("k", k);
            const i = disabledRows.find((item)=>  item.student_id === option.student_id ) !==undefined ;
            // console.log("o", i.length);
            // console.log("o", i);
            if (!i) {
                setDisabledRows([...disabledRows, option]);
            } else {
                const j = disabledRows.findIndex((item) => item.student_id === option.student_id);
                disabledRows.splice(j, 1);
                setDisabledRows([...disabledRows, option]);
                //console.log("j", j);
            }
        }
        }
        // }
        // else {
        //     console.log("gggggggggggg");
        //     setCheckboxValues([...checkboxValues, option]);
        // }
    }
    //==================================================
    const changColor = (e) =>{
        //console.log("color",e.target.disabled);
        if(!isAvaiable){
            return  " 1px solid gray";
        }
        else {
            return " 1px solid #6D34FF";
        }
    }
    //===============================================
    const handleSetReason=(event,index)=>{
       // console.log(event.target.value)
        const newRow1 = [...disabledRows];
        const updateReason=disabledRows.find(item=> item.student_id===index)
        updateReason.reason=event.target.value;
       // newRow1[index]["reason"]=event.target.value;
        // console.log("total"+marks)
        setDisabledRows(newRow1)
      //  console.log("total",disabledRows)
    }
    //========================================================
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
    //==================================================================
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
    //===============================================================================
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
        setDisabledRows([]);
        const formData={
            'semester':semester,
            'class': className,
            'gender':gender,
            'section':section
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
            .then(data => {
                //console.log("data", data);
                setStudent(data)
            } )
            .catch(error => console.error(error));
        //console.log(showDelay);
    }
    const containsMessageAttribute = student  && Array.isArray(student) && student.some((item) => 'message' in item)  ;
    //================================================================================================
    const sendAbsence = async (e) => {
        e.preventDefault();
        // if (!className || !gender || !section) {
        //     setIsError(true);
        //     setError('الرجاء تعبئة المعلومات  ');
        //
        //     Swal.fire({
        //         icon: "warning",
        //         text :'الرجاء تعبئة المعلومات  ',
        //         // "يوجد شيء خاطئ يرجى إعادة المحاولة"
        //     })
        //     return
        // }
        // setIsError(false);
        // setDisabledRows([]);
        const formData={
            'semester':semester,
            'rows': disabledRows,
        }
        console.log(formData);
        await fetch('http://localhost:8000/api/storeAbsence',{
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
                {
                    if(data.statusCode===200) {
                    Swal.fire({
                        icon: "success",
                        title: data.message
                    })
                       setSemester("") ; setDisabledRows([]);
                        setClassName("");setGender("");setSections("");
                        setIdChecked1([]);  setIdChecked2([]);
                    }
                else if (data.statusCode===400){
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        text:"تأكد من صحة المعلومات"
                    })
                }
                else
                    Swal.fire({
                        icon: "error",
                        text:data.message
                        // "يوجد شيء خاطئ يرجى إعادة المحاولة"
                    })}
            )
            .catch(error => console.error(error));
        //console.log(showDelay);
    }

    return (

        <div className="addabsence">

            <div className="da-container" >
                <label  className="title">إضافة غياب</label>
                <hr></hr>
                <form>
                    <div>
                        <div className="div1" >
                            <label className="lab">الفصل
                                <select className="d-select"
                                        value={semester}
                                        onChange={(event) => {
                                            handleSemester(event)
                                        }}
                                        placeholder={"اختر الفصل"}>
                                    <option className="g-option" disabled={true} hidden={true} value={""} >اختر الفصل</option>
                                    {group.map(element => <option className="g-option" key={element.id}
                                                                  value={element.name}>{element.name}</option>)}

                                </select>
                            </label>
                        </div>
                        <div className="div1">

                            <label className="lab">الصف

                                    <select className="d-select"
                                            value={ className }
                                            onFocus={()=>handelCheck()}
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
                                <select className="d-select" onClick={sendDropDownSection}
                                        value={ section }
                                        placeholder={"اختر الشعبة"}
                                        onChange={ (event)=>{handleSection(event)}}>
                                    <option className="g-option" disabled={true} hidden={true} value={""} >اختر الشعبة</option>
                                    {isError || dropDownSection.length === 0? (
                                        <option className="g-option"  disabled  > لا يوجد شعب </option>
                                    ):(
                                        dropDownSection.map(element => <option className="g-option" key={element.id}
                                                                  value={element.name}>{element.name}</option>))}

                                </select>
                            </label>
                        </div>

                        <br></br>
                        <br></br>
                        <button className="button1" value="بحث" onClick={showStudent}> بحث</button>

                    </div>
                </form>

                <div className="tableFixHead">
                    <table >
                    <thead>
                        <tr>
                            <th>الاسم و الكنية</th>
                            <th>التفقد</th>

                        </tr>
                    </thead>
                        <tbody>
                        {
                            containsMessageAttribute  ? (
                                    student.map((e) =>((<tr style={{ textAlign: 'center',fontSize: '20px',fontWeight: 'thin',}}>
                                        <td colSpan={3}>{e.message}</td></tr>))))
                                :
                                (
                          student.map((val, key) => {
                               const {reason}=val
                              // const {checked}=val
                            return (
                                <tr key={val.id}>
                                    <td style={{width: "3.5cm"}}>{val.name+' '+val.fatherName+' '+val.nickname}</td>
                                    <td>
                                        <input  type="checkbox"
                                                name="exampleRadios"
                                                id="exampleRadios1"
                                                value={"0"}
                                               checked={idChecked2.includes(val.id )
                                                   // disabledRows.find((i) => i.student_id === val.id && i.check ===false )?.checked
                                               }
                                                onChange={(e)=>{handleCheckboxChange(e,val.id,e.target.checked)}}
                                                required/>

                                        {/*{disabledRows.includes((i) => i.student_id === val.id )?.checked  }*/}
                                        <label className="lab">غياب غير مبرر </label>
                                        <input  type="checkbox"
                                                name="exampleRadios"
                                               id="exampleRadios2"
                                               checked={idChecked1.includes( val.id )
                                                   // disabledRows.find((i) => i.student_id === val.id && i.check ===true )?.checked
                                               }
                                                value={"1"}
                                                onChange={(e)=>{handleCheckboxChange(e,val.id,e.target.checked)}}
                                        required/>
                                        <label className="lab">غياب مبرر </label>
                                        <label className="lab"> السبب
                                        <input className="input"
                                            type={"text"}
                                            name={"السبب"}
                                               disabled={ !disabledRows.find((item)=>  item.student_id === val.id && item.check ===true)  }
                                               value={reason}
                                               style={ {border : disabledRows.find((item)=>  item.student_id === val.id && item.check ===true) ? " 1px solid #6D34FF" :" 1px solid gray"}}
                                               autoComplete={"off"}
                                               onChange={(event) => {
                                                   handleSetReason(event,val.id)
                                               }}
                                            required/>
                                        </label>

                                        <button className="button2" value="التفاصيل" onClick={()=> { navigate(`/components/time mamagement/showabsence?id1=${val.id}`)}}> التفاصيل</button>
                                    </td>
                                </tr>
                            )
                        }))}
                        </tbody>
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
                    <button className="button1" value="حفظ" onClick={sendAbsence}> حفظ</button>
                </div>

            </div>

        </div>
    )
}