import React, {useState} from "react";

function TableRows({jobs, deleteTableRows, handleChange}) {
    return (
        jobs.map((job, index) => {
            const {workPlace, work, classesStudied, duration} = job
            return (
                <tr key={index}>
                    <td>
                        <input type="text" value={workPlace} onChange={(event) => (handleChange(index, event))}
                               autoComplete={"off"}  name="workPlace" className="form-control"/>
                    </td>
                    <td>
                        <input type="text" value={work} onChange={(event) => (handleChange(index, event))}
                           autoComplete={"off"}    name="work" className="form-control"/>
                    </td>
                    <td><input type="text" value={classesStudied} onChange={(event) => (handleChange(index, event))}
                               autoComplete={"off"}  name="classesStudied"
                               className="form-control"/>
                    </td>
                    <td><input type="text" value={duration} onChange={(event) => (handleChange(index, event))}
                               autoComplete={"off"} name="duration"
                               className="form-control"/>
                    </td>
                    <td>
                        <button className={"bi bi-x-lg delete"} onClick={() => (deleteTableRows(index))}> </button>
                    </td>
                </tr>
            )
        })
    )
}

export default TableRows;