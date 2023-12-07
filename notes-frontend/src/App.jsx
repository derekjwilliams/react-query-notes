import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote } from './requests'


const App = () => {

  const queryClient = useQueryClient()

  /**
   * Mutation to create a new note, e.g. makes a POST request (see request -> createNote)
   */
  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    }
  })

  /**
   * Mutation to update the note, e.g. makes a PUT request (see request -> updateNote)
   */
  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  /**
   * Add a new note
   * @param {*} event The event is from clicking 'add' in the form, which
   * in turn calls this function.  The string on the note input is used for
   * the 'content' property of the note, i.e. the input html element with 
   * the name attribute of 'note', which is accessed: as 'event.target.note.value'
   * that input is immeditely cleared then the newNoteMutation is called
   */
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }

  /**
   * Change the important property of the note
   * @param {*} note 
   */
  const toggleImportance = (note) => {
    updateNoteMutation.mutate({ ...note, important: !note.important })
    console.log('toggle importance of', note.id)
  }

  /**
   * Retrieve the notes
   */
  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes
  })

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


