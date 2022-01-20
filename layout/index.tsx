import React, { ReactNode } from 'react'
import Link from 'next/link'

type Props = {
  children?: ReactNode
}

export default function Layout({ children }: Props) {
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
        <div id="action" className="flex flex-1 justify-end">
          <button className="h-full px-7 bg-emerald-600 text-white">
            <i className="fas fa-plus"></i>
          </button>
          <button className="h-full px-7 bg-emerald-600 text-white opacity-50 cursor-not-allowed">
            <i className="fas fa-edit"></i>
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