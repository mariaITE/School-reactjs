import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddSubject() {
    /*   const [classes, setclasses] = useState([]);
       useEffect(()=>{
           fetchclasses()
       },[classes])

       const fetchclasses = async () => {
           await axios.get('http://localhost:8000/api/user/listclasses').then(({data})=>{
               setclasses(data)
           });

       } */

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
            {
                "id": "4",
                "name": "الرابع"
            },
            {
                "id": "5",
                "name": "الخامس"
            }
        ]

const [subject,setsubject]=useState('');
const handelInputsubject=(event)=>{
setsubject(event.target.value);
}
const [Sclass,setSclass]=useState('');
const handelchangeclass=(event)=>{
setSclass(event.target.value);
}
const [lowmark,setlowmark]=useState('');
const handelInputlowmark=(event)=>{
setlowmark(event.target.value);
}
const [highmark,sethighmark]=useState('');
const handelInputhighmark=(event)=>{
sethighmark(event.target.value);
}

 const [msg,setmsg]=useState('');

const handleAddClick= async() => {
const datasend={
subject:subject,
class:Sclass,
lowMark:lowmark,
highMark:highmark
}


try{
  const rspo= await axios.post("http://localhost:8000/api/create_subject_class",datasend).then(({data})=>{setmsg("تم اضافة  بنجاح")})
  }catch(error){console.error(error);}

}
    return(
     <div className="sub-con">
 <div className="da-container">
            <label className="title">إضافة مقرر</label>
            <hr></hr>
            <div className="form-scr">
              <form className="g-form">

                    <label className="lab">
                       اختر الصف:
                        <select className="g-select"  value={Sclass} onChange={handelchangeclass}>
                          {classes.map(element => <option className="g-option" key={element.id}
                                            value={element.name}>{element.name}</option>)}

                             </select>
                         </label>



                    <label className="lab">ادخل اسم المقرر:
                        <input className="input-form" type="text" autoComplete="off" onChange={handelInputsubject} required=""/>
                    </label>

                     <br />
                      <br />
               <label className="lab">العلامة العليا:
                        <input className="input-form" type="text" autoComplete="off" onChange={handelInputhighmark} required=""/>
                </label>


               <label className="lab">العلامة الدنيا:
                        <input className="input-form" type="text" autoComplete="off" onChange={handelInputlowmark} required=""/>
                </label>
     </form>
                  <br />
                  <br />
                  <button className="button-search" onClick={handleAddClick}> إضافة</button>
    <p> {msg} </p>
        </div>
 </div>
  </div>
)

}