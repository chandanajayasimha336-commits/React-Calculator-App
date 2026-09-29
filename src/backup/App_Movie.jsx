import React, { useState, useEffect } from "react";
import Login from "./mlog/Login";
import Movie from "./mlog/Movie";

export default function App() {
  const [user, setUser] = useState(null);

  // Load saved user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("mlog_active_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("mlog_active_user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("mlog_active_user");
  };

  // Switch between Login and Movie components based on auth status
  return (
    <>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Movie user={user} onLogout={handleLogout} />
      )}
    </>
  );
}