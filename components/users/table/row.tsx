import React, { ReactNode, useContext } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import UserContext from '../context'
import { deleteData, Toast } from '../../helpers'
import Swal from 'sweetalert2'

type Props = {
  data: object;
  message: string;
}

export default function Row({ data, message }: Props) {

  if(data) {
    const queryClient = useQueryClient();

    const {
      modal
    } = useContext(UserContext);

    const editRow = function() {
      modal.show(data);
    }

    const deleteUser = useMutation((id: number) =>
      deleteData('users/' + id), {
        onSuccess: () => {
          // update Users table
          queryClient.invalidateQueries('Users');

          Toast.fire({
            title: 'User deleted successfully'
          });
        }
      }
    )

    const onDelete = function() {
      Swal.fire({
          html: 'Are you sure you want to Delete <b>' + data.name + '</b>?',
          icon: 'warning',
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            deleteUser.mutate(data.id);
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
        <td className="py-3 px-4">{data.name}</td>
        <td className="py-3 px-4">{data.category}</td>
        <td className="py-3 px-4">{data.active ? 'active' : 'inactive'}</td>
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
      <td className="py-3 px-4" colSpan="5">{message}</td>
    </tr>
  )
}