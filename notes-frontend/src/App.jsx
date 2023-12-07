import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote } from './requests'


const App = () => {

  const queryClient = useQueryClient()

  /**
   * Note: The fullstackopen docs uses both 
   *    queryClient.invalidateQueries({ queryKey: ['notes'] }) 
   *  and 
   *    queryClient.invalidateQueries('notes)
   * 
   * See: https://fullstackopen.com/en/part6/react_query_use_reducer_and_the_context#synchronizing-data-to-the-server-using-react-query
   * 
   * The Tanstack documetation always uses the full object, e.g. { queryKey: ['notes'] }
   * See: https://tanstack.com/query/v4/docs/react/guides/query-invalidation
   * 
   * Two calls are made when a mutation is run, the POST to create a note and a GET to retrive all of the notes
   * Open the Browswer inspector to see this happen
   * 
   * From the FullStackOpen tutorial: 
   * 
   * "This in turn causes React Query to automatically 
   * update a query with the key notes, i.e. fetch the notes 
   * from the server. As a result, the application renders 
   * the up-to-date state on the server, i.e. the added note 
   * is also rendered."
   */

  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  })

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important: !note.important })
    console.log('toggle importance of', note.id)
  }

  /**
   * Retrieve the notes
   */
  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes
  })

//  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const notes = result.data

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content}
          <strong> {note.important ? 'important' : 'not important'}</strong>
        </li>
      )}
    </div>
  )
}

export default App