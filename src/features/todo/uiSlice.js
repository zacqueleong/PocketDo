import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        todoInput: "",
        currentTodo: {},
        show: false,
        all: true,
        active: false,
        completed: false,
        todoLeft: 0,
        todoCompleted: 0,
    },
    reducers: {
        setTodoInput: (state, action) => {
            state.todoInput = action.payload;
        },
        setCurrentTodo: (state, action) => {
            state.currentTodo = action.payload;
        },
        setShow: (state, action) => {
            state.show = action.payload;
        },
        setFilterState: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        setTodoLeft: (state, action) => {
            const { currentUser, todos } = action.payload;
            const existingUser = todos.find((user) => user.username === currentUser);
            if (!existingUser) {
                state.todoLeft = 0;
            } else {
                state.todoLeft = existingUser.todos.filter((todo) => !todo.checked).length;
            }
        },
        setTodoCompleted: (state, action) => {
            const { currentUser, todos } = action.payload;
            const existingUser = todos.find((user) => user.username === currentUser);
            if (!existingUser) {
                state.todoCompleted = 0;
            } else {
                state.todoCompleted = existingUser.todos.filter((todo) => todo.checked).length;
            }
        },
    }
});

export const { setTodoInput, setCurrentTodo, setShow, setFilterState, setTodoLeft, setTodoCompleted } = uiSlice.actions;
export const selectTodoInput = (state) => state.ui.todoInput;
export const selectCurrentTodo = (state) => state.ui.currentTodo;
export const selectShow = (state) => state.ui.show;
export const selectFilterState = (state) => state.ui;
export const selectTodoLeft = (state) => state.ui.todoLeft;
export const selectTodoCompleted = (state) => state.ui.todoCompleted;
export default uiSlice.reducer;