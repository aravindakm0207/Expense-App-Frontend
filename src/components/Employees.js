import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../config'

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
    projects: [],
  });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployees();
    fetchProjects();
  }, []);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees`);
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch employees.");
    }
  };

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`);
      setProjects(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch projects.");
    }
  };

  // Create a new employee
  const createEmployee = async () => {
    try {
      await axios.post(`${API_BASE_URL}/employees`, newEmployee);
      setNewEmployee({ name: "", email: "", position: "", projects: [] });
      setError("");
      fetchEmployees();
    } catch (err) {
      console.error(err);
      setError("Failed to create employee.");
    }
  };

  // Edit an employee
  const editEmployee = (employee) => {
    setEditingEmployee(employee);
    setNewEmployee({
      name: employee.name,
      email: employee.email,
      position: employee.position,
      projects: employee.projects.map((project) => project._id),
    });
  };

  // Update an employee
  const updateEmployee = async () => {
    try {
      await axios.put(`${API_BASE_URL}/employees/${editingEmployee._id}`, newEmployee);
      setEditingEmployee(null);
      setNewEmployee({ name: "", email: "", position: "", projects: [] });
      setError("");
      fetchEmployees();
    } catch (err) {
      console.error(err);
      setError("Failed to update employee.");
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingEmployee(null);
    setNewEmployee({ name: "", email: "", position: "", projects: [] });
  };

  // Delete an employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/employees/${id}`);
      setError("");
      fetchEmployees();
    } catch (err) {
      console.error(err);
      setError("Failed to delete employee.");
    }
  };

  return (
    <div>
      <h1>Employees</h1>
      {error && <p>{error}</p>}

      {/* Create or Edit Employee Form */}
      <div>
        <h2>{editingEmployee ? "Edit Employee" : "Create Employee"}</h2>
        <label>Name:</label>
        <br />
        <input
          type="text"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          placeholder="Name"
        />
        <br />
        <label>Email:</label>
        <br />
        <input
          type="email"
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
          placeholder="Email"
        />
        <br />
        <label>Position:</label>
        <br />
        <input
          type="text"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
          placeholder="Position"
        />
        <br />
        <label>Projects:</label>
        <br />
        {projects.length > 0 ? (
          <select
          multiple
          value={newEmployee.projects}
          onChange={(e) =>
            setNewEmployee({
              ...newEmployee,
              projects: Array.from(e.target.selectedOptions, (option) => option.value),
            })
          }
          style={{ padding: "8px", margin: "5px 0", width: "100%" }}
        >
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
        ) : (
          <p>No projects available to assign.</p>
        )}
        <br />
        <button
          onClick={editingEmployee ? updateEmployee : createEmployee}
          disabled={!newEmployee.name || !newEmployee.email || !newEmployee.position}
        >
          {editingEmployee ? "Update Employee" : "Create Employee"}
        </button>
        {editingEmployee && (
          <button onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </div>

      {/* Employee List in Table */}
      <div>
        <h2>Employee List</h2>
        {employees.length > 0 ? (
          <table border="1" style={{ width: "100%", marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Projects</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.position}</td>
                  <td>
                    {employee.projects.map((project) => (
                      <p key={project._id}>{project.name}</p>
                    ))}
                  </td>
                  <td>
                    <button onClick={() => editEmployee(employee)}>
                      Edit
                    </button>
                    <button onClick={() => deleteEmployee(employee._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No employees available.</p>
        )}
      </div>
    </div>
  );
};

export default Employees;












/*
import React, { useState, useEffect } from "react";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
    projects: [],
  });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployees();
    fetchProjects();
  }, []);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:4000/employees");
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch employees.");
    }
  };

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:4000/projects");
      setProjects(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch projects.");
    }
  };

  // Create a new employee
  const createEmployee = async () => {
    try {
      await axios.post("http://localhost:4000/employees", newEmployee);
      setNewEmployee({ name: "", email: "", position: "", projects: [] });
      setError("");
      fetchEmployees();
    } catch (err) {
      console.error(err);
      setError("Failed to create employee.");
    }
  };

  // Edit an employee
  const editEmployee = (employee) => {
    setEditingEmployee(employee);
    setNewEmployee({
      name: employee.name,
      email: employee.email,
      position: employee.position,
      projects: employee.projects.map((project) => project._id),
    });
  };

  // Update an employee
  const updateEmployee = async () => {
    try {
      await axios.put(`http://localhost:4000/employees/${editingEmployee._id}`, newEmployee);
      setEditingEmployee(null);
      setNewEmployee({ name: "", email: "", position: "", projects: [] });
      setError("");
      fetchEmployees();
    } catch (err) {
      console.error(err);
      setError("Failed to update employee.");
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingEmployee(null);
    setNewEmployee({ name: "", email: "", position: "", projects: [] });
  };

  // Delete an employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/employees/${id}`);
      setError("");
      fetchEmployees();
    } catch (err) {
      console.error(err);
      setError("Failed to delete employee.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Employees</h1>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      
      <div style={{ marginBottom: "30px" }}>
        <h2>{editingEmployee ? "Edit Employee" : "Create Employee"}</h2>
        <label>Name:</label>
        <br />
        <input
          type="text"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          placeholder="Name"
          style={{ padding: "8px", margin: "5px 0", width: "100%" }}
        />
        <br />
        <label>Email:</label>
        <br />
        <input
          type="email"
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
          placeholder="Email"
          style={{ padding: "8px", margin: "5px 0", width: "100%" }}
        />
        <br />
        <label>Position:</label>
        <br />
        <input
          type="text"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
          placeholder="Position"
          style={{ padding: "8px", margin: "5px 0", width: "100%" }}
        />
        <br />
        <label>Projects:</label>
        <br />
        {projects.length > 0 ? (
          <select
            multiple
            value={newEmployee.projects}
            onChange={(e) =>
              setNewEmployee({
                ...newEmployee,
                projects: Array.from(e.target.selectedOptions, (option) => option.value),
              })
            }
            style={{ padding: "8px", margin: "5px 0", width: "100%" }}
          >
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        ) : (
          <p>No projects available to assign.</p>
        )}
        <br />
        <button
          onClick={editingEmployee ? updateEmployee : createEmployee}
          disabled={!newEmployee.name || !newEmployee.email || !newEmployee.position}
          style={{
            padding: "10px 20px",
            marginTop: "10px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {editingEmployee ? "Update Employee" : "Create Employee"}
        </button>
        {editingEmployee && (
          <button
            onClick={cancelEdit}
            style={{
              padding: "10px 20px",
              marginTop: "10px",
              backgroundColor: "#6c757d",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            Cancel
          </button>
        )}
      </div>

      
      <div>
        <h2>Employee List</h2>
        {employees.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: "0" }}>
            {employees.map((employee) => (
              <li
                key={employee._id}
                style={{
                  marginBottom: "20px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <p>
                  <strong>{employee.name}</strong> 
                </p>
                <p>
                  <strong>{employee.email}</strong> 
                </p>
                <p>
                  <strong>{employee.position}</strong> 
                </p>
                <p>
                  <strong>Projects:</strong>
                </p>
                <ul>
                  {employee.projects.map((project) => (
                    <li key={project._id} style={{ marginLeft: "20px" }}>
                      {project.name}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => editEmployee(employee)}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEmployee(employee._id)}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#DC3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No employees available.</p>
        )}
      </div>
    </div>
  );
};

export default Employees;

*/
