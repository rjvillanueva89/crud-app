import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import Layout from '../layout'
import UsersTable from '../components/users/table'

const Home: NextPage = () => {


  return (
    <Layout>
      <UsersTable />
    </Layout>
  )
}

export default Home