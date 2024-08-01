import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import {deleteData} from "../../../api/api";
import JsonToPdfConverter from './pdfTable';
import D from "./pdfTable";
import {PDFViewer} from "@react-pdf/renderer";
import {map} from "react-bootstrap/ElementChildren";
import MyOtherComponent from "./other";
import {Link} from "react-router-dom";

const PendingEmployee = () => {

    const data = [{
        "id": 3,
        "name": "عمار",
        "gender": "Nona Turcotte",
        "placeOfBirth": "Cuba",
        "birthDate": "2023-01-14",
        "landPhone": 18,
        "mobilePhone": 5593,
        "language": "lt"
    }]
    // const handleDefaultGender = () => {
    //     JsonToPdfConverter(data)
    //     console.log('pdf', data)
    // }
    // window.open('./pdfTable')
    // const pdf =
    //         <div>
//         <PDFViewer width="100%" height="600px">
//             <D />
//         </PDFViewer>
// </div>
    const [employee, setEmployee] = useState([]);
    const [search, setSearch] = useState('');
    const [info, setInfo] = useState([]);
    const [infoEmp, setInfoEmp] = useState([]);
    const [status, setStatus] = useState(0);
    console.log(search)

    const openTab = (id) => {
        getInfoEmployee(id)

        // JsonToPdfConverter(infoEmp)
        // window.open('./pdfTable')
        // return(<JsonToPdfConverter jsonData={infoEmp}/>)

    };

    const getInfoEmployee = async (employeeId) => {

        try {
            const response = await fetch(`http://localhost:8000/api/employee/show/${employeeId}`);

            const jsonData = await response.json();
            // console.log("jsonData",jsonData)
            setInfoEmp(jsonData)
        } catch (error) {
            console.log(error)
        }

    };

    const getEmployee = async () => {

        try {
            const response = await fetch('http://localhost:8000/api/employee/archives');

            // const response = await axios.get('http://localhost:8000/api/employee/archives');
            const jsonData = await response.json();
            // console.log("jsonData",jsonData)
            // const j=map()
            setEmployee(jsonData)
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        getEmployee()
    }, []);


    const acceptEmployee = async (employeeID) => {

        const formData = {
            'status': 1
        }

        console.log(formData.status)
        console.log(employeeID)

        await fetch(`http://localhost:8000/api/employee/status/${employeeID}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Error : " + response.status)
                }
            }).then(data => {
                Swal.fire('success', data.message, 'success')
            }).catch(e => {
                Swal.fire('error', e.message, 'error')
            })
        getEmployee()
    }


    const url = 'http://localhost:8000/api/employee/deleteEmployee/'
    const deleteEmployee = async (employeeID) => {
        const response = await deleteData(url, employeeID)
        getEmployee()
    }

    return (
        <div className="SecondTab">
            <div>
                <form className="form">
                    {/*onSubmit={handleSubmit}*/}
                    <label id="label">اسم الموظف</label>
                    <div className={"div1"}>
                        {/*<label className="lab-form" >بحث </label>*/}
                        <input className="input-form" placeholder={"اسم الموظف"}
                               onChange={(e) => setSearch(e.target.value)}/>
                    </div>

                    {/*<button className="button-search"> بحث</button>*/}
                </form>
            </div>
            <div className="tab-con emp td" style={{width:""}}>
                <table>
                    <thead>
                    <tr>
                        <th>الاسم</th>
                        <th>الاختصاص</th>
                        <th>ملاحظات الإدارة</th>
                        <th>العمليات</th>

                    </tr>
                    </thead>
                    <tbody>
                    {employee.filter((val) => {
                        return search.toLowerCase() === '' ? val : val.name.toLowerCase().includes(search)
                    }).map((val, key) => {
                        return (
                            <tr key={val.id}>
                                <td>{val.name}</td>
                                <td>{val.jurisdiction}</td>
                                <td>{val.managementNotes}</td>

                                <td>
                                    <button className="buttonB accept" onClick={() => acceptEmployee(val.id)}> قبول
                                    </button>
                                    <button className="buttonB" onClick={() => deleteEmployee(val.id)}> حذف</button>
                                    <Link className={"buttonB edit linke color"}
                                          to={`/components/employee setting/show employee/other/${val.id}`}>التفاصيل</Link>

                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default PendingEmployee;
