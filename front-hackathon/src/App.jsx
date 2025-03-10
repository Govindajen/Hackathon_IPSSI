import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Layout from './components/Layout'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
        <Switch>
            <Route path="/" exact component={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
              } />
        </Switch>
    </Router>

    </>
  )
}

export default App
