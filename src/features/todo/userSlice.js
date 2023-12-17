import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        registerStatus: false,
        loginStatus: false,
        currentUser: null,
    },
    reducers: {
        addUser: (state, action) => {
            const { username, password } = action.payload;
            if (username && password !== "") {
                const user = state.users.find((u) => u.username === username);
                if (user) {
                    alert(`Username ${username} already registered, please try another username.`);
                    state.registerStatus = false;
                } else {
                    alert(`Username ${username} successfully created!`);
                    state.users.push({ id: Date.now(), username: username, password: password });
                    state.registerStatus = true;
                }
            } else {
                if (username === "") {
                    alert('Username is mandatory, please fill up.');
                    state.registerStatus = false;
                }
                if (password === "") {
                    alert('Password is mandatory, please fill up.');
                    state.registerStatus = false;
                }
            }
        },
        loginUser: (state, action) => {
            const { username, password } = action.payload;
            const user = state.users.find((u) => u.username === username);
            if (user) {
                if (user.password === password) {
                    alert(`User ${username} valid! Logging in..`);
                    state.loginStatus = true;
                    state.currentUser = username;
                } else {
                    alert('Incorrect password. Please try again.');
                    state.loginStatus = false;
                    state.currentUser = null;
                }
            } else {
                alert('Invalid credentials. Please try again.');
                state.loginStatus = false;
                state.currentUser = null;
            }
        },
        logoutUser: (state, action) => {
            state.loginStatus = false;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setRegisterStatus: (state, action) => {
            state.registerStatus = action.payload;
        }
    }
});

export const { addUser, loginUser, logoutUser, setCurrentUser, setRegisterStatus } = userSlice.actions;
export const selectUsers = (state) => state.users.users;
export const selectRegisterStatus = (state) => state.users.registerStatus;
export const selectLoginStatus = (state) => state.users.loginStatus;
export const selectCurrentUser = (state) => state.users.currentUser;
export default userSlice.reducer;