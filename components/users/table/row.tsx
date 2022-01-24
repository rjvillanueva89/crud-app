import React, { ReactNode, useContext } from 'react'
import UserModalContext from '../modal/context'

export default function Row({ ...Props }) {

  if(Props.data) {
    const {
      options: options
    } = useContext(UserModalContext);

    const editRow = function() {
      options.ShowModal(Props.data);
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
          <button className="h-full px-4 py-2 text-emerald-600" onClick={editRow}>
            <i className="fas fa-edit"></i>
          </button>
          <button className="h-full px-4 py-2 text-rose-700">
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