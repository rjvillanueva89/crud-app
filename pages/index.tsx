import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react';
import Layout from '../layout'
import UsersTable from '../components/table/users'

const Home: NextPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    let result = fetch(process.env.DB_URL + 'users' , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      setUsers(data);
    });

    return result;
  }

  useEffect(() => {
    if(!users.length) {
      fetchUsers();
    }
  });

  return (
    <Layout>
      <UsersTable data={users} />
    </Layout>
  )
}

export default Home