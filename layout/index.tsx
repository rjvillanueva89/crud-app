import React, { ReactNode, useContext } from 'react'
import { useQuery, useQueries, useQueryClient } from 'react-query'
import Link from 'next/link'
import UserContext from '../components/users/context'
import Swal from 'sweetalert2'
import { deleteData, Toast } from '../components/helpers'

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  const {
    modal,
    filter,
    select
  } = useContext(UserContext);

  const queryClient = useQueryClient();

  const searchFilter = function(event: any) {
    filter.updateSearch(event.target.value);
  }

  const activeFilter = function(event: any) {
    filter.updateActive(event.target.value);
  }

  const bulkDelete = function() {
    Swal.fire({
        html: 'Are you sure you want to Delete <b>Selected</b> Users?',
        icon: 'warning',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          // note: map userIDs to generate each query for useQueries
          // source: https://blog.johnnyreilly.com/2021/01/03/strongly-typing-react-query-s-usequeries/
          // let userIDs = select.get();
          // const deleteUsers = useQueries(
          //   userIDs.map((userID: number) => {
          //     return {
          //       queryKey: ['deleteUser', userID],
          //       queryFn: () => fetch('users/' + userID, { method: 'DELETE' })
          //     }
          //   })
          // );

          let userIDs = select.get(), lastIndex = userIDs.length - 1;
          userIDs.map((userID: number, index: number) => {
            deleteData('users/' + userID).then(result => {
              if(!result.ok) {
                console.log('something happened');
              }

              // assume everything gets deleted
              if(index == lastIndex) {
                queryClient.invalidateQueries('Users');

                select.clear();

                Toast.fire({
                  title: 'Selected users deleted successfully.'
                });
              }
            });
          });
        }
      });
  }

  return (
    <div id="container" className="bg-gray-100 font-family-karla w-full min-h-screen">
      <header id="nav" className="flex">
        <div id="app-title" className="flex-none">
          <Link href="/">
            <a className="px-8 py-4 block text-2xl font-bold bg-slate-700 text-white hover:bg-slate-800">
              <h1>CRUD APP</h1>
            </a>
          </Link>
        </div>
        <div id="action" className="flex flex-1 justify-end overflow-hidden">
          <div className="flex w-full">
            <input type="search" className="p-4 bg-transparent flex-1 focus:border-0" placeholder="Search..." onChange={searchFilter} />
            <select className="p-4 bg-gray-800 text-white" onChange={activeFilter}>
              <option value="">Filter</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <button className="h-full px-7 bg-emerald-600 text-white" onClick={() => { modal.show(null) }} type="button">
            <i className="fas fa-plus"></i>
          </button>
          <button className={`h-full px-7 bg-rose-700 text-white ${!select.get().length ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={bulkDelete}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </header>

      <main id="content">
        {children}
      </main>
    </div>
  )
}