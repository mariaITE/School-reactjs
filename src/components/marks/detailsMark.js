// import './time mamagement/delay.css'
import {useParams, useLocation, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import Swal from "sweetalert2";

export default function DetailsMark() {
    console.log("hi")
    const location = useLocation();
    console.log(location);
    const queryParams = new URLSearchParams(location.search);
    //const encodedData=queryParams.get('data');
    //  const data=JSON.parse(decodeURIComponent(encodedData));
    // //const jsonData = location.state?.jsonData;
    const studentId = queryParams.get('id1');
    const idType = queryParams.get('id2');
    const idSubject = queryParams.get('id3');

    // const {studentId
    //      ,idType,idSubject
    // }= useParams();
    // console.log(studentId);
    // console.log(idType);
    // console.log(idSubject);

    const [detailStudent, setDetailStudent] = useState([])
    // const [NewMark, setNewMark] = useState('')
    // const [newId, setNewId] = useState('')
    const [marks, setMark] = useState([])
    const [isAvaiable, setIsAvaiable] = useState(true);
   // console.log(detailStudent);
    console.log("detailStudent",detailStudent);
   // console.log(marks);
    const navigate = useNavigate();
    useEffect(() => {
        detailMark();
    }, [])

//=====================================================
    const detailMark = async () => {
        //  e.preventDefault();
        console.log(studentId);
        console.log(idType);
        console.log(idSubject);
        await fetch(`http://localhost:8000/api/showDetailsMark/${studentId}/${idType}/${idSubject}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json()
            )
            .then(data => {
                // navigate('/components/marks/detailsMark',data);
                // console.log("jjj");
                setDetailStudent(data);
                // const {studentMark}=data
                // const {id}=data
                // console.log("studentMark",studentMark)
                // setNewMark(studentMark)
                // setNewId(id)
                // console.log("jjj");
                // console.log(data);
            })
            .catch(error => console.error(error));

    }
//=========================================================================
    const handleMark = (index, event) => {
        // setNewMark(event.target.value);
        // console.log("index" + index);
        // // console.log("value"+event.target.value);
        // // const {name, value} = event.target.value;
        // // let rowsInput = [...mark];
        // // console.log("rowsInput"+rowsInput);
        // // rowsInput[index][name] = value;
        // // setMark(rowsInput);
        // console.log("value" + event.target.value);
        // let option = {
        //     id: index,
        //     mark: event.target.value
        // }
        // console.log(marks.length)
        // if (marks.length === 0) {
        //     console.log(" marks.length")
        //     const newRow = {id: index, mark: event.target.value};
        //     console.log(newRow)
        //     setMark([...marks, newRow]);
        //     //console.log(marks)
        // } else {
        //
        //     //  const i = marks.filter((item) => item.id === index);
        //
        //     //console.log("o", i.length);
        //     const i = marks.find(item => item.id === index) !== undefined;
        //     if (!i) {
        //         console.log("ooo", i);
        //         const newRow1 = {id: index, mark: event.target.value};
        //         setMark([...marks, newRow1]);
        //         // console.log("total"+marks)
        //     } else {
        //         const j = marks.findIndex((item) => item.id === index);
        //         marks.splice(j, 1);
        //         if (option.mark !== '') {
        //             setMark([...marks, option]);
        //         }
        //         // console.log("j", j);
        //     }
        // }
                const newRow1 = [...detailStudent];
                newRow1[index]["studentMark"]=event.target.value;
                // console.log("total"+marks)
                setDetailStudent(newRow1)
        console.log("total",detailStudent)
            }

//======================================================================
    const changeAvaiable = () => {
        setIsAvaiable(false);

    }
//============================================================
    const updateMark = async (e, id) => {
        e.preventDefault()
        setIsAvaiable(true)
        //setNewMark('')
        const formData = {
            'marks': detailStudent,
        }
        await fetch('http://localhost:8000/api/updateMark', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json()
            )
            .then(data => {
                if (data.statusCode === 200) {
                    Swal.fire({
                        icon: "success",
                        title: data.message
                    })
                } else if (data.statusCode === 400) {
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        // text:"تأكد من صحة المعلومات"
                    })
                } else
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                        text: "يوجد شيء خاطئ يرجى إعادة المحاولة"
                    })
            })
            .catch(error => console.error(error));

    }
    //===============================================================
    const deleteMark = async (e,id) => {
       // e.preventDefault();
        await fetch(`http://localhost:8000/api/deleteMark/${id}`,{
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
                  //window.location.reload();
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
    // let group = [
    //     {
    //         "name": "الأول",
    //         "gender":"الأحد",
    //         "sname":"23/2/2023",
    //         "class":"مرض"
    //     },
    //     {
    //         "name": "الثاني",
    //         "gender":"الثلاثاء",
    //         "sname":"8/6/2023",
    //         "class":"نوم"
    //     },
    //     {
    //         "name": "الأول",
    //         "gender":"الأحد",
    //         "sname":"2/9/2023",
    //         "class":"مرض"
    //     },
    //     {
    //         "name": "الأول",
    //         "gender":"الخميس",
    //         "sname":"2/11/2023",
    //         "class":"نوم"
    //     },{
    //         "name": "الثاني",
    //         "gender":"الثلاثاء",
    //         "sname":"8/6/2023",
    //         "class":"نوم"
    //     },
    //     {
    //         "name": "الثاني",
    //         "gender":"الثلاثاء",
    //         "sname":"8/6/2023",
    //         "class":"نوم"
    //     },
    //     {
    //         "name": "الثاني",
    //         "gender":"الثلاثاء",
    //         "sname":"8/6/2023",
    //         "class":"نوم"
    //     },
    //     {
    //         "name": "الثاني",
    //         "gender":"الثلاثاء",
    //         "sname":"8/6/2023",
    //         "class":"نوم"
    //     },
    //     {
    //         "name": "الثاني",
    //         "gender":"الثلاثاء",
    //         "sname":"8/6/2023",
    //         "class":"نوم"
    //     },
    //     {
    //         "name": "الثاني",
    //         "gender":"الثلاثاء",
    //         "sname":"8/6/2023",
    //         "class":"نوم"
    //     },
    //
    // ]

    return (

        <div className="detailsMark">

            <div className="da-container">
                <label className="title">عرض العلامات</label>
                <button className="button2 color" style={{
                    marginRight: ' 650px',
                }}
                        value="التعديل" onClick={() => {
                    changeAvaiable()
                }}> التعديل
                </button>
                <hr></hr>
                <div className="tableFixHead absence">
                    <table>
                        <thead>
                        <tr>
                            <th>المادة</th>
                            <th>النوع</th>
                            <th>العلامة</th>
                            <th>العلامة العليا</th>
                            <th>العلامة الدنيا</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {detailStudent.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>لا يوجد علامات</td>
                                </tr>
                            ) :
                            (
                                detailStudent.map((val, key) => {
                                    const {studentMark} = val
                                    //setNewMark(studentMark)
                                    //const {mark} = val
                                    return (
                                        <tr key={val.id}>
                                            <td>{val.subject.name}</td>
                                            <td>{val.type.name}</td>

                                            {/*<td>{val.studentMark}</td>*/}
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
                                                    disabled={isAvaiable}
                                                    value={studentMark}
                                                    onChange={(event) => {
                                                        handleMark(key, event)
                                                    }}
                                                    autoComplete={"off"}
                                                    //  onBlur={updateMark}
                                                    required/></td>
                                            <td>{val.highMark}</td>
                                            <td>{val.lowMark}</td>
                                            <td>
                                            <button className="button2 color1" style={{margin:"20px"}} value="حذف" onClick={(e)=>deleteMark(e,val.id)  }> حذف</button>
                                            </td>

                                        </tr>
                                    )
                                }))}
                        </tbody>
                    </table>
                    <button className="button1" value="حفظ" onClick={updateMark}> حفظ</button>
                </div>
            </div>
        </div>
    )
}