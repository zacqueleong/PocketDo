import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { ListGroup, FormCheck, ButtonGroup, Button } from "react-bootstrap";
import { toggleTodo, deleteTodo } from "../features/todo/todoSlice";
import { setCurrentTodo, setShow } from "../features/todo/uiSlice";
import { selectCurrentUser } from "../features/todo/userSlice";

// Icon imports
import { Pencil, Trash } from "react-bootstrap-icons";

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  // Handle checkbox toggle
  const handleCheckbox = (id) => {
    dispatch(toggleTodo({ currentUser, todoId: id }));
  };

  // Handle open modal / edit button
  const handleOpenModalBtn = (todo) => {
    // Set item that was clicked to currentTodo
    dispatch(setCurrentTodo({ ...todo }));

    // Set show to true
    dispatch(setShow(true));
  };

  // Handle delete button
  const handleDeleteBtn = (id) => {
    dispatch(deleteTodo({ currentUser, todoId: id }));
  };

  return (
    <ListGroup.Item className="p-1 list-group-item d-flex align-items-center justify-content-between" key={todo.id}>
      <div className="d-flex align-items-center me-1">
        <FormCheck className="me-2" type="checkbox" id={todo.id} checked={todo.checked} onChange={() => handleCheckbox(todo.id)} />
        {/* Conditionally apply the line-through text decoration, based on todo checked value (true/false)*/}
        <FormCheck.Label className={`form-check-label ${todo.checked ? "text-decoration-line-through" : ""}`} htmlFor={todo.id}>
          {todo.name}
        </FormCheck.Label>
      </div>

      <ButtonGroup size="sm" aria-label="Todo Action Buttons">
        <Button variant="outline-secondary" onClick={() => handleOpenModalBtn(todo)}>
          <Pencil width={20} height={20} />
        </Button>
        <Button variant="outline-danger" onClick={() => handleDeleteBtn(todo.id)}>
          <Trash width={20} height={20} />
        </Button>
      </ButtonGroup>
    </ListGroup.Item>
  );
}

export default TodoItem;
