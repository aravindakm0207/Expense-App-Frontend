import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CategoryForm from './CategoryForm';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEditCategoryId } from '../actions/categories-action';
export default function CategoryEdit(props){
    const { id } = props
    const [modal, setModal] = useState(true);
    const dispatch = useDispatch() 
    const toggle = () => {
        setModal(!modal)
        dispatch(setEditCategoryId(null))
    }
    return (
        <>            
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Category</ModalHeader>
                <ModalBody>
                    <CategoryForm id={id} toggle={toggle} />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}