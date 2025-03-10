import './app.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        } />
        <Route path="/home" element={
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        } />
      </Routes>
    </Router>

    </>
  )
}

export default App
