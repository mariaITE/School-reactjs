import './delay.css'
import Swal from "sweetalert2";
import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
export default function Showabsence() {
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

    console.log("hi")
    const location = useLocation();
    console.log(location);
    const queryParams = new URLSearchParams(location.search);
    const studentId = queryParams.get('id1');

    const [isAvaiable, setIsAvaiable] = useState(true);
    const [detailStudent, setDetailStudent] = useState([])
    console.log("detailStudent",detailStudent)

    useEffect(() => {
        indexAbsence(studentId);
    }, [])
    const indexAbsence = async (id) => {
       // e.preventDefault()
        await fetch(`http://localhost:8000/api/indexAbsence/${id}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //  'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"] '),
            },
        })

            .then(response => response.json())
            .then(data => {
                setDetailStudent(data)
            })
            .catch(error => console.error(error));
    }
//==========================================================
     const changeAvaiable=()=>{
         setIsAvaiable(false);
     }
    //==============================================================
    const handleChangeReason = (index, event) => {
      console.log("value",event.target.value)
        const newRow1 = [...detailStudent];

        if(event.target.value ===''){
            newRow1[index]["reason"]=null;
            newRow1[index]["typeAbsence"]=false;
            console.log("opip")
            // setCharacter((prevState => prevState+","+value))
        }
        else{
            newRow1[index]["reason"]=event.target.value;
            newRow1[index]["typeAbsence"]=true;
           // setCharacter((prevState => prevState.replace(value,"")))
        }
        // console.log("total"+marks)
        setDetailStudent(newRow1)
        console.log("total",detailStudent)
    }
//==========================================================
    const updateReason = async (e, id) => {
        e.preventDefault()
        setIsAvaiable(true)
        //setNewMark('')
        const formData = {
            'newReason': detailStudent,
        }
        console.log("formData",formData)

        await fetch('http://localhost:8000/api/updateAbsence', {
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
    const containsMessageAttribute1 = detailStudent && Array.isArray(detailStudent) && detailStudent.some((item) => 'message' in item)
return (

    <div className="showabsence">

        <div className="da-container">
            <label  className="title">عرض الغيابات</label>

            <button className="button2 color"
                    style={{marginRight: ' 650px',}}
                    value="التعديل"
                    onClick={() => {changeAvaiable()}}> التعديل</button>
            <hr></hr>
               <div className="tableFixHead absence">
             <table >
                 <thead>
               <tr>
            <th>الفصل</th>
            <th>اليوم</th>
            <th>التاريخ</th>
            <th>السبب</th>
        </tr>
               </thead>
                 <tbody>
                 {containsMessageAttribute1?
                     ( detailStudent.map((val) =>
                             <tr>
                                 <td colSpan={4}>{val.message}</td>
                             </tr>
                         )
                     ) :
                     (
                 detailStudent.map((val, key) => {
                    const {reason}=val
            return (

                <tr key={key}>
                        <td>{val.semester}</td>
                    <td>{val.day}</td>
                    <td>{val.date}</td>
                    <td style={{width: "13cm"}}> <input
                        style={{
                            width: "13cm",
                            border: "0",
                            outline: "0",
                            fontSize: '18px',
                            textAlign: 'center'
                        }}
                        className="input"
                        type="text"
                        name={"mark"}
                       disabled={isAvaiable}
                        value={reason}
                        onChange={(event) => {
                            handleChangeReason(key, event)
                        }}
                        autoComplete={"off"}
                        //  onBlur={updateMark}
                        required/></td>

                </tr>
            )
        }))}
        </tbody>
           </table>
                   <button className="button1" value="حفظ" onClick={updateReason}> حفظ</button>
             </div>
             </div>
             </div>
        )
        }