
import './delay.css'
import React, {useState} from "react";
import Swal from "sweetalert2";
export default function Addpermission() {

    let group = [
        {
            "name": "الأول"
        },
        {
            "name": "الثاني"
        }
    ]

    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [date, setDate] = useState('');
    const [semester, setSemester] = useState('');
    const [person, setPerson] = useState('');
    const [addPermission, setAddPermission] = useState([]);
    console.log(addPermission);
//-------------------------------------------------------------
    const handleName = (event) => {
        setName(event.target.value)
    }
    const handleSemester = (event) => {
        setSemester(event.target.value)
    }
    const handleFatherName = (event) => {
        setFatherName(event.target.value)
    }
    const handleDate = (event) => {
        setDate(event.target.value)
    }
    const handleNickname = (event) => {
        setNickname(event.target.value)
    }
    const handlePerson = (event) => {
        setPerson(event.target.value)
    }
    //============================================================
    const sendAddpermission = async (e) => {
        e.preventDefault();

        const formData={
            'name': name,
            'nickname':nickname,
            'fatherName':fatherName,
            'semester':semester,
            'date':date,
            'person':person
        }

        await fetch('http://localhost:8000/api/storePermission',{
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
                setAddPermission(data)
                if(data.statusCode===200) {
                    Swal.fire({
                        icon: "success",
                        title: data.message
                    })
                    setName("");
                    setSemester("");
                    setNickname("");
                    setFatherName("");
                    setDate("");
                    setPerson("");
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
                    })
            })
            .catch(error => console.error(error));
        //console.log(showDelay);
    }
    //---------------------------------------------
    return (

        <div className="addpermission">

            <div className="da-container">
                <label  className="title">إضافة أذن</label>
                <hr></hr>
                <form>
                    <div>
                        <div className="div1">
                            <label className="lab"> اسم الطالب

                                <input className="input"
                                       type={"text"}
                                       name={"اسم الطالب"}
                                       value={ name }
                                       autoComplete={"off"}
                                       onChange={ (event)=>{handleName(event)}}
                                       required/>
                            </label >
                        </div>
                        <div className="div1">
                            <label className="lab"> الكنية

                                <input className="input"
                                       type={"text"}
                                       name={"الكنية"}
                                       value={ nickname }
                                       autoComplete={"off"}
                                       onChange={ (event)=>{handleNickname(event)}}
                                       required/>
                            </label >
                        </div>

                        <div className="div1">
                            <label className="lab">اسم الأب

                                <input className="input"
                                       type={"text"}
                                       name={"اسم الأب"}
                                       value={ fatherName }
                                       autoComplete={"off"}
                                       onChange={ (event)=>{handleFatherName(event)}}
                                       required/>
                            </label >
                        </div>
                        <div className="div1">
                            <label className="lab">الفصل
                                <select className="d-select"
                                        value={ semester }
                                        placeholder={"اخترالفصل"}
                                        onChange={ (event)=>{handleSemester(event)}}>
                                    <option className="g-option" disabled={true} hidden={true}  value={""} >اختر الفصل</option>
                                    {group.map(element => <option className="g-option" key={element.id}
                                                                  value={element.name}>{element.name}</option>)}

                                </select>
                            </label>
                        </div>
                        <div className="div1">
                            <label className="lab"> التاريخ

                                <input className="input"
                                       type={"date"}
                                       autoComplete={"off"}
                                       name={"التاريخ"}
                                       value={ date }
                                       onChange={ (event)=>{handleDate(event)}}
                                       required/>
                            </label >
                        </div>

                        <div className="div1">
                            <label className="lab"> التفاصيل

                                <input className="input"
                                       type={"text"}
                                       name={"التفاصيل"}
                                       autoComplete={"off"}
                                       value={ person }
                                       onChange={ (event)=>{handlePerson(event)}}
                                       required/>
                            </label >
                        </div>
                        <br></br>
                        <br></br>
                        <button className="button1" value="حفظ" onClick={sendAddpermission}> حفظ</button>

                    </div>
                </form>


            </div>

        </div>
    )
}