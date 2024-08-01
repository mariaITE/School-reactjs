import './delay.css'
import { useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";

export default function Permission() {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [name, setName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);
    const [showPermission, setShowPermission] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filteredOption, setFilteredOption] = useState('');
    const [isOpen, setIsOpen] = useState(false);
  //console.log(showPermission);
    //------------------------------------------------------------

    const handleFullNameChange = (event) => {
        const fullName = event.target.value;
        setName(fullName);

    }
    const handelCheck =()=>{
        setIsOpen(true);
        if(name !== '' || filteredOption !== '' || nickname!== ''|| fatherName!== ''){
            setName("");
            setFilteredOption("");
            setNickname("");
            setFatherName("");
        }
    }
    const handleSuggestionClick = (event)=>{

        setFilteredOption(event.name);
        setName(event.name);
        setNickname(event.nickname);
        setFatherName(event.fatherName);
        setIsOpen(false);

    }

    // const separateNames = (fullName) => {
    //     const namesArray = fullName.split(' ');
    //
    //     // Extracting the name
    //     const extractedName = namesArray[0].trim();
    //     setName(extractedName);
    //
    //     // Extracting the father's name
    //     const extractedFatherName = namesArray.slice(1, namesArray.length - 1).join(' ').trim();
    //     setFatherName(extractedFatherName);
    //
    //     // Extracting the nickname
    //     const extractedNickname = namesArray[namesArray.length - 1].trim();
    //     setNickname(extractedNickname);
    //    // console.log(name);
    //    // console.log(fatherName);
    //    // console.log(nickname);
    //    // console.log(name+' '+nickname);
    // }
//-----------------------------------------------------------------

    const sendPermission = async (e) => {
        e.preventDefault();
        setIsOpen(false);
        if (!name || !fatherName || !nickname) {
            setIsError(true);
            return   setError('الرجاء إدخال الاسم الثلاثي');
        }
        setIsError(false);
        const formData={
            'name': name,
            'nickname':nickname,
            'fatherName':fatherName,
        }

        await fetch('http://localhost:8000/api/indexPermission',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })

            .then(response => response.json())
            .then(data => setShowPermission(data))
            .catch(error => console.error(error));
        //console.log(showDelay);
    }
    const containsMessageAttribute =showPermission  && Array.isArray(showPermission) && showPermission.some((item) => 'message' in item);
    //console.log( Array.isArray(showPermission));
//-------------------------------------------------------------------------------------------
    useEffect(() => {
        // Fetch data from the database
        fetchSearch();
    }, []);

    const fetchSearch = () => {
        // Replace this with your actual API call or data retrieval logic
        // Example API call using fetch:
        fetch('http://localhost:8000/api/allStudent' ,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setFilteredData(data))
            .catch(error => console.error(error));
    }

    // const containsMessageAttribute1 =filteredData  && Array.isArray(filteredData) && filteredData.some((item) => 'message' in item);

    return (
        <div className="permission">

            <div className="da-container">
                <label className="title"> عرض أذن  </label>
                <button className="button" value="إضافة أذن" onClick={()=> { navigate("/components/time mamagement/addpermission")}}> إضافة أذن</button>
                <hr></hr>


                        <label id="label">اسم الطالب</label>
                <div className={"autocomplete"} >

                    <input
                        // className="input"
                        type="text"
                        name={"nameStudent"}
                        value={`${name}${fatherName}${nickname}`}
                        onChange={handleFullNameChange}
                        placeholder={"اسم الثلاثي الطالب"}
                        onFocus={()=>handelCheck()   }
                        autoComplete={"off"}
                        required/>
                    <button className="button1 buttonDiv" value="بحث"  onClick={sendPermission} > بحث</button>

                    { filteredData && isOpen &&(
                        <ul className={"suggestions"}>
                            { filteredData.length ===0 ?(
                                 <li>لا يوجد طلاب</li>):(
                                filteredData.filter(option =>
                                name.toLowerCase() === '' ? option : option.name.toLowerCase().includes(name)
                            ).map((item) => (

                                <li
                                    // value={`${name}${fatherName}${nickname} `}
                                    // onChange={handleFullNameClick}
                                    onClick={()=>handleSuggestionClick(item)}
                                    key={item.id}
                                >{item.name+' '+item.fatherName+' '+item.nickname}</li>
                            )))}
                        </ul>

                    )}
                </div>

                <div className="tableFixHead permission">
                    <table id="table">
                    <thead>
                        <tr>
                            <th>الفصل</th>
                            <th>اليوم</th>
                            <th>التاريخ</th>
                            <th>التفاصيل</th>
                        </tr>
                        </thead>
                        <tbody>

                        {isError ?(
                            <tr><td colSpan={5}>{error}</td></tr>
                        ):(
                            containsMessageAttribute  ? (
                                    showPermission.map((e) =>((<tr style={{ textAlign: 'center',fontSize: '20px',fontWeight: 'thin',}}>
                                        <td colSpan={5}>{e.message}</td></tr>))))
                                :
                                ( showPermission.map((e) =>(
                                    <tr key={e.id}>
                                        <td>{e.semester}</td>
                                        <td>{e.day}</td>
                                        <td>{e.date}</td>
                                        <td>{e.person}</td>
                                    </tr>
                                    ))
                                )
                        )}
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}