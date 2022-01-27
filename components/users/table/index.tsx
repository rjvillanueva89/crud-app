import { useContext } from 'react'
import { useQuery } from 'react-query'
import { getData } from '../../helpers'
import UserContext from '../context'
import Row from './row'

type Props = {
  filter: any;
  selected: any;
}

export default function Table({ filter, selected }: Props) {

  const { isLoading, error, data } = useQuery(['Users', filter], () => {
    let request = 'users';

    if(filter.search) {
      request += '?name_like=' + filter.search;
    }

    if(filter.active) {
      request += '?active=' + filter.active;
    }

    return getData(request);
  });

  const selectAll = function(event: any) {
    if(event.target.checked) {

    }
  }

  return (
    <table className="w-full bg-white text-center">
      <thead className="bg-gray-800 text-white">
        <tr className="uppercase font-semibold text-lg">
          <th className="p-4 w-1">
            <label className="select-none checkbox block relative cursor-pointer text-xl h-4 w-4">
              <input className="absolute opacity-0 left-0 top-0 cursor-pointer" type="checkbox" onClick={selectAll} />
              <span className="h-4 w-4 checkmark absolute top-0 left-0 bg-gray-400"></span>
            </label>
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
                data.map((user: any) => (
                  <Row key={user.id} data={user} isSelected={( selected.includes(user.id) )} />
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