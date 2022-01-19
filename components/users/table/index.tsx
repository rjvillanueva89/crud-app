import { useQuery } from 'react-query'
import Row from './row'

export default function Table(Props) {
  const { isLoading, error, data } = useQuery('fetchUsers', () =>
    fetch(process.env.DB_URL + 'users')
      .then(response => response.json())
  )

  return (
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
      <tbody className="text-gray-700">
        { isLoading ? (
          <Row empty="true" message="Loading users..." />
        ) : (
          <>
            {
              data.length ? (
                data.map((user) => (
                  <Row key={user.id} data={user} />
                ))
              ) : (
                <Row empty="true" message="No users found..." />
              )
            }
          </>
        )}

      </tbody>
    </table>
  )
}