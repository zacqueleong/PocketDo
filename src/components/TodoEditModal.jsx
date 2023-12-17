import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Button } from "react-bootstrap";
import { updateTodo } from "../features/todo/todoSlice";
import { selectCurrentUser } from "../features/todo/userSlice";
import { selectCurrentTodo, setShow } from "../features/todo/uiSlice";

function TodoEditModal({ show }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentTodo = useSelector(selectCurrentTodo);
  const [updatedTaskName, setUpdatedTaskName] = useState("");

  // Update the task name when the modal is shown and set with the currentTodo.name passed in.
  useEffect(() => {
    setUpdatedTaskName(currentTodo.name);
  }, [show, currentTodo.name]);

  // Handle Input Change
  const handleInputChange = (e) => {
    setUpdatedTaskName(e.target.value);
  };

  // Handle Form Submit - Edit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTodo({ currentUser, todo: { ...currentTodo, name: updatedTaskName } }));
    handleCloseModal();
  };

  // Handle Close Modal
  const handleCloseModal = () => {
    dispatch(setShow(false));
  };

  return (
    <Modal show={show} onHide={handleCloseModal} centered>
      <Modal.Header>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Control type="text" id="editTodoInput" value={updatedTaskName || ""} onChange={handleInputChange} placeholder={currentTodo.name} autoFocus />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleFormSubmit} type="submit">
          Save
        </Button>
        <Button variant="outline-secondary" onClick={handleCloseModal}>
          Exit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TodoEditModal;
