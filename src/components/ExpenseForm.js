import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startAddExpense, startEditExpense } from '../actions/expenses-action';
import { fetchCategories } from '../actions/categories-action';  // Add this action
import PropTypes from 'prop-types';

export default function ExpenseForm({ id, toggle }) {
  const dispatch = useDispatch();
  const serverErrors = useSelector((state) => state.expenses.serverErrors || []);
  const expense = useSelector((state) =>
    state.expenses.data.find((ele) => ele._id === id)
  );
  const categories = useSelector((state) => state.categories.data);

  const [expenseDate, setExpenseDate] = useState(expense ? expense.expenseDate : '');
  const [amount, setAmount] = useState(expense ? expense.amount : '');
  const [description, setDescription] = useState(expense ? expense.description : '');
  const[person,setPerson]=useState(expense?expense.person : '')
  const [categoryId, setCategoryId] = useState(expense ? expense.categoryId : '');
  const [clientErrors, setClientErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (expense) {
      setExpenseDate(expense.expenseDate);
      setAmount(expense.amount);
      setDescription(expense.description);
      setPerson(expense.person);
      setCategoryId(expense.categoryId);
    }
  }, [expense]);

  const runClientValidation = () => {
    const errors = {};
    if (!expenseDate) {
      errors.expenseDate = 'Date cannot be blank';
    }
    if (amount <= 0) {
      errors.amount = 'Amount must be greater than zero';
    }
    if (description.trim().length === 0) {
      errors.description = 'Description cannot be blank';
    }
    if (!categoryId) {
      errors.categoryId = 'Category must be selected';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { expenseDate, amount, description, categoryId };
    const errors = runClientValidation();

    if (Object.keys(errors).length === 0) {
      if (expense) {
        dispatch(startEditExpense(expense._id, formData, toggle));
      } else {
        dispatch(startAddExpense(formData, () => {
          setExpenseDate('');
          setAmount('');
          setDescription('');
          setPerson('');
          setCategoryId('');
          setClientErrors({});
        }));
      }
    } else {
      setClientErrors(errors);
    }
  };

  return (
    <>
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
      <h2>Expense Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor='expenseDate' className='form-label'>
            Date
          </label>
          <input
            type="date"
            id="expenseDate"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
            className="form-control"
          />
          {clientErrors.expenseDate && <p className="text-danger">{clientErrors.expenseDate}</p>}
        </div>
        <div className="form-group">
          <label htmlFor='amount' className='form-label'>
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control"
          />
          {clientErrors.amount && <p className="text-danger">{clientErrors.amount}</p>}
        </div>
        <div className="form-group">
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
          {clientErrors.description && <p className="text-danger">{clientErrors.description}</p>}
        </div>


        <div className="form-group">
          <label htmlFor='person' className='form-label'>
            Description
          </label>
          <input
            type="text"
            id="person"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            className="form-control"
          />
          
        </div>



        <div className="form-group">
          <label htmlFor='category' className='form-label'>
            Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="form-control"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {clientErrors.categoryId && <p className="text-danger">{clientErrors.categoryId}</p>}
        </div>
        <button type="submit" className="btn btn-primary">
          {expense ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>
    </>
  );
}

ExpenseForm.propTypes = {
  id: PropTypes.string,
  toggle: PropTypes.func
};
