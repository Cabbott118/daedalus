// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API Requests to Firestore Database

// Async thunk to create contractor data
// const testTitle: 'test title'
// dispatch(createContractor({ testTitle}));
const createContractor = createAsyncThunk(
  'contractor/createContractor',
  async ({ testTitle, ownerId }) => {
    try {
      const response = await post('/create-contractor', {
        ownerId,
        testTitle,
      });
      return response.contractor;
    } catch (error) {
      throw new Error('Failed to create contractor data.');
    }
  }
);

// Async thunk to fetch contractor data
// const uid = '123'
// dispatch(fetchContractor(uid));
const fetchContractor = createAsyncThunk(
  'contractor/fetchContractor',
  async (uid) => {
    try {
      const response = await get('/get-contractor-details', { uid });
      return response;
    } catch {
      throw new Error('Failed to fetch contractor data.');
    }
  }
);

// Action to clear user data, typically after logout
const clearContractorData = createAction('contractor/clearContractorData');

const contractorSlice = createSlice({
  name: 'contractor',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearContractorData: (state) => {
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
      .addCase(createContractor.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(createContractor.fulfilled, (state, action) => {
        return {
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(createContractor.rejected, (state, action) => {
        return {
          loading: false,
          error: action.error.message,
        };
      })
      // Get contractor record details
      .addCase(fetchContractor.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(fetchContractor.fulfilled, (state, action) => {
        return {
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchContractor.rejected, (state, action) => {
        return {
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: contractorReducer } = contractorSlice;
export { createContractor, fetchContractor, clearContractorData };
