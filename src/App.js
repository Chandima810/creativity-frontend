import React, { useState, useEffect } from "react"; 
import axios from "axios";
import logo from "./assets/logo.png";
import supportiveDoc from "./assets/Creativity_Brain Pathways.pdf"; // <-- Added PDF import
import "./App.css";

function App() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL; // e.g., https://creativity-backend.onrender.com/api

  // ===== ADMIN PASSWORD =====
  const ADMIN_PASSWORD = "admin123"; // You can change this
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  // ===== USERS STATE =====
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    contact_number: "",
    discipline: "",
  });
  const [newlyAddedUsers, setNewlyAddedUsers] = useState([]);

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
    ahh: "",
  });
  const [newlyAddedPaths, setNewlyAddedPaths] = useState([]);

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

  useEffect(() => {
    fetchUsers();
    fetchPaths();
  }, []);

  // ===== HANDLE FORM CHANGES =====
  const handleUserChange = (e) => setUserForm({ ...userForm, [e.target.name]: e.target.value });
  const handlePathChange = (e) => setPathForm({ ...pathForm, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // ===== LOGIN & LOGOUT =====
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setPassword("");
    } else {
      alert("Incorrect password!");
    }
  };
  const handleLogout = () => setIsAdmin(false);

  // ===== ADD USER =====
  const addUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/users`, userForm);
      setUserForm({ name: "", email: "", contact_number: "", discipline: "" });
      setNewlyAddedUsers((prev) => [...prev, res.data]);
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
      const res = await axios.post(`${backendUrl}/creativity-paths`, pathForm);
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
      setNewlyAddedPaths((prev) => [...prev, res.data]);
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

  // ===== CLEAR MY ADDED ENTRIES =====
  const clearMyEntries = async () => {
    for (let u of newlyAddedUsers) await axios.delete(`${backendUrl}/users/${u.id}`);
    setNewlyAddedUsers([]);
    fetchUsers();

    for (let p of newlyAddedPaths) await axios.delete(`${backendUrl}/creativity-paths/${p.id}`);
    setNewlyAddedPaths([]);
    fetchPaths();
  };

  return (
    <div className="App">
      <div className="App-container">
        {/* Logo */}
        <div className="logo-container">
          <img src={logo} alt="App Logo" className="app-logo" />
        </div>

        <h1>Creativity App</h1>

        {/* ===== ADMIN LOGIN ===== */}
        {!isAdmin && (
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={handlePasswordChange}
              style={{ marginRight: "8px", padding: "5px" }}
            />
            <button onClick={handleLogin}>Login as Admin</button>
          </div>
        )}

        {isAdmin && (
          <div style={{ textAlign: "center", marginBottom: "15px", fontWeight: "bold" }}>
            Admin Mode Active
            <button onClick={handleLogout} style={{ marginLeft: "10px", padding: "5px 10px" }}>
              Logout
            </button>
          </div>
        )}

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

          <button onClick={clearMyEntries} style={{ marginBottom: "8px" }}>Clear My Added Entries</button>
          <p style={{ fontSize: "12px", color: "#555" }}>
            Note: The 'Clear My Added Entries' button allows you to remove only the data you have just added in this session. 
            This ensures that your original ideas remain private and protected under intellectual property principles. 
            Use this feature to experiment, refine, or polish your content without affecting other users’ data.
          </p>

          <ul className="users-list">
            {users.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
                {isAdmin && <button onClick={() => deleteUser(user.id)}>Delete</button>}
              </li>
            ))}
          </ul>
        </section>

        {/* ===== CREATIVITY PATHS SECTION ===== */}
        <section className="paths-section">
          <h2>Creativity Paths</h2>
          <form onSubmit={addPath}>
            <select name="user_id" value={pathForm.user_id} onChange={handlePathChange} required>
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
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

          <table className="paths-table">
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
                <th>Ahh</th>
                {isAdmin && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {paths.map((path) => {
                const user = users.find((u) => u.id === path.user_id);
                const isNew = newlyAddedPaths.some((p) => p.id === path.id);
                return (
                  <tr key={path.id} className={isNew ? "highlight-row" : ""}>
                    <td>{user ? user.name : "Unknown"}</td>
                    <td>{path.misfit}</td>
                    <td>{path.recall}</td>
                    <td>{path.flow}</td>
                    <td>{path.wide_path}</td>
                    <td>{path.spark}</td>
                    <td>{path.strategic_flow}</td>
                    <td>{path.narrow_path}</td>
                    <td>{path.bright_spark}</td>
                    <td>{path.ahh}</td>
                    {isAdmin && <td><button onClick={() => deletePath(path.id)}>Delete</button></td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        {/* ===== Supportive Document Section ===== */}
        <section className="supportive-doc-section">
          <h2>Supportive Document</h2>
          <p>
            <a href={supportiveDoc} target="_blank" rel="noopener noreferrer">
              Click here to open the Creativity Brain Pathways PDF
            </a>
          </p>
        </section>

        {/* ===== Footer ===== */}
        <div className="app-footer">
          &copy; Chandima Gunasena | <a href="https://solutionswaterminds.com" target="_blank" rel="noopener noreferrer">solutionswaterminds.com</a> | Tel: 0777181928 / 0716287419
        </div>
      </div>
    </div>
  );
}

export default App;
