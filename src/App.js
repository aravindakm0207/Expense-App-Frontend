/*
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Account from './components/Account';
import CategoriesContainer from './components/CategoriesContainer';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const { user, dispatch } = useAuth();

  const registerIn = () => {
    toast.success("Successfully Registered!");
  };

  const loggedIn = () => {
    toast.success("Successfully Logged In!");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/users/account', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({ type: "LOGIN", payload: { account: response.data } });
        } catch (error) {
          console.error("Failed to fetch user profile", error.response?.data || error.message);
        }
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="container">
      <h2>My App</h2>
      <ToastContainer />
      <div>
        <h1>Blog App</h1>
        <nav>
          <Link to="/">Home</Link> |
          {!user.isLoggedIn ? (
            <>
              <Link to="/register">Register</Link> |
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <Link to="/account">Account</Link> |
              <Link to="/categories">Categories</Link> |
              <Link to="/" onClick={handleLogout}>Logout</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register registerIn={registerIn} />} />
          <Route path="/login" element={<Login loggedIn={loggedIn} />} />
          <Route path="/account" element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          } />
          <Route path="/categories" element={
            <PrivateRoute>
              <CategoriesContainer />
            </PrivateRoute>
          } />
        </Routes>

        <ToastContainer position='top-center' />
      </div>
    </div>
  );
}

export default App;

*/

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Account from './components/Account';
import CategoriesContainer from './components/CategoriesContainer';
import ExpensesContainer from './components/ExpensesContainer'; // Import ExpensesContainer
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import axios from 'axios';
import Projects from './components/Projects';
import Employees from './components/Employees';
import API_BASE_URL from './config'
function App() {
  const { user, dispatch } = useAuth();

  const registerIn = () => {
    toast.success("Successfully Registered!");
  };

  const loggedIn = () => {
    toast.success("Successfully Logged In!");
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/users/account`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({ type: "LOGIN", payload: { account: response.data } });
        } catch (error) {
          console.error("Failed to fetch user profile", error.response?.data || error.message);
        }
      }
    };

    fetchUserProfile();
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="container">
      <h2>Expense App</h2>
      <ToastContainer />
      <div>
        <nav>
          <Link to="/">Home</Link> |
          {!user.isLoggedIn ? (
            <>
              <Link to="/register">Register</Link> |
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <Link to="/account">Account</Link> |
              <Link to="/categories">Categories</Link> |
              <Link to="/expenses">Expenses</Link> | {/* Add Expenses link */}
              <Link to="/projects">Projects</Link> |
              <Link to="/employees">Employees</Link> |
              <Link to="/" onClick={handleLogout}>Logout</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register registerIn={registerIn} />} />
          <Route path="/login" element={<Login loggedIn={loggedIn} />} />
          <Route path="/account" element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          } />
          <Route path="/categories" element={
            <PrivateRoute>
              <CategoriesContainer />
            </PrivateRoute>
          } />
          <Route path="/expenses" element={  /* Add route for expenses */
            <PrivateRoute>
              <ExpensesContainer />
            </PrivateRoute>
          } />



          <Route path="/employees" element={
            <PrivateRoute>
              <Employees />
            </PrivateRoute>
          } />

          <Route path="/projects" element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          } />

        </Routes>

        <ToastContainer position='top-center' />
      </div>
    </div>
  );
}

export default App;
