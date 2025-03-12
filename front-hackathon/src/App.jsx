import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Authentication from "./pages/Authentication";

import ProtectedRoutes from "./components/ProtectedRoutes";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Authentication />} />
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
        <Route path="/profil" element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
          } />
        <Route path="/profil/:userId" element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
          } />
      </Routes>
    </Router>
  );
};

export default App;
