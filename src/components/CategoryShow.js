
/*import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCategoryId } from '../actions/categories-action';

export default function CategoryShow(props) {
  const { id } = props;
  const dispatch = useDispatch();

  const category = useSelector((state) =>
    state.categories?.data?.find(ele => ele._id === id)
  );

  const expenses = useSelector((state) =>
    state.expenses?.data?.filter(ele => ele.category === id)
  );

  const [modal, setModal] = useState(true);

  const toggle = () => {
    setModal(!modal);
    dispatch(setShowCategoryId(null));
  };

  if (!category) {
    return null; // Handle case when category is not found
  }

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{category.name}</ModalHeader>
        <ModalBody>
          <h3>Listing Expenses</h3>
          {expenses.map(expense => (
            <div key={expense._id}>{expense.name}</div>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
  */

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCategoryId } from '../actions/categories-action';
import ExpensesList from './ExpensesList';
import { selectCategoryById, selectExpensesByCategoryId } from './selectors';

export default function CategoryShow(props) {
    const { id } = props;
    const dispatch = useDispatch();
    
    // Retrieve category and expenses from the state using selectors
    const category = useSelector(state => selectCategoryById(state, id));
    const expenses = useSelector(state => selectExpensesByCategoryId(state, id));

    const [modal, setModal] = useState(true);

    // Toggle modal visibility and dispatch action to reset the category ID
    const toggle = () => {
        setModal(!modal);
        dispatch(setShowCategoryId(null));
    };

    // Log category and expenses for debugging
    useEffect(() => {
        console.log('Category:', category);
        console.log('Expenses:', expenses);
    }, [category, expenses]);

    return (
        <>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    {category ? category.name : 'Category'}
                </ModalHeader>
                <ModalBody>
                    <h3>Listing Expenses</h3>
                    {expenses.length > 0 ? (
                        <ExpensesList data={expenses} />
                    ) : (
                        <p>No expenses found for this category.</p>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
