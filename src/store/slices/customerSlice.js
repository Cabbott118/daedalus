// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API Requests to Firestore Database

// Async thunk to create customer data
// const testTitle: 'test title'
// dispatch(createCustomer({ testTitle}));
const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async ({ testTitle, ownerId }) => {
    try {
      const response = await post('/create-customer', {
        ownerId,
        testTitle,
      });
      console.log(response);
      return response.customer;
    } catch (error) {
      throw new Error('Failed to create customer data.');
    }
  }
);

// Async thunk to fetch contractor data
// const uid = '123'
// dispatch(fetchCustomer(uid));
const fetchCustomer = createAsyncThunk(
  'contractor/fetchCustomer',
  async (uid) => {
    try {
      const response = await get('/get-customer-details', { uid });
      return response;
    } catch {
      throw new Error('Failed to fetch customer data.');
    }
  }
);

// Action to clear user data, typically after logout
const clearCustomerData = createAction('customer/clearCustomerData');

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCustomerData: (state) => {
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
      .addCase(createCustomer.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        return {
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(createCustomer.rejected, (state, action) => {
        return {
          loading: false,
          error: action.error.message,
        };
      })
      // Get contractor record details
      .addCase(fetchCustomer.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        return {
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        return {
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: customerReducer } = customerSlice;
export { createCustomer, fetchCustomer, clearCustomerData };
