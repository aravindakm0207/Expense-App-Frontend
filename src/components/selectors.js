// selectors.js

// Selector to get a category by its ID
export const selectCategoryById = (state, id) => {
    return state.categories.data.find(category => category._id === id);
  };
  
  // Selector to get expenses by category ID
  export const selectExpensesByCategoryId = (state, id) => {
    return state.expenses.data.filter(expense => expense.category === id);
  };
  