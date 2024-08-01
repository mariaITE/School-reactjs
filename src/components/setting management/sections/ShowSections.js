import React, {useEffect, useState,Fragment} from "react";
import axios from "axios";
/*import selectDiv from "/components/follow-up management/select_div";*/
import AddSection from "./AddSection";
import AddStudentToSection from "./AddStudentToSection";
import Swal from 'sweetalert2';

export default function ShowSections() {

const [role, setrole] = useState([]);
   useEffect(() => {
         setrole(localStorage.getItem('permission'));
    });


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

    const [Sclasses,setSclasses]=useState("الثاني");
    const handelchangeclasses=(event)=>{
    setSclasses(event.target.value);
    }

    const [Sgender,setSgender]=useState("ذكور");
    const handelchangegender=(event)=>{
    setSgender(event.target.value);
    }


    const [section,setsections]=useState([ ]);
      useEffect(()=>{
            fetchName()
            },[Sclasses,Sgender,section])

           const fetchName = async () => {
            await axios.get('http://localhost:8000/api/show_class_sections',{params:{class:Sclasses ,gender:Sgender}}).then(({data})=>{
              setsections(data)
                   });
        }
 const [active, setActive] = useState("null");
const handleAddClick=() =>{
  setActive("true");
}
const handleAddClickTwo=() =>{
  setActive("false");

}
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

       await fetch('http://localhost:8000/api/delet_section/'+section_id, {
            method: 'DELETE',
            headers: {
                 'Accept':'application/json',
                'Content-Type': 'application/json',
               'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
            },
        }).catch((e)=>{
           console.log('yyyyyyy'+e)
        })

}


//render(){
return(
               <div>
                {active === "true"  ?<AddSection /> : active === "false"  ?<AddStudentToSection /> :
  <div className="sub-con">
 <div className="da-container">
            <label className="title">عرض الشعب</label>
             {role.includes("إضافة شعبة")?
            <button className="button-search" onClick={handleAddClick}> إضافة شعبة</button>
             :null}
             {role.includes("إضافة طلاب للشعبة")?
            <button className="button-search" onClick={handleAddClickTwo} > إضافة طلاب للشعبة</button>
             :null}
            <hr></hr>
             {role.includes("عرض الشعب")?

                   <Fragment>
 <label className="lab">
                       الصف:
                        <select className="g-select"  value={Sclasses} onChange={handelchangeclasses}>
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
            <div className="table-scroll">
             <table>
               <thead>
                <tr>
                 <th> الشعبة</th>
                 <th> السعة</th>
                  <th> </th>
                  </tr>
               </thead>
                <tbody>
                  {section.map(element=>
                    <tr key={element.id}>
                    <td>{element.name}</td>
                      <td>{element.capacity}</td>
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
              <br />
                    </Fragment>
                      :null}
               </div>
   </div>  }
      </div>
)
//}

}