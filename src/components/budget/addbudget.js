import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Addbudget() {
    const {Sid} = useParams();
    const [payment, setPayment] = useState("");
    const [date, setDate] = useState("");


    console.log(Sid)

    const [error, setError] = useState("");
    const addPayment = async (e) => {
        e.preventDefault();

        const data = {
            'payment': payment,
            'date': date,
            'student_id': Sid,
        };
        const j = JSON.stringify(data);
        console.log(j);
        try {
            const response = await fetch(`http://localhost:8000/api/addPayment/${Sid}`, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)

            });
            const responseJson = await response.json();
            console.log("iiiiiiii", responseJson.status);

            if (!response.ok) {
                setError(responseJson);
            } else {
                if (responseJson.statusCode === 200) {
                    await Swal.fire('Success', responseJson.message, 'success');
                    setError("");
                    setDate("");
                    setPayment("");
                } else {
                    await Swal.fire('Error', responseJson.message, 'error');
                }
            }
        } catch (error) {
            console.log("error", error);
        }
    // .then(data => {
    //     Swal.fire('Success', data.message, 'success')
    // },).catch(e => {
    //     Swal.fire('Error', e.message, 'error')
    // })
}

return (

    <div>

        <div className="sub-con">

            {/*<div className="sam-lin">*/}
            <label className="title">إضافة دفعة</label>
            {/*</div>*/}


            <hr></hr>

            {/*const renderForm = (*/}

            <div>
                <form className="form">
                    {/*onSubmit={handleSubmit}*/}
                    <div className={"div1"}>
                        <label className="lab-form">المبلغ: </label>
                        <input className="input-form" name="pass" type={"text"}
                               autoComplete="off" required=""
                               value={payment} onChange={(event) => {
                            setPayment(event.target.value)
                        }}
                        />
                        {error && <p className={"error"}>{error.errors.payment}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">تاريخ الدفع: </label>
                        <input className="input-form" type={"date"} autoComplete="off" required=""
                               value={date} onChange={(event) => {
                            setDate(event.target.value)
                        }}
                        />
                        {error && <p className={"error"}>{error.errors.date}</p>}
                    </div>
                </form>
                <button className="button-save" onClick={addPayment}> حفظ</button>


            </div>


        </div>

    </div>

)

}
;


