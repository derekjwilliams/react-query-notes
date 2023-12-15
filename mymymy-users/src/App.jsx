import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers, updateUser } from './requests'
import UserForm from './components/UserForm'
import UserGroup from './components/UserGroup'

import './styles/globals.css'
import './App.css'

const App = () => {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    retry: false,
  })

  if (query.isLoading) {
    return <div>loading data...</div>
  }

  if (query.isError) {
    return <div>User service not available due to problems in server</div>
  }

  const users = query.data

  return (
    <div>
      <h3>User app</h3>
      <UserForm />
      <UserGroup users={users} />
    </div>
  )
}

export default App
