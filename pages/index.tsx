import type { NextPage } from 'next'
import { useState } from 'react';
import { useQuery } from "react-query";
import Layout from '../layout'
import UsersTable from '../components/users/table'
import UserModal from '../components/users/modal'
import UserModalContext from '../components/users/modal/context'

const Home: NextPage = () => {

  const [userModal, setUserModal] = useState({ isOpen: false, data: null });
  const UserModalOptions = {
    ShowModal: function (data = null) {
      setUserModal({ isOpen: true, data: data })
    },
    HideModal: function () {
      setUserModal({ isOpen: false })
    },
    setUserModal: setUserModal
  }

  return (
    <UserModalContext.Provider value={{ options: UserModalOptions }}>
      <Layout>
        <UserModal isOpen={userModal.isOpen} data={userModal.data} options={UserModalOptions} />
        <UsersTable />
      </Layout>
    </UserModalContext.Provider>
  )
}

export default Home