import React, {useEffect, useState} from "react";
import axios from "axios";
import AddProgram from "./AddProgram";
import Swal from 'sweetalert2';
export default function ShowProgram() {

 const [role, setrole] = useState([]);
   useEffect(() => {
         setrole(localStorage.getItem('permission'));
    });

const [active, setActive] = useState("null");
const handleAddClick=() =>{
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
                "id": 1,
                "name": "الحصة الأولى"
            },
            {
                "id": 2,
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

 const [changes,setchanges]=useState([]);

const [updatinput,setupdatinput]=useState([]);
 const [inputs,setinputs]=useState([{subject:null}]);

 const [msg,setmsg]=useState('');

/*const handelInputsubject=(value,timeid,dayid) =>{
console.log(value,timeid,dayid);
const foundbefor=inputs.filter(input =>{ return (input.time === timeid && input.day===dayid) })

const updatinput= inputs.map((item) => {if(item.id === foundbefor[0].id) {return {...item,subject:value};} return item} )
setinputs(updatinput)

if(foundbefor.length !== 0){
console.log("tttt");
console.log(foundbefor);
const updatin= foundbefor.map((item) => {if(item.id === foundbefor[0].id) {return {...item,subject:value};} return item} )
const newinput=updatin[0];
setinputs([...changes,newinput])
}
console.log(inputs);
}

const handelInputteacher=(value,timeid,dayid) =>{
console.log(value,timeid,dayid);
const foundbefor=inputs.filter(input =>{ return (input.time === timeid && input.day===dayid) })
if(foundbefor.length !== 0){
console.log("tttt");
console.log(foundbefor);
const updatinput= foundbefor.map((item) => {if(item.id === 0) {console.log("ppppp");return {...item,teacher:value};} return item} )
console.log(updatinput);
const newinput=updatinput[0];
setinputs([...changes,newinput])
}
console.log(inputs);
}*/


const handleShow=() =>{
console.log(inputs);
const datasend={
class:Sclass,
gender:Sgender,
section:Sgroup
}
    console.log(Sgroup);

         try{
              const rspo=axios.get('http://localhost:8000/api/show_program',{params:{class:Sclass ,gender:Sgender,section:Sgroup}}).then(({data})=>{
              setinputs(data);console.log(data)
                   });
                   }catch(error){console.error(error);}

}

/*const handleAddChanges=() =>{
const datasend={
changes:changes,
class:Sclass,
gender:Sgender,
sections:Sgroup
}
console.log(datasend);
 try {
            console.log("kkkkk")
            let re = await fetch("http://localhost:8000/api/edit_program", {
                method: 'POST',
                body: datasend
            });
            console.log(re)
            console.log("fffffff")
        } catch (error) {
            console.log("lllllll")
            console.log(error)
        }
}*/


const handleDeleteClick= async (section_id) => {
  const isConfirm = await Swal.fire({
             title: 'Are you sure?',
             text: "You won't be able to revert this!",
              icon: 'warning',
             showCancelButton: true,
            confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
             }).then((result) => {
             return result.isConfirmed
                 });

              if (!isConfirm) {
                     return;
                       }

        await fetch('http://localhost:8000/api/delet_program/'+section_id, {
         method: 'DELETE',
            headers: {
               'Accept':'application/json',
               'Content-Type': 'application/json',
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
                           },
                   })
                   .then(response=>response.json())
                   .then(data=>setmsg(data))
                   .then(setinputs([{subject:null}]))
                   .catch((e)=>{
                    console.log('yyyyyyy'+e)
                         })

    }


return(
<div>
    {active === "true"  ?<AddProgram/> :
    <div className="sub-con">
     <div className="da-container">
            <label className="title">عرض برنامج </label>
              {role.includes("إضافة برنامج")?
            <button className="button-search" onClick={handleAddClick}> إضافة برنامج</button>
              :null}
            <hr></hr>
              {role.includes("عرض برنامج")?
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
                 <button className="button-search" onClick={handleShow}> عرض</button>

            <div className="tab-scroll">
             <table>
               <thead>
                <tr>
                 <th > </th>
                 {time.map(element=>
                    <th >{element.name}</th> )}
                  </tr>
               </thead>

{ inputs[0].subject !== null ?
                <tbody>


                 {days.map(item=>
                   <tr key={item.id}>
                   <td >{item.name}</td>

                   {time.map(element=>
                    <td >

{inputs.find((elem) => {return elem.day === item.name && elem.time=== element.id}) === undefined ? null :
              <div>     { inputs.find((elem) =>elem.day === item.name && elem.time=== element.id).subject}
                     <br />
                    {inputs.find((elem) =>elem.day === item.name && elem.time=== element.id).teacher}   </div>
}
                      </td>
                      )}

                    </tr>
                    )}

                  </tbody>

                  : null}
              </table>
           </div>


                  <button className="button-search" onClick={(e)=>handleDeleteClick(inputs[0].section_id)}> حذف </button>
                   <p> {msg} </p>
       </div>
         :null}
        </div>
    </div>}
</div>
 )
}

        /*    {inputs.find((elem) => {return elem.day === item.name && elem.time=== element.id}) === null ? null :*/

                    /*  <input className="input-x3" type="text"  value={inputs.find((elem) =>elem.day === item.name && elem.time=== element.id).subject}
                       autoComplete="off" onChange={(e)=>handelInputsubject(e.target.value,element.id,item.name)} required=""/>
                        <br />
                      <input className="input-x3" type="text"  value={inputs.find((elem) =>elem.day === item.name && elem.time=== element.id).teacher}
                      autoComplete="off" onChange={(e)=>handelInputteacher(e.target.value,element.id,item.name)} required=""/> */