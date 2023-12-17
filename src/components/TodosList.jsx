import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Button, ListGroup } from "react-bootstrap";
import { selectCurrentUser } from "../features/todo/userSlice";
import { selectTodos, selectFilteredTodos, loadTodos, clearTodos } from "../features/todo/todoSlice";
import { selectFilterState, selectTodoLeft, selectTodoCompleted, setTodoLeft, setTodoCompleted } from "../features/todo/uiSlice";

function TodosList() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const filterState = useSelector(selectFilterState);
  const todos = useSelector(selectTodos);
  const filteredTodos = useSelector(selectFilteredTodos);
  const todoLeft = useSelector(selectTodoLeft);
  const todoCompleted = useSelector(selectTodoCompleted);

  // useEffect hook to update the 'filteredTodos' state, based on changes in the currentUser, filterState, and todos dependencies.
  useEffect(() => {
    dispatch(loadTodos({ currentUser, filterState }));
  }, [currentUser, filterState, todos]);

  // useEffect hook to update state relating to the todo status, with dependency set on todos.
  useEffect(() => {
    dispatch(setTodoLeft({ currentUser, todos }));
    dispatch(setTodoCompleted({ currentUser, todos }));
  }, [todos]);

  // Populate userTodos using the filteredTodos state and handle accordingly
  let userTodos = filteredTodos !== undefined ? filteredTodos : [];

  // Handle Clear Completed Button
  const handleClearBtn = () => {
    dispatch(clearTodos({ currentUser }));
  };

  return (
    <>
      <Container className="p-0 my-3">
        <TodoFilter />

        <ListGroup variant="flush">
          {userTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ListGroup>

        <Container className="p-0 mt-3 d-flex justify-content-between">
          <Container className="p-0 d-flex flex-column align-items-start text-muted">
            <div>Status</div>
            <div>Incomplete: {todoLeft}</div>
            <div>Completed: {todoCompleted}</div>
          </Container>

          {todoCompleted > 0 && (
            <Button className="p-0" variant="outline-secondary" size="sm" onClick={() => handleClearBtn()}>
              Clear Completed
            </Button>
          )}
        </Container>
      </Container>
    </>
  );
}

export default TodosList;
