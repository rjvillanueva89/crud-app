import React, { ReactNode, useContext } from 'react'
import Link from 'next/link'
import UserContext from '../components/users/context'

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  const {
    modal,
    search
  } = useContext(UserContext);

  const searchValue = function(event: any) {
    search.setValue(event.target.value);
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
          <input type="search" className="p-4 bg-transparent flex-1 focus:border-0" placeholder="Search..." onChange={searchValue} />
          <button className="h-full px-7 bg-emerald-600 text-white" onClick={() => { modal.show() }} type="button">
            <i className="fas fa-plus"></i>
          </button>
          <button className="h-full px-7 bg-rose-700 text-white opacity-50 cursor-not-allowed">
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