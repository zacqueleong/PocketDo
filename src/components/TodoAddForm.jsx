import AppLogo from "./AppLogo";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container } from "react-bootstrap";
import { addTodo } from "../features/todo/todoSlice";
import { selectCurrentUser } from "../features/todo/userSlice";
import { selectTodoInput, setTodoInput } from "../features/todo/uiSlice";

// Icon imports
import { PersonCircle } from "react-bootstrap-icons";

function TodoAddForm() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const todoInput = useSelector(selectTodoInput);

  // Handle input change
  const handleInputChange = (e) => {
    // Update the state with the current input value
    dispatch(setTodoInput(e.target.value));
  };

  // Handle Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // If todo entered is valid, dispatch addTodo
    if (todoInput.trim() !== "") {
      dispatch(addTodo({ currentUser, todoInput }));
      // Clear input field
      dispatch(setTodoInput("")); // Reset todoInput in the uiSlice
    }
  };

  return (
    <>
      <Container className="p-0 mb-2 d-flex align-items-center justify-content-between">
        <AppLogo />
        <div className="text-muted">
          <PersonCircle width={24} height={24} className="me-2 text-muted" />
          <span>{currentUser}</span>
        </div>
      </Container>

      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-2">
          <div className="d-flex flex-column">
            <Form.Control className="me-3" type="text" id="task" placeholder="What needs to be done?" value={todoInput} onChange={handleInputChange} maxLength="30" required />
            <Form.Label htmlFor="task"></Form.Label>
          </div>
        </Form.Group>
        <Button variant="secondary" type="submit">
          Add Todo
        </Button>
      </Form>
    </>
  );
}

export default TodoAddForm;
