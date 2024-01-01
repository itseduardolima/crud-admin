
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Layout from './components/Layout'

const queryClient = new QueryClient()


export const App = () => {
  return (

    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>

  )
}