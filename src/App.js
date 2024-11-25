import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate } from "react-router-dom"; // Import Navigate

// PrivateRoute using new structure in React Router v6
const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  return user ? <AuthProvider><Dashboard /></AuthProvider> : <Login />;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* Updated Route with 'element' */}
        <Route path="/dashboard" element={<PrivateRoute/>} /> {/* Updated PrivateRoute */}
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
