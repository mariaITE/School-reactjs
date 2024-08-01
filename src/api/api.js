import React from "react";

import Swal from 'sweetalert2';
export  const deleteData = async (url,id) => {

    const isConfirm = await Swal.fire({
        title: 'هل أنت متأكد',
        text: "لا يمكنك التراجع عن هذا !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText:'إلغاء',
        confirmButtonText: 'نعم ,أريد المتابعة !'
    }).then((result) => {
        return result.isConfirmed
    });

    if (!isConfirm) {
        return 0;
    } else {
        await fetch(`${url}+${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Error : " + response.status)
                }
            }).then(data => {
                Swal.fire('Success', data.result, 'success')
            }).catch(e => {
                Swal.fire('Error', e.result, 'error')
            })
    }
}