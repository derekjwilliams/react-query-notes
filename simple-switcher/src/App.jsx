import * as React from 'react'
import './App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers, updateUser } from './requests'
import UserGroup from './components/UserGroup'

export default function App() {
  const queryClient = useQueryClient()

  /**
   * Mutation to update the user
   */
  const { mutate, isPending, variables } = useMutation({
    mutationFn: updateUser,
    onMutate: (variables) => {
      document.firstElementChild.setAttribute('color-scheme', variables.theme)
      /* For MyMyMy Laravel application, the following (or similar) will change the appearance:
      if (variables.theme === 'dark') {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
      }*/
    },
    //Note: if response includes a user object then use it instead of invalidateQueries (which performs a refetch)
    // See https://tanstack.com/query/latest/docs/react/guides/updates-from-mutation-responses
    onSuccess: (data) => {
      const queryData = queryClient.getQueryData(['users'])
      try {
        queryData[0].theme = data.theme
        queryClient.setQueryData(['users']), queryData
      } catch {
        queryClient.invalidateQueries({ queryKey: ['users'] }) // force refetch of data and updates UI
      }
    },
  })

  /**
   * Change the theme property of the user
   * @param {*} note
   */
  const toggleTheme = (event, user) => {
    mutate({ ...user, theme: user.theme === 'dark' ? 'light' : 'dark' })
    console.log('toggle importance of', user.id)
    const doc = document.firstElementChild
    doc.setAttribute('color-scheme', user.theme === 'dark' ? 'dark' : 'light')
  }

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
  const currentTheme = variables ? variables.theme : users[0].theme
  variables?.theme === 'light' ? 'dark' : 'light'
  return (
    <main id='main'>
      <div className='fluid-gap'>
        <div>
          <input
            type='checkbox'
            onChange={(e) => toggleTheme(e, users[0])}
            disabled={isPending}
            name='change-theme'
            className='change-theme'
            checked={currentTheme === 'dark'}
          ></input>
          <label htmlFor='change-theme' disabled={isPending}>
            dark
          </label>
        </div>
        <UserGroup users={users} />
      </div>
    </main>
  )
}
