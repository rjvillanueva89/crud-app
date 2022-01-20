import type { NextPage } from 'next'
import { createContext, useState } from 'react';
import { useQuery } from "react-query";
import Layout from '../layout'
import UsersTable from '../components/users/table'
import UserModal from '../components/users/modal'

export const UserModalContext = createContext({} as any);

const Home: NextPage = () => {

  const [userModal, setUserModal] = useState({ isOpen: false });

  const ShowModal = function () { setUserModal({ isOpen: true }) }
  const HideModal = function () { setUserModal({ isOpen: false }) }

  return (
    <UserModalContext.Provider value={{ ShowModal, HideModal }}>
      <Layout>
        <UserModal isOpen={userModal.isOpen} />
        <UsersTable />
        <button onClick={ShowModal}>Click</button>
      </Layout>
    </UserModalContext.Provider>
  )
}

export default Home