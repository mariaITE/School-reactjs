import React, {useEffect, useState} from "react";
import axios from "axios";
export default function AddStudentToSection() {
  let classes = [
            {
                "id": "1",
                "name": "الاول"
            },
            {
                "id": "2",
                "name": "الثاني"
            },
            {
                "id": "3",
                "name": "الثالث"
            },
        ]

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
        const [Sclasss,setSclasss]=useState("الثاني");
        const handelchangeclasss=(event)=>{
        setSclasss(event.target.value);
        }

        const [Sgenders,setSgenders]=useState("ذكور");
        const handelchangegenders=(event)=>{
        setSgenders(event.target.value);
        }


       const [groups, setgroups] = useState([]);
      useEffect(()=>{
            fetchNames()
            },[Sclasss,Sgenders])

           const fetchNames = async () => {
            await axios.get('http://localhost:8000/api/show_class_sections',{params:{class:Sclasss ,gender:Sgenders}}).then(({data})=>{
              setgroups(data)
                   });

        }


        const [Sgroups,setSgroups]=useState('');
        const handelchangegroups=(event)=>{
        setSgroups(event.target.value);}


  const [students,setstudents]=useState([{name:null}]);
    useEffect(()=>{
       fetchStudents()
       },[Sclasss,Sgenders])

      const fetchStudents = async () => {
        await axios.get('http://localhost:8000/api/get_students',{params:{class:Sclasss ,gender:Sgenders}}).then(({data})=>{
        setstudents(data)   });
        }

 const [Sstudents,setSstudents]=useState([]);
 const handlecheckbox =(isChecked,id) =>{if (isChecked){setSstudents([...Sstudents, id]);}
 else{setSstudents(Sstudents.filter(item=> item !== id));}};

  const [msg,setmsg]=useState('');

const handleAddStudentToSection=() =>{
const datasends={
name:Sgroups,
class:Sclasss,
gender:Sgenders,
students:Sstudents
}
console.log(datasends);
  try{
    const rspo=axios.put("http://localhost:8000/api/add_studentToSection",datasends).then(({data})=>{setmsg(data)})
    }catch(error){console.error(error);}

}


return(
  <div className="sub-con">
 <div className="da-container">
            <label className="title">إضافة طلاب لشعبة</label>
            <hr></hr>
       <div className="form-scr">

                    <label className="lab">
                       الصف:
                        <select className="g-select"  value={Sclasss} onChange={handelchangeclasss}>
                          {classes.map(element => <option className="g-option" key={element.id}
                                            value={element.name}>{element.name}</option>)}

                             </select>
                         </label>

                    <label className="lab">
                    الجنس:
                    <select className="g-select"   value={Sgenders} onChange={handelchangegenders}>
                        {gender.map(element => <option className="g-option" key={element.id}
                                                       value={element.gender}>{element.gender}</option>)}

                    </select>
                </label>
                     <label className="lab">
                     للشعبة:
                     <select className="g-select"   value={Sgroups} onChange={handelchangegroups}>
                         {groups.map(element => <option className="g-option" key={element.id}
                                                        value={element.name}>{element.name}</option>)}

                     </select>
                 </label>
{ students[0].name !== null ?
            <div className="tab-scroll">
             <table>
               <thead>
                <tr>
                 <th > اسم</th>
                 <th >المعدل</th>
                 <th > </th>

                  </tr>
               </thead>
                <tbody>
                  {students.map(element=>
                    <tr key={element.id}>
                    <td >{element.name}</td>
                      <td >{element.average}</td>
                         <td >
                    <label>
                    <input type="checkbox" checked={Sstudents.includes(element.id)} onChange={(e)=>handlecheckbox(e.target.checked,element.id)}/>
                    </label>
                        </td>
                    </tr>
                    )}
                    </tbody>
                    </table>

                  <button className="button-search" onClick={handleAddStudentToSection} > إضافة طلاب للشعبة</button>
                   </div>
                  : null}

<p> {msg} </p>
    </div>
    </div>
     </div>
 )
}