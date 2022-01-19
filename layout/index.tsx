import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div id="container" className="bg-gray-100 font-family-karla w-full min-h-screen">
      <header id="nav" className="flex">
        <div id="app-title" className="flex-none p-2">
          <h1 className="font-bold">CRUD APP</h1>
        </div>
        <div id="action" className="flex-1 text-right">
          <button className="px-3 py-2">
            <i className="fa fa-plus"></i>
          </button>
        </div>
      </header>

      <main id="content">
        {children}
      </main>
    </div>
  )
}