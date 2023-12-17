import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        filteredTodos: [],
    },
    reducers: {
        addTodo: (state, action) => {
            const { currentUser, todoInput } = action.payload;
            const existingUser = state.todos.find(user => user.username === currentUser);
            if (existingUser) {
                // If the user exists, update the existing user's todos array
                state.todos = state.todos.map(user => user.username === currentUser
                    ? {
                        ...user, todos: [...user.todos,
                        {
                            id: Date.now(),
                            name: todoInput,
                            checked: false
                        }]
                    }
                    : user
                );
            } else {
                // If the user doesn't exist, append a new user object to the array
                state.todos.push({
                    username: currentUser,
                    todos: [{
                        id: Date.now(),
                        name: todoInput,
                        checked: false
                    }],
                });
            }
        },
        toggleTodo: (state, action) => {
            const { currentUser, todoId } = action.payload;
            state.todos = state.todos.map(user => user.username === currentUser
                ? {
                    ...user, todos: user.todos.map(todo => todo.id === todoId
                        ? { ...todo, checked: !todo.checked }
                        : todo
                    )
                }
                : user
            );
        },
        updateTodo: (state, action) => {
            const { currentUser, todo } = action.payload;
            state.todos = state.todos.map(user => user.username === currentUser
                ? {
                    ...user, todos: user.todos.map(t => t.id === todo.id
                        ? { ...t, name: todo.name }
                        : t
                    )
                }
                : user
            );
        },
        deleteTodo: (state, action) => {
            const { currentUser, todoId } = action.payload;
            const userTodo = state.todos.find((user) => user.username === currentUser);
            const updatedTodoList = userTodo.todos.filter((t) => t.id !== todoId);
            state.todos = state.todos.map(user => user.username === currentUser
                ? {
                    ...user, todos: updatedTodoList
                }
                : user
            );
        },
        loadTodos: (state, action) => {
            const { currentUser, filterState } = action.payload;
            const existingUser = state.todos.find((user) => user.username === currentUser);
            // If username not found, return an empty array.
            if (!existingUser) {
                state.filteredTodos = [];
            } else {
                if (filterState.all) {
                    state.filteredTodos = [...existingUser.todos].sort((a, b) => b.id - a.id);
                }
                if (filterState.incomplete) {
                    state.filteredTodos = [...existingUser.todos].filter((todo) => !todo.checked).sort((a, b) => b.id - a.id);
                }
                if (filterState.completed) {
                    state.filteredTodos = [...existingUser.todos].filter((todo) => todo.checked).sort((a, b) => b.id - a.id);
                }
            }
        },
        clearTodos: (state, action) => {
            const { currentUser } = action.payload;
            const userTodo = state.todos.find((user) => user.username === currentUser);
            const updatedTodoList = userTodo.todos.filter((t) => !t.checked);
            state.todos = state.todos.map(user => (user.username === currentUser ? { ...user, todos: updatedTodoList } : user));
        }
    }
})

export const { addTodo, toggleTodo, updateTodo, deleteTodo, loadTodos, clearTodos } = todoSlice.actions;
export const selectTodos = (state) => state.todos.todos;
export const selectFilteredTodos = (state) => state.todos.filteredTodos;
export default todoSlice.reducer;