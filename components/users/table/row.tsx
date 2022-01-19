export default function Row({ ...Props }) {
  if(Props.data) {
    return (
      <tr>
        <td className="py-3 px-4"><i className="fa fa-square"></i></td>
        <td className="py-3 px-4">{Props.data.name}</td>
        <td className="py-3 px-4">{Props.data.category}</td>
        <td className="py-3 px-4">{Props.data.active ? 'active' : 'inactive'}</td>
        <td className="py-3 px-4">{Props.data.id}</td>
      </tr>
    )
  }

  if(Props.empty) {
    return (
      <tr>
        <td className="py-3 px-4" colSpan="5">{Props.message}</td>
      </tr>
    )
  }
}