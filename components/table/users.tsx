type Props = {
  data: []
}

const Users = (Props) => (
    <table className="w-full bg-white text-center">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="py-3 px-4 uppercase font-semibold text-sm w-1"><i className="fa fa-square"></i></th>
          <th className="py-3 px-4 uppercase font-semibold text-sm">Name</th>
          <th className="py-3 px-4 uppercase font-semibold text-sm">Category</th>
          <th className="py-3 px-4 uppercase font-semibold text-sm">Active</th>
          <th className="py-3 px-4 uppercase font-semibold text-sm w-3">Options</th>
        </tr>
      </thead>
      { !Props.data.length ? (
        <tbody className="text-gray-700">
          <tr>
            <td className="py-3 px-4" colSpan="5">Currently there are no users in the database!</td>
          </tr>
        </tbody>
      ) : (
        <tbody className="text-gray-700">
          { Props.data.map((users) => (
            <tr key={users.id}>
              <td className="py-3 px-4"><i className="fa fa-square"></i></td>
              <td className="py-3 px-4">{users.name}</td>
              <td className="py-3 px-4">{users.category}</td>
              <td className="py-3 px-4">{users.active ? 'active' : 'inactive'}</td>
              <td className="py-3 px-4">{users.id}</td>
            </tr>
          ))}
        </tbody>
      )}
    </table>
)

export default Users