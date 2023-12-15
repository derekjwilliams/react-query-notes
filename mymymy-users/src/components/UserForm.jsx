import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createUser } from '../requests'
import toast, { Toaster } from 'react-hot-toast'

const UserForm = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      toast(`User: "${data.display_name}" Created`)
      queryClient.invalidateQueries({ queryKey: ['users'] }) // magic here :)
    },
    onError: (e) => {
      toast(`User was not created: ${e.response.data.error}`)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const userDisplayName = event.target.display_name.value
    event.target.display_name.value = ''
    mutation.mutate({ display_name: userDisplayName })
  }

  return (
    <div>
      <Toaster />
      <h5>Create New User</h5>
      <form onSubmit={onCreate}>
        <input name='display_name' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default UserForm
