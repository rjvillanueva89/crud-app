import { ReactNode, useContext, useState, useEffect } from 'react'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { useForm, SubmitHandler } from "react-hook-form";
import { getData, postData, putData, deleteData, Toast } from '../../helpers'
import Swal from 'sweetalert2'

type Props = {
  isVisible: boolean,
  action: object
  rowData?: object | undefined
}

type FormData = {
  name: string;
  description: string;
  category: string;
  active: boolean;
};

export default function Modal({ isVisible, action, rowData }: Props) {

  const { isLoading, error, data } = useQuery('Category', () =>
    getData('category'),
    { staleTime: Infinity }
  )

  const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const queryClient = useQueryClient();
  const submitForm = useMutation((userData: object) =>
    postData('users', userData), {
      onSuccess: () => {
        // update Users table
        queryClient.invalidateQueries('Users');

        // hide modal
        action.close();

        Toast.fire({
          title: 'User created successfully'
        });
      }
    }
  )

  const onSubmit = handleSubmit(data => {
    submitForm.mutate(data);

    reset();
  });

  if(!isVisible) {
    return null;
  }

  return(
    <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800/50">
      <div className="bg-white rounded-lg w-1/2">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col items-start p-4">
            <div className="flex items-center w-full mb-4">
              <div className="text-gray-900 font-medium text-lg">Create New User</div>
            </div>

            <div className="py-2 w-full">
              <div className="flex flex-wrap mb-3">
                <div className="relative w-full appearance-none label-floating">
                  <input className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text" placeholder="Name" { ...register('name', { required: true }) } />
                </div>
              </div>

              <div className="flex flex-wrap mb-3">
                <div className="relative w-full appearance-none label-floating">
                  <textarea className="autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" id="description" type="text" placeholder="Description" { ...register('description') }></textarea>
                </div>
              </div>

              <div className="flex flex-wrap mb-3">
                <div className="relative w-full appearance-none label-floating">
                  <select id="category" className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500" { ...register('category', { required: true }) }>
                    {
                      isLoading ? (
                        <option value="">Loading categories...</option>
                      ) : (
                        <>
                          <option value="">Select category</option>
                          {
                            data.map((category) => (
                               <option key={category.text} value={category.text}>{category.text}</option>
                            ))
                          }
                        </>
                      )
                    }
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap mb-3">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" id="active" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" { ...register('active') } />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <label className="text-gray-700">Active</label>
              </div>
            </div>

            <div className="ml-auto">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1" type="submit">
                Create
              </button>
              <button className="bg-transparent hover:bg-gray-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={action.close} type="button">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}