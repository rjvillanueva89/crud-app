import React, { ReactNode, useContext } from 'react'
import { useQueryClient } from 'react-query'
import UserContext from '../context'
import { deleteData, Toast } from '../../helpers'
import Swal from 'sweetalert2'

export default function Row({ ...Props }) {

  if(Props.data) {
    const queryClient = useQueryClient();

    const {
      modal
    } = useContext(UserContext);

    const editRow = function() {
      modal.show(Props.data);
    }

    const onDelete = function() {
      Swal.fire({
        html: 'Are you sure you want to Delete <b>' + Props.data.name + '</b>?',
        icon: 'warning',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          deleteData('users/' + Props.data.id)
            .then(response => response.json())
            .then(function(data) {
              // update Users table
              queryClient.invalidateQueries('Users');

              // hide modal
              modal.close();

              Toast.fire({
                title: 'User deleted successfully'
              });
            })
        }
      });
    }

    return (
      <tr className="even:bg-slate-100">
        <td className="py-3 px-4">
          <button className="selectRow">
            <i className="far fa-square"></i>
          </button>
        </td>
        <td className="py-3 px-4">{Props.data.name}</td>
        <td className="py-3 px-4">{Props.data.category}</td>
        <td className="py-3 px-4">{Props.data.active ? 'active' : 'inactive'}</td>
        <td className="py-3 px-4 flex">
          <button className="h-full px-4 py-2 text-emerald-600" type="button" onClick={editRow}>
            <i className="fas fa-edit"></i>
          </button>
          <button className="h-full px-4 py-2 text-rose-700" type="button" onClick={onDelete}>
            <i className="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    )
  }


  return (
    <tr>
      <td className="py-3 px-4" colSpan="5">{Props.message}</td>
    </tr>
  )
}