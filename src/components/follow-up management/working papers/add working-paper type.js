import React, {useEffect, useState} from "react";
import axios from "axios";


export default function Addwptype() {



const [name,setinputva]=useState('');
const handelInputchange=(event)=>{
setinputva(event.target.value);
}

 const [msg,setmsg]=useState('');
/*const handleAddClick=() =>{*/
const handleAddClick = async () => {
console.log(name)
try{
const rspo=axios.post("http://localhost:8000/api/create_workpapersType",{name:name}).then(({data})=>{setmsg("تم")})
}catch(error){console.error(error);}
/*
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]'),
                },
                body: JSON.stringify(name)

        */
}


//render(){
return(
  <div className="sub-con">
 <div className="da-container">
            <label className="title">إضافة نوع أوراق العمل</label>
            <hr></hr>
            <div className="form-scr">
             <label className="lab">
                     اسم المتابعة
                      </label>
           <br />
             <input className="input-form" type="text" onChange={handelInputchange}  required=""/>
              <br />
                   <button className="button-search" onClick={handleAddClick}> حفظ</button>
                           <p> {msg} </p>
                    </div>
   </div>
    </div>
)
//}

}

