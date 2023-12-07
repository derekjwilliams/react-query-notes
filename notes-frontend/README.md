# Running

This is a super simple application. Both the mock server and client need to be run

## Mock Server

The json-server package is used to mock a server:

```npm run server```

The server runs on port 3001, so to see notes, use http://localhost:3001/notes

## Client

```npm run dev```

The client runs on port 5173, navigate to http://localhost:5173 to see the super simple client

## Some Sweet Notes on Tanstack Query

Tanstack Query's QueryKeys is a hash of strings to identify objects in the system in our example 'notes' is a key in that hash.  All verbs (GET, POST, PUT) need to use the 'notes' key.  This is used in the hook `useQuery`

See https://tanstack.com/query/v4/docs/react/guides/query-keys

## FullStackOpen github repo for these excercises, branches for each step


### Managing data on the server with the React Query library
https://github.com/fullstack-hy2020/query-notes/tree/part6-0


### Managing data on the server with the React Query library
https://github.com/fullstack-hy2020/query-notes/tree/part6-1

and

https://github.com/fullstack-hy2020/query-notes/tree/part6-2

### Optimizing the performance

https://github.com/fullstack-hy2020/query-notes/tree/part6-3

etc.

## Notes 

### Inconsistency in FullStackOpen Docs


The fullstackopen docs uses both 

```JavaScript
queryClient.invalidateQueries({ queryKey: ['notes'] })
```
and 

```JavaScript
queryClient.invalidateQueries('notes)
```
 
See: https://fullstackopen.com/en/part6/react_query_use_reducer_and_the_context#synchronizing-data-to-the-server-using-react-query

The Tanstack documetation always uses the full object, e.g. `{ queryKey: ['notes'] }`

See: https://tanstack.com/query/v4/docs/react/guides/query-invalidation

### A Bit More Explanation on How State is Updated in the UI

Two calls are made when a mutation to create a *note* is run, the POST to create a *note* and a GET to retrive all of the *notes*
Open the Browswer inspector to see this happen

From the FullStackOpen tutorial: 

"This in turn causes React Query to automatically 
update a query with the key notes, i.e. fetch the notes 
from the server. As a result, the application renders 
the up-to-date state on the server, i.e. the added note 
is also rendered."

