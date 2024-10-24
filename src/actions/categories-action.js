/*import axios from 'axios';
import { toastifySuccess, toastifyError } from '../utils/toastify';

export const SET_CATEGORIES = "SET_CATEGORIES";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const SET_CATEGORY_ERRORS = "SET_CATEGORY_ERRORS";
export const SET_EDIT_CATEGORY_ID = "SET_EDIT_CATEGORY_ID";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const SET_SHOW_CATEGORY_ID = "SET_SHOW_CATEGORY_ID";

const token = localStorage.getItem("token");

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/all-categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setCategories(response.data));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
};

const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories
});

export const startRemoveCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`http://localhost:5000/removing-category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(removeCategory(response.data._id));
      toastifySuccess(`Successfully removed ${response.data.name}`);
    } catch (err) {
      toastifyError('Error removing category');
    }
  };
};

const removeCategory = (id) => ({
  type: REMOVE_CATEGORY,
  payload: id
});

export const startAddCategory = (formData, resetForm) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/create-category', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addCategory(response.data));
      dispatch(setErrors([]));
      resetForm();
      toastifySuccess(`Successfully created ${response.data.name}`);
    } catch (err) {
      dispatch(setErrors(err.response.data.errors));
      toastifyError('Error adding a category');
    }
  };
};

const addCategory = (category) => ({
  type: ADD_CATEGORY,
  payload: category
});

const setErrors = (errors) => ({
  type: SET_CATEGORY_ERRORS,
  payload: errors
});

export const startEditCategory = (id, formData, toggle) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:5000/update-category/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(editCategory(response.data));
      toggle();
      toastifySuccess('Successfully updated category');
    } catch (err) {
      toastifyError('Error updating category');
    }
  };
};

const editCategory = (category) => ({
  type: UPDATE_CATEGORY,
  payload: category
});

export const setEditCategoryId = (id) => ({
  type: SET_EDIT_CATEGORY_ID,
  payload: id
});

export const setShowCategoryId = (id) => ({
  type: SET_SHOW_CATEGORY_ID,
  payload: id
});
*/


import axios from 'axios';
import { toastifySuccess, toastifyError } from '../utils/toastify';
import API_BASE_URL from '../config'

export const SET_CATEGORIES = "SET_CATEGORIES";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const SET_CATEGORY_ERRORS = "SET_CATEGORY_ERRORS";
export const SET_EDIT_CATEGORY_ID = "SET_EDIT_CATEGORY_ID";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const SET_SHOW_CATEGORY_ID = "SET_SHOW_CATEGORY_ID";

const token = localStorage.getItem("token");

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/all-categories`, { // Updated URL
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setCategories(response.data));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
};

const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories
});

export const startRemoveCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/removing-category/${id}`, { // Updated URL
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(removeCategory(response.data._id));
      toastifySuccess(`Successfully removed ${response.data.name}`);
    } catch (err) {
      toastifyError('Error removing category');
    }
  };
};

const removeCategory = (id) => ({
  type: REMOVE_CATEGORY,
  payload: id
});

export const startAddCategory = (formData, resetForm) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create-category`, formData, { // Updated URL
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addCategory(response.data));
      dispatch(setErrors([]));
      resetForm();
      toastifySuccess(`Successfully created ${response.data.name}`);
    } catch (err) {
      dispatch(setErrors(err.response.data.errors));
      toastifyError('Error adding a category');
    }
  };
};

const addCategory = (category) => ({
  type: ADD_CATEGORY,
  payload: category
});

const setErrors = (errors) => ({
  type: SET_CATEGORY_ERRORS,
  payload: errors
});

export const startEditCategory = (id, formData, toggle) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/update-category/${id}`, formData, { // Updated URL
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(editCategory(response.data));
      toggle();
      toastifySuccess('Successfully updated category');
    } catch (err) {
      toastifyError('Error updating category');
    }
  };
};

const editCategory = (category) => ({
  type: UPDATE_CATEGORY,
  payload: category
});

export const setEditCategoryId = (id) => ({
  type: SET_EDIT_CATEGORY_ID,
  payload: id
});

export const setShowCategoryId = (id) => ({
  type: SET_SHOW_CATEGORY_ID,
  payload: id
});
