import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from 'store/slices/userSlice';
import { customerReducer } from 'store/slices/customerSlice';
import { contractorReducer } from 'store/slices/contractorSlice';
import { serviceTicketReducer } from './slices/serviceTicketSlice';
import { notificationsReducer } from './slices/notificationsSlice';

const persistedState = localStorage.getItem('reduxState');
const initialState = persistedState ? JSON.parse(persistedState) : {};

const store = configureStore({
  preloadedState: initialState,
  reducer: {
    user: userReducer,
    customer: customerReducer,
    contractor: contractorReducer,
    serviceTicket: serviceTicketReducer,
    notifications: notificationsReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));
});

export default store;
