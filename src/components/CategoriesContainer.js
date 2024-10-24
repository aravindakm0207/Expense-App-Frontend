/*
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../actions/categories-action';
import CategoriesList from './CategoriesList';
import CategoryForm from './CategoryForm';


const CategoriesContainer = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.data);
  const serverErrors = useSelector(state => state.categories.serverErrors);

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories using the correct action creator
  }, [dispatch]);

  return (
    <div>
      {serverErrors.length > 0 && (
        <div className='alert alert-danger'>
          <b>Server Error</b>
          <ul>
            {serverErrors.map((ele, i) => (
              <li key={i}>{ele.msg}</li>
            ))}
          </ul>
        </div>
      )}
      <CategoryForm />
      <CategoriesList data={categories} />
    </div>
  );
};

export default CategoriesContainer;
*/
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../actions/categories-action';
import CategoriesList from './CategoriesList';
import CategoryForm from './CategoryForm';
import CategoryEdit from './CategoryEdit'; // Import the edit component

const CategoriesContainer = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.data);
  const serverErrors = useSelector(state => state.categories.serverErrors);
  const editCategoryId = useSelector(state => state.categories.editCategoryId); // Get editCategoryId

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      {serverErrors.length > 0 && (
        <div className='alert alert-danger'>
          <b>Server Error</b>
          <ul>
            {serverErrors.map((ele, i) => (
              <li key={i}>{ele.msg}</li>
            ))}
          </ul>
        </div>
      )}
      <CategoryForm />
      {editCategoryId && <CategoryEdit id={editCategoryId} />} {/* Render CategoryEdit if editCategoryId is set */}
      <CategoriesList data={categories} />
    </div>
  );
};

export default CategoriesContainer;
