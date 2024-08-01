import React, {useEffect, useState,Fragment} from "react";
import axios from "axios";
import AddSubject from "./AddSubject";
import Swal from 'sweetalert2';

export default function ShowSubject() {

 const [role, setrole] = useState([]);
   useEffect(() => {
         setrole(localStorage.getItem('permission'));
    },[]);

 const [del, setdel] = useState(0);

    const [subjectli,setsubject]=useState([]);
      useEffect(()=>{

            fetchName()
            },[del])

           const fetchName = async () => {
            await axios.get('http://localhost:8000/api/show_subjects').then(({data})=>{
              setsubject(data)
                   });
        }
 const [active, setActive] = useState("null");
const handleAddClick=() =>{
  setActive("true");
}

const handleDeleteClick = async (subjectclass_id) => {
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

      await fetch('http://localhost:8000/api/delet_subjectclass/'+subjectclass_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With':'XMLHttpRequest',
             'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
            },
        }).catch((e)=>{
           console.log('yyyyyyy'+e)
               setdel(del+1)
        })
    }



//render(){
return(
               <div>
                {active === "true"  ?<AddSubject/> :
               <div className="sub-con">
                <div className="da-container">
                <Fragment>
            <label className="title">عرض المقررات </label>
               {role.includes("إضافة مقرر")?
            <button className="button-search" onClick={handleAddClick}> إضافة مقرر</button>
              :null}
            <hr></hr>
               {role.includes("عرض المقررات")?
            <div className="table-scroll">
             <table>
               <thead>
                <tr>
                 <th> اسم المقرر</th>
                 <th>الصف</th>
                 <th>العلامة العليا</th>
                 <th>العلامة الدنيا</th>
                 <th>حذف المقرر</th>
                  </tr>
               </thead>
                <tbody>
                  {subjectli.map(element=>
                    <tr key={element.id}>
                    <td>{element.subject}</td>
                     <td>{element.class}</td>
                      <td>{element.highMark}</td>
                       <td>{element.lowMark}</td>
                         <td>
                        <label>
                        <button className="button-search" onClick={(e)=>handleDeleteClick(element.id)}> حذف  </button>
                        </label>
                        </td>
                    </tr>
                    )}
                    </tbody>
                    </table>
   </div>

                       :null}
                </Fragment>

                 </div>
                     </div>}

   </div>
)
//}

}