import { useQuery } from 'react-query'
import Row from './row'

export default function Table() {
  const { isLoading, error, data } = useQuery('fetchUsers', () =>
    fetch(process.env.DB_URL + 'users')
      .then(response => response.json())
  )

  return (
    <table className="w-full bg-white text-center">
      <thead className="bg-gray-800 text-white">
        <tr className="uppercase font-semibold text-lg">
          <th className="p-4 w-1">
            <button className="selectAll">
              <i className="far fa-square"></i>
            </button>
          </th>
          <th className="p-4">Name</th>
          <th className="p-4">Category</th>
          <th className="p-4">Active</th>
          <th className="p-4 w-3">Options</th>
        </tr>
      </thead>
      <tbody className="text-gray-700">
        { isLoading ? (
          <Row message="Loading users..." />
        ) : (
          <>
            {
              // check if there's any users returned
              data.length ? (
                // loop through user data
                data.map((user) => (
                  <Row key={user.id} data={user} />
                ))
              ) : (
                <Row message="No users found..." />
              )
            }
          </>
        )}

      </tbody>
    </table>
  )
}