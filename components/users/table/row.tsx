import React, { ReactNode, useContext } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import UserContext from '../context'
import { deleteData, Toast } from '../../helpers'
import Swal from 'sweetalert2'

type Props = {
  data?: any;
  message?: string;
  isSelected?: boolean;
}

export default function Row({ data, message, isSelected }: Props) {

  if(data) {
    const {
      select,
      modal
    } = useContext(UserContext);

    const queryClient = useQueryClient();

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

    const selectRow = function(event: any) {
      if(event.target.checked) {
        select.add(data.id);
      } else {
        select.remove(data.id);
      }
    }

    return (
      <tr className="even:bg-slate-100">
        <td className="py-3 px-4">
          <label className="select-none checkbox block relative cursor-pointer text-xl h-4 w-4">
            <input className="absolute opacity-0 left-0 top-0 cursor-pointer" type="checkbox" checked={isSelected} onChange={selectRow} />
            <span className="h-4 w-4 checkmark absolute top-0 left-0 bg-gray-400"></span>
          </label>
        </td>
        <td className="py-3 px-4">{data.name}</td>
        <td className="py-3 px-4">{data.category}</td>
        <td className="py-3 px-4"><span className={`text-sm font-medium py-1 px-2 align-middle ${data.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{data.active ? 'active' : 'inactive'}</span></td>
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
      <td className="py-3 px-4" colSpan={5}>{message}</td>
    </tr>
  )
}