// src/App.tsx

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { logoutUser } from "./services/authService";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  async function handleLogout() {
    await logoutUser();
  }

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-info shadow-sm border-bottom border-1 border-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            📝 Task Tracker
          </Link>

          <div className="d-flex align-items-center gap-3">
            {currentUser ? (
              <>
                <span className="text-white small"> Hello {currentUser.email} </span>

                <Link className="btn btn-outline-light btn-sm" to="/tasks">
                  My Tasks
                </Link>

                <button className="btn btn-light btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light btn-sm" to="/login">
                  Login
                </Link>
                <Link className="btn btn-light btn-sm" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} />
        <Route path="/edit/:id" element={<EditTask />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
