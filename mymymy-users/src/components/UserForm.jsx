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
    const userDisplayName = event.target.display_name.value
    event.target.display_name.value = ''
    mutation.mutate({ display_name: userDisplayName })

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
      <h5>Create New User</h5>
      <form onSubmit={onCreate}>
        <input name='display_name' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default UserForm
