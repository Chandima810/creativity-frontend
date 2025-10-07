import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL; // e.g., https://creativity-backend.onrender.com/api

  // ===== USERS STATE =====
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    contact_number: "",
    discipline: ""
  });

  // ===== CREATIVITY PATHS STATE =====
  const [paths, setPaths] = useState([]);
  const [pathForm, setPathForm] = useState({
    user_id: "",
    misfit: "",
    recall: "",
    flow: "",
    wide_path: "",
    spark: "",
    strategic_flow: "",
    narrow_path: "",
    bright_spark: "",
    ahh: ""
  });

  // ===== FETCH USERS =====
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${backendUrl}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };

  // ===== FETCH CREATIVITY PATHS =====
  const fetchPaths = async () => {
    try {
      const res = await axios.get(`${backendUrl}/creativity-paths`);
      setPaths(res.data);
    } catch (err) {
      console.error("Error fetching paths:", err.message);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchUsers();
    fetchPaths();
  }, []);

  // ===== HANDLE FORM CHANGES =====
  const handleUserChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handlePathChange = (e) => {
    setPathForm({ ...pathForm, [e.target.name]: e.target.value });
  };

  // ===== ADD USER =====
  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/users`, userForm);
      setUserForm({ name: "", email: "", contact_number: "", discipline: "" });
      fetchUsers();
    } catch (err) {
      console.error("Error adding user:", err.message);
    }
  };

  // ===== DELETE USER =====
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${backendUrl}/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err.message);
    }
  };

  // ===== ADD CREATIVITY PATH =====
  const addPath = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/creativity-paths`, pathForm);
      setPathForm({
        user_id: "",
        misfit: "",
        recall: "",
        flow: "",
        wide_path: "",
        spark: "",
        strategic_flow: "",
        narrow_path: "",
        bright_spark: "",
        ahh: ""
      });
      fetchPaths();
    } catch (err) {
      console.error("Error adding path:", err.message);
    }
  };

  // ===== DELETE CREATIVITY PATH =====
  const deletePath = async (id) => {
    try {
      await axios.delete(`${backendUrl}/creativity-paths/${id}`);
      fetchPaths();
    } catch (err) {
      console.error("Error deleting path:", err.message);
    }
  };

  return (
    <div className="App">
      <div className="App-container">
        <h1>Creativity App</h1>

        {/* ===== USERS SECTION ===== */}
        <section className="users-section">
          <h2>Users</h2>
          <form onSubmit={addUser}>
            <input name="name" value={userForm.name} onChange={handleUserChange} placeholder="Name" required />
            <input name="email" value={userForm.email} onChange={handleUserChange} placeholder="Email" required />
            <input name="contact_number" value={userForm.contact_number} onChange={handleUserChange} placeholder="Contact Number" />
            <input name="discipline" value={userForm.discipline} onChange={handleUserChange} placeholder="Discipline" />
            <button type="submit">Add User</button>
          </form>
          <ul className="users-list">
            {users.map(user => (
              <li key={user.id}>
                {user.name} ({user.email})
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>

        {/* ===== CREATIVITY PATHS SECTION ===== */}
        <section className="paths-section">
          <h2>Creativity Paths</h2>
          <form onSubmit={addPath}>
            <input name="user_id" value={pathForm.user_id} onChange={handlePathChange} placeholder="User ID" required />
            <input name="misfit" value={pathForm.misfit} onChange={handlePathChange} placeholder="Misfit" />
            <input name="recall" value={pathForm.recall} onChange={handlePathChange} placeholder="Recall" />
            <input name="flow" value={pathForm.flow} onChange={handlePathChange} placeholder="Flow" />
            <input name="wide_path" value={pathForm.wide_path} onChange={handlePathChange} placeholder="Wide Path" />
            <input name="spark" value={pathForm.spark} onChange={handlePathChange} placeholder="Spark" />
            <input name="strategic_flow" value={pathForm.strategic_flow} onChange={handlePathChange} placeholder="Strategic Flow" />
            <input name="narrow_path" value={pathForm.narrow_path} onChange={handlePathChange} placeholder="Narrow Path" />
            <input name="bright_spark" value={pathForm.bright_spark} onChange={handlePathChange} placeholder="Bright Spark" />
            <input name="ahh" value={pathForm.ahh} onChange={handlePathChange} placeholder="Ahh" />
            <button type="submit">Add Path</button>
          </form>
          <ul className="paths-list">
            {paths.map(path => (
              <li key={path.id}>
                <strong>User ID:</strong> {path.user_id}, <strong>Misfit:</strong> {path.misfit}, <strong>Flow:</strong> {path.flow}
                <button onClick={() => deletePath(path.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default App;
