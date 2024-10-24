import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowExpenseId } from '../actions/expenses-action';

export default function ExpenseShow(props) {
  const { id } = props;
  const dispatch = useDispatch();

  const expense = useSelector((state) =>
    state.expenses?.data?.find(ele => ele._id === id)
  );

  const [modal, setModal] = useState(true);

  const toggle = () => {
    setModal(!modal);
    dispatch(setShowExpenseId(null));
  };

  if (!expense) {
    return null; // Handle case when expense is not found
  }

  return (
    <>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{expense.description}</ModalHeader>
        <ModalBody>
          <div><strong>Date:</strong> {new Date(expense.expenseDate).toLocaleDateString()}</div>
          <div><strong>Amount:</strong> ${expense.amount}</div>
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
