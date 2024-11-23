//EDIT UPDATE IN SINGLE TABLE
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../config'

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState({
    projectId: "",
    employeeId: "",
  });
  const [editingProject, setEditingProject] = useState(null); // State for editing project
  const [editingEmployee, setEditingEmployee] = useState(null); // State for editing employee

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/projects`);
      setProjects(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch projects.");
    }
  };

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees`);
      setEmployees(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch employees.");
    }
  };

  // Create a new project
  const createProject = async () => {
    try {
      if (!newProject.name || !newProject.description) {
        setError("Project name and description are required.");
        return;
      }
      await axios.post(`${API_BASE_URL}/projects`, newProject);
      setNewProject({ name: "", description: "" });
      fetchProjects();
    } catch (err) {
      console.error(err);
      setError("Failed to create project.");
    }
  };

  // Add an employee to a project
  const addEmployeeToProject = async () => {
    try {
      const { projectId, employeeId } = selectedEmployees;
      if (!projectId || !employeeId) {
        setError("Please select both a project and an employee.");
        return;
      }
      await axios.post(`${API_BASE_URL}/projects/add-employee`, {
        projectId,
        employeeId,
      });
      fetchProjects(); // Refresh the project list
      setSelectedEmployees({ projectId: "", employeeId: "" }); // Reset selection
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add employee to project.");
    }
  };

  // Remove an employee from a project
  

  // Delete a project
  const deleteProject = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/projects/${id}`);
      fetchProjects();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to delete project.");
    }
  };

  // Start editing a project
  const editProject = (project) => {
    setEditingProject(project);
  };

  // Update a project
  const updateProject = async () => {
    if (!editingProject.name || !editingProject.description) {
      setError("Project name and description are required.");
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/projects/${editingProject._id}`, {
        name: editingProject.name,
        description: editingProject.description,
      });
      setEditingProject(null); // Reset the editing state
      fetchProjects();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to update project.");
    }
  };

  // Cancel editing a project
  const cancelEditing = () => {
    setEditingProject(null);
  };

  // Start editing an employee
  const editEmployee = (projectId, employee) => {
    setEditingEmployee({ projectId, employee });
  };

  // Update employee details (within project)
  const updateEmployee = async () => {
    if (!editingEmployee || !editingEmployee.employee.name) {
      setError("Employee name is required.");
      return;
    }
    try {
      await axios.put(
        `${API_BASE_URL}/projects/${editingEmployee.projectId}/employees/${editingEmployee.employee._id}`,
        { name: editingEmployee.employee.name }
      );
      setEditingEmployee(null); // Reset editing employee state
      fetchProjects();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to update employee.");
    }
  };

  // Cancel editing an employee
  const cancelEmployeeEditing = () => {
    setEditingEmployee(null);
  };

  // Delete an employee from a project
  const deleteEmployeeFromProject = async (projectId, employeeId) => {
    try {
      await axios.post(`${API_BASE_URL}/projects/remove-employee`, {
        projectId,
        employeeId,
      });
      fetchProjects();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to remove employee.");
    }
  };

  return (
    <div>
      <h1>Projects</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

     
      <div>
        <h2>Create Project</h2>
        <label>
          Project Name:
          <br />
          <input
            type="text"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
            placeholder="Project Name"
          />
        </label>
        <br />
        <label>
          Project Description:
          <br />
          <textarea
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            placeholder="Project Description"
          />
        </label>
        <br />
        <button onClick={createProject}>Create Project</button>
      </div>

      
      <div style={{ marginTop: "20px" }}>
        <h2>Add Employee to Project</h2>
        <label>
          Select Project:
          <select
            onChange={(e) =>
              setSelectedEmployees({
                ...selectedEmployees,
                projectId: e.target.value,
              })
            }
            value={selectedEmployees.projectId || ""}
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Select Employee:
          <select
            onChange={(e) =>
              setSelectedEmployees({
                ...selectedEmployees,
                employeeId: e.target.value,
              })
            }
            value={selectedEmployees.employeeId || ""}
          >
            <option value="">Select an employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button onClick={addEmployeeToProject}>Add Employee</button>
      </div>
      <table
  border="1"
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    textAlign: "center",
  }}
>
  <thead style={{ backgroundColor: "#f2f2f2" }}>
    <tr>
      <th>Project Name</th>
      <th>Description</th>
      <th>Project Actions</th>
      <th>Employee Actions</th>
    </tr>
  </thead>
  <tbody>
    {projects.map((project) => (
      <tr key={project._id} style={{ borderBottom: "1px solid #ddd" }}>
        <td>
          {editingProject && editingProject._id === project._id ? (
            <input
              type="text"
              value={editingProject.name}
              onChange={(e) =>
                setEditingProject({ ...editingProject, name: e.target.value })
              }
            />
          ) : (
            project.name
          )}
        </td>
        <td>
          {editingProject && editingProject._id === project._id ? (
            <textarea
              value={editingProject.description}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  description: e.target.value,
                })
              }
            />
          ) : (
            project.description
          )}
        </td>
        <td>
          {editingProject && editingProject._id === project._id ? (
            <>
              <button onClick={updateProject}>Update</button>
              <button onClick={cancelEditing}>Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => editProject(project)}>Edit</button>
              <button onClick={() => deleteProject(project._id)}>Delete</button>
            </>
          )}
        </td>
        <td>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {project.employees.map((emp) => (
              <li key={emp._id} style={{ marginBottom: "10px" }}>
                {editingEmployee &&
                editingEmployee.employee._id === emp._id ? (
                  <>
                    <input
                      type="text"
                      value={editingEmployee.employee.name}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          employee: {
                            ...editingEmployee.employee,
                            name: e.target.value,
                          },
                        })
                      }
                    />
                    <button onClick={updateEmployee}>Save</button>
                    <button onClick={cancelEmployeeEditing}>Cancel</button>
                  </>
                ) : (
                  <>
                    {emp.name}{" "}
                    <button onClick={() => editEmployee(project._id, emp)}>
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        deleteEmployeeFromProject(project._id, emp._id)
                      }
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </td>
      </tr>
    ))}
  </tbody>
</table>

     
      
    </div>
  );
};

export default Projects;





























/*


//WITHOUT TABLE
import React, { useState, useEffect } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState({});
  const [editingProject, setEditingProject] = useState(null); // State for editing project

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:4000/projects");
      setProjects(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch projects.");
    }
  };

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:4000/employees");
      setEmployees(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch employees.");
    }
  };

  // Create a new project
  const createProject = async () => {
    try {
      if (!newProject.name || !newProject.description) {
        setError("Project name and description are required.");
        return;
      }
      await axios.post("http://localhost:4000/projects", newProject);
      setNewProject({ name: "", description: "" });
      fetchProjects();
    } catch (err) {
      console.error(err);
      setError("Failed to create project.");
    }
  };

  // Delete a project
  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/projects/${id}`);
      fetchProjects();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to delete project.");
    }
  };

  // Add an employee to a project
  const addEmployeeToProject = async (projectId) => {
    try {
      const employeeId = selectedEmployees[projectId];
      if (!employeeId) {
        setError("Please select an employee.");
        return;
      }
      await axios.post("http://localhost:4000/projects/add-employee", {
        projectId,
        employeeId,
      });
      fetchProjects();
      setSelectedEmployees((prev) => ({ ...prev, [projectId]: "" }));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add employee to project.");
    }
  };

  // Remove an employee from a project
  const removeEmployeeFromProject = async (projectId, employeeId) => {
    try {
      await axios.post("http://localhost:4000/projects/remove-employee", {
        projectId,
        employeeId,
      });
      fetchProjects();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to remove employee from project.");
    }
  };

  // Start editing a project
  const editProject = (project) => {
    setEditingProject(project);
  };

  // Update project
  const updateProject = async () => {
    if (!editingProject.name || !editingProject.description) {
      setError("Project name and description are required.");
      return;
    }

    try {
      await axios.put(`http://localhost:4000/projects/${editingProject._id}`, {
        name: editingProject.name,
        description: editingProject.description,
      });
      setEditingProject(null); // Reset the editing state
      fetchProjects();
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to update project.");
    }
  };

  // Cancel editing project
  const cancelEditing = () => {
    setEditingProject(null);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Projects</h1>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      
      <div style={{ marginBottom: "30px" }}>
        <h2>Create Project</h2>
        <label>
          Project Name:
          <br />
          <input
            type="text"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            placeholder="Project Name"
            style={{ padding: "8px", margin: "5px 0", width: "100%" }}
          />
        </label>
        <br />
        <label>
          Project Description:
          <br />
          <textarea
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            placeholder="Project Description"
            style={{ padding: "8px", margin: "5px 0", width: "100%" }}
          />
        </label>
        <br />
        <button
          onClick={createProject}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Project
        </button>
      </div>

      
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {projects.map((project) => (
          <li
            key={project._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "5px",
            }}
          >
            {editingProject && editingProject._id === project._id ? (
              <div>
                <h3>Edit Project</h3>
                <label>
                  Project Name:
                  <input
                    type="text"
                    value={editingProject.name}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, name: e.target.value })
                    }
                    style={{ padding: "8px", margin: "5px 0", width: "100%" }}
                  />
                </label>
                <br />
                <label>
                  Project Description:
                  <textarea
                    value={editingProject.description}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, description: e.target.value })
                    }
                    style={{ padding: "8px", margin: "5px 0", width: "100%" }}
                  />
                </label>
                <br />
                <button
                  onClick={updateProject}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#28A745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Update Project
                </button>
                <button
                  onClick={cancelEditing}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#DC3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <button
                  onClick={() => deleteProject(project._id)}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#DC3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete Project
                </button>
                <button
                  onClick={() => editProject(project)}
                  style={{
                    padding: "8px 15px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  Edit Project
                </button>

                
                <h4 style={{ marginTop: "15px" }}>Employees:</h4>
                <ul>
                  {project.employees.map((emp) => (
                    <li key={emp._id} style={{ marginBottom: "10px" }}>
                      {emp.name} ({emp.email})
                      <button
                        style={{
                          marginLeft: "10px",
                          padding: "5px 10px",
                          backgroundColor: "#DC3545",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => removeEmployeeFromProject(project._id, emp._id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                
                <select
                  value={selectedEmployees[project._id] || ""}
                  onChange={(e) =>
                    setSelectedEmployees({ ...selectedEmployees, [project._id]: e.target.value })
                  }
                >
                  <option value="">Select an employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => addEmployeeToProject(project._id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Add Employee
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
*/


