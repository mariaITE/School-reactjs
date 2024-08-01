import {Route, useNavigate,Routes,BrowserRouter} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";
import MyPdf from "../students/myPDF";
import DetailsMark from "./detailsMark";

export default function ShowAddMark() {

    const navigate = useNavigate();
    //
    // let time = [
    //     {
    //         "name": "ماريا نذير سري"
    //     },
    //     {
    //         "name": "رغد الزعبي"
    //     },
    //     {
    //         "name": "رغد الخطيب"
    //     },
    //     {
    //         "name": "بيان السيد اللحام"
    //     },
    //
    // ]

    let group = [
        {
            "name": "الأول",
            "gender": "إناث",

        },
        {
            "name": "الثاني",
            "gender": "ذكور",

        }
    ]

    //
    // const staticValue = "tab1";
    // const staticValue1 = "tab2";

    const [semester, setSemester] = useState('')
    const [className, setClassName] = useState('')
    // const [idClassName, setIdClassName] = useState('')
    const [gender, setGender] = useState('')
    const [section, setSections] = useState('')
    const [idSubject, setIdSubject] = useState('')
    const [upMark, setUpMark] = useState('')
    const [downMark, setDownMark] = useState('')
    const [idType, setIdType] = useState('')
    const [error, setError] = useState('');
    const [date, setDate] = useState('');
    const [marks, setMark] = useState([])
    const [isError, setIsError] = useState(false);
    const [isAvaiable, setIsAvaiable] = useState(true);
    const [dropDownSection, setDropDownSection] = useState([])
    const [dropDownSubject, setDropDownSubject] = useState([])
    const [dropDownClass, setDropDownClass] = useState([])
    const [dropDownType, setDropDownType] = useState([])
    const [student, setStudent] = useState([])
    // const [detaileStudent, setDetaileStudent] = useState([])
    const [activeTab, setActiveTab] = useState('')

   // console.log(marks)
   // console.log(detaileStudent);
    // console.log(section)
    // console.log(className)
    // console.log(student)

    const handleClassName = (event) => {
        // console.log("llll"+event.target.value)
        setClassName(event.target.value)
        // setIdClassName(event.target.value.id)

    }
    //================================================
    const handleGender = (event) => {
        setGender(event.target.value)
        //  console.log(gender)
    }
    //----------------------------------------------------------
    const handleSection = (event) => {
        setSections(event.target.value)
        //  console.log(gender)
    }
    //===============================================================
    const handleTypeName = (event) => {
        setIdType(event.target.value)
        //  console.log(gender)
    }
    //==================================================================
    const handleSubject = (event) => {
        setIdSubject(event.target.value)
        //  console.log(gender)
    }
    //======================================================================
    const handleUpMark = (event) => {
        setUpMark(event.target.value)
        //  console.log(gender)
    }
    //======================================================================
    const handleDownMark = (event) => {
        setDownMark(event.target.value)
        //  console.log(gender)
    }
    //======================================================================
    const handleSemesterName = (event) => {
        setSemester(event.target.value)
        //  console.log(gender)
    }
    //======================================================================
    const handleMark = (index,event) =>
    {
        console.log("index"+index);
        // console.log("value"+event.target.value);
        // const {name, value} = event.target.value;
        // let rowsInput = [...mark];
        // console.log("rowsInput"+rowsInput);
        // rowsInput[index][name] = value;
        // setMark(rowsInput);
        console.log("value"+event.target.value);
        let option = {
            id: index,
            mark: event.target.value
        }
        console.log( marks.length)
        if (marks.length === 0) {
            console.log(" marks.length")
        const newRow = {id:index,mark:event.target.value};
            console.log(newRow)
        setMark([...marks,newRow]);
        //console.log(marks)
    }
        else {

          //  const i = marks.filter((item) => item.id === index);

           //console.log("o", i.length);
            const i = marks.find(item =>  item.id === index) !== undefined;
            if (!i) {
                console.log("ooo", i);
                const newRow1 = {id:index,mark:event.target.value};
                setMark([...marks, newRow1]);
               // console.log("total"+marks)
            } else {
                const j = marks.findIndex((item) => item.id ===index);
                marks.splice(j, 1);
                if(option.mark !=='') {
                    setMark([...marks, option]);
                }
               // console.log("j", j);
            }
        }
    }
    //=============================================

    // const handleInputBlur = () => {
    //     setIsAvaiable(true);
    // }
    //=============================================

    // const handleActiveTab = (event) => {
    //   //  console.log("lljjg" + event.target.value);
    //     setActiveTab(event.target.value);
    // }

    //=================================================================================
    const handelCheck = () => {
        if (gender !== '' || section !== '' || idSubject !== '') {
            setGender("");
            setSections("");
            setIdSubject("");

        }
    }
    //========================================================
    const handelCheck1 = () => {
        if (section !== '') {
            setSections("");

        }
    }
    //------------------------------------------------------------------------
    const changeAvaiable = () => {
        setIsAvaiable(false);
    }
    //=========================================================================
    const handleSend=(e,studentId)=>{
       // e.preventDefault()
        // detailMark(e,studentId);
        //  console.log(detaileStudent);
        //  const encodedData=encodeURIComponent(JSON.stringify(detaileStudent))
        // console.log("encodedData"+encodedData);
       navigate(`/components/marks/detailsMark?id1=${studentId}&id2=${idType}&id3=${idSubject}`)

       // <Route path="/components/marks/detailsMark/:studentId/:idType/:idSubject" element={<DetailsMark/>}/>

    }
    //==========================================================================================
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

        await fetch('http://localhost:8000/api/showSection', {
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
    useEffect(() => {
        sendDropDownClass();
        sendDropDownType();
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
    //=========================================================================
    const sendDropDownType = async () => {
        // e.preventDefault();
        fetch('http://localhost:8000/api/showType', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setDropDownType(data.data))
            .catch(error => console.error(error));

    }
    //-------------------------------------------------------------------
    const showStudent = async () => {
        // setActiveTab(e);
        //e.preventDefault();
        //  console.log("----"+e.target.value);
        if (!className || !gender || !section || !idSubject || !idType || !semester) {
            setIsError(true);
            setError('الرجاء تعبئة المعلومات  ');

            await Swal.fire({
                icon: "warning",
                text: 'الرجاء تعبئة المعلومات  ',
                // "يوجد شيء خاطئ يرجى إعادة المحاولة"
            })
            return
        }
        setIsError(false);
        const formData = {
            'section': section,
            'class': className,
            'gender': gender,
            'semester': semester,
        }
        console.log(formData);
        await fetch(`http://localhost:8000/api/showStudentMark/${idSubject}/${idType}`, {
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
    const containsMessageAttribute = student && Array.isArray(student) && student.some((item) => 'message' in item);
    //=======================================================================================================

    // const detailMark = async (e,studentId) => {
    //      e.preventDefault();
    //     //console.log(studentId);
    //     await fetch(`http://localhost:8000/api/showDetailsMark/${studentId}/${idType}/${idSubject}`,{
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //         .then(response =>response.json())
    //         .then(data => {
    //             // navigate('/components/marks/detailsMark',data);
    //             setDetaileStudent(data);
    //             // console.log("jjj");
    //             // console.log(data);
    //         })
    //         .catch(error => console.error(error));
    //
    // }
//=============================================================================================
    const AddMark = async (e) => {
        e.preventDefault();
        const formData={
            'semester': semester,
            'upMark':upMark,
            'downMark':downMark,
            'marks':marks,
            'date':date,
        }
        console.log(formData)
        await fetch(`http://localhost:8000/api/storeMark/${idSubject}/${idType}`,{
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
    //==========================================================================================
    const sendDropDownSubject = async (e) => {
        e.preventDefault();
        if (!className) {
            return setIsError(true);
        }
        setIsError(false);
        // e.preventDefault();
        const formData = {
            'className': className,
        }
        // console.log(idClassName);
        await fetch('http://localhost:8000/api/showSubject', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => setDropDownSubject(data))
            .catch(error => console.error(error));

    }
    const containsMessageAttribute1 = dropDownSubject && Array.isArray(dropDownSubject) && dropDownSubject.some((item) => 'message' in item)
//=====================================================================================================

//     const [activeTab, setActiveTab] = useState("tab1");
    //  Functions to handle Tab Switching
    const handleTab1 = () => {
        // update the state to tab1
        setActiveTab("tab3");
        showStudent();
    };
    const handleTab2 = () => {
        // update the state to tab2
        setActiveTab("tab4");
        showStudent();
    };

    const showMark = () => {
        return (
            <div className="tableFixHead mark">
                <table>
                    <thead>
                    <tr>
                        <th>الاسم</th>
                        {/*<th>الصف </th>*/}
                        <th>العدد</th>
                        <th> </th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        //     student.length === 0? (
                        //         <tr style={{ textAlign: 'center',fontSize: '20px',fontWeight: 'thin',}}>
                        //             <td colSpan={3}>لا يوجد طلاب</td></tr>
                        // ):(
                        containsMessageAttribute ? (
                                student.map((e) => ((
                                    <tr style={{textAlign: 'center', fontSize: '20px', fontWeight: 'thin',}}>
                                        <td colSpan={3}>{e.message}</td>
                                    </tr>))))
                            :
                            (student.map((val) => (
                                    <tr key={val.id}>
                                        <td>{val.name + ' ' + val.fatherName + ' ' + val.nickname}</td>
                                        <td>{val.number}
                                            {/*<input*/}
                                            {/*style={{width:"2.5cm", border:"0",outline:"0",fontSize: '18px',textAlign: 'center'}}*/}
                                            {/*className="input"*/}
                                            {/*type="text"*/}
                                            {/*value={mark}*/}
                                            {/*onChange={handleMark}*/}
                                            {/*autoComplete={"off"}*/}
                                            {/*onBlur={handleInputBlur}*/}
                                            {/*disabled={isAvaiable}*/}
                                            {/*required/>*/}
                                        </td>
                                        {/*<td>*/}
                                        {/*    /!*<input*!/*/}
                                        {/*    /!*style={{width:"2.5cm", border:"0",outline:"0",fontSize: '18px',textAlign: 'center'}}*!/*/}
                                        {/*    /!*className="input"*!/*/}
                                        {/*    /!*type="text"*!/*/}
                                        {/*    /!*onClick={()=>detailMark(val.id)}*!/*/}
                                        {/*    /!*required/>*!/*/}
                                        {/*</td>*/}

                                        <td>
                                            <button  className="button2" value="التفاصيل" onClick={(event) => {handleSend(event,val.id)}}> التفاصيل
                                            </button>
                                            {/*<button className="button2 color" value="التعديل" onClick={()=>{changeAvaiable()}  }> التعديل</button>*/}
                                        </td>
                                    </tr>
                                ))

                            )}
                    </tbody>


                </table>
                {/*<button className="button1" value="حفظ" onClick={() => {*/}
                {/*}}> حفظ*/}
                {/*</button>*/}
            </div>
        )
    }
    const addMark = () => {
          //setMark([]);
            return (
                <div className="tableFixHead mark">
                    <table>
                        <thead>
                        <tr>
                            <th>الاسم</th>
                            {/*<th>الصف </th>*/}
                            <th>العلامة</th>
                            {/*<th></th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            //     student.length === 0? (
                            //         <tr style={{ textAlign: 'center',fontSize: '20px',fontWeight: 'thin',}}>
                            //             <td colSpan={3}>لا يوجد طلاب</td></tr>
                            // ):(
                            containsMessageAttribute ? (
                                    student.map((e) => ((
                                        <tr style={{textAlign: 'center', fontSize: '20px', fontWeight: 'thin',}}>
                                            <td colSpan={3}>{e.message}</td>
                                        </tr>))))
                                :
                                (student.map((val, index) => {
                                        const {k} = val;

                                        return (
                                            <tr key={val.id}>
                                                <td>{val.name + ' ' + val.fatherName + ' ' + val.nickname}</td>
                                                <td>
                                                    <input
                                                        style={{
                                                            width: "2.5cm",
                                                            border: "0",
                                                            outline: "0",
                                                            fontSize: '18px',
                                                            textAlign: 'center'
                                                        }}
                                                        className="input"
                                                        type="text"
                                                        name={"mark"}
                                                        value={k}
                                                        onChange={(event) => {
                                                            handleMark(val.id, event)
                                                        }}
                                                        autoComplete={"off"}
                                                        // onBlur={handleInputBlur}
                                                        required/>
                                                </td>

                                                {/*<td>*/}
                                                {/*    /!*<button className="button2" value="التفاصيل" onClick={()=>{}}> التفاصيل</button>*!/*/}
                                                {/*    <button className="button2 color" value="التعديل" onClick={() => {*/}
                                                {/*        changeAvaiable()*/}
                                                {/*    }}> التعديل*/}
                                                {/*    </button>*/}
                                                {/*</td>*/}
                                            </tr>
                                        )
                                    })

                                )}
                        </tbody>


                    </table>
                    <button className="button1" value="حفظ" onClick={AddMark}> حفظ
                    </button>
                </div>
            )


    }

    return (

        <div className="showStudent">

            <div className="da-container">
                <label className="title">إضافة علامة</label>
                <div className={"div1"}>
                    <label className="lab" style={{marginRight:" 550px" }}>التاريخ : </label>
                    <input className="input "
                           style={{ marginTop:"0" ,marginLeft:"0" ,marginBottom:"0"  }}
                           type={"date"}
                           autoComplete="off"
                           value={date}
                           required
                           onChange={(event) => {setDate(event.target.value)}}/>
                </div>
                <hr></hr>
                <form>
                    <div>
                        <div className="div1">
                            <label className="lab">الفصل
                                <select className="d-select"
                                        value={semester}
                                        onChange={(event) => {
                                            handleSemesterName(event)
                                        }}
                                        placeholder={"اختر الفصل"}>
                                    <option className="g-option" disabled={true} hidden={true} value={""}>اختر الفصل
                                    </option>
                                    {group.map(element => <option className="g-option" key={element.id}
                                                                  value={element.name}>{element.name}</option>)}

                                </select>
                            </label>
                        </div>
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
                        </div>

                        <div className="div1">

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
                        <div className="div1">

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
                        <div className="div1">

                            <label className="lab">المادة
                                <select className="d-select"
                                        onClick={sendDropDownSubject}
                                        value={idSubject}
                                        placeholder={"اختر المادة"}
                                        onChange={(event) => {
                                            handleSubject(event)
                                        }}>
                                    <option className="g-option" disabled={true} hidden={true} value={""}>اختر المادة
                                    </option>
                                    {isError || dropDownSubject.length === 0 ? (
                                        <option className="g-option" disabled> لا يوجد مواد </option>
                                    ) : (
                                        containsMessageAttribute1 ? (
                                            dropDownSubject.map((element) =>
                                                <option className="g-option" disabled> {element.message} </option>)
                                        ) : (dropDownSubject.map(element => <option className="g-option"
                                                                                    key={element.id}
                                                                                    value={element.id}>{element.name}</option>)))}

                                </select>
                            </label>
                        </div>
                        <div className="div1">

                            <label className="lab">النوع

                                <select className="d-select"
                                        value={idType}
                                        onChange={(event) => {
                                            handleTypeName(event)
                                        }}
                                        placeholder={"اختر النوع"}>
                                    <option className="g-option" disabled={true} hidden={true} value={""}>اختر النوع
                                    </option>
                                    {dropDownType.length === 0 ? (
                                        <option className="g-option" disabled> لا يوجد أنواع </option>
                                    ) : (dropDownType.map((element) => (
                                        <option className="g-option" key={element.id}
                                                value={element.id}>{element.name}</option>)))}

                                </select>
                            </label>
                        </div>
                        <div className="div1">

                            <label className="lab">العلامة العليا

                                <input
                                    style={{width: "2.5cm"}}
                                    className="input"
                                    type="text"
                                    value={upMark}
                                    onChange={handleUpMark}
                                    autoComplete={"off"}
                                />
                            </label>
                        </div>
                        <div className="div1">

                            <label className="lab">العلامة الدنيا
                                <input
                                    style={{width: "2.5cm"}}
                                    className="input"
                                    type="text"
                                    value={downMark}
                                    onChange={handleDownMark}
                                    autoComplete={"off"}
                                />
                            </label>
                        </div>
                        <br></br>
                        <br></br>
                        <div>
                            <ul className="nav1">
                                <li id={"tab3"}
                                    className={"active1"}
                                    // value={staticValue}
                                    //onChange={handleTab1}
                                    onClick={handleTab1}
                                >
                                    عرض العلامات
                                </li>
                                <li id={"tab4"}
                                    className={"active1"}
                                    //value={staticValue1}
                                    // onChange={handleTab2}
                                    onClick={handleTab2}
                                >
                                    إضافة علامة
                                </li>
                            </ul>

                            <div className="outlet">
                                {activeTab === "tab3" ? showMark() : addMark()}
                            </div>
                        </div>
                        {/*<button className="button1"  value="بحث" onClick={showStudent}> بحث</button>*/}

                    </div>
                </form>


            </div>
            {/*<tr>  {time.map(e =>*/}
            {/*    <td>{e.name}</td>*/}
            {/*)}</tr>*/}

            {/*<tr>  {time.map(e =>*/}
            {/*    <td>{e.name}</td>*/}
            {/*)}</tr>*/}


        </div>
    )
}