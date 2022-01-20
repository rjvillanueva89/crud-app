import React, { ReactNode, createContext, useContext, useState } from 'react'
import Link from 'next/link'

type Props = {
  // children?: ReactNode,
  isOpen: boolean,
  data?: object
}

// const UserModalContext = createContext({} as any);

export default function Modal({ isOpen, data }: Props) {
  // const {
  //   setUserModal
  // } = useContext(UserModalContext);

  if(!isOpen) {
    return null;
  }

  return(
    <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800/50">
      <div className="bg-white rounded-lg w-1/2">
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full">
            <div className="text-gray-900 font-medium text-lg">My modal title</div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                <p>
                  <label className="bg-white text-gray-600 px-1">First name *</label>
                </p>
              </div>
              <p>
                <input id="name" type="text" className="py-1 px-1 text-gray-900 outline-none block h-full w-full" />
              </p>
            </div>
            <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                <p>
                  <label className="bg-white text-gray-600 px-1">Last name *</label>
                </p>
              </div>
              <p>
                <input id="lastname" type="text" className="py-1 px-1 outline-none block h-full w-full" />
              </p>
            </div>
            <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                <p>
                  <label className="bg-white text-gray-600 px-1">Username *</label>
                </p>
              </div>
              <p>
                <input id="username" type="text" className="py-1 px-1 outline-none block h-full w-full" />
              </p>
            </div>
            <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                <p>
                  <label className="bg-white text-gray-600 px-1">Password *</label>
                </p>
              </div>
              <p>
                <input id="password" type="password" className="py-1 px-1 outline-none block h-full w-full" />
              </p>
            </div>
          </div>
          <div className="border-t mt-6 pt-3">
            <button className="rounded text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner hover:bg-blue-700 transition-all duration-300">
              Save
            </button>
          </div>
        </div>

          <div className="ml-auto">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Agree
            </button>
            <button className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}