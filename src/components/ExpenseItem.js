import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { startRemoveExpense, setEditExpenseId } from '../actions/expenses-action';

export default function ExpenseItem(props) {
  const dispatch = useDispatch();
  const { id, expenseDate, amount, description } = props;

  const handleRemove = () => {
    const userConfirm = window.confirm("Are you sure?");
    if (userConfirm) {
      dispatch(startRemoveExpense(id));
    }
  };

  const handleEdit = () => {
    dispatch(setEditExpenseId(id));
  };

  return (
    <li className='list-group-item'>
      <div><strong>Date:</strong> {new Date(expenseDate).toLocaleDateString()}</div>
      <div><strong>Amount:</strong> ${amount}</div>
      <div><strong>Description:</strong> {description}</div>
      <div className="btn-group float-end">
        <button onClick={handleEdit} className='btn btn-outline-secondary'>edit</button>
        <button onClick={handleRemove} className='btn btn-outline-danger'>remove</button>
      </div>
    </li>
  );
}

ExpenseItem.propTypes = {
  id: PropTypes.string.isRequired,
  expenseDate: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired
};
