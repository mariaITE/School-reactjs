import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import study from "./study.jpg";
import App from "../../App" ;

function Login({ setLogin }) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [employee_id, setEmployee_id] = useState("");
    const [password, setPassword] = useState("");
    const handleShow = () => {
        setShow(!show);
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.token) {
            setLogin(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        const url = "http://localhost:8000/api/user/login";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ employee_id, password }),
            });
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                localStorage.setItem("token", token);
                console.log("Login success");
                setLogin(false);

                // navigate(`/App?data=${setLogin}`);
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="login">
            <div className="login-form">
                <div className="form">
                    <div className="title-login">N.P.S</div>
                    <form onSubmit={handleLogin}>
                        <div className="input-container">
                            <label>اسم المستخدم </label>
                            <input
                                className="input-login"
                                type="text"
                                name="uname"
                                required
                                onChange={(e) => setEmployee_id(e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <label>كلمة المرور </label>
                            <input
                                className="input-login"
                                type={show ? "text" : "password"}
                                name="pass"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i
    className={
        show
            ? "bi bi-eye-fill password"
            : "bi bi-eye-slash-fill password"
    }
    onClick={handleShow}
    />
                        </div>
                        <div className="button-container">
                            <button className={"login-button"} type="submit">
                                تسجيل الدخول
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {<img className={"study"} src={study} />}
        </div>
    );
}

export default Login;