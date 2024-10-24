import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ExpenseForm from './ExpenseForm';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEditExpenseId } from '../actions/expenses-action';

export default function ExpenseEdit(props) {
  const { id } = props;
  const [modal, setModal] = useState(true);
  const dispatch = useDispatch();
  
  const toggle = () => {
    setModal(!modal);
    dispatch(setEditExpenseId(null));
  };

  return (
    <>            
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Expense</ModalHeader>
        <ModalBody>
          <ExpenseForm id={id} toggle={toggle} />
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
