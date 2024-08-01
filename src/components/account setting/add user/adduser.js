import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export default function Adduser() {
    const navigate = useNavigate();

    const [token, setToken] = useState("");
    console.log("token",token)

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show)
    }

    const [name, setName] = useState([]);
    const [employee_id, setSelectedName] = useState("");
    const [error, setError] = useState("");
    console.log(employee_id)

    const handleSelectNameChange = (event) => {
        const selected = event.target.value;
        console.log(selected)
        setSelectedName(selected)
    }

    useEffect(() => {

        fetchName()
    }, [])


    const fetchName = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/user/listName', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

            })

            const jsonData = await response.json();
            setName(jsonData);
        } catch (error) {
            console.log('Error:', error);
        }
    };


    const [role, setRole] = useState([]);
    useEffect(() => {

        fetchroles()
        fetchPermissions()


    }, [])


    const fetchroles = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/role/list');
            const jsonData = await response.json();
            setRole(jsonData);
        } catch (error) {
            console.log('Error:', error);
        }
    };


    const [permission, setPermission] = useState([]);
    const [role_id, setSelectedId] = useState("")


    console.log(role_id)


    const handleSelectChange = (event) => {
        const selected = event.target.value;
        setSelectedId(selected)
    }


    const fetchPermissions = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/role/listrole');
            const jsonData = await response.json();
            setPermission(jsonData);
        } catch (error) {
            console.error('Error:' + error);
        }
    };

    const [password, setPassword] = useState("")
    const [checkboxValues, setCheckboxValues] = useState([]);
    console.log("checkboxValues", checkboxValues)



    const handleCheckboxChange = (option, id, event) => {
        const {checked} = event.target;
        option = {
            'permission_id': id,
            'check': checked
        }
        console.log(option);
        console.log(checkboxValues)
        console.log(checkboxValues.includes(option, 2));
        if (checkboxValues.length === 0) {
            setCheckboxValues([...checkboxValues, option]);
        }
            //     console.log("fffffffff",checkboxValues.includes(option));
            // const i=checkboxValues.filter((item) => item.permission_id === option.permission_id);
        // console.log("o",i);
        else {

            const i = checkboxValues.filter((item) => item.permission_id === option.permission_id);
            console.log("o", i);
            if (i.length === 0) {
                setCheckboxValues([...checkboxValues, option]);
            } else {
                const j = checkboxValues.findIndex((item) => item.permission_id === option.permission_id);
                checkboxValues.splice(j, 1);
                console.log("j", j);
            }
        }
        // }
        // else {
        //     console.log("gggggggggggg");
        //     setCheckboxValues([...checkboxValues, option]);
        // }
    };
    console.log(password);
    // const createUser = async (e) => {
    //     e.preventDefault()
    //     const formData = {
    //         'employee_id': employee_id,
    //         'password': password,
    //         'role_id': role_id,
    //         'checkboxValues': [checkboxValues]
    //     }
    //
    //
    //
    //     console.log("formData " + formData.employee_id, formData.password, formData.role_id)
    //     try {
    //         await fetch('http://localhost:8000/api/user/adduser', {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData)
    //         })
    //             .then(response => response.json()).catch(e => {
    //                 console.log("error1   " + e)
    //                 console.log("errorline   " + e.lineNumber)
    //
    //             })
    //
    //     } catch (e) {
    //         console.log("error2   " + e)
    //     }
    // }

    const createUser = async (e) => {
        e.preventDefault();

        const data = {
            'employee_id': employee_id,
            'password': password,
            'role_id': role_id,
            'checkboxValues': [...checkboxValues],
        };
        console.log(data.employee_id, data.password, data.role_id, data.checkboxValues, "jjjjj", [...checkboxValues])
        console.log(data)
        const j = JSON.stringify(data);
        console.log(j);
        try {
            const response = await fetch('http://localhost:8000/api/user/adduser', {

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
                const newToken = d.token.access_token;
                console.log("newToken",newToken)
                localStorage.setItem('token', newToken);
                setToken(newToken);
            }
        } catch (error) {
            console.error(error)
        }

    };


    return (


            <div className="sub-con">
                <div className="da-container">
                <label className="title">إضافة مستخدم</label>

                <hr></hr>

                {/*const renderForm = (*/}

                <div>
                    <form className="form">
                        {/*onSubmit={handleSubmit}*/}
                        <div className={"div1"}>
                            <label className="lab-form">اسم المستخدم: </label>

                            <select className="f-select" value={employee_id} onChange={handleSelectNameChange}>
                                <option className={"f-option"} hidden={true} disabled={true} value={""}>اختر
                                    الاسم....
                                </option>
                                {name.map(element =>
                                    <option className="f-option"
                                            value={element.id}>{element.name}</option>)}
                            </select>
                            {/*{renderErrorMessage("uname")}*/}
                            {error && <label className={"error"}>{error.errors.employee_id}</label>}

                        </div>
                        <div className={"div1"}>
                            <label className="lab-form">دور المستخدم: </label>
                            <select className="f-select" value={role_id} onChange={handleSelectChange}>
                                <option className={"f-option"} hidden={true} disabled={true} value={""}>اختر
                                    الدور....
                                </option>
                                {role.map(element => <option className="f-option"
                                                             value={element.id}>{element.roleName}</option>)}
                            </select>
                            {error && <label className={"error"}>{error.errors.role_id}</label>}

                        </div>

                        <div className={"div1"}>

                            <label className="lab-form">كلمة المرور: </label>

                            <input className="input-form" name="pass" type={show ? "text" : "password"}
                                   required="" value={password} onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                            />
                            <i className={show ? "bi bi-eye password-icon" : "bi bi-eye-slash password-icon"}
                             onClick={handleShow}/>
                            {error && <label className={"error"}>{error.errors.password}</label>}

                        </div>

                        {/*<button className="btn btn-outline-primary" onClick={togglePassword}>*/}
                        {/*    {passwordType === "password" ? <i className="bi bi-eye-slash"></i> :*/}
                        {/*        <i className="bi bi-eye"></i>}*/}
                        {/*</button>*/}

                        {/*{renderErrorMessage("pass")}*/}

                        {/*<div className={"div1"}>*/}
                        {/*    <label className="lab-form">البريد الالكتروني: </label>*/}
                        {/*    <input className="input-form" value={email} onChange={(event) => {*/}
                        {/*        setEmail(event.target.value)*/}
                        {/*    }}/>*/}
                        {/*    {error && <p className={"error"}>{error.errors.email}</p>}*/}

                        {/*</div>*/}


                    </form>
                </div>
                <div className="tab-con">
                    <table>
                        <thead>
                        <tr>
                            <th>الصلاحية</th>
                            <th>تحديد الصلاحية</th>

                        </tr>
                        </thead>
                        <tbody>

                        {
                            permission.map((row, index) => {
                                const {check} = row
                                return (
                                    <tr key={index}>
                                        {/*name={"permission_id"} value={permission_id}*/}

                                        <td>{row.name}</td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                name="check"
                                                value={check}
                                                checked={row.checked}
                                                onChange={(event) => (handleCheckboxChange(row, row.id, event))}
                                            />
                                        </td>
                                    </tr>
                                )})}


                        </tbody>

                    </table>

                    <button className="button-save" type="submit"
                            onClick={createUser}> حفظ
                    </button>

                </div>
            </div>


        </div>
    )

}
// React States
//     const [errorMessages, setErrorMessages] = useState({});
//     const [isSubmitted, setIsSubmitted] = useState(false);
//
//     // User Login info
//     const database = [
//         {//
//             username: "user1",
//             password: "pass1"
//         },
//         {
//             username: "user2",
//             password: "pass2"
//         }
//     ];
//
//     const errors = {
//         uname: "invalid username",
//         pass: "invalid password"
//     };
//
//     const handleSubmit = (event) => {
//         //Prevent page reload
//         event.preventDefault();
//
//         var { uname, pass } = document.forms[0];
//
//         // Find user login info
//         const userData = database.find((user) => user.username === uname.value);
//
//         // Compare user info
//         if (userData) {
//             if (userData.password !== pass.value) {
//                 // Invalid password
//                 setErrorMessages({ name: "pass", message: errors.pass });
//             } else {
//                 setIsSubmitted(true);
//             }
//         } else {
//             // Username not found
//             setErrorMessages({ name: "uname", message: errors.uname });
//         }
//     };
//
//     // Generate JSX code for error message
//     const renderErrorMessage = (name) =>
//         name === errorMessages.name && (
//             <div className="error">{errorMessages.message}</div>
//         );
//
//     // JSX code for login form
//     const renderForm = (
//         // <div><img src={"C:\\Users\\ASUS\\Desktop\\bay.jpg"}  /></div>
//         <div className="form">
//
//             <div className="title">N.P.S</div>
//             <form onSubmit={handleSubmit}>
//                 <div className="input-container">
//                     <label>اسم المستخدم </label>
//                     <input type="text" name="uname" required />
//                     {renderErrorMessage("uname")}
//                 </div>
//                 <div className="input-container">
//                     <label>كلمة المرور </label>
//                     <input type="password" name="pass" required />
//                     {renderErrorMessage("pass")}
//                 </div>
//                 <div className="button-container">
//                     <input type="submit" value="تسجيل الدخول" />
//                 </div>
//             </form>
//         </div>
//     );
//
//     return (
//
//         <div className="login-form">
//
//             {isSubmitted ? <div className="message">تم تسجيل الدخول بنجاح</div> : renderForm}
//         </div>
//
//
//     );
// }
//
// export default Login;