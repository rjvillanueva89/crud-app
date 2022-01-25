import type { NextPage } from 'next'
import { useState } from 'react';
import { useQuery } from "react-query";
import Layout from '../layout'
import UsersTable from '../components/users/table'
import UserModal from '../components/users/modal'
import UserModalContext from '../components/users/modal/context'

const Home: NextPage = () => {

  const [userModalisVisible, setUserModalVisibility] = useState(false);
  const [userModalData, setUserModalData] = useState({});

  const userModalActions = {
    show: function(data = null) {
      if(data) {
        setUserModalData(data);
      }

      setUserModalVisibility(true);
    },
    close: function() {
      setUserModalData({});
      setUserModalVisibility(false);
    }
  }

  return (
    <UserModalContext.Provider value={{ action: userModalActions }}>
      <Layout>
        <UserModal isVisible={userModalisVisible} action={userModalActions} rowData={userModalData} />
        <UsersTable />
      </Layout>
    </UserModalContext.Provider>
  )
}

export default Home