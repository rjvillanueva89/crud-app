import { ReactNode, useContext, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import Link from 'next/link'

type Props = {
  isVisible: boolean,
  action: object
  rowData?: object
}

type Inputs = {
  name: string;
  description: string;
  category: string;
  active: boolean;
};

export default function Modal({ isVisible, action, rowData }: Props) {

  if(!isVisible) {
    return null;
  }

  const Labels = {
    add: {
      title: 'Add New Record',
      submitBtn: 'Add',
      cancelBtn: 'Cancel'
    },
    edit: {
      title: 'Edit Record',
      submitBtn: 'Update',
      cancelBtn: 'Cancel'
    }
  }
  const useLabel = (rowData.id == undefined) ? Labels.add : Labels.edit;

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  if(rowData.id) {
    setValue('id', rowData.id);
    setValue('name', rowData.name);
    setValue('description', rowData.description);
    setValue('category', rowData.category);
    setValue('active', rowData.active);
  }

  return(
    <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800/50">
      <div className="bg-white rounded-lg w-1/2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            rowData.id != undefined && (
              <input type="hidden" {...register('id')} />
            )
          }

          <div className="flex flex-col items-start p-4">
            <div className="flex items-center w-full mb-4">
              <div className="text-gray-900 font-medium text-lg">{useLabel.title}</div>
            </div>

            <div className="py-2 w-full">
              <div className="flex flex-wrap mb-3">
                <div className="relative w-full appearance-none label-floating">
                  <input className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text" placeholder="Name" {...register('name', { required: true })} />
                </div>
              </div>

              <div className="flex flex-wrap mb-3">
                <div className="relative w-full appearance-none label-floating">
                  <textarea className="autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" id="description" type="text" placeholder="Description..." {...register('description')}></textarea>
                </div>
              </div>

              <div className="flex flex-wrap mb-3">
                <div className="relative w-full appearance-none label-floating">
                  <select id="category" className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" {...register('category', { required: true })}>
                    <option value="">Select category</option>
                    <option value="admin">admin</option>
                    <option value="accounting">accounting</option>
                    <option value="support">support</option>
                    <option value="employee">employee</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap mb-3">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" id="active" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" {...register('active')} />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <label className="text-gray-700">Active</label>
              </div>
            </div>

            <div className="ml-auto">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1" type="submit">
                {useLabel.submitBtn}
              </button>
              <button className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={action.close} type="button">
                {useLabel.cancelBtn}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}