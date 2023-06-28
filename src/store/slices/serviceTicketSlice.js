// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API Requests to Firestore Database

// Async thunk to create service ticket data
// dispatch(createServiceTicket({ uid, companyName, reasonForServices }));
const createServiceTicket = createAsyncThunk(
  'serviceTicket/createServiceTicket',
  async ({ uid, companyReceivingServices, reasonForServices }) => {
    try {
      const response = await post('/service-ticket/create-service-ticket', {
        uid,
        companyReceivingServices,
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
  async (uid) => {
    try {
      const response = await get('/service-ticket/get-service-ticket-details', {
        uid,
      });
      return response;
    } catch {
      throw new Error('Failed to fetch service ticket data.');
    }
  }
);

// Async thunk to update service ticket data
// const uid = '123'
// const updateData = {
//   something: 'some value'
// };

// dispatch(updateUser({ uid, updateData }));
const updateServiceTicket = createAsyncThunk(
  'serviceTicket/updateServiceTicket',
  async ({ uid, updateData }) => {
    try {
      const response = await patch('/service-ticket/update-service-ticket', {
        uid,
        updateData,
      });
      return response.ticket;
    } catch (error) {
      throw new Error('Failed to update service ticket data.');
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
      })
      // Update service ticket record details
      .addCase(updateServiceTicket.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(updateServiceTicket.fulfilled, (state, action) => {
        return {
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updateServiceTicket.rejected, (state, action) => {
        return {
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: serviceTicketReducer } = serviceTicketSlice;
export {
  createServiceTicket,
  fetchServiceTicket,
  updateServiceTicket,
  clearServiceTicketData,
};
