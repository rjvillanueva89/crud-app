import type { NextPage } from 'next'
import { useState } from 'react';
import Layout from '../layout'
import UsersTable from '../components/users/table'
import UserModal from '../components/users/modal'
import UserContext from '../components/users/context'

const Home: NextPage = () => {

  const [userModalisVisible, setUserModalVisibility] = useState(false);
  const [userModalData, setUserModalData] = useState(null);
  const [filter, setFilter] = useState({ search: '', active: '' });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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

  const userSelect = {
    add: function(id: number) {
      setSelectedRows(prevState => {
        return [...prevState, id];
      });
    },
    remove: function(id: number) {
      setSelectedRows(selectedRows.filter(userID => userID != id));
    },
    clear: function() {
      setSelectedRows([]);
    },
    get: function() {
      return selectedRows;
    }
  }

  return (
    <UserContext.Provider value={{ modal: userModalActions, filter: userFilter, select: userSelect }}>
      <Layout>
        <UserModal isVisible={userModalisVisible} modal={userModalActions} rowData={userModalData} />
        <UsersTable filter={filter} selected={selectedRows} />
      </Layout>
    </UserContext.Provider>
  )
}

export default Home