import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom"

import {deleteData} from "../../../api/api";

export default function ShowUser() {

    const [user, setUser] = useState([]);
    const [search, setSearch] = useState('');
    console.log(search)
    useEffect(() => {

        fetchUser()
    }, [])


    const fetchUser = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/user/list', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

            })

            const jsonData = await response.json();
            setUser(jsonData);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const url='http://localhost:8000/api/user/deleteUser/'
    const deleteUser = async (userId) => {
        const response=await  deleteData(url,userId)
        fetchUser()
    }


// const EditButton=({ id })=>{
//     return(<Link to={`/components/account setting/edit user/edituser/${id}`} >
//         <button className="button edit">تعديل</button>
//     </Link>);
// }
const navigate = useNavigate();
    return (


            <div className="sub-con">
                <div className="da-container">
                <label className="title">عرض المستخدمين</label>
                <hr></hr>

                <div className="tab-con show">
                    <label id="label">اسم المستخدم</label>
                    <div className={"div1"}>
                        {/*<label className="lab-form" >بحث </label>*/}
                        <input className="input-form" placeholder={"اسم المستخدم"}
                               onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th>اسم المستخدم</th>
                            <th>الدور</th>
                            <th>كلمة المرور</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {user.filter((val) => {
                            return search.toLowerCase() === '' ? val : val.name.toLowerCase().includes(search)
                        }).map((val, key) => {

                            return (
                                <tr key={val.id}>
                                    <td>{val.name}</td>
                                    <td>{val.roleName}</td>
                                    <td>
                                        {/*{val.password}*/}
                                        12345678910
                                    </td>
                                    <td>
                                        <button className="button2 color1" onClick={()=>deleteUser(val.id)}> حذف</button>
                                        {/*<EditButton id={val.id}/>*/}
                                        <Link className="button2 color" to={`/components/account setting/edit user/edituser/${val.id}`} >تعديل</Link>
                                        {/*<button className="button edit" onClick={() => {*/}
                                        {/*    navigate("/components/account setting/edit user/edituser")*/}
                                        {/*}}>*/}
                                        {/*    تعديل*/}
                                        {/*</button>*/}

                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>

                    </table>

                </div>

            </div>
        </div>

    )

}


