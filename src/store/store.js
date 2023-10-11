import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer } from 'store/slices/userSlice';
import { businessReducer } from 'store/slices/businessSlice';
import { customerReducer } from 'store/slices/customerSlice';
import { contractorReducer } from 'store/slices/contractorSlice';
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
    business: businessReducer,
    customer: customerReducer,
    contractor: contractorReducer,
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
