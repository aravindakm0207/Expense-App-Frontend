import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startGetExpenses } from '../actions/expenses-action';
import ExpensesList from './ExpensesList';
import ExpenseForm from './ExpenseForm';
import ExpenseEdit from './ExpenseEdit';
import ExpenseShow from './ExpenseShow';

export default function ExpensesContainer() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(startGetExpenses());
  }, [dispatch]);

  console.log('Expenses from state:', expenses.data); // Add this line to check expenses

  return (
    <>
      <h2>Listing Expenses - {expenses.data.length}</h2>
      <div className="col-md-8">
        <ExpensesList data={expenses.data} />
      </div>
      <div className="col-md-4">
        <ExpenseForm />
      </div>
      {expenses.editExpenseId && <ExpenseEdit id={expenses.editExpenseId} />}
      {expenses.showExpenseId && <ExpenseShow id={expenses.showExpenseId} />}
    </>
  );
}
