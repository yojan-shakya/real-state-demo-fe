import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { NuqsAdapter } from "nuqs/adapters/react"
import { ThemeProvider } from "@/features/core/providers/theme-provider.tsx"
import { AuthProvider, ErrorBoundary } from "./features/core/index.ts"
import { toast } from "sonner"
import { Toaster } from "./features/core/components"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query?.meta?.errorMessage) {
        toast.error(query?.meta?.errorMessage as string)
      }
      throw error
    },
  }),
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <NuqsAdapter>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </ThemeProvider>
        </NuqsAdapter>
        <Toaster />
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
)
