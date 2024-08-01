
import './student.css'
import React, {useState} from "react";
import Swal from "sweetalert2";
import TableRows from "./tablerows";
export default function AddStudent() {

    let group = [
        {
            "gender":"إناث",

        },
        {
            "gender":"ذكور",

        }
    ]
//     const [name, setName] = useState('');
//     const [nickname, setNickname] = useState('');
//     const [semester, setSemester] = useState('');
//     const [fatherName, setFatherName] = useState('');
//     const [date, setDate] = useState('');
//     const [duration, setDuration] = useState('');
//     const [reason, setReason] = useState('');
//     const [addDelay, setAddDelay] = useState([]);
//     console.log(addDelay);
// //-----------------------------------------------------------
//     const handleName = (event) => {
//         setName(event.target.value)
//     }
//     const handleSemester = (event) => {
//         setSemester(event.target.value)
//     }
//     const handleFatherName = (event) => {
//         setFatherName(event.target.value)
//     }
//     const handleDate = (event) => {
//         setDate(event.target.value)
//     }
//     const handleDuration = (event) => {
//         setDuration(event.target.value)
//     }
//     const handleReason = (event) => {
//         setReason(event.target.value)
//     }
//     const handleNickname = (event) => {
//         setNickname(event.target.value)
//     }
//     //----------------------------------------------------
//
//     const sendAddDelay = async (e) => {
//         e.preventDefault();
//
//         const formData={
//             'name': name,
//             'nickname':nickname,
//             'fatherName':fatherName,
//             'semester':semester,
//             'date':date,
//             'reason':reason,
//             'duration':duration
//         }
//
//         await fetch('http://localhost:8000/api/storeDelay',{
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 //  'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"] '),
//             },
//             body: JSON.stringify(formData)
//         })
//
//             .then(response => response.json())
//             .then(data => {
//                 setAddDelay(data)
//                 if(data.statusCode===200) {
//                     Swal.fire({
//                         icon: "success",
//                         title: data.message
//                     })
//                 }
//                 else if (data.statusCode===400){
//                     Swal.fire({
//                         icon: "error",
//                         title: data.message,
//                         text:"تأكد من صحة المعلومات"
//                     })
//                 }
//                 else
//                     Swal.fire({
//                         icon: "error",
//                         text:data.message
//                         // "يوجد شيء خاطئ يرجى إعادة المحاولة"
//                     })
//             })
//             .catch(error => console.error(error));
//         //console.log(showDelay);
//     }

    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [workFather, setWorkFather] = useState("");
    const [motherName, setMotherName] = useState("");
    const [workMother, setWorkMother] = useState("");
    const [gender, setGender] = useState("");
    const [newClass, setNewClass] = useState("");
    const [schoolTransferred, setSchoolTransferred] = useState("");
    const [average, setAverage] = useState("");
    const [placeOfBirth, setPlaceOfBirth] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [brothersNumber, setBrothersNumber] = useState("");
    const [address, setAddress] = useState("");
    const [matherPhone, setMatherPhone] = useState("");
    const [fatherPhone, setFatherPhone] = useState("");
    const [livesStudent, setLivesStudent] = useState("");
    const [landPhone, setLandPhone] = useState("");
    const [character, setCharacter] = useState("");
    const [transportationType, setTransportationType] = useState("");
    const [result, setResult] = useState("");
    const [percentage, setPercentage] = useState("");
    const [managementNotes, setManagementNotes] = useState("");
    const [date, setDate] = useState("");
    const [grandFather, setGrandFather] = useState("");
    const [total, setTotal] = useState("");
    const [error, setError] = useState("");


    // console.log(transportationType);
    // console.log(livesStudent);
    // console.log(brothersNumber);

    const [validationError, setValidationError] = useState({})

    const [selected, setSelected] = useState([])
    //console.log(selected)
    const handleCheckboxChange = (event) => {
        const value=event.target.value;
        setSelected(event.target.value)
        if(event.target.checked){

         setCharacter((prevState => prevState+","+value))
        }
        else{
            setCharacter((prevState => prevState.replace(value,"")))
        }
    }
    const [selected1, setSelected1] = useState(null)
    const handleCheckboxChange1 = (event) => {
        setSelected1(event.target.value)
        setTransportationType(event.target.value)
    }
    const [selected2, setSelected2] = useState(null)
    const handleCheckboxChange2 = (event) => {
        setSelected2(event.target.value)
        setLivesStudent(event.target.value)
    }
    const [selected3, setSelected3] = useState(null);
    const [isAvaiable, setIsAvaiable] = useState(false);
   // console.log(isAvaiable)

    const handleCheckboxChange3 = (event) => {
        setSelected3(event.target.value)
        if(event.target.value === "لا"){
            setBrothersNumber(0);
            setIsAvaiable(false);
        }
        else {
            setBrothersNumber("");
            setIsAvaiable(true);
        }
    }
    const AddStudent = async (e) => {
        e.preventDefault();
        const filteredData=rowsData.filter((item)=>Object.keys(item).length>0);
        console.log("filteredData",filteredData)
        const selectValue=selectedOptions.join(",");
         // setCharacter(selectValue)
        console.log(character) ;
        const formData={
            'name':name,
            'nickname': nickname,
            'fatherName': fatherName,
            'workFather': workFather,
            'motherName': motherName,
            'workMother':workMother,
            'gender': gender,
            'newClass':newClass,
            'schoolTransferred': schoolTransferred,
            'average':average,
            'placeOfBirth': placeOfBirth,
            'birthDate': birthDate,
            'brothersNumber': brothersNumber,
            'address': address,
           'matherPhone': matherPhone,
            'fatherPhone': fatherPhone,
            'livesStudent': livesStudent,
            'landPhone': landPhone,
            'character': selectValue,
            'transportationType': transportationType,
            'result': result,
            'percentage': percentage,
            'managementNotes': managementNotes,
            'date': date,
            'grandFather': grandFather,
            'illnesses': filteredData,
            'total':total,
        }
        console.log(formData)
        try {
            const response =  await fetch('http://localhost:8000/api/store', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    //  'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"] '),
                },
                body: JSON.stringify(formData)
            })

            const responseJson = await response.json();

            if (!response.ok) {
                setError(responseJson)
            } else {
                // .then(response => response.json())
                // .then(data => {
                //     if(data.statusCode===200) {
                //         Swal.fire({
                //             icon: "success",
                //             title: data.message
                //         })

                await Swal.fire('Success', responseJson.message, 'success')
                setName("");
                setNickname("");
                setFatherName("");
                setWorkFather("");
                setMotherName("");
                setWorkMother("");
                setGender("");
                setNewClass("");
                setSchoolTransferred("");
                setAverage("");
                setPlaceOfBirth("");
                setBirthDate("");
                setBrothersNumber("");
                setAddress("");
                setMatherPhone("");
                setFatherPhone("");
                setLivesStudent("");
                setLandPhone("");
                setCharacter("");
                setTransportationType("");
                setResult("");
                setPercentage("");
                setManagementNotes("");
                setDate("");
                setGrandFather("");
                setRowsData([]);
                setSelected([]);
                setSelected2(null);
                setSelected1(null);
                setSelected3(null);
            }
            // else if (data.statusCode===400){
            //     Swal.fire({
            //         icon: "error",
            //         title: data.message,
            //         text:"تأكد من صحة المعلومات"
            //     })
            // }
            // else if (data.statusCode===422){
            //     Swal.fire({
            //         icon: "error",
            //         title: data.message.errors,
            //        // text:"تأكد من صحة المعلومات"
            //     })
            // }
            // else
            //     Swal.fire({
            //         icon: "error",
            //         title:data.message,
            //         text: "يوجد شيء خاطئ يرجى إعادة المحاولة"
            //     })
            // })
            //  .catch(error => console.error(error));
        } catch (error) {
        console("error", error)
    }
        }

    // console.log(formData)
    const [rowsData, setRowsData] = useState([]);
   console.log(rowsData);

    const addTableRows = () => {

        const rowsInput = {

        }
        setRowsData([...rowsData, rowsInput])

    }
    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }

    const handleChange = (index, evnt) => {

        const {name, value} = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);


    }
    const changColor = () =>{
        if(!isAvaiable){
          return  " 1px solid gray";
        }
        else {
            return " 1px solid #6D34FF";
        }
    }
    const [selectedOptions, setSelectedOptions] = useState([]);
    console.log("selectedOptions",selectedOptions);
    const handleOptionChange = (event) => {
        const value = event.target.value;
        if (selectedOptions.includes(value)) {
            // const j = selectedOptions.findIndex((item) => item === value);
            // selectedOptions.splice(j, 1);
            setSelectedOptions(selectedOptions.filter((option) => option !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);

        }
    };

    return (

        <div className="addStudent">

            <div className="da-container">
                <label  className="title">إضافة طالب</label>
                <hr></hr>
                <div className="form-scr">
                    <div className={"div1"}>
                        <label className="lab">التاريخ : </label>
                        <input className={`input ${error && error.errors.date ? 'error_border' : 'input'}`}
                               type={"date"}
                               autoComplete="off"
                               value={date}
                               required
                               onChange={(event) => {setDate(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.date}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">النسبة: </label>
                        <input className={`input ${error && error.errors.percentage ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={percentage}
                               onChange={(event) => {setPercentage(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.percentage}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">النتيجة: </label>
                        <input className={`input ${error && error.errors.result ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={result}
                               onChange={(event) => {setResult(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.result}</p>}
                    </div>
                    <div className={"border"}>
                        بيانات خاصة بالطالب
                    </div>
                    <div className={"div1"}>
                        <label className="lab">الاسم: </label>
                        <input className={`input ${error && error.errors.name ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={name}
                               required
                               onChange={(event) => {setName(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.name}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">الشهرة: </label>
                        <input className={`input ${error && error.errors.nickname ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={nickname}
                               required
                               onChange={(event) => {setNickname(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.nickname}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">الجنس: </label>
                        <select className={`d-select ${error && error.errors.gender ? 'error_border' : 'd-select'}`}
                                placeholder={"اختر الجنس"}
                                value={gender}
                                onChange={(event) => {setGender(event.target.value)}}>
                            <option className="g-option" disabled={true} hidden={true} value={""}>اختر الجنس </option>
                            {group.map(element => <option className="g-option" key={element.id}
                            >{element.gender}</option>)}
                        {/*<input className="input"*/}
                        {/*       type="text"*/}
                        {/*       autoComplete="off"*/}
                        {/*       value={gender}*/}
                        {/*       required*/}
                        {/*       onChange={(event) => {setGender(event.target.value)}}/>*/}
                           </select>
                        {error && <p className={"error"} style={{marginRight:"20px"}}>{error.errors.gender}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">مكان الولادة: </label>
                        <input className={`input ${error && error.errors.placeOfBirth ? 'error_border' : 'input'}`}
                               type={"text"}
                               autoComplete="off"
                               value={placeOfBirth}
                               required
                               onChange={(event) => {setPlaceOfBirth(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.placeOfBirth}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">تاريخ الولادة: </label>
                        <input className={`input ${error && error.errors.birthDate ? 'error_border' : 'input'}`}
                               type={"date"}
                               autoComplete="off"
                               value={birthDate}
                               required
                               onChange={(event) => {setBirthDate(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.birthDate}</p>}
                    </div>

                    <div className={"div1"}>
                        <label className="lab">الصف الجديد: </label>
                        <input className={`input ${error && error.errors.newClass ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={newClass}
                               required
                               onChange={(event) => {setNewClass(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.newClass}</p>}
                    </div>

                    <div className={"div1"}>
                        <label className="lab">المعدل: </label>
                        <input className={`input ${error && error.errors.average ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={average}
                               onChange={(event) => {setAverage(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.average}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">المدرسة التي انتقل منها: </label>
                        <input className={`input ${error && error.errors.schoolTransferred ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={schoolTransferred}
                               onChange={(event) => {setSchoolTransferred(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.schoolTransferred}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">اسم الأب: </label>
                        <input className={`input ${error && error.errors.fatherName ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={fatherName}
                               required
                               onChange={(event) => {setFatherName(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.fatherName}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">عمله: </label>
                        <input className={`input ${error && error.errors.workFather ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={workFather}
                               required
                               onChange={(event) => {setWorkFather(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.workFather}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">جوال الأب: </label>
                        <input className={`input ${error && error.errors.fatherPhone ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={fatherPhone}
                               onChange={(event) => {setFatherPhone(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.fatherPhone}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">اسم الجد والد الأب: </label>
                        <input className={`input ${error && error.errors.grandFather ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={grandFather}
                               required
                               onChange={(event) => {setGrandFather(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.grandFather}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab"> اسم الأم والشهرة: </label>
                        <input className={`input ${error && error.errors.motherName ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={motherName}
                               required
                               onChange={(event) => {setMotherName(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.motherName}</p>}
                    </div>

                    <div className={"div1"}>
                        <label className="lab">عملها: </label>
                        <input className={`input ${error && error.errors.workMother ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={workMother}
                               onChange={(event) => {setWorkMother(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.workMother}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">جوال الأم: </label>
                        <input className={`input ${error && error.errors.matherPhone ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={matherPhone}
                               onChange={(event) => {setMatherPhone(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.matherPhone}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">الطالب يقيم مع: </label>
                        <div className={"div1"}>
                            <label className="lab">والديه </label>
                            <input   type="radio"
                                     value={"والديه"}
                                   checked={selected2 === "والديه"}
                                     onChange={handleCheckboxChange2}
                            /><label className="lab"> أبيه </label>
                            <input  type="radio"
                                    value={"أبيه"}
                                    checked={selected2 === "أبيه"}
                                   onChange={handleCheckboxChange2}
                            /><label className="lab"> أمه </label>
                            <input   type="radio"
                                     value={"أمه"}
                                     checked={selected2 === "أمه"}
                                   onChange={handleCheckboxChange2}
                            />
                        </div>

                    </div>

                    <div className={"div1"}>
                        <label className="lab">أخرى: </label>
                        <input className={`input ${error && error.errors.livesStudent ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={livesStudent}
                               onChange={(event) => {setLivesStudent(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.livesStudent}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">هل لديك أخوة منتسبين إلى المدرسة: </label>
                        <div className={"div1"}>
                            <label className="lab">نعم </label>
                            <input  type="radio"
                                    value={"نعم"}
                                   checked={selected3 === "نعم"}
                                    onChange={handleCheckboxChange3}
                            /><label className="lab">لا </label>
                            <input  type="radio"
                                    value={"لا"}
                                    checked={selected3 === "لا"}
                                   onChange={handleCheckboxChange3}
                            />
                        </div>
                    </div>

                    <div className={"div1"}>
                        <label className="lab">ماعددهم: </label>
                        <input className={`input ${error && error.errors.brothersNumber ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               disabled={!isAvaiable}
                               value={brothersNumber}
                               style={ {border : changColor()}}
                               onChange={(event) => {
                            setBrothersNumber(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.brothersNumber}</p>}
                    </div>
                    <div className={"border"}>
                        الأمراض الذي يعاني منها
                    </div>

                    <table className="table">
                        <thead>
                        <tr>
                            <th> المرض</th>
                            <th>الأدوية</th>
                            <th>
                                <button className={"bi bi-plus-lg add"} onClick={addTableRows}/>
                            </th>
                        </tr>

                        </thead>
                        <tbody>

                        {/*<tr>*/}
                        {/*    <td id={"td-inp"}><input type={"text"}/></td>*/}
                        {/*    <td id={"td-inp"}><input type={"text"}/></td>*/}
                        {/*    <td id={"td-inp"}><input type={"text"}/></td>*/}
                        {/*    <td id={"td-inp"}><input type={"text"}/></td>*/}
                        {/*    <td>*/}
                        {/*        <button className={"bi bi-x-lg delete"}></button>*/}
                        {/*    </td>*/}

                        {/*</tr>*/}

                        <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows}
                                   handleChange={handleChange}/>

                        </tbody>
                    </table>

                    <div className={"div1"}>
                        <label className="lab">الصفات الشخصية: </label>
                        <div className={"div1"}>
                            <label className="lab">اجتماعي </label>
                            <input  type="radio" className={`${error && error.errors.character ? 'error_border' : ''}`}
                                    value={"اجتماعي"}
                                    checked={selectedOptions.includes("اجتماعي")}
                                 //  checked={selected === "اجتماعي"}
                                    onChange={handleOptionChange}
                            /><label
                            className="lab">خجول </label>
                            <input  type="radio" className={`${error && error.errors.character ? 'error_border' : ''}`}
                                    value={"خجول"}
                                    checked={selectedOptions.includes("خجول")}
                                  // checked={selected === "خجول"}
                                   onChange={handleOptionChange}
                            /><label
                            className="lab"> انطوائي </label>
                            <input  type="radio" className={`${error && error.errors.character ? 'error_border' : ''}`}
                                    value={"انطوائي"}
                                    checked={selectedOptions.includes("انطوائي")}
                                    // checked={selected === "انطوائي"}
                                    onChange={handleOptionChange}
                            /><label
                            className="lab">انفعالي </label>
                            <input  type="radio" className={`${error && error.errors.character ? 'error_border' : ''}`}
                                    value={"انفعالي"}
                                    checked={selectedOptions.includes("انفعالي")}
                                 //checked={selected === "انفعالي"}
                                    onChange={handleOptionChange}
                            /><label
                            className="lab">نشيط جدا </label>
                            <input  type="radio" className={`${error && error.errors.character ? 'error_border' : ''}`}
                                    value={"نشيط جدا"}
                                   checked={selectedOptions.includes("نشيط جدا")}
                                    //checked={selected === "نشيط جدا"}
                                    onChange={handleOptionChange}
                            />
                        </div>
                        {error && <p className={"error"}>{error.errors.character}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">نوع المواصلات: </label>
                        <div className={"div1"}>

                            <label className="lab">باص </label>
                            <input  type="radio" className={`${error && error.errors.transportationType ? 'error_border' : ''}`}
                                    value={"باص"}
                                   checked={selected1 === "باص"}
                                    onChange={handleCheckboxChange1}
                            /><label className="lab"> مشي </label>
                            <input  type="radio" className={`${error && error.errors.transportationType ? 'error_border' : ''}`}
                                    value={"مشي"}
                                    checked={selected1 === "مشي"}
                                   onChange={handleCheckboxChange1}
                            /><label className="lab">أهل </label>
                            <input  type="radio" className={`${error && error.errors.transportationType ? 'error_border' : ''}`}
                                    value={"أهل"}
                                    checked={selected1 === "أهل"}
                                   onChange={handleCheckboxChange1}
                            />
                        </div>
                        {error && <p className={"error"}>{error.errors.transportationType}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">الأرضي: </label>
                        <input className={`input ${error && error.errors.landPhone ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={landPhone}
                               onChange={(event) => {setLandPhone(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.landPhone}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">العنوان بالتفصيل: </label>
                        <input className={`input ${error && error.errors.address ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={address}
                               required
                               onChange={(event) => {setAddress(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.address}</p>}
                    </div>

                    <div className={"div1"}>
                        <label className="lab">ملاحظات الإدارة: </label>
                        <input className={`input ${error && error.errors.managementNotes ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={managementNotes}
                               onChange={(event) => {setManagementNotes(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.managementNotes}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab">المبلغ الكلي: </label>
                        <input className={`input ${error && error.errors.total ? 'error_border' : 'input'}`}
                               type="text"
                               autoComplete="off"
                               value={total}
                               onChange={(event) => {setTotal(event.target.value)}}/>
                        {error && <p className={"error"}>{error.errors.total}</p>}
                    </div>


            <button className="button1" variant="primary" block="block" type="submit"
                    onClick={AddStudent}> حفظ
            </button>
                </div>


            </div>

        </div>
    )
}