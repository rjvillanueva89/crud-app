import type { NextPage } from 'next'
import { useState } from 'react';
import Layout from '../layout'
import UsersTable from '../components/users/table'
import UserModal from '../components/users/modal'
import UserContext from '../components/users/context'

const Home: NextPage = () => {

  const [userModalisVisible, setUserModalVisibility] = useState(false);
  const [userModalData, setUserModalData] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ search: '', active: '' });

  const userModalActions = {
    show: function(data: any) {
      setUserModalData(data);
      setUserModalVisibility(true);
    },
    close: function() {
      setUserModalData(null);
      setUserModalVisibility(false);
    }
  }

  const userSearch = {
    setValue: function(val: any) {
      setSearch(val)
    }
  }

  const userFilter = {
    updateSearch: function(value: string) {
      let currentFilter = filter;
      setFilter({ search: value, active: currentFilter.active });
    },
    updateActive: function(value: string) {
      let currentFilter = filter;
      setFilter({ search: currentFilter.search, active: value });
    }
  }

  return (
    <UserContext.Provider value={{ modal: userModalActions, search: userSearch, filter: userFilter }}>
      <Layout>
        <UserModal isVisible={userModalisVisible} modal={userModalActions} rowData={userModalData} />
        <UsersTable search={search} filter={filter} />
      </Layout>
    </UserContext.Provider>
  )
}

export default Home