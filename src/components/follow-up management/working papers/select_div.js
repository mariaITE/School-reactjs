import React, {useEffect, useState} from "react";
import axios from "axios";
/*import {Link} from "react-router-dom";*/

export default function selectDiv() {

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

    const [Sclasses,setSclasses]=useState('');
    const handelchangeclasses=(event)=>{
    setSclasses(event.target.value);
    }

    const [Sgender,setSgender]=useState('');
    const handelchangegender=(event)=>{
    setSgender(event.target.value);
    }
return(
                <form className="g-form">
                    {/*onSubmit={this.handleSubmit}*/}
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
                </form>
                )
}