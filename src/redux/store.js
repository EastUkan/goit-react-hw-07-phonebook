import phonebookReducer from './phonebook/phonebook-reducer';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const middleware = [...getDefaultMiddleware()];

const store = configureStore({
  reducer: {
    contacts: phonebookReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
