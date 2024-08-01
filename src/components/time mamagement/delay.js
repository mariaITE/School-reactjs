import './delay.css'

import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect } from 'react';
import {queries} from "@testing-library/react";

export default function Daley() {

    const navigate = useNavigate();

   // const [fullName, setFullName] = useState('');
    const [name, setName] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    const [isError, setIsError] = useState(false);
    const [showDelay, setShowDelay] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filteredOption, setFilteredOption] = useState('');
   const [isOpen, setIsOpen] = useState(false);
    // console.log(filteredData);
    // console.log(name);
    // console.log(fatherName);
    // console.log(nickname);
    //------------------------------------------------------------------

    // const handleFullNameClick = (event) => {
    //     //setFullName(event.target.value);
    //     setFilteredOption('');
    //     console.log("llll");
    //     const fullName = event.value;
    //     console.log(event.value);
    //    //  const filtered = filteredOption.filter((option) =>
    //    //      option.toLowerCase().includes( fullName.toLowerCase())
    //    //  );
    //     setFilteredOption(fullName);
    //   //  setIsOpen(false);
    //     // Split the fullName into name, nickname, and fatherName
    //     const parts = filteredOption.split('-');
    //
    //     // Extract values from parts array
    //     const extractedName = parts[0] ? parts[0].trim():'';
    //     const extractedFatherName = parts[1] ? parts[1].trim():'';
    //     const extractedNickname = parts[2] ? parts[2].trim():'';
    //
    //     setName(extractedName);
    //     setNickname(extractedNickname);
    //     setFatherName(extractedFatherName)
    //
    // }
    const handleFullNameChange = (event) => {
        //setFullName(event.target.value);
        const fullName = event.target.value;
      //  console.log(event.target.value);
        //  const filtered = filteredOption.filter((option) =>
        //      option.toLowerCase().includes( fullName.toLowerCase())
        //  );
        setName(fullName);

        //  setIsOpen(false);


    }
    const handleSuggestionClick = (event)=>{

         // console.log("ffffffffffff");
            //const fullName1 =event.name;
            setFilteredOption(event.name);
           // console.log(event.name);
            setName(event.name);
            setNickname(event.nickname);
            setFatherName(event.fatherName);
            setIsOpen(false);

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
    // const separateNames = (fullName) => {
    //     const namesArray = fullName.split(' ');
    //
    //     // Extracting the name
    //     const extractedName = namesArray[0].trim();
    //     setName(extractedName);
    //
    //    // Extracting the father's name
    //     const extractedFatherName = namesArray.slice(1, namesArray.length - 1).join(' ').trim();
    //     setFatherName(extractedFatherName);
    //
    //     // Extracting the nickname
    //     const extractedNickname = namesArray[namesArray.length - 1].trim();
    //     setNickname(extractedNickname);
    //     console.log(name);
    //     console.log(fatherName);
    //     console.log(nickname);
    //     console.log(name+' '+nickname);
    // }


        //--------------------------------------------------


    const sendDelay = async (e) => {
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

        await fetch('http://localhost:8000/api/indexDelay',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //  'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"] '),
            },
            body: JSON.stringify(formData)
        })

            .then(response => response.json())
            .then(data => setShowDelay(data))
            .catch(error => console.error(error));
        //console.log(showDelay);
    }
    const containsMessageAttribute = showDelay  && Array.isArray(showDelay) && showDelay.some((item) => 'message' in item)  ;
  // console.log(containsMessageAttribute);
//---------------------------------------------------------
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
        .then(data => setFilteredData(data)
            // Array.isArray(filteredData) &&
            // filteredData.map(element =>
            //     separateNames(element.name))
        )
        .catch(error => console.error(error));
    }
    // const filtered = filteredData.filter(option =>
    //     option.toLowerCase().includes(filteredOption.toLowerCase())
    // );

    //--------------------------------------------------------------
        return (
            <div className="Daley">

                <div className="da-container">
                    <label className="title">عرض التأخير</label>
                    <button className="button" value="إضافة تأخير" onClick={()=> { navigate("/components/time mamagement/addDelay")}}> إضافة تأخير</button>

                    <hr></hr>

                        <label id="label">اسم الطالب</label>
                    {/*<div className={"divInput"}>*/}
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
                            <button className="button1 buttonDiv" value="بحث"  onClick={sendDelay} > بحث</button>

                            {filteredData && isOpen &&(
                            <ul className={"suggestions"}>
                                {filteredData.length ===0 ?(
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



                     <div className="tableFixHead delay">

                         <table  className=" collapse" id="table collapseExample">
                             <thead>
                             <tr>
                                 <th>الفصل</th>
                                 <th>اليوم</th>
                                 <th>التاريخ</th>
                                 <th>المدة</th>
                                 <th>السبب</th>
                             </tr>
                             </thead>
                             <tbody>
                             {isError ?(
                                 <tr><td colSpan={5}>{error}</td></tr>
                                 ):(
                             containsMessageAttribute  ? (
                                 showDelay.map((e) =>((<tr style={{ textAlign: 'center',fontSize: '20px',fontWeight: 'thin',}}>
                                     <td colSpan={5}>{e.message}</td></tr>))))
                                 :
                                 ( showDelay.map((e) =>(
                             <tr key={e.id}>
                                 <td>{e.semester}</td>
                                 <td>{e.day}</td>
                                 <td>{e.date}</td>
                                 <td>{e.duration}</td>
                                 <td>{e.reason}</td>
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
