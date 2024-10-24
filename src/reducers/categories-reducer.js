/*
import {
    SET_CATEGORIES,
    REMOVE_CATEGORY,
    ADD_CATEGORY,
    SET_CATEGORY_ERRORS,
    SET_EDIT_CATEGORY_ID,
    UPDATE_CATEGORY,
    SET_SHOW_CATEGORY_ID
  } from '../actions/categories-action';
  
  const initialState = {
    data: [],
    serverErrors: [],
    editCategoryId: null,
    showCategoryId: null
  };
  
  const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CATEGORIES: {
        return { ...state, data: action.payload };
      }
      case REMOVE_CATEGORY: {
        return { ...state, data: state.data.filter(ele => ele._id !== action.payload) };
      }
      case ADD_CATEGORY: {
        return { ...state, data: [...state.data, action.payload] };
      }
      case SET_CATEGORY_ERRORS: {
        return { ...state, serverErrors: action.payload };
      }
      case SET_EDIT_CATEGORY_ID: {
        return { ...state, editCategoryId: action.payload };
      }
      case UPDATE_CATEGORY: {
        return {
          ...state,
          data: state.data.map(ele => ele._id === action.payload._id ? { ...action.payload } : ele)
        };
      }
      case SET_SHOW_CATEGORY_ID: {
        return { ...state, showCategoryId: action.payload };
      }
      default: {
        return { ...state };
      }
    }
  };
  
  export default categoriesReducer;
  */


  import {
    SET_CATEGORIES,
    REMOVE_CATEGORY,
    ADD_CATEGORY,
    SET_CATEGORY_ERRORS,
    SET_EDIT_CATEGORY_ID,
    UPDATE_CATEGORY,
    SET_SHOW_CATEGORY_ID,
  } from '../actions/categories-action';
  
  const initialState = {
    data: [],
    serverErrors: [],
    editCategoryId: null,
    showCategoryId: null,
  };
  
  const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_CATEGORIES:
        return { ...state, data: action.payload };
      case REMOVE_CATEGORY:
        return { ...state, data: state.data.filter(ele => ele._id !== action.payload) };
      case ADD_CATEGORY:
        return { ...state, data: [...state.data, action.payload] };
      case SET_CATEGORY_ERRORS:
        return { ...state, serverErrors: action.payload };
      case SET_EDIT_CATEGORY_ID:
        return { ...state, editCategoryId: action.payload };
      case UPDATE_CATEGORY:
        return {
          ...state,
          data: state.data.map(ele => ele._id === action.payload._id ? { ...action.payload } : ele),
        };
      case SET_SHOW_CATEGORY_ID:
        return { ...state, showCategoryId: action.payload };
      default:
        return state;
    }
  };
  
  export default categoriesReducer;
  