// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API Requests to Firestore Database

const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async ({
    companyName,
    ownerId,
    predefinedLinesOfService,
    street,
    city,
    zip,
    state,
    firstName,
    lastName,
    primaryContactId,
    email,
    contactId,
  }) => {
    try {
      const response = await post('/customers/create-customer', {
        companyName,
        ownerId,
        predefinedLinesOfService,
        street,
        city,
        zip,
        state,
        firstName,
        lastName,
        primaryContactId,
        email,
        contactId,
      });
      return response.customer;
    } catch (error) {
      throw new Error('Failed to create customer data.');
    }
  }
);

const fetchCustomerByOwnerId = createAsyncThunk(
  'contractor/fetchCustomerByOwnerId',
  async (ownerId) => {
    try {
      const response = await get(
        '/customers/get-customer-details-by-owner-id',
        {
          ownerId,
        }
      );
      return response;
    } catch {
      throw new Error('Failed to fetch customer data.');
    }
  }
);

const fetchCustomerByContactId = createAsyncThunk(
  'contractor/fetchCustomerByContactId',
  async (contactId) => {
    try {
      const response = await get(
        '/customers/get-customer-details-by-contact-id',
        {
          contactId,
        }
      );
      return response;
    } catch {
      throw new Error('Failed to fetch customer data.');
    }
  }
);

const createContacts = createAsyncThunk(
  'customer/createContacts',
  async ({ contactId, customerId }) => {
    try {
      const response = await post('/customer/add-contacts', {
        contactId,
        customerId,
      });
      return response.contractor;
    } catch (error) {
      throw new Error('Failed to add contact(s).');
    }
  }
);

const updateCustomer = createAsyncThunk(
  'customer/updateCustomer',
  async ({
    customerId,
    firstName,
    lastName,
    primaryContactId,
    email,
    contacts,
  }) => {
    try {
      const response = await patch('/customers/update-customer', {
        customerId,
        firstName,
        lastName,
        primaryContactId,
        email,
        contacts,
      });
      return response.customer;
    } catch (error) {
      throw new Error('Failed to update customer data.');
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

      .addCase(createCustomer.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(createCustomer.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchCustomerByOwnerId.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchCustomerByOwnerId.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchCustomerByOwnerId.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchCustomerByContactId.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchCustomerByContactId.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchCustomerByContactId.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(createContacts.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createContacts.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload.customer,
          loading: false,
          error: null,
        };
      })
      .addCase(createContacts.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(updateCustomer.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: customerReducer } = customerSlice;
export {
  createCustomer,
  fetchCustomerByOwnerId,
  fetchCustomerByContactId,
  createContacts,
  updateCustomer,
  clearCustomerData,
};
