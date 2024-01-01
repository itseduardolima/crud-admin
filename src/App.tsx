
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AppRoutes } from './routes'

const queryClient = new QueryClient()


export const App = () => {
  return (

    <QueryClientProvider client={queryClient}>
      < AppRoutes />
    </QueryClientProvider>

  )
}