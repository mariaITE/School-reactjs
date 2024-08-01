import React, {useEffect, useState} from "react";
import axios from "axios";
/*import selectDiv from "/components/follow-up management/select_div";*/

export default function AddSection() {
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


 const [name,setname]=useState('');
 const handelInputname=(event)=>{
 setname(event.target.value);
 }
 const [capacity,setcapacity]=useState('');
 const handelInputcapacity=(event)=>{
 setcapacity(event.target.value);
 }

 const [msg,setmsg]=useState('');

const handleAddSection=() =>{
const datasend={
 name:name,
 gender:Sgender,
 class:Sclass,
capacity:capacity
 }
 try{
   const rspo=axios.post("http://localhost:8000/api/create_section",datasend).then(({data})=>{setmsg("تم اضافة الشعبة بنجاح")})
   }catch(error){console.error(error);
   }

}




//render(){
return(
  <div className="sub-con">
 <div className="da-container">
            <label className="title">إضافة شعبة</label>
            <hr></hr>
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
<br />
               <label className="lab">أدخل اسم الشعبة:
                        <input className="input-form" type="text" autoComplete="off" onChange={handelInputname} required=""/>
                </label>


               <label className="lab">سعة الشعبة:
                        <input className="input-form" type="text" autoComplete="off" onChange={handelInputcapacity} required=""/>
                </label>
                  <br />
                  <br />
                  <button className="button-search" onClick={handleAddSection}> إضافة شعبة</button>
                            <p> {msg} </p>
              <br />
   </div>
    </div>
)
//}

}