// src/App.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    contact_number: "",
    discipline: "Engineering",
  });

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
    ahh: "",
  });

  const backendUrl = "http://localhost:5000"; // your backend URL

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${backendUrl}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch creativity paths
  const fetchPaths = async () => {
    try {
      const res = await axios.get(`${backendUrl}/creativity-paths`);
      setPaths(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPaths();
  }, []);

  // Handle user form submit
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/users`, userForm);
      setUserForm({ name: "", email: "", contact_number: "", discipline: "Engineering" });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle creativity path form submit
  const handlePathSubmit = async (e) => {
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
        ahh: "",
      });
      fetchPaths();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App App-container">
      <h1>Creativity App</h1>

      {/* ===== Add User Form ===== */}
      <h2>Add User</h2>
      <form onSubmit={handleUserSubmit}>
        <input
          placeholder="Name"
          value={userForm.name}
          onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={userForm.email}
          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
          required
        />
        <input
          placeholder="Contact Number"
          value={userForm.contact_number}
          onChange={(e) => setUserForm({ ...userForm, contact_number: e.target.value })}
        />
        <select
          value={userForm.discipline}
          onChange={(e) => setUserForm({ ...userForm, discipline: e.target.value })}
        >
          <option>Engineering</option>
          <option>Medicine</option>
          <option>Art</option>
          <option>Business</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      {/* ===== Users List ===== */}
      <div className="users-list">
        <h2>Users List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email} - {user.discipline}
            </li>
          ))}
        </ul>
      </div>

      {/* ===== Add Creativity Path Form ===== */}
      <h2>Add Creativity Path</h2>
      <form onSubmit={handlePathSubmit}>
        <select
          value={pathForm.user_id}
          onChange={(e) => setPathForm({ ...pathForm, user_id: e.target.value })}
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <input
          placeholder="Misfit"
          value={pathForm.misfit}
          onChange={(e) => setPathForm({ ...pathForm, misfit: e.target.value })}
        />
        <input
          placeholder="Recall"
          value={pathForm.recall}
          onChange={(e) => setPathForm({ ...pathForm, recall: e.target.value })}
        />
        <input
          placeholder="Flow"
          value={pathForm.flow}
          onChange={(e) => setPathForm({ ...pathForm, flow: e.target.value })}
        />
        <input
          placeholder="Wide Path"
          value={pathForm.wide_path}
          onChange={(e) => setPathForm({ ...pathForm, wide_path: e.target.value })}
        />
        <input
          placeholder="Spark"
          value={pathForm.spark}
          onChange={(e) => setPathForm({ ...pathForm, spark: e.target.value })}
        />
        <input
          placeholder="Strategic Flow"
          value={pathForm.strategic_flow}
          onChange={(e) => setPathForm({ ...pathForm, strategic_flow: e.target.value })}
        />
        <input
          placeholder="Narrow Path"
          value={pathForm.narrow_path}
          onChange={(e) => setPathForm({ ...pathForm, narrow_path: e.target.value })}
        />
        <input
          placeholder="Bright Spark"
          value={pathForm.bright_spark}
          onChange={(e) => setPathForm({ ...pathForm, bright_spark: e.target.value })}
        />
        <input
          placeholder="Ahh!"
          value={pathForm.ahh}
          onChange={(e) => setPathForm({ ...pathForm, ahh: e.target.value })}
        />
        <button type="submit">Add Path</button>
      </form>

      {/* ===== Creativity Paths List ===== */}
      <h2>Creativity Paths List</h2>
      <table className="creativity-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Misfit</th>
            <th>Recall</th>
            <th>Flow</th>
            <th>Wide Path</th>
            <th>Spark</th>
            <th>Strategic Flow</th>
            <th>Narrow Path</th>
            <th>Bright Spark</th>
            <th>Ahh!</th>
          </tr>
        </thead>
        <tbody>
          {paths.map((path) => {
            const user = users.find((u) => u.id === path.user_id);
            return (
              <tr key={path.id}>
                <td>{user ? user.name : path.user_id}</td>
                <td>{path.misfit}</td>
                <td>{path.recall}</td>
                <td>{path.flow}</td>
                <td>{path.wide_path}</td>
                <td>{path.spark}</td>
                <td>{path.strategic_flow}</td>
                <td>{path.narrow_path}</td>
                <td>{path.bright_spark}</td>
                <td>{path.ahh}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
