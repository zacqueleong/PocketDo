import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectFilterState, setFilterState } from "../features/todo/uiSlice";

const TodoFilter = () => {
  const dispatch = useDispatch();
  const filterState = useSelector(selectFilterState);

  // Handle Button Group clicks and assign boolean values accordingly to the respective filter.
  const handleButtonClick = (button) => {
    const newFilterState = {
      all: button === "all" ? true : false,
      incomplete: button === "incomplete" ? true : false,
      completed: button === "completed" ? true : false,
    };
    dispatch(setFilterState(newFilterState));
  };

  return (
    <ButtonGroup className="p-0 mb-3 w-100" size="sm">
      <Button variant="outline-secondary" active={filterState.all} onClick={() => handleButtonClick("all")}>
        All
      </Button>
      <Button variant="outline-secondary" active={filterState.incomplete} onClick={() => handleButtonClick("incomplete")}>
        Incomplete
      </Button>
      <Button variant="outline-secondary" active={filterState.completed} onClick={() => handleButtonClick("completed")}>
        Completed
      </Button>
    </ButtonGroup>
  );
};

export default TodoFilter;
