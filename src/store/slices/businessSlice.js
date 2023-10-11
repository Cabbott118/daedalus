// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API Requests to Firestore Database

// Async thunk to create business data
// const testTitle: 'test title'
// dispatch(createBusiness({ testTitle}));
const createBusiness = createAsyncThunk(
  'business/createBusiness',
  async ({ businessName, businessType, contactId }) => {
    try {
      const response = await post('/businesses/create-business', {
        contactId,
        businessName,
        businessType,
      });
      return response.business;
    } catch (error) {
      throw new Error('Failed to create business data.');
    }
  }
);

// Async thunk to add business contact
// const testTitle: 'test title'
// dispatch(createBusiness({ testTitle}));
const addBusinessContact = createAsyncThunk(
  'business/addBusinessContact',
  async ({ businessId, contactId }) => {
    try {
      const response = await post('/businesses/add-contact', {
        businessId,
        contactId,
      });
      return response;
    } catch (error) {
      throw new Error('Failed to add business contact.');
    }
  }
);

// Async thunk to fetch contractors data
// dispatch(fetchContractors());
const fetchContractors = createAsyncThunk(
  'business/fetchContractors',
  async () => {
    try {
      const response = await get('/businesses/get-all-contractors', {});
      return response;
    } catch {
      throw new Error('Failed to fetch contractor data.');
    }
  }
);

// Async thunk to fetch contractor data
// const contactId = '123'
// dispatch(fetchContractor(contactId));
const fetchContractor = createAsyncThunk(
  'business/fetchContractor',
  async (contactId) => {
    try {
      const response = await get('/businesses/get-contractor-details', {
        contactId,
      });
      return response;
    } catch {
      throw new Error('Failed to fetch contractor data.');
    }
  }
);

// Async thunk to fetch customers data
// dispatch(fetchCustomers());
const fetchCustomers = createAsyncThunk('business/fetchCustomers', async () => {
  try {
    const response = await get('/businesses/get-all-customers', {});
    return response;
  } catch {
    throw new Error('Failed to fetch customer data.');
  }
});

// Async thunk to fetch customer data
// const contactId = '123'
// dispatch(fetchCustomer(contactId));
const fetchCustomer = createAsyncThunk(
  'business/fetchCustomer',
  async (contactId) => {
    try {
      const response = await get('/customers/get-customer-details', {
        contactId,
      });
      return response;
    } catch {
      throw new Error('Failed to fetch customer data.');
    }
  }
);

// Action to clear user data, typically after logout
const clearBusinessData = createAction('business/clearBusinessData');

const businessSlice = createSlice({
  name: 'business',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBusinessData: (state) => {
      return {
        data: null,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Create business record
      .addCase(createBusiness.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createBusiness.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(createBusiness.rejected, (state, action) => {
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
      // Get all customer record details
      .addCase(fetchCustomers.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })
      // Get customer record details
      .addCase(fetchCustomer.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: businessReducer } = businessSlice;
export {
  createBusiness,
  fetchContractors,
  fetchContractor,
  fetchCustomers,
  fetchCustomer,
  clearBusinessData,
};
