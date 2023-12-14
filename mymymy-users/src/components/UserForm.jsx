import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const UserForm = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }) // magic here :)
    },
    onError: (e) => {
      notificationDispatch({
        type: 'SHOW',
        message: `Error creating user: ${e.response.data.error}`,
      })
      setTimeout(() => {
        notificationDispatch({ type: 'HIDE' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const userDisplayName = event.target.user.value
    event.target.user.value = ''
    mutation.mutate({ display_name: userDisplayName, votes: 0 })

    notificationDispatch({
      type: 'SHOW',
      message: `Create New User: ${userDisplayName}`,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'HIDE' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='user' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default UserForm
