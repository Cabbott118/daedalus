import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer } from 'store/slices/userSlice';
import { administratorReducer } from 'store/slices/administratorSlice';
import { customerReducer } from 'store/slices/customerSlice';
import { contractorReducer } from 'store/slices/contractorSlice';
import { technicianReducer } from 'store/slices/technicianSlice';
import { serviceTicketReducer } from './slices/serviceTicketSlice';
import { notificationsReducer } from './slices/notificationsSlice';

// Services
// import { api } from 'services/baseService';

const persistedState = localStorage.getItem('reduxState');
const initialState = persistedState ? JSON.parse(persistedState) : {};

const store = configureStore({
  preloadedState: initialState,
  reducer: {
    // [api.reducerPath]: api.reducer,
    user: userReducer,
    administrator: administratorReducer,
    customer: customerReducer,
    contractor: contractorReducer,
    technician: technicianReducer,
    serviceTicket: serviceTicketReducer,
    notifications: notificationsReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(api.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));
});

export default store;
