import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationContext'

import App from './App'

const queryClient = new QueryClient()
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>,
)
