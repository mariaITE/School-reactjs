import React, {useEffect, useRef, useState} from "react";
import axios from "axios";

// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

export default function Dashboard() {

    let gender = [
        {
            "id": "1",
            "name": "ذكور"
        },
        {
            "id": "2",
            "name": "إناث"
        },
    ]
    let days = [
        {
            "id": "1",
            "name": "الأحد"
        }, {
            "id": "2",
            "name": "الاثنين"
        }, {
            "id": "3",
            "name": "الثلاثاء"
        }, {
            "id": "4",
            "name": "الأربعاء"
        }, {
            "id": "5",
            "name": "الخميس"
        },
    ]

    const [open, setOpen] = useState(false)
    const ref = useRef()

    const [student, setStudent] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [CountReports, setCountReports] = useState([]);
    const [reports, setReports] = useState([]);
    const [DropDownClass, setDropDownClass] = useState([]);
    const [className, setClassName] = useState("");
    const [selectGender, setSelectGender] = useState("");
    const [selectSection, setSelectSection] = useState("");
    const [selectDay, setSelectDay] = useState("");
    const [DropDownSection, setDropDownSection] = useState([]);
    const [program, setProgram] = useState([]);
    const [isError, setIsError] = useState(false);
    console.log(className);
    console.log(selectGender);
    console.log(selectSection);
    console.log(selectDay);
    console.log("DropDownSection",DropDownSection);


    const handleClassChange = (event) => {
        const selected = event.target.value;
        setClassName(selected)
    }
    const handleGenderChange = (event) => {
        const selected = event.target.value;
        setSelectGender(selected)
    }
    const handleSectionChange = (event) => {
        const selected = event.target.value;
        setSelectSection(selected)
    }
    const handleDayChange = (event) => {
        const selected = event.target.value;
        setSelectDay(selected)
    }

    const handleDefaultClass = () => {
        if (selectGender || selectSection) {
            setSelectGender("");
            setSelectSection("");

        }
    }

    const handleDefaultGender = () => {
        if (selectSection) {

            setSelectSection("");

        }
    }


    useEffect(() => {

        fetchCountStudents()

    }, []);
    useEffect(() => {

        fetchCountEmployees()

    }, []);
    useEffect(() => {

        fetchCountReports()

    }, []);
    useEffect(() => {

        fetchReports()

    }, []);


    const fetchCountStudents = async () => {
        await axios.get('http://localhost:8000/api/student/countStudent').then(({data}) => {
            setStudent(data)
        });
    }
    const fetchCountEmployees = async () => {
        await axios.get('http://localhost:8000/api/employee/countEmployee').then(({data}) => {
            setEmployee(data)
        });
    }
    const fetchCountReports = async () => {
        await axios.get('http://localhost:8000/api/report/countReport').then(({data}) => {
            setCountReports(data)
        });
    }

    const fetchReports = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/report/list', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            const jsonData = await response.json();
            console.log(jsonData);
            setReports(jsonData);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        sendDropDownClass()
    }, [])
    useEffect(() => {
        sendDropDownSection()
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
         if (!className || !selectGender) {
             return setIsError(true);
         }
        setIsError(false);
        const formData = {
            'className': className,
            'gender': selectGender,
        }

        console.log(formData)
        await fetch('http://localhost:8000/api/showSectionB', {
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
    const fetchProgram = async (e) => {
        e.preventDefault();
        if (!className || !selectGender) {
            return setIsError(true);
        }
        setIsError(false);
        const formData = {
            'class': className,
            'gender': selectGender,
            'section': selectSection,
            'day': selectDay,

        }

        console.log(formData)
        await fetch('http://localhost:8000/api/showProgramDash', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //  'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"] '),
            },
            body: JSON.stringify(formData)
        })


            .then(response => response.json())
            .then(data => setProgram(data.data))
            .catch(error => console.error(error));
    }


    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(!showModal);
    }


    return (
        <div className="dashboard">

            <div className="d-container">

                <div className="column">

                    <div><i className={"bi bi-people icon"}/>{student.count} </div>
                    عدد الطلاب
                </div>
                <div className="column">

                    <div><i className={"bi bi-people-fill icon"}/>{employee.count}  </div>
                    عدد الموظفين
                </div>
                <div className="column" id={"reports"} onClick={handleButtonClick}>

                    <div><i className={"bi bi-stickies-fill icon"}/>{CountReports.count}
                    </div>

                    عدد الشكاوى
                </div>
                {
                    showModal && (
                        <div className={"modal"}>
                            <i className="bi bi-x-square-fill" onClick={handleButtonClick}/>

                            <div className="popup">

                                {reports.map((val, index) =>
                                    (
                                        <div className="repo" key={index}>
                                            {val.text}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
            </div>
            <div className="row">
                <form className="g-form">
                    {/*onSubmit={this.handleSubmit}*/}
                    <label className="lab">
                        الصف:
                        <select className="g-select" value={className} onChange={handleClassChange}
                                onFocus={handleDefaultClass}>
                            <option className={"f-option"} hidden={true} disabled={true} value={""}>اختر
                                الصف....
                            </option>
                            {DropDownClass.map(element => <option className="g-option"
                                                                  value={element.id}>{element.name}</option>)}

                        </select>
                    </label>

                    <label className="lab">
                        الجنس:
                        <select className="g-select" value={selectGender} onChange={handleGenderChange}
                                onFocus={handleDefaultGender}>
                            <option className={"f-option"} hidden={true} disabled={true} value={""}>اختر
                                الجنس....
                            </option>
                            {gender.map(element => <option className="g-option" key={element.id}
                                                           value={element.name}>{element.name}</option>)}

                        </select>
                    </label>


                    <label className="lab">الشعبة
                        <select className="g-select"
                                onClick={sendDropDownSection}
                                value={selectSection}
                                onChange={handleSectionChange}
                        >
                            <option className="g-option" disabled={true} hidden={true} value={""}>اختر الشعبة....
                            </option>
                            {isError || DropDownSection.length === 0 ? (
                                <option className="g-option"  disabled  > لا يوجد شعب </option>
                            ):(
                                DropDownSection.map(element => <option className="g-option" key={element.id}
                                                                       value={element.id}>{element.name}</option>))}
                        </select>
                    </label>


                    <label className="lab">
                        اليوم:
                        <select className="g-select" value={selectDay} onChange={handleDayChange}
                        >
                            <option className={"f-option"} hidden={true} disabled={true} value={""}>اختر
                                اليوم....
                            </option>
                            {days.map(element => <option className="g-option" key={element.id}
                                                         value={element.name}>{element.name}</option>)}

                        </select>
                    </label>

                    <button className="button-search" onClick={fetchProgram}> بحث</button>

                </form>


                <table>
                    <thead>
                    <tr>
                        <th>الحصة الاولى</th>
                        <th>الحصة الثانية</th>
                        <th>الحصة الثالثة</th>
                        <th>الحصة الرابعة</th>
                        <th>الحصة الخامسة</th>
                        <th>الحصة السادسة</th>
                        <th>الحصة السابعة</th>
                    </tr></thead>
                    {/*{group.map(element => <option className="g-option" key={element.id}*/}
                    {/*                              value={element.name}>{element.name}</option>)}*/}
                    <tr>
                        {program.map(e =>
                            <td>{e.subjects_name}
                                <hr/>
                                <p>{e.employee_name}</p>
                            </td>
                        )}
                    </tr>
                    {/*<tr>*/}
                    {/*    {time.map(e =>*/}
                    {/*    {e.name === ""*/}
                    {/*    )}}*/}
                    {/*</tr>*/}


                </table>

            </div>
            {/*<div className="num-employee">*/}
            {/*<div className="schedule">ppppp</div>*/}


        </div>
    )
}
