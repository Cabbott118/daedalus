import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'store/slices/userSlice';
import { customerReducer } from 'store/slices/customerSlice';
import { contractorReducer } from 'store/slices/contractorSlice';

const persistedState = localStorage.getItem('reduxState');
const initialState = persistedState ? JSON.parse(persistedState) : {};

const store = configureStore({
  preloadedState: initialState,
  reducer: {
    user: userReducer,
    customer: customerReducer,
    contractor: contractorReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));
});

export default store;
