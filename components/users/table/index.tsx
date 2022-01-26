import { useContext } from 'react'
import { useQuery } from 'react-query'
import { getData } from '../../helpers'
import UserContext from '../context'
import Row from './row'

type Props = {
  search: string
}

export default function Table({ search }: Props) {
  const {
    action
  } = useContext(UserContext);

  const { isLoading, error, data } = useQuery(['Users', search], () => {
    return getData('users?name_like=' + search);
  })

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