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
  async ({ businessName, ownerId }) => {
    try {
      const response = await post('/contractors/create-contractor', {
        ownerId,
        businessName,
      });
      return response.contractor;
    } catch (error) {
      throw new Error('Failed to create contractor data.');
    }
  }
);

// Async thunk to fetch contractors data
// dispatch(fetchContractors());
const fetchContractors = createAsyncThunk(
  'contractor/fetchContractors',
  async () => {
    try {
      const response = await get('contractors/get-all-contractors', {});
      return response;
    } catch {
      throw new Error('Failed to fetch contractor data.');
    }
  }
);

// Async thunk to fetch contractor data
// const uid = '123'
// dispatch(fetchContractor(uid));
const fetchContractor = createAsyncThunk(
  'contractor/fetchContractor',
  async (ownerId) => {
    try {
      const response = await get('/contractors/get-contractor-details', {
        ownerId,
      });
      return response;
    } catch {
      throw new Error('Failed to fetch contractor data.');
    }
  }
);

// Async thunk to update customer data
// const uid = '123'
// const updateData = {
//   something: 'some value'
// };

// dispatch(updateContractor({ uid, updateData }));
const updateContractor = createAsyncThunk(
  'contractor/updateContractor',
  async ({ uid, updateData }) => {
    try {
      const response = await patch('/contractors/update-contractor', {
        uid,
        updateData,
      });
      return response.contractor;
    } catch (error) {
      throw new Error('Failed to update contractor data.');
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
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createContractor.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(createContractor.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })
      // Get all contractor record details
      .addCase(fetchContractors.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchContractors.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchContractors.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })
      // Get contractor record details
      .addCase(fetchContractor.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchContractor.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchContractor.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })
      // Update contractor record details
      .addCase(updateContractor.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(updateContractor.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(updateContractor.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: contractorReducer } = contractorSlice;
export {
  createContractor,
  fetchContractors,
  fetchContractor,
  updateContractor,
  clearContractorData,
};
