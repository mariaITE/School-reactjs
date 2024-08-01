import React, {useEffect, useState} from 'react';
import JsonToPdfConverter from './pdfTable';
import {useParams} from "react-router-dom";
import {pdfjs} from "react-pdf";


const MyOtherComponent = () => {
    const {id} =useParams();

    const [info, setInfo] = useState([])
    const [job, setJob] = useState([])
    console.log(id)
    console.log(info)
    console.log(job)
    useEffect(() => {

        fetchEmployeeInfo()

    }, [])

    const fetchEmployeeInfo = async () => {
        try {
            console.log("jjj",id)
            const response = await fetch(`http://localhost:8000/api/employee/show/${id}`);

            const jsonData = await response.json();
            console.log("jsonData",jsonData)
            setInfo(jsonData.data);
            setJob(jsonData.job);


        } catch (error) {
            console.error('Error:' + error);
        }
    };



    console.log("data",info)


    // const d=JSON.parse(data)
    //
    // console.log("djhj",d)

    // const h = () => {
    //     fetchEmployeeInfo(4);
    return (
        <div>
            <JsonToPdfConverter  info={info} job={job}/>
        </div>
    )
    // }


    // return (
    //     <div>
    //         <h1>My Other Component</h1>
    //         <JsonToPdfConverter jsonData={data}/>
    //     </div>
    // );
};

export default MyOtherComponent;