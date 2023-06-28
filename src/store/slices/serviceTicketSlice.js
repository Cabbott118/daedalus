// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API Requests to Firestore Database

// Async thunk to create service ticket data
// dispatch(createServiceTicket({ uid, companyName, reasonForServices }));
const createServiceTicket = createAsyncThunk(
  'serviceTicket/createServiceTicket',
  async ({ uid, companyReceivingServies, reasonForServices }) => {
    console.log(uid, companyReceivingServies, reasonForServices);
    try {
      const response = await post('/service-ticket/create-service-ticket', {
        uid,
        companyReceivingServies,
        reasonForServices,
      });
      return response.ticket;
    } catch (error) {
      throw new Error('Failed to create service ticket data.');
    }
  }
);

// Async thunk to fetch contractor data
// const uid = '123'
// dispatch(fetchCustomer(uid));
const fetchServiceTicket = createAsyncThunk(
  'serviceTicket/fetchServiceTicket',
  async (ownerId) => {
    try {
      const response = await get('/service-ticket/get-customer-details', {
        ownerId,
      });
      return response;
    } catch {
      throw new Error('Failed to fetch customer data.');
    }
  }
);

// Action to clear user data, typically after logout
const clearServiceTicketData = createAction(
  'serviceTicket/clearServiceTicketData'
);

const serviceTicketSlice = createSlice({
  name: 'serviceTicket',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearServiceTicketData: (state) => {
      return {
        data: null,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Create customer record
      .addCase(createServiceTicket.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(createServiceTicket.fulfilled, (state, action) => {
        return {
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(createServiceTicket.rejected, (state, action) => {
        return {
          loading: false,
          error: action.error.message,
        };
      })
      // Get contractor record details
      .addCase(fetchServiceTicket.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(fetchServiceTicket.fulfilled, (state, action) => {
        return {
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchServiceTicket.rejected, (state, action) => {
        return {
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: serviceTicketReducer } = serviceTicketSlice;
export { createServiceTicket, fetchServiceTicket, clearServiceTicketData };
