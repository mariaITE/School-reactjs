import React, {useState} from "react";
import TableRows from "./tablerows";
import Swal from "sweetalert2";

function AddEmployee() {

    const [name, setName] = useState("")
    const [fatherName, setFatherName] = useState("")
    const [motherName, setMotherName] = useState("")
    const [gender, setGender] = useState("")
    const [placeOfBirth, setPlaceOfBirth] = useState("")
    const [birthDate, setBirthDate] = useState("")
    const [nationality, setNationality] = useState("")
    const [idNumber, setIdNumber] = useState("")
    const [familyStatus, setFamilyStatus] = useState("")
    const [husbandName, setHusbandName] = useState("")
    const [husbandWork, setHusbandWork] = useState("")
    const [childrenNumber, setChildrenNumber] = useState("")
    const [address, setAddress] = useState("")
    const [landPhone, setLandPhone] = useState("")
    const [mobilePhone, setMobilePhone] = useState("")
    const [certificate, setCertificate] = useState("")
    const [jurisdiction, setJurisdiction] = useState("")
    const [language, setLanguage] = useState("")
    const [computerSkills, setComputerSkills] = useState("")
    const [otherSkills, setOtherSkills] = useState("")
    const [socialInsurance, setSocialInsurance] = useState("")
    const [lastSalaryReceived, setLastSalaryReceived] = useState("")
    const [expectedSalary, setExpectedSalary] = useState("")
    const [interview, setInterview] = useState("")
    const [workYouWish, setWorkYouWish] = useState("")
    const [managementNotes, setManagementNotes] = useState("")
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");
    console.log(jobs)


    // const handleSocialInsuranceChange = (event) => {
    //     setSocialInsurance(event.target.value)
    // }

    const createEmployee = async (e) => {
        // const filteredData=jobs.filter((item)=>Object.keys(item).length>0);
        e.preventDefault()
        const formData = {
            'name': name,
            'fatherName': fatherName,
            'motherName': motherName,
            'gender': gender,
            'placeOfBirth': placeOfBirth,
            'birthDate': birthDate,
            'nationality': nationality,
            'idNumber': idNumber,
            'familyStatus': familyStatus,
            'husbandName': husbandName,
            'husbandWork': husbandWork,
            'childrenNumber': childrenNumber,
            'address': address,
            'landPhone': landPhone,
            'mobilePhone': mobilePhone,
            'certificate': certificate,
            'jurisdiction': jurisdiction,
            'language': language,
            'computerSkills': computerSkills,
            'otherSkills': otherSkills,
            'socialInsurance': socialInsurance,
            'lastSalaryReceived': lastSalaryReceived,
            'expectedSalary': expectedSalary,
            'interview': interview,
            'workYouWish': workYouWish,
            'managementNotes': managementNotes,
            'jobs': [...jobs],
            // 'jobs': filteredData,
        }
        console.log("name " + formData.name)
        console.log("fatherName " + formData.fatherName)
        console.log("motherName " + formData.motherName)
        console.log("gender " + formData.gender)
        console.log("placeOfBirth " + formData.placeOfBirth)
        console.log("birthDate " + formData.birthDate)
        console.log("nationality " + formData.nationality)
        console.log("idNumber " + formData.idNumber)
        console.log("familyStatus " + formData.familyStatus)
        console.log("husbandName " + formData.husbandName)
        console.log("husbandWork " + formData.husbandWork)
        console.log("childrenNumber " + formData.childrenNumber)
        console.log("address " + formData.address)
        console.log("landPhone " + formData.landPhone)
        console.log("mobilePhone " + formData.mobilePhone)
        console.log("certificate " + formData.certificate)
        console.log("jurisdiction " + formData.jurisdiction)
        console.log("language " + formData.language)
        console.log("computerSkills " + formData.computerSkills)
        console.log("otherSkills " + formData.otherSkills)
        console.log("socialInsurance " + formData.socialInsurance)
        console.log("lastSalaryReceived " + formData.lastSalaryReceived)
        console.log("expectedSalary " + formData.expectedSalary)
        console.log("interview " + formData.interview)
        console.log("workYouWish " + formData.workYouWish)
        console.log("managementNotes " + formData.managementNotes)
        console.log("job " + formData.jobs)
        console.log("job [ ]" + [...jobs])
        console.log("formData" + formData)

        try {
            const response = await fetch('http://localhost:8000/api/employee/addEmployee', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            const responseJson = await response.json();

            if (!response.ok) {
                setError(responseJson)
            } else {
                await Swal.fire('Success', responseJson.message, 'success')
                setError("");
                setName("");
                setFatherName("");
                setMotherName("");
                setGender("");
                setPlaceOfBirth("");
                setBirthDate("");
                setNationality("");
                setIdNumber("");
                setFamilyStatus("");
                setHusbandName("");
                setHusbandWork("");
                setChildrenNumber("");
                setAddress("");
                setLandPhone("");
                setMobilePhone("");
                setCertificate("");
                setJurisdiction("");
                setLanguage("");
                setComputerSkills("");
                setOtherSkills("");
                setSocialInsurance("");
                setLastSalaryReceived("");
                setExpectedSalary("");
                setInterview("");
                setWorkYouWish("");
                setManagementNotes("");
                setJobs([]);

                // navigate("/components/employee setting/show employee/showemployee")


            }
        } catch (error) {
            console("error", error)
        }
        // .then(data => {
        //     Swal.fire('Success', data.message, 'success')
        // },).catch(e => {
        //     Swal.fire('Error', e.message, 'error')
        // })
    }

    const addTableRows = () => {

        const rowsInput = {
            workPlace: '',
            work: '',
            classesStudied: '',
            duration: ''
        }
        setJobs([...jobs, rowsInput])
    }
    const deleteTableRows = (index) => {
        const rows = [...jobs];
        rows.splice(index, 1);
        setJobs(rows);
    }

    const handleChange = (index, event) => {

        const {name, value} = event.target;
        let rowsInput = [...jobs];
        rowsInput[index][name] = value;
        setJobs(rowsInput);
    }

    return (
        <div className="sub-con">

            <div className="da-container">
            <label className="title">إضافة موظف</label>

            <hr></hr>

            <div className="form-scr">
                {/*<div className="pdf" ref={pdfRef}>*/}
                <div className="form">

                    {/*onSubmit={handleSubmit}*/}
                    <div className={"div1"}>
                        <label className="lab-form">الاسم والشهرة: </label>
                        <input  className={`input-form ${error && error.errors.name ? 'error_border' : 'input-form'}`} type="text" autoComplete="off"
                               required="" value={name}
                               onChange={(event) => {
                                   setName(event.target.value)

                               }}/>
                        {error && <p className={"error"}>{error.errors.name}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">الأب: </label>
                        <input className={`input-form ${error && error.errors.fatherName ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required="" value={fatherName}
                               onChange={(event) => {
                                   setFatherName(event.target.value)
                               }}/>
                        {error && <span className={"error"}>{error.errors.fatherName}</span>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">الأم: </label>
                        <input className={`input-form ${error && error.errors.motherName ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
                               value={motherName} onChange={(event) => {
                            setMotherName(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.motherName}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">الجنس: </label>
                        <input className={`input-form ${error && error.errors.gender ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
                               value={gender} onChange={(event) => {
                            setGender(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.gender}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">تاريخ الولادة: </label>
                        <input className={`input-form ${error && error.errors.birthDate ? 'error_border' : 'input-form'}`} type={"date"} autoComplete="off" required=""
                               value={birthDate} onChange={(event) => {
                            setBirthDate(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.birthDate}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">مكان الولادة: </label>
                        <input className={`input-form ${error && error.errors.placeOfBirth ? 'error_border' : 'input-form'}`} type={"text"} autoComplete="off" required=""
                               value={placeOfBirth} onChange={(event) => {
                            setPlaceOfBirth(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.placeOfBirth}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">الجنسية: </label>
                        <input className={`input-form ${error && error.errors.nationality ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
                               value={nationality} onChange={(event) => {
                            setNationality(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.nationality}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">الرقم الوطني: </label>
                        <input className={`input-form ${error && error.errors.idNumber ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
                               value={idNumber} onChange={(event) => {
                            setIdNumber(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.idNumber}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">الوضع العائلي: </label>
                        <input className={`input-form ${error && error.errors.familyStatus ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
                               value={familyStatus} onChange={(event) => {
                            setFamilyStatus(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.familyStatus}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">اسم الزوج/ة: </label>
                        <input className={`input-form ${error && error.errors.husbandName ? 'error_border' : 'input-form'}`} type="text" autoComplete="off"
                               value={husbandName} onChange={(event) => {
                            setHusbandName(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.husbandName}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">عمله/ا: </label>
                        <input className={`input-form ${error && error.errors.husbandWork ? 'error_border' : 'input-form'}`} type="text" autoComplete="off"
                               value={husbandWork} onChange={(event) => {
                            setHusbandWork(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.husbandWork}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">عدد الأولاد: </label>
                        <input className={`input-form ${error && error.errors.childrenNumber ? 'error_border' : 'input-form'}`} type="text" autoComplete="off"
                               value={childrenNumber} onChange={(event) => {
                            setChildrenNumber(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.childrenNumber}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">العنوان: </label>
                        <input className={`input-form ${error && error.errors.address ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
                               value={address} onChange={(event) => {
                            setAddress(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.address}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">الجوال: </label>
                        <input className={`input-form ${error && error.errors.mobilePhone ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
                               value={mobilePhone} onChange={(event) => {
                            setMobilePhone(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.mobilePhone}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">الأرضي: </label>
                        <input className={`input-form ${error && error.errors.landPhone ? 'error_border' : 'input-form'}`} type="text" autoComplete="off"
                               value={landPhone} onChange={(event) => {
                            setLandPhone(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.landPhone}</p>}

                    </div>

                    <div className={"div1"}>
                        <label className="lab-form">الشهادة: </label>
                        <div className={"div1"}>
                            <label className="lab-form">ثانوية </label>
                            <input className={`input-form ${error && error.errors.certificate ? 'error_border' : 'input-form'}`} type="checkbox" value={"ثانوية"}
                                   checked={certificate === "ثانوية"} onChange={(event) => {
                                setCertificate(event.target.value)
                            }}
                            /><label
                            className="lab-form">معهد </label>
                            <input className={`input-form ${error && error.errors.certificate ? 'error_border' : 'input-form'}`} type="checkbox" value={"معهد"}
                                   checked={certificate === "معهد"}
                                   onChange={(event) => {
                                       setCertificate(event.target.value)
                                   }}
                            /><label
                            className="lab-form">إجازة جامعية </label>
                            <input className={`input-form ${error && error.errors.certificate ? 'error_border' : 'input-form'}`} type="checkbox" value={"جامعة"}
                                   checked={certificate === "جامعة"}
                                   onChange={(event) => {
                                       setCertificate(event.target.value)
                                   }}
                            /><label
                            className="lab-form">دبلوم </label>
                            <input className={`input-form ${error && error.errors.certificate ? 'error_border' : 'input-form'}`} type="checkbox" value={"دبلوم"}
                                   checked={certificate === "دبلوم"}
                                   onChange={(event) => {
                                       setCertificate(event.target.value)
                                   }}
                            /><label
                            className="lab-form">ماجستير </label>
                            <input className={`input-form ${error && error.errors.certificate ? 'error_border' : 'input-form'}`} type="checkbox" value={"ماجستير"}
                                   checked={certificate === "ماجستير"} onChange={(event) => {
                                setCertificate(event.target.value)
                            }}
                            />
                        </div>
                        {error && <p className={"error"}>{error.errors.certificate}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">الاختصاص: </label>
                        <input className={`input-form ${error && error.errors.jurisdiction ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required="" value={jurisdiction}
                               onChange={(event) => {
                                   setJurisdiction(event.target.value)
                               }}/>
                        {error && <p className={"error"}>{error.errors.jurisdiction}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">اللغات التي تتقنها: </label>
                        <input className={`input-form ${error && error.errors.language ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
                               value={language} onChange={(event) => {
                            setLanguage(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.language}</p>}

                    </div>

                    <div className={"border"}>
                        معلومات حول أعمال سابقة
                    </div>

                    <table className="table">
                        <thead>
                        <tr>
                            <th>مكان العمل</th>
                            <th>العمل</th>
                            <th>المدة</th>
                            <th>الصفوف التي درستها</th>
                            <th>
                                <button className={"bi bi-plus-lg add"} onClick={addTableRows}></button>
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

                        <TableRows jobs={jobs} deleteTableRows={deleteTableRows}
                                   handleChange={handleChange}/>

                        </tbody>
                    </table>

                    <div className={"div1"}>
                        <label className="lab-form">مهارات العمل على الحاسوب: </label>
                        <input className={`input-form ${error && error.errors.computerSkills ? 'error_border' : 'input-form'}`} type="text" autoComplete="off"
                               value={computerSkills} onChange={(event) => {
                            setComputerSkills(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.computerSkills}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">مهارات أخرى: </label>
                        <input className={`input-form ${error && error.errors.otherSkills ? 'error_border' : 'input-form'}`} type="text" autoComplete="off"
                               value={otherSkills} onChange={(event) => {
                            setOtherSkills(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.otherSkills}</p>}

                    </div>

                    <div className={"div1"}>
                        <label className="lab-form">هل تم تسجيلك في التأمينات الاجتماعية والعمل سابقا: </label>
                        <div className={"div1"}>
                            <label className="lab-form">نعم </label>
                            <input className={`input-form ${error && error.errors.socialInsurance ? 'error_border' : 'input-form'}`} type="checkbox" value={"1"}
                                   checked={socialInsurance === "1"}
                                   onChange={(event) => {
                                       setSocialInsurance(event.target.value)
                                   }}/>
                            <label className="lab-form">لا </label>
                            <input className={`input-form ${error && error.errors.socialInsurance ? 'error_border' : 'input-form'}`} type="checkbox" value={"0"}
                                   checked={socialInsurance === "0"}
                                   onChange={(event) => {
                                       setSocialInsurance(event.target.value)
                                   }}/>
                        </div>
                        {error && <p className={"error"}>{error.errors.socialInsurance}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">اخر راتب مقبوض: </label>
                        <input className={`input-form ${error && error.errors.lastSalaryReceived ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" value={lastSalaryReceived}
                               onChange={(event) => {
                                   setLastSalaryReceived(event.target.value)
                               }}/>
                        {error && <p className={"error"}>{error.errors.lastSalaryReceived}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">الراتب المتوقع: </label>
                        <input className={`input-form ${error && error.errors.expectedSalary ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
                               value={expectedSalary} onChange={(event) => {
                            setExpectedSalary(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.expectedSalary}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">موعد المقابلة/الدرس/المحدد من قبل الإدارة: </label>
                        <input className={`input-form ${error && error.errors.interview ? 'error_border' : 'input-form'}`} type="datetime-local" autoComplete="off" required=""
                               value={interview} onChange={(event) => {
                            setInterview(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.interview}</p>}

                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">العمل الذي ترغب به: </label>
                        <input className={`input-form ${error && error.errors.workYouWish ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
                               value={workYouWish} onChange={(event) => {
                            setWorkYouWish(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.workYouWish}</p>}
                    </div>
                    <div className={"div1"}>
                        <label className="lab-form">ملاحظات الإدارة: </label>
                        <input className={`input-form ${error && error.errors.managementNotes ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
                               value={managementNotes} onChange={(event) => {
                            setManagementNotes(event.target.value)
                        }}/>
                        {error && <p className={"error"}>{error.errors.managementNotes}</p>}
                    </div>


                </div>

                <button className="button-save"
                        onClick={createEmployee}> حفظ
                </button>
            </div>

            {/*    <button className={"button-save"} onClick={downloadPDF}>pdf</button>*/}
            </div>

        </div>
    )

}

export default AddEmployee

// import React, {useState} from "react";
// import TableRows from "./tablerows";
// import Swal from "sweetalert2";
// import {useNavigate} from "react-router-dom";
//
// function AddEmployee() {
//
//     const [name, setName] = useState("")
//     const [fatherName, setFatherName] = useState("")
//     const [motherName, setMotherName] = useState("")
//     const [gender, setGender] = useState("")
//     const [placeOfBirth, setPlaceOfBirth] = useState("")
//     const [birthDate, setBirthDate] = useState("")
//     const [nationality, setNationality] = useState("")
//     const [idNumber, setIdNumber] = useState("")
//     const [familyStatus, setFamilyStatus] = useState("")
//     const [husbandName, setHusbandName] = useState("")
//     const [husbandWork, setHusbandWork] = useState("")
//     const [childrenNumber, setChildrenNumber] = useState("")
//     const [address, setAddress] = useState("")
//     const [landPhone, setLandPhone] = useState("")
//     const [mobilePhone, setMobilePhone] = useState("")
//     const [certificate, setCertificate] = useState("")
//     const [jurisdiction, setJurisdiction] = useState("")
//     const [language, setLanguage] = useState("")
//     const [computerSkills, setComputerSkills] = useState("")
//     const [otherSkills, setOtherSkills] = useState("")
//     const [socialInsurance, setSocialInsurance] = useState("")
//     const [lastSalaryReceived, setLastSalaryReceived] = useState("")
//     const [expectedSalary, setExpectedSalary] = useState("")
//     const [interview, setInterview] = useState("")
//     const [workYouWish, setWorkYouWish] = useState("")
//     const [managementNotes, setManagementNotes] = useState("")
//     const [jobs, setJobs] = useState([]);
//     const [error, setError] = useState("");
//     console.log(jobs)
//
//     const navigate = useNavigate();
//
//     // const handleSocialInsuranceChange = (event) => {
//     //     setSocialInsurance(event.target.value)
//     // }
//
//
//     const createEmployee = async (e) => {
//         e.preventDefault()
//         const formData = {
//             'name': name,
//             'fatherName': fatherName,
//             'motherName': motherName,
//             'gender': gender,
//             'placeOfBirth': placeOfBirth,
//             'birthDate': birthDate,
//             'nationality': nationality,
//             'idNumber': idNumber,
//             'familyStatus': familyStatus,
//             'husbandName': husbandName,
//             'husbandWork': husbandWork,
//             'childrenNumber': childrenNumber,
//             'address': address,
//             'landPhone': landPhone,
//             'mobilePhone': mobilePhone,
//             'certificate': certificate,
//             'jurisdiction': jurisdiction,
//             'language': language,
//             'computerSkills': computerSkills,
//             'otherSkills': otherSkills,
//             'socialInsurance': socialInsurance,
//             'lastSalaryReceived': lastSalaryReceived,
//             'expectedSalary': expectedSalary,
//             'interview': interview,
//             'workYouWish': workYouWish,
//             'managementNotes': managementNotes,
//             'jobs': [...jobs],
//         }
//         console.log("name " + formData.name)
//         console.log("fatherName " + formData.fatherName)
//         console.log("motherName " + formData.motherName)
//         console.log("gender " + formData.gender)
//         console.log("placeOfBirth " + formData.placeOfBirth)
//         console.log("birthDate " + formData.birthDate)
//         console.log("nationality " + formData.nationality)
//         console.log("idNumber " + formData.idNumber)
//         console.log("familyStatus " + formData.familyStatus)
//         console.log("husbandName " + formData.husbandName)
//         console.log("husbandWork " + formData.husbandWork)
//         console.log("childrenNumber " + formData.childrenNumber)
//         console.log("address " + formData.address)
//         console.log("landPhone " + formData.landPhone)
//         console.log("mobilePhone " + formData.mobilePhone)
//         console.log("certificate " + formData.certificate)
//         console.log("jurisdiction " + formData.jurisdiction)
//         console.log("language " + formData.language)
//         console.log("computerSkills " + formData.computerSkills)
//         console.log("otherSkills " + formData.otherSkills)
//         console.log("socialInsurance " + formData.socialInsurance)
//         console.log("lastSalaryReceived " + formData.lastSalaryReceived)
//         console.log("expectedSalary " + formData.expectedSalary)
//         console.log("interview " + formData.interview)
//         console.log("workYouWish " + formData.workYouWish)
//         console.log("managementNotes " + formData.managementNotes)
//         console.log("job " + formData.jobs)
//         console.log("job [ ]" + [...jobs])
//         console.log("formData" + formData)
//
//         try {
//             const response = await fetch('http://localhost:8000/api/employee/addEmployee', {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData)
//             })
//
//             const responseJson = await response.json();
//
//             if (!response.ok) {
//                 setError(responseJson)
//             } else {
//                 await Swal.fire('Success', responseJson.message, 'success')
//                 setError("");
//                 setName("");setFatherName("");setMotherName("");
//                 setGender("");setPlaceOfBirth("");setBirthDate("");
//                 setNationality("");setIdNumber("");setFamilyStatus("");
//                 setHusbandName("");setHusbandWork("");setChildrenNumber("");
//                 setAddress("");setLandPhone("");setMobilePhone("");
//                 setCertificate("");setJurisdiction("");setLanguage("");
//                 setComputerSkills("");setOtherSkills("");setSocialInsurance("");
//                 setLastSalaryReceived("");setExpectedSalary("");setInterview("");
//                 setWorkYouWish("");setManagementNotes("");setJobs([]);
//
//                 // navigate("/components/employee setting/show employee/showemployee")
//
//
//             }
//         } catch (error) {
//             console("error", error)
//         }
//         // .then(data => {
//         //     Swal.fire('Success', data.message, 'success')
//         // },).catch(e => {
//         //     Swal.fire('Error', e.message, 'error')
//         // })
//     }
//
//     const addTableRows = () => {
//
//         const rowsInput = {
//             workPlace: '',
//             work: '',
//             classesStudied: '',
//             duration: ''
//         }
//         setJobs([...jobs, rowsInput])
//     }
//     const deleteTableRows = (index) => {
//         const rows = [...jobs];
//         rows.splice(index, 1);
//         setJobs(rows);
//     }
//
//     const handleChange = (index, event) => {
//
//         const {name, value} = event.target;
//         let rowsInput = [...jobs];
//         rowsInput[index][name] = value;
//         setJobs(rowsInput);
//     }
//
//     return (
//         <div className="sub-con">
//             <div className="da-container">
//
//                 <label className="title">إضافة موظف</label>
//
//                 <hr></hr>
//
//                 <div className="form-scr">
//                     {/*<div className="pdf" ref={pdfRef}>*/}
//                     <div className="form">
//
//                         {/*onSubmit={handleSubmit}*/}
//                         <div className={"div1"}>
//
//                             <label className="lab-form">الاسم والشهرة: </label>
//                             <input className={`input-form ${error && error.errors.name ? 'error_border' : 'input-form'}`} type="text" autoComplete="off"
//                                    required="" value={name}
//                                 //        autoFocus={valid.toString()} onBlur={(e) => {
//                                 //     setValid(true)
//                                 // }}
//                                    onChange={(event) => {
//                                        setName(event.target.value)
//
//                                    }}/>
//                             {error && <p className={"error"}>{error.errors.name}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">الأب: </label>
//                             <input className={`input-form ${error && error.errors.fatherName ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required="" value={fatherName}
//                                    onChange={(event) => {
//                                        setFatherName(event.target.value)
//                                    }}/>
//                             {error && <span className={"error"}>{error.errors.fatherName}</span>}
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">الأم: </label>
//                             <input className={`input-form ${error && error.errors.motherName ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
//                                    value={motherName} onChange={(event) => {
//                                 setMotherName(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.motherName}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">الجنس: </label>
//                             <input className={`input-form ${error && error.errors.gender ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
//                                    value={gender} onChange={(event) => {
//                                 setGender(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.gender}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">تاريخ الولادة: </label>
//                             <input className={`input-form ${error && error.errors.birthDate ? 'error_border' : 'input-form'}`} type={"date"} autoComplete="off" required=""
//                                    value={birthDate} onChange={(event) => {
//                                 setBirthDate(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.birthDate}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">مكان الولادة: </label>
//                             <input className={`input-form ${error && error.errors.placeOfBirth ? 'error_border' : 'input-form'}`} type={"text"} autoComplete="off" required=""
//                                    value={placeOfBirth} onChange={(event) => {
//                                 setPlaceOfBirth(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.placeOfBirth}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">الجنسية: </label>
//                             <input className={`input-form ${error && error.errors.nationality ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
//                                    value={nationality} onChange={(event) => {
//                                 setNationality(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.nationality}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">الرقم الوطني: </label>
//                             <input className={`input-form ${error && error.errors.idNumber ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
//                                    value={idNumber} onChange={(event) => {
//                                 setIdNumber(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.idNumber}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">الوضع العائلي: </label>
//                             <input className={`input-form ${error && error.errors.familyStatus ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
//                                    value={familyStatus} onChange={(event) => {
//                                 setFamilyStatus(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.familyStatus}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">اسم الزوج/ة: </label>
//                             <input className={`input-form ${error && error.errors.husbandName ? 'error_border' : 'input-form'}`} type="text" autoComplete="off"
//                                    value={husbandName} onChange={(event) => {
//                                 setHusbandName(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.husbandName}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">عمله/ا:</label>
//                             <input className={`input-form ${error && error.errors.husbandWork ? 'error_border' : 'input-form'}`} type="text" autoComplete="off"
//                                    value={husbandWork} onChange={(event) => {
//                                 setHusbandWork(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.husbandWork}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">عدد الأولاد: </label>
//                             <input className={`input-form ${error && error.errors.childrenNumber ? 'error_border' : 'input-form'}`} type="text" autoComplete="off"
//                                    value={childrenNumber} onChange={(event) => {
//                                 setChildrenNumber(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.childrenNumber}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">العنوان: </label>
//                             <input className={`input-form ${error && error.errors.address ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
//                                    value={address} onChange={(event) => {
//                                 setAddress(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.address}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">الجوال: </label>
//                             <input className={`input-form ${error && error.errors.mobilePhone ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
//                                    value={mobilePhone} onChange={(event) => {
//                                 setMobilePhone(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.mobilePhone}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">الأرضي: </label>
//                             <input className={`input-form ${error && error.errors.landPhone ? 'error_border' : 'input-form'}`} type="text" autoComplete="off"
//                                    value={landPhone} onChange={(event) => {
//                                 setLandPhone(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.landPhone}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">الشهادة: </label>
//                             <div className={"div1"}>ثانوية
//                                 <label className="lab-form">ثانوية </label>
//                                 <input className={`input-form ${error && error.errors.certificate ? 'error_border' : 'input-form'}`} type="checkbox" value={"ثانوية"}
//                                        checked={certificate === "ثانوية"} onChange={(event) => {
//                                     setCertificate(event.target.value)
//                                 }}
//                                 /><label
//                                 className="lab-form">معهد </label>
//                                 <input className={`input-form ${error && error.errors.certificate ? 'error_border' : 'input-form'}`} type="checkbox" value={"معهد"}
//                                        checked={certificate === "معهد"}
//                                        onChange={(event) => {
//                                            setCertificate(event.target.value)
//                                        }}
//                                 /><label
//                                 className="lab-form">إجازة جامعية </label>
//                                 <input className={`input-form ${error && error.errors.certificate ? 'error_border' : 'input-form'}`} type="checkbox" value={"جامعة"}
//                                        checked={certificate === "جامعة"}
//                                        onChange={(event) => {
//                                            setCertificate(event.target.value)
//                                        }}
//                                 /><label
//                                 className="lab-form">دبلوم </label>
//                                 <input className={`input-form ${error && error.errors.certificate ? 'error_border' : 'input-form'}`} type="checkbox" value={"دبلوم"}
//                                        checked={certificate === "دبلوم"}
//                                        onChange={(event) => {
//                                            setCertificate(event.target.value)
//                                        }}
//                                 /><label
//                                 className="lab-form">ماجستير </label>
//                                 <input className={`input-form ${error && error.errors.certificate ? 'error_border' : 'input-form'}`} type="checkbox" value={"ماجستير"}
//                                        checked={certificate === "ماجستير"} onChange={(event) => {
//                                     setCertificate(event.target.value)
//                                 }}
//                                 />
//                             </div>
//                             {error && <p className={"error"}>{error.errors.certificate}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">الاختصاص: </label>
//                             <input className={`input-form ${error && error.errors.jurisdiction ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required="" value={jurisdiction}
//                                    onChange={(event) => {
//                                        setJurisdiction(event.target.value)
//                                    }}/>
//                             {error && <p className={"error"}>{error.errors.jurisdiction}</p>}
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">اللغات التي تتقنها: </label>
//                             <input className={`input-form ${error && error.errors.language ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
//                                    value={language} onChange={(event) => {
//                                 setLanguage(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.language}</p>}
//
//                         </div>
//
//                         <div className={"border"}>
//                             معلومات حول أعمال سابقة
//                         </div>
//
//                         <table className="table">
//                             <thead>
//                             <tr>
//                                 <th> مكان العمل</th>
//                                 <th> العمل</th>
//                                 <th>المدة</th>
//                                 <th>الصفوف التي درستها</th>
//                                 <th>
//                                     <button className={"bi bi-plus-lg add"} onClick={addTableRows}></button>
//                                 </th>
//                             </tr>
//
//                             </thead>
//                             <tbody>
//
//                             {/*<tr>*/}
//                             {/*    <td id={"td-inp"}><input type={"text"}/></td>*/}
//                             {/*    <td id={"td-inp"}><input type={"text"}/></td>*/}
//                             {/*    <td id={"td-inp"}><input type={"text"}/></td>*/}
//                             {/*    <td id={"td-inp"}><input type={"text"}/></td>*/}
//                             {/*    <td>*/}
//                             {/*        <button className={"bi bi-x-lg delete"}></button>*/}
//                             {/*    </td>*/}
//
//                             {/*</tr>*/}
//
//                             <TableRows jobs={jobs} deleteTableRows={deleteTableRows}
//                                        handleChange={handleChange}/>
//
//                             </tbody>
//                         </table>
//
//                         <div className={"div1"}>
//                             <label className="lab-form">مهارات العمل على الحاسوب: </label>
//                             <input className={`input-form ${error && error.errors.computerSkills ? 'error_border' : 'input-form'}`} type="text" autoComplete="off"
//                                    value={computerSkills} onChange={(event) => {
//                                 setComputerSkills(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.computerSkills}</p>}
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">مهارات أخرى: </label>
//                             <input className={`input-form ${error && error.errors.otherSkills ? 'error_border' : 'input-form'}`} type="text" autoComplete="off"
//                                    value={otherSkills} onChange={(event) => {
//                                 setOtherSkills(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.otherSkills}</p>}
//
//                         </div>
//
//                         <div className={"div1"}>
//                             <label className="lab-form">هل تم تسجيلك في التأمينات الاجتماعية والعمل سابقا: </label>
//                             <div className={"div1"}>
//                                 <label className="lab-form">نعم </label>
//                                 <input className={`input-form ${error && error.errors.socialInsurance ? 'error_border' : 'input-form'}`} type="checkbox" value={"1"}
//                                        checked={socialInsurance === "1"}
//                                        onChange={(event) => {
//                                            setSocialInsurance(event.target.value)
//                                        }}/>
//                                 <label className="lab-form">لا </label>
//                                 <input className={`input-form ${error && error.errors.socialInsurance ? 'error_border' : 'input-form'}`} type="checkbox" value={"0"}
//                                        checked={socialInsurance === "0"}
//                                        onChange={(event) => {
//                                            setSocialInsurance(event.target.value)
//                                        }}/>
//                             </div>
//                             {error && <p className={"error"}>{error.errors.socialInsurance}</p>}
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">اخر راتب مقبوض: </label>
//                             <input className={`input-form ${error && error.errors.lastSalaryReceived ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" value={lastSalaryReceived}
//                                    onChange={(event) => {
//                                        setLastSalaryReceived(event.target.value)
//                                    }}/>
//                             {error && <p className={"error"}>{error.errors.lastSalaryReceived}</p>}
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">الراتب المتوقع: </label>
//                             <input className={`input-form ${error && error.errors.expectedSalary ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
//                                    value={expectedSalary} onChange={(event) => {
//                                 setExpectedSalary(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.expectedSalary}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">موعد المقابلة/الدرس/المحدد من قبل الإدارة: </label>
//                             <input className={`input-form ${error && error.errors.interview ? 'error_border' : 'input-form'}`} type="datetime-local" autoComplete="off" required=""
//                                    value={interview} onChange={(event) => {
//                                 setInterview(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.interview}</p>}
//
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">العمل الذي ترغب به: </label>
//                             <input className={`input-form ${error && error.errors.workYouWish ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
//                                    value={workYouWish} onChange={(event) => {
//                                 setWorkYouWish(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.workYouWish}</p>}
//                         </div>
//                         <div className={"div1"}>
//                             <label className="lab-form">ملاحظات الإدارة: </label>
//                             <input className={`input-form ${error && error.errors.managementNotes ? 'error_border' : 'input-form'}`} type="text" autoComplete="off" required=""
//                                    value={managementNotes} onChange={(event) => {
//                                 setManagementNotes(event.target.value)
//                             }}/>
//                             {error && <p className={"error"}>{error.errors.managementNotes}</p>}
//                         </div>
//
//
//                     </div>
//
//                     <button className="button-save"
//                             onClick={createEmployee}> حفظ
//                     </button>
//                 </div>
//
//                 {/*    <button className={"button-save"} onClick={downloadPDF}>pdf</button>*/}
//                 {/*</div>*/}
//             </div>
//         </div>
//     )
//
// }
//
// export default AddEmployee
