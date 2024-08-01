import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {defaultKeyMap} from "@testing-library/user-event/dist/keyboard/keyMap";

const ImportComponent = () => {
    const [studentBudget, setStudentBudget] = useState([]);

    useEffect(() => {
        fetchStudent()
    }, [])


    const fetchStudent = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/listStudentBudget', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

            })

            const jsonData = await response.json();
            setStudentBudget(jsonData);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (

        <div className="sub-con">
             <div className="da-container">
            <label className="title">تحديث المدفوعات</label>

            <hr></hr>

            <div>
                <table>
                    <thead>
                    <tr>
                        <th>اسم الطالب</th>
                        <th>المبلغ الكلي</th>
                        <th>المبلغ المدفوع</th>
                        <th>إضافة دفعة</th>
                    </tr>
                    </thead>
                    <tbody>
                    {studentBudget.map((val, key) => {

                        return (
                            <tr key={key}>
                                <td>{val.name}</td>
                                <td>{val.total}</td>
                                <td>{val.sum}</td>
                                <td>

                                    <Link className="button edit linke budget"
                                          to={`/components/budget/addbudget/${val.id}`}>إضافة</Link>

                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};

export default ImportComponent;