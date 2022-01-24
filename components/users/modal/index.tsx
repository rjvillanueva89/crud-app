import { ReactNode, useContext, useState } from 'react'
import Link from 'next/link'

type Props = {
  isVisible: boolean,
  action: object
  setting: object
}

export default function Modal({ isVisible, action, setting }: Props) {

  if(!isVisible) {
    return null;
  }

  return(
    <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800/50">
      <div className="bg-white rounded-lg w-1/2">
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full">
            <div className="text-gray-900 font-medium text-lg">{setting.title}</div>
          </div>

          <div className="py-2">

          </div>

          <div className="ml-auto">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1">
              {setting.submitBtn}
            </button>
            <button className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={action.close}>
              {setting.cancelBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}