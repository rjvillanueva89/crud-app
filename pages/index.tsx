import type { NextPage } from 'next'
import { useState } from 'react';
import { useQuery } from "react-query";
import Layout from '../layout'
import UsersTable from '../components/users/table'
import UserModal from '../components/users/modal'
import UserModalContext from '../components/users/modal/context'

const Home: NextPage = () => {

  const [userModalisVisible, setUserModalVisibility] = useState(false);
  const [userModalData, setUserModalData] = useState({ data: null });

  const userModalActions = {
    show: function() {
      setUserModalVisibility(true);
    },
    close: function() {
      setUserModalVisibility(false);
    },
    setData: function(options) {
      setUserModalData(options);
    }
  }

  const userModalSetting = {
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

  const UserModalOptions = {
    do: userModalActions
  }

  return (
    <UserModalContext.Provider value={{ action: UserModalOptions, setting: userModalSetting }}>
      <Layout>
        <UserModal isVisible={userModalisVisible} action={userModalActions} setting={userModalSetting} data={userModalData} />
        <UsersTable />
      </Layout>
    </UserModalContext.Provider>
  )
}

export default Home