import React, {useEffect, useState} from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Routes, useLocation, useParams} from "react-router-dom";
import { PDFViewer } from '@react-pdf/renderer';
import MakePdf from './makePDF';
import JsonToPdfConverter from "../employee setting/show employee/pdfTable";
// import {Route} from "react-router-dom";
 console.log("kkkkkkkkkkkkkkkk")

const MyPdf = () => {
    // const {id} =useParams();
    const location = useLocation();
    console.log(location);
    const queryParams = new URLSearchParams(location.search);
    //const encodedData=queryParams.get('data');
    //  const data=JSON.parse(decodeURIComponent(encodedData));
    // //const jsonData = location.state?.jsonData;
    const id = queryParams.get('id1');
    const [detaileStudent, setDetaileStudent] = useState([])
    const [dataStudent, setDataStudent] = useState([])
    const [illness, setIllness] = useState([])

    console.log("idgfg",id)
    useEffect(()=>{
        detailStudent(153)
    },[])
    const detailStudent = async (studentId) => {
        // e.preventDefault();
        //console.log(studentId);
        await fetch(`http://localhost:8000/api/detailStudent/${studentId}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data =>{
                setDetaileStudent(data)
                setDataStudent(data.data);
                setIllness(data.illnesses);
            })
            .catch(error => console.error(error));
        // await axios.get(`http://localhost:8000/api/showClass`).then(({data}) => {
        //     console.log(data)
        //     setDropDownClass(data)
        // })
        console.log(detaileStudent);
    }


    return (
            <div>
                <JsonToPdfConverter  info={dataStudent} job={illness}/>
            </div>
        // )
        // <div>
        //     <MakePdf jsonData={detaileStudent}/>
        // </div>
        )
 };

export default MyPdf;