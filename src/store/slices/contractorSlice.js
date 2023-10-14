// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API Requests to Firestore Database

const createContractor = createAsyncThunk(
  'contractor/createContractor',
  async ({ companyName, linesOfService, ownerId }) => {
    try {
      const response = await post('/contractors/create-contractor', {
        companyName,
        linesOfService,
        ownerId,
      });
      return response.contractor;
    } catch (error) {
      throw new Error('Failed to create contractor data.');
    }
  }
);

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

const fetchContractorByOwnerId = createAsyncThunk(
  'contractor/fetchContractorByOwnerId',
  async (ownerId) => {
    try {
      const response = await get(
        '/contractors/get-contractor-details-by-owner-id',
        {
          ownerId,
        }
      );
      return response;
    } catch {
      throw new Error('Failed to fetch contractor data.');
    }
  }
);

const fetchContractorByContactId = createAsyncThunk(
  'contractor/fetchContractorByContactId',
  async (contactId) => {
    try {
      const response = await get(
        '/contractors/get-contractor-details-by-contact-id',
        {
          contactId,
        }
      );
      return response;
    } catch {
      throw new Error('Failed to fetch contractor data.');
    }
  }
);

const createContacts = createAsyncThunk(
  'contractor/createContacts',
  async ({ contactId, contractorId }) => {
    try {
      const response = await post('/contractors/add-contacts', {
        contactId,
        contractorId,
      });
      return response.contractor;
    } catch (error) {
      throw new Error('Failed to add contact(s).');
    }
  }
);

const updateContractor = createAsyncThunk(
  'contractor/updateContractor',
  async ({
    contractorId,
    firstName,
    lastName,
    primaryContactId,
    email,
    contacts,
  }) => {
    try {
      const response = await patch('/contractors/update-contractor', {
        contractorId,
        firstName,
        lastName,
        primaryContactId,
        email,
        contacts,
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

      .addCase(fetchContractorByOwnerId.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchContractorByOwnerId.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchContractorByOwnerId.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchContractorByContactId.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchContractorByContactId.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchContractorByContactId.rejected, (state, action) => {
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
          data: action.payload.contractor,
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
  fetchContractorByOwnerId,
  fetchContractorByContactId,
  createContacts,
  updateContractor,
  clearContractorData,
};
