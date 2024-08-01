import React, {useEffect, useState} from "react";
import axios from "axios";
import PendingEmployee from "./pendingEmployee"


import Swal from "sweetalert2";
import {deleteData} from "../../../api/api";
import JsonToPdfConverter from "./pdfTable";
import {PDFDownloadLink} from '@react-pdf/renderer';
import {Link} from "react-router-dom";

const AcceptedEmployee = () => {
    const [jsonData, setJsonData] = useState(null);

    const handleConvertToPdf = () => {
        // Replace this with your logic to fetch or generate the JSON data
        const data = {name: 'John Doe', age: 30};

        setJsonData(data);
    }


    const func = PendingEmployee();


    const [employee, setEmployee] = useState([]);
    const [search, setSearch] = useState('');
    console.log(search)

    const getEmployee = async () => {
        try {
            axios.interceptors.request.use(
                (config) => {
                    const token = localStorage.getItem('csrfToken');
                    if (token) {
                        config.headers['X-CSRF-Token'] = token;
                    }
                    return config;
                },
                (error) => Promise.reject(error),
            );
            const response = await axios.get('http://localhost:8000/api/employee/accept');
            setEmployee(response.data)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getEmployee()
    }, [])

    const url = 'http://localhost:8000/api/employee/deleteEmployee/'
    const deleteEmployeeAccept = async (e) => {
        const response = await deleteData(url, e)
        getEmployee()
    }

    return (
        <div className="SecondTab">

            <div>
                <form className="form">
                    {/*onSubmit={handleSubmit}*/}
                    <label id="label">اسم الطالب</label>
                    <div className={"div1"}>
                        {/*<label className="lab-form" >بحث </label>*/}
                        <input className="input-form" placeholder={"اسم الموظف"}
                               onChange={(e) => setSearch(e.target.value)}/>
                    </div>

                    {/*<button className="button-search" }> بحث</button>*/}

                </form>
            </div>
            <div className="tab-con emp">
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
                                    <button className="buttonB" onClick={() => deleteEmployeeAccept(val.id)}> حذف
                                    </button>

                                    {/*<button className={"button edit linke color"} onClick={()=>(<JsonToPdfConverter jsonData={jsonData}/>)}>التفاصيل</button>*/}
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
export default AcceptedEmployee;