function TableRows({rowsData, deleteTableRows, handleChange}) {

    return (
        rowsData.map((data, index) => {
            const {nameIllness, pharmaceutical} = data;
            return (

                <tr key={index} >
                    <td >
                        <input  type="text" value={nameIllness} autoComplete="off"  onChange={(evnt) => (handleChange(index, evnt))}
                               name="nameIllness" className={"tdinput"}/>
                    </td>
                    <td><input type="text" value={pharmaceutical}  autoComplete="off" onChange={(evnt) => (handleChange(index, evnt))}
                               name="pharmaceutical" className="tdinput"/>
                    </td>

                    <td>
                        <button className={"bi bi-x-lg delete"} onClick={() => (deleteTableRows(index))}></button>
                    </td>
                </tr>

            )
        })

    )

}

export default TableRows;