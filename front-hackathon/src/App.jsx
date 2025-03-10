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
        <Route path="/profile" element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
          } />
      </Routes>
    </Router>
  );
};

export default App;
