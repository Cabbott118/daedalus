// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API Requests to Firestore Database

const createTechnician = createAsyncThunk(
  'technician/createTechnician',
  async ({ firstName, lastName, ownerId, userId }) => {
    try {
      const response = await post('/technicians/create-technician', {
        firstName,
        lastName,
        ownerId,
        userId,
      });
      return response.technician;
    } catch (error) {
      throw new Error('Failed to create technician data.');
    }
  }
);

const fetchTechnicianDetailsByUserId = createAsyncThunk(
  'technician/fetchTechnicianDetailsByUserId',
  async (userId) => {
    try {
      const response = await get(
        '/technicians/get-technician-details-by-user-id',
        { userId }
      );
      return response;
    } catch (error) {
      throw new Error('Failed to fetch technician data.');
    }
  }
);

const fetchTechnicians = createAsyncThunk(
  'technician/fetchTechnicians',
  async () => {
    try {
      const response = await get('/technicians/get-all-technicians', {});
      return response;
    } catch (error) {
      throw new Error('Failed to fetch technician data.');
    }
  }
);

const fetchTechnicianDetailsByOwnerId = createAsyncThunk(
  'technician/fetchTechnicianDetailsByOwnerId',
  async (ownerId) => {
    try {
      const response = await get(
        '/technicians/get-technician-details-by-owner-id',
        {
          ownerId,
        }
      );
      return response;
    } catch (error) {
      throw new Error('Failed to fetch technician data.');
    }
  }
);

const fetchTechnicianById = createAsyncThunk(
  'technician/fetchTechnicianById',
  async (technicianId) => {
    try {
      const response = await get('/technicians/get-technician-by-id', {
        technicianId,
      });
      return response;
    } catch (error) {
      throw new Error('Failed to fetch technician data.');
    }
  }
);

// Action to clear user data, typically after logout
const clearTechnicianData = createAction('technician/clearTechnicianData');

const technicianSlice = createSlice({
  name: 'technician',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearTechnicianData: (state) => {
      return {
        data: null,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createTechnician.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createTechnician.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(createTechnician.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchTechnicianDetailsByUserId.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchTechnicianDetailsByUserId.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchTechnicianDetailsByUserId.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchTechnicians.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchTechnicians.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchTechnicians.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchTechnicianDetailsByOwnerId.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchTechnicianDetailsByOwnerId.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchTechnicianDetailsByOwnerId.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchTechnicianById.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchTechnicianById.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchTechnicianById.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: technicianReducer } = technicianSlice;
export {
  createTechnician,
  fetchTechnicianDetailsByUserId,
  fetchTechnicians,
  fetchTechnicianDetailsByOwnerId,
  fetchTechnicianById,
  clearTechnicianData,
};
