import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";



const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
  <div className="container">
    <a className="navbar-brand" href="/" style={{ fontSize: "1.8rem", fontWeight: "700", color: "#333" }}>RBAC App</a>

    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        {user && user.role === "admin" && (
          <li className="nav-item mx-2">
            <a className="nav-link text-dark" href="/admin" style={{ fontSize: "1.1rem", fontWeight: "500" }}>Admin</a>
          </li>
        )}
        {user && (
          <li className="nav-item mx-2">
            <a className="nav-link text-dark" href="/dashboard" style={{ fontSize: "1.1rem", fontWeight: "500" }}>Dashboard</a>
          </li>
        )}
      </ul>

      <div className="ml-auto">
        {user ? (
          <button className="btn btn-outline-danger px-4 py-2" onClick={logout} style={{ fontSize: "1.1rem", fontWeight: "600" }}>
            Logout
          </button>
        ) : (
          <a className="btn btn-primary px-4 py-2" href="/login" style={{ fontSize: "1.1rem", fontWeight: "600" }}>
            Login
          </a>
        )}
      </div>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
