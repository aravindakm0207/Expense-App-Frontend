import axios from 'axios';
import { toastifySuccess, toastifyError } from '../utils/toastify';
import API_BASE_URL from '../config'

// Action Types
export const SET_EXPENSES = "SET_EXPENSES";
export const REMOVE_EXPENSE = "REMOVE_EXPENSE";
export const ADD_EXPENSE = "ADD_EXPENSE";
export const SET_EXPENSE_ERRORS = "SET_EXPENSE_ERRORS";
export const SET_EDIT_EXPENSE_ID = "SET_EDIT_EXPENSE_ID";
export const UPDATE_EXPENSE = "UPDATE_EXPENSE";
export const SET_SHOW_EXPENSE_ID = "SET_SHOW_EXPENSE_ID";

// Token
const token = localStorage.getItem("token");

// Get Expenses
export const startGetExpenses = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all-expenses`, { // Updated URL
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = response.data;
      dispatch(setExpenses(result));
    } catch (err) {
      alert(err);
    }
  };
};

const setExpenses = (expenses) => {
  return { type: SET_EXPENSES, payload: expenses };
};

// Remove Expense
export const startRemoveExpense = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/remove-expense/${id}`, { // Updated URL
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = response.data;
      dispatch(removeExpense(result._id));
      toastifySuccess(`Successfully removed expense`);
    } catch (err) {
      alert(err);
      toastifyError('Error removing expense');
    }
  };
};

const removeExpense = (id) => {
  return { type: REMOVE_EXPENSE, payload: id };
};

// Add Expense
export const startAddExpense = (formData, resetForm) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create-expenses`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = response.data;
      dispatch(addExpense(result));
      dispatch(setErrors([]));
      resetForm();
      toastifySuccess(`Successfully created expense`);
    } catch (err) {
      dispatch(setErrors(err.response.data.errors));
      toastifyError('Error adding expense');
    }
  };
};

const addExpense = (expense) => {
  return { type: ADD_EXPENSE, payload: expense };
};

// Edit Expense
export const startEditExpense = (id, formData, toggle) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update-expense/${id}`, formData, { // Updated URL
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = response.data;
      dispatch(editExpense(result));
      toggle();
      toastifySuccess('Successfully updated expense');
    } catch (err) {
      toastifyError('Error updating expense');
    }
  };
};

const editExpense = (expense) => {
  return { type: UPDATE_EXPENSE, payload: expense };
};

// Set Edit Expense ID
export const setEditExpenseId = (id) => {
  return { type: SET_EDIT_EXPENSE_ID, payload: id };
};

// Set Show Expense ID
export const setShowExpenseId = (id) => {
  return { type: SET_SHOW_EXPENSE_ID, payload: id };
};

// Set Expense Errors
const setErrors = (errors) => {
  return { type: SET_EXPENSE_ERRORS, payload: errors };
};
