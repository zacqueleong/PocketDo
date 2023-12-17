import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createTransform, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import todoReducer from '../features/todo/todoSlice.js';
import userReducer from '../features/todo/userSlice.js';
import uiReducer from '../features/todo/uiSlice.js';

// 1 - Declare persistConfig object
const persistConfig = {
  key: 'PocketDo', // persist label/name 
  storage, // Indicate to use localStorage engine
  whitelist: ['todos', 'users'], // Slices to persist
  transforms: [
    createTransform(
      (state, key) => {
        if (key === 'users') {
          // Return a new object that includes all properties from the original state object except registerStatus, loginStatus and currentUser.
          const { registerStatus, loginStatus, currentUser, ...stateWithoutExcludedProps } = state;
          return stateWithoutExcludedProps;
        }
        if (key === 'todos') {
          const { filteredTodos, todoStatus, ...stateWithoutExcludedProps } = state;
          return stateWithoutExcludedProps;
        }
        return state;
      },
      null
    ),
  ],
};

// 2 - Declare rootReducer object to include ALL relevant slice's reducers
const rootReducer = combineReducers({
  todos: todoReducer,
  users: userReducer,
  ui: uiReducer,
});

// 3 - Declare persistedReducer object that uses persistReducer that takes in persistConfig and rootReducer declared.
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});

const persistor = persistStore(store);

export { store, persistor };