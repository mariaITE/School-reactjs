import React, {useEffect, useState} from "react";
import axios from "axios";

import Addwptype from "./add working-paper type";

export default function AddWorkingPaper() {

 const [role, setrole] = useState([]);
   useEffect(() => {
         setrole(localStorage.getItem('permission'));
    });

 const [active, setActive] = useState("null");
const handleClick=() =>{
  setActive("true");
}
    const [classes, setDropDownClass] = useState([{name:"gg"}]);
    useEffect(() => {
        sendDropDownClass();

    }, [])

    const sendDropDownClass = async () => {
        // e.preventDefault();
        fetch('http://localhost:8000/api/showClass', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setDropDownClass(data.data))
            .catch(error => console.error(error));

    }
      // let classes = [
      //       {
      //           "id": "1",
      //           "name": "الاول"
      //       },
      //       {
      //           "id": "2",
      //           "name": "الثاني"
      //       },
      //       {
      //           "id": "3",
      //           "name": "السابع"
      //       },
      //       {
      //           "id": "4",
      //           "name": "الرابع"
      //       },
      //       {
      //           "id": "5",
      //           "name": "الخامس"
      //       }
      //   ]


    let gender = [
        {
            "id": "1",
            "gender": "ذكور"
        },
        {
            "id": "2",
            "gender": "إناث"
        },

    ]
        const [Sclass,setSclass]=useState("الثاني");
        const handelchangeclass=(event)=>{
        setSclass(event.target.value);
        }

        const [Sgender,setSgender]=useState("ذكور");
        const handelchangegender=(event)=>{
        setSgender(event.target.value);
        }

    const [wptype, setwptype] = useState([]);
      useEffect(()=>{
            fetchwpType()
            },[])

           const fetchwpType = async () => {
            await axios.get('http://localhost:8000/api/get_WorkingPapersTypeList').then(({data})=>{
              setwptype(data)
                   });

        }



         const [subject, setsubject] = useState([]);
  useEffect(()=>{
           fetchSubject()
           },[Sclass])

            const fetchSubject = async () => {
            await axios.get('http://localhost:8000/api/get_subjectsList',{params:{class:Sclass }}).then(({data})=>{
              setsubject(data)
                    });
       }


const [Swptype,setSwptype]=useState('');
const handelchangewptype=(event)=>{
setSwptype(event.target.value);
}

const [Ssubject,setSsubject]=useState('');
const handelchangesubject=(event)=>{
setSsubject(event.target.value);
}

const [selectedfile,setselectedfile]=useState('');
const handelFilechange=(event)=>{
setselectedfile(event.target.files[0]);
}


 const [group, setgroup] = useState([]);
 useEffect(()=>{
          fetchName()
          },[Sclass,Sgender])

           const fetchName = async () => {
           await axios.get('http://localhost:8000/api/show_class_sections',{params:{class:Sclass ,gender:Sgender}}).then(({data})=>{
             setgroup(data)
                   });
      }

    const [Sgroup,setSgroup]=useState([]);

 const handlecheckbox =(isChecked,name) =>{if (isChecked){setSgroup([...Sgroup, name]);}
 else{setSgroup(Sgroup.filter(item=> item !== name));}};

 const [msg,setmsg]=useState('');

 async function handleAddClick() {

 const formData = new FormData();
 formData.append('file', selectedfile,selectedfile.name)
 formData.append('type', Swptype)
 formData.append('gender', Sgender)
  formData.append('subject',Ssubject)
 formData.append('class', Sclass)

                Sgroup.forEach((item) =>{
 formData.append('sections[]', item);
 })
 console.log(selectedfile)
 console.log(formData)

  try{
    const rspo=axios.post("http://localhost:8000/api/create_workpapers",formData).then(({data})=>{setmsg("done")})
    }catch(error){console.error(error);}

 }



return(
               <div>
                {active === "true"  ?<Addwptype/> :
 <div className="sub-con">
  <div className="da-container">

        <label className="title">إضافة  أوراق العمل</label>
           {role.includes("إضافة نوع أوراق العمل")?
        <button className="button-search" onClick={handleClick}> إضافة نوع أوراق العمل</button>
         :null}
        <hr></hr>
         {role.includes("إضافة  أوراق العمل")?
        <div className="form-scr">
            <br />


                    <label className="lab">
                       الصف:
                        <select className="g-select"  value={Sclass} onChange={handelchangeclass}>
                          {classes.map(element => <option className="g-option" key={element.id}
                                            value={element.name}>{element.name}</option>)}

                             </select>
                         </label>

                    <label className="lab">
                    الجنس:
                    <select className="g-select"   value={Sgender} onChange={handelchangegender}>
                        {gender.map(element => <option className="g-option" key={element.id}
                                                       value={element.gender}>{element.gender}</option>)}

                    </select>
                </label>
                     <label className="lab">
                        النوع:
                         <select className="g-select"  value={Swptype} onChange={handelchangewptype}>
                           {wptype.map(element => <option className="g-option" key={element.id}
                                             value={element.name}>{element.name}</option>)}

                              </select>
                          </label>
                     <label className="lab">
                         المادة:
                         <select className="g-select"  value={Ssubject} onChange={handelchangesubject}>
                             {subject.map(element => <option className="g-option" key={element.id}
                                                           value={element.name}>{element.name}</option>)}

                         </select>
                     </label>

                                            <div className="divmini">
                     <label className="lab">
                    اختر الملف المطلوب
                     <input className="input-form"  type="file"  multiple onChange={handelFilechange}  required=""/>
                    {selectedfile &&<p>selected file:{selectedfile.name} </p>}

                 </label>

  </div>

                <div>
                { Sclass !== "null" ?
                    <table>
                    <thead>
                    <tr>
                    <th>الشعبة</th>
                    <th>select</th>
                    </tr>
                    </thead>
                    <tbody>
                    {group.map(element=>
                    <tr key={element.id}>
                    <td>{element.name}</td>
                    <td>
                    <label>
                    <input  type="checkbox" checked={Sgroup.includes(element.name)} onChange={(e)=>handlecheckbox(e.target.checked,element.name)}/>
                    </label>
                    </td>
                    </tr>
                    )}
                    </tbody>
                    </table> : null}
                    </div>


                  <br />
                  <button className="button-search" onClick={handleAddClick} > إضافة</button>
                         <p> {msg} </p>
        </div>
         :null}
        </div>
 </div>}
</div>
)
}


