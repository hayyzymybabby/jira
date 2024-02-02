import './App.css'
import { useAuth } from 'context/auth-context'
import { AuthenticatedApp } from 'authenticated-app'
import { UnauthenticatedApp } from 'unauthenticated-app'
import { ErrorBoundary } from 'components/error-boundary'
import { FullPageErrorFallback } from 'components/lib'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <Router>
        <ErrorBoundary fallbackRender={FullPageErrorFallback}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </ErrorBoundary>
      </Router>
    </div>
  )
}

export default App
