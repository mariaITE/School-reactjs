import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditUser() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show)
    }


    const [password, setPassword] = useState("")
    const [permissions, setPermissions] = useState([])
    const [error, setError] = useState("");

    console.log(permissions)

    const handleCheckboxChange = (id) => {
        const updatedData = [...permissions];
        const updatedPermission = permissions.find(itm => itm.id === id);
        console.log(updatedPermission)
        updatedPermission.check = updatedPermission.check === "1" ? "0" : "1";
        setPermissions(updatedData);
    };


    // const handleCheckboxChange = (option, id, event) => {
    //     const {checked} = event.target;
    //     option = {
    //         'permission_id': id,
    //         'check': checked
    //     }
    //     console.log(option);
    //     console.log(permissions)
    //     console.log(permissions.includes(option, 2));
    //     if (permissions.length === 0) {
    //         setPermissions([...permissions, option]);
    //     }
    //         //     console.log("fffffffff",permissions.includes(option));
    //         // const i=permissions.filter((item) => item.permission_id === option.permission_id);
    //     // console.log("o",i);
    //     else {
    //
    //         const i = permissions.filter((item) => item.permission_id === option.permission_id);
    //         console.log("o", i);
    //         if (i.length === 0) {
    //             setPermissions([...permissions, option]);
    //         } else {
    //             const j = permissions.findIndex((item) => item.permission_id === option.permission_id);
    //             permissions.splice(j, 1);
    //             console.log("j", j);
    //         }
    //     }
    //     // }
    //     // else {
    //     //     console.log("gggggggggggg");
    //     //     setCheckboxValues([...checkboxValues, option]);
    //     // }
    // };

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        await axios.get(`http://localhost:8000/api/user/getinfo/${id}`).then(({data}) => {
            const {password, permissions,} = data
            setPassword(password)
            setPermissions(permissions)

        }).catch(({response: {data}}) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }


    const updateData = async (e) => {
        e.preventDefault();

        const data = {
            'password': password,
            'permissions': [...permissions],
        };

        try {
            const response = await fetch(`http://localhost:8000/api/user/editUser/${id}`, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)

            });
            const d = await response.json();
            console.log("data", d)
            if (!response.ok) {
                // const errorData = await response.json();
                setError(d)
            } else {

                await Swal.fire('Success', d.message, 'success')
                setError("");
                navigate("/components/account setting/show user/showuser")
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (



            <div className="sub-con">
                <div className="da-container">
                {/*<div className="sam-lin">*/}
                <label className="title">تعديل مستخدم</label>
                {/*</div>*/}


                <hr></hr>

                {/*const renderForm = (*/}

                <div>
                    <form className="form">
                        {/*onSubmit={handleSubmit}*/}
                        <div className={"div1"}>
                            <label className="lab-form">كلمة المرور: </label>
                            <input className="input-form" name="pass" value={password} type={show ? "text" : "password"}
                                   onChange={(event) => {
                                       setPassword(event.target.value);
                                   }}/>
                            <i className={show ? "bi bi-eye password-icon" : "bi bi-eye-slash password-icon"}
                               onClick={handleShow}></i>
                        </div>

                        {/*{renderErrorMessage("uname")}*/}

                    </form>
                </div>
                <div className="tab-con edit">
                    <table>
                        <thead>
                        <tr>
                            <th>الصلاحية</th>
                            <th>تعديل الصلاحيات</th>

                        </tr>
                        </thead>
                        <tbody>
                        {permissions && permissions.map((val, key) => {

                            return (
                                <tr key={key}>
                                    <td>{val.name}</td>
                                    <td>
                                        <input type={"checkbox"}

                                               checked={val.check === "1" ? true : val.checked}
                                               onChange={(event) => (handleCheckboxChange(val.id))}
                                        />
                                    </td>

                                </tr>
                            )
                        })}
                        </tbody>

                    </table>

                    <button className="button-save" onClick={updateData}> حفظ</button>

                </div>
            </div>


        </div>

    )

}


