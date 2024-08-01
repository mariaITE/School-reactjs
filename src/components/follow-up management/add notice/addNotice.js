import React, {useEffect, useState} from "react";
import axios from "axios";

export default function AddNotice() {
    let noticetype = [
        {
            "id": "1",
            "name": "سلوكية"
        },
        {
            "id": "2",
            "name": "غير سلوكية"
        },
    ]
    let season = [
            {
                "id": "1",
                "season": "الاول"
            },
            {
                "id": "2",
                "season": "الثاني"
            },
        ]


   /* let subject = [
            {
                "id": "1",
                "name": "عربي"
            }
        ]*/

   const [subject,setsubject]=useState([]);
      useEffect(()=>{
            fetchName()
            },[])

           const fetchName = async () => {
            await axios.get('http://localhost:8000/api/show_subjects').then(({data})=>{
              setsubject(data)
                   });

        }
const [Ssubject,setSsubject]=useState('');
const handelchangesubject=(event)=>{
setSsubject(event.target.value);
}

const [studentname,setstudent]=useState('');
const handelInputname=(event)=>{
setstudent(event.target.value);
}

const [fathername,setfather]=useState('');
const handelInputfather=(event)=>{
setfather(event.target.value);
}
const [nickname,setnick]=useState('');
const handelInputnick=(event)=>{
setnick(event.target.value);
}

const [Sseason,setSseason]=useState("الاول");
const handelchangeseason=(event)=>{
setSseason(event.target.value);
}

const [Snoticetype,setSnoticetype]=useState("سلوكية");
const handelchangenoticetype=(event)=>{
setSnoticetype(event.target.value);
}

const [notic,setnotic]=useState('');
const handelInputnotic=(event)=>{
setnotic(event.target.value);
}

const [history,sethistory]=useState('');
const handelInputdate=(event)=>{
sethistory(event.target.value);
}

 const [msg,setmsg]=useState('');

 async function handleAddClick() {
 const datasend={
 semester:Sseason,
 typeNote:Snoticetype,
 text:notic,
 date:history,
 subject:Ssubject,
 name:studentname,
 nickname:nickname,
 fatherName:fathername,
 }
  try{
    const rspo=axios.post("http://localhost:8000/api/create_note",datasend).then(({data})=>{setmsg(data)})
    }catch(error){  console.error(error);
    }

 }
return(
 <div className="sub-con">
 <div className="da-container">

        <label className="title">إضافة ملاحظة</label>
        <hr></hr>
        <div className="form-scr">
          <form className="g-form">


                <label className="lab">اسم الطالب:
                    <input className="input-form" type="text" autoComplete="off" onChange={handelInputname} required=""/>
                </label>

                 <label className="lab">الأب:
                                    <input className="input-form" type="text" autoComplete="off" onChange={handelInputfather} required=""/>
                                </label>

                  <label className="lab">الكنية:
                                     <input className="input-form" type="text" autoComplete="off" onChange={handelInputnick} required=""/>
                                 </label>

   <br />
                <label className="lab">تاريخ :
                   <input className="input-form" type={"date"} autoComplete="off" onChange={handelInputdate} required=""/>
                 </label>



                <label className="lab"> المادة:
                     <select className="g-select"  value={Ssubject} onChange={handelchangesubject}>
                             {subject.map(element => <option className="g-option" key={element.id}
                                                           value={element.subject}>{element.subject}</option>)}
                      </select>
                </label>

                <label className="lab"> النوع:
                     <select className="g-select"  value={Snoticetype} onChange={handelchangenoticetype}>
                             {noticetype.map(element => <option className="g-option" key={element.id}
                                                           value={element.name}>{element.name}</option>)}
                      </select>
                </label>

                <label className="lab"> الفصل:
                     <select className="g-select"  value={Sseason} onChange={handelchangeseason}>
                             {season.map(element => <option className="g-option" key={element.id}
                                                           value={element.season}>{element.season}</option>)}
                      </select>
                </label>
<br />
               <label className="lab">الملاحظة:
                        <input className="input-x2" type="text" autoComplete="off" onChange={handelInputnotic} required=""/>
                </label>
     </form>
                  <br />
                  <button className="button-search" onClick={handleAddClick} > إضافة</button>
                    <p> {msg} </p>

        </div>
 </div>
  </div>
)

}