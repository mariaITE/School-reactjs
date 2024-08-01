import React, {useEffect, useState} from "react";
import axios from "axios";
export default function AddProgram() {

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
 let days = [
            {
                "id": "1",
                "name": "الأحد"
            },
            {
                "id": "2",
                "name": "الاثنين"
            },
            {
                "id": "3",
                "name": "الثلاثاء"
            },
            {
                "id": "4",
                "name": "الأربعاء"
            },
            {
                "id": "5",
                "name": "الخميس"
            },
        ]
let time = [
            {
                "id": "1",
                "name": "الحصة الأولى"
            },
            {
                "id": "2",
                "name": "الحصة الثانية"
            },
           {
                "id": "3",
                "name": "الحصة الثالثة"
            },
            {
                "id": "4",
                "name": "الحصة الرابعة"
            },
            {
                "id": "5",
                "name": "الحصة الخامسة"
            },
            {
                "id": "6",
                "name": "الحصة السادسة"
            },
            {
                "id": "7",
                "name": "الحصة السابعة"
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
        const [Sclass,setSclass]=useState("الثاني");
        const handelchangeclass=(event)=>{
        setSclass(event.target.value);
        }

        const [Sgender,setSgender]=useState("ذكور");
        const handelchangegender=(event)=>{
        setSgender(event.target.value);
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

        const [Sgroup,setSgroup]=useState('');
        const handelchangegroup=(event)=>{
        setSgroup(event.target.value);}



const [inputs,setinputs]=useState([
        ]);

const [updatinput,setupdatinput]=useState([]);
 /*const [inputs,setinputs]=useState([]);*/

const handelInputsubject=(value,timeid,dayid) =>{
console.log(value,timeid,dayid);
const foundbefor=inputs.filter(input =>{ return (input.time === timeid && input.day===dayid) })
if(foundbefor.length !== 0){
console.log("tttt");
console.log(foundbefor);
const updatinput= inputs.map((item) => {if(item.id === foundbefor[0].id) {return {...item,subject:value};} return item} )
console.log(updatinput);
setinputs(updatinput)
}
else{
console.log("rrrr");
const newinput={id:inputs.length, time:timeid,day:dayid,subject:value,teacher:null}
setinputs([...inputs,newinput])
}
console.log(inputs);
}

const handelInputteacher=(value,timeid,dayid) =>{
console.log(value,timeid,dayid);
const foundbefor=inputs.filter(input =>{ return (input.time === timeid && input.day===dayid) })
if(foundbefor.length !== 0){
console.log("tttt");
console.log(foundbefor);
const updatinput= inputs.map((item) => {if(item.id === foundbefor[0].id) {console.log("ppppp");return {...item,teacher:value};} return item} )
console.log(updatinput);
setinputs(updatinput)
}
else{
console.log("rrrr");
const newinput={id:inputs.length, time:timeid,day:dayid,subject:null,teacher:value}
setinputs([...inputs,newinput])
}
console.log(inputs);
}

 const [msg,setmsg]=useState('');

const handleAddProg=() =>{
console.log(inputs);
const datasend={
programdata:inputs,
class:Sclass,
gender:Sgender,
section:"شعبة1"
}
    console.log(Sgroup);
console.log(datasend);
  try{
    const rspo=axios.post("http://localhost:8000/api/create_program",datasend).then(({data})=>{setmsg("تم اضافة بنجاح")})
    }catch(error){console.error(error);}

}

return(
  <div className="sub-con">
 <div className="da-container">
            <label className="title">إضافة برنامج  </label>
            <hr></hr>
       <div className="form-scr">

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
                     للشعبة:
                     <select className="g-select"   value={Sgroup} onChange={handelchangegroup}>
                         {group.map(element => <option className="g-option" key={element.id}
                                                        value={element.name}>{element.name}</option>)}

                     </select>
                 </label>

            <div className="tab-scroll">
             <table>
               <thead>
                <tr>
                 <th > </th>
                 {time.map(element=>
                    <th >{element.name}</th> )}
                  </tr>
               </thead>

                <tbody>
                 {days.map(item=>
                   <tr key={item.id}>
                   <td >{item.name}

                   </td>

                   {time.map(element=>
                    <td >
                      <input className="input-x3" type="text"  autoComplete="off" onChange={(e)=>handelInputsubject(e.target.value,element.id,item.name)} required=""/>
                        <br />
                      <input className="input-x3" type="text"  autoComplete="off" onChange={(e)=>handelInputteacher(e.target.value,element.id,item.name)} required=""/>
                      </td>
                      )}

                    </tr>
                    )}

                  </tbody>
              </table>
           </div>

                  <button className="button-search" onClick={handleAddProg}> إضافة </button>
                     <p> {msg} </p>

    </div>
     </div>
    </div>
 )
}