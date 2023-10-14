// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API Requests to Firestore Database
const createAdministrator = createAsyncThunk(
  'administrator/createAdministrator',
  async ({
    companyName,
    firstName,
    lastName,
    email,
    linesOfService,
    ownerId,
  }) => {
    try {
      const response = await post('/administrators/create-administrator', {
        companyName,
        firstName,
        lastName,
        email,
        linesOfService,
        ownerId,
      });
      return response.administrator;
    } catch (error) {
      throw new Error('Failed to create administrator data.');
    }
  }
);

const fetchAdministrators = createAsyncThunk(
  'administrator/fetchAdministrators',
  async () => {
    try {
      const response = await get('/administrators/get-all-administrators', {});
      return response;
    } catch {
      throw new Error('Failed to fetch administrator data.');
    }
  }
);

const fetchAdministrator = createAsyncThunk(
  'administrator/fetchAdministrator',
  async (contactId) => {
    try {
      const response = await get('/administrators/get-administrator-details', {
        contactId,
      });
      return response;
    } catch {
      throw new Error('Failed to fetch administrator data.');
    }
  }
);

const createContacts = createAsyncThunk(
  'administrator/createContacts',
  async ({ administratorId, contactId }) => {
    try {
      const response = await post('/administrators/add-contacts', {
        administratorId,
        contactId,
      });
      return response;
    } catch (error) {
      throw new Error('Failed to add contact(s).');
    }
  }
);

const addLinesOfService = createAsyncThunk(
  'administrator/addLinesOfService',
  async ({ administratorId, linesOfService }) => {
    try {
      const response = await post('/administrators/add-line-of-service', {
        administratorId,
        linesOfService,
      });
      return response;
    } catch (error) {
      throw new Error('Failed to add line(s) of service.');
    }
  }
);

const clearAdministratorData = createAction(
  'administrator/clearAdministratorData'
);

const administratorSlice = createSlice({
  name: 'administrator',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAdministratorData: (state) => {
      return {
        data: null,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createAdministrator.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createAdministrator.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(createAdministrator.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchAdministrators.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchAdministrators.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchAdministrators.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchAdministrator.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchAdministrator.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchAdministrator.rejected, (state, action) => {
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
          data: action.payload.administrator,
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

      .addCase(addLinesOfService.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(addLinesOfService.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload.administrator,
          loading: false,
          error: null,
        };
      })
      .addCase(addLinesOfService.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: administratorReducer } = administratorSlice;
export {
  createAdministrator,
  fetchAdministrators,
  fetchAdministrator,
  createContacts,
  addLinesOfService,
  clearAdministratorData,
};
