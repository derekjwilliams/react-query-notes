import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers, updateUser } from './requests'

import UserForm from './components/UserForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const result = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    retry: false,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>User service not available due to problems in server</div>
  }

  const Users = result.data

  const handleVote = (User) => {
    updateUserMutation.mutate({ ...User, votes: User.votes + 1 })
    notificationDispatch({
      type: 'SHOW',
      message: `Upvoted: ${User.display_name}`,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'HIDE' })
    }, 5000)
  }

  return (
    <div>
      <h3>User app</h3>

      <Notification />
      <UserForm />

      {Users &&
        Users.map((user) => (
          <div key={user.id}>
            <div>{user.display_name}</div>
            <div>
              has {user.votes}
              <button onClick={() => handleVote(user)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default App
