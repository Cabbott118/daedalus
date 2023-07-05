// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API Requests to Firestore Database

// Async thunk to create service ticket data
// dispatch(createServiceTicket({ uid, companyName, reasonForServices }));
const createServiceTicket = createAsyncThunk(
  'serviceTicket/createServiceTicket',
  async ({ uid, customerName, customerId, reasonForServices }) => {
    try {
      const response = await post('/service-tickets/create-service-ticket', {
        uid,
        customerName,
        customerId,
        reasonForServices,
      });
      return response.ticket;
    } catch (error) {
      throw new Error('Failed to create service ticket data.');
    }
  }
);

// Async thunk to fetch all service ticket data
// const uid = '123'
// dispatch(fetchServiceTickets({uid}));
// dispatch(fetchServiceTickets({assignedTo}));
// dispatch(fetchServiceTickets());
const fetchServiceTickets = createAsyncThunk(
  'serviceTicket/fetchServiceTickets',
  async () => {
    try {
      const response = await get('/service-tickets/get-all-service-tickets');
      return response;
    } catch {
      throw new Error('Failed to fetch all service ticket data.');
    }
  }
);

// Async thunk to fetch all service ticket data
// const uid = '123'
// dispatch(fetchServiceTickets({uid}));
// dispatch(fetchServiceTickets({assignedTo}));
// dispatch(fetchServiceTickets());
const fetchServiceTicketsAssignedTo = createAsyncThunk(
  'serviceTicket/fetchServiceTicketsAssignedTo',
  async (uid) => {
    try {
      const response = await get(
        '/service-tickets/get-service-tickets-assigned-to',
        { uid }
      );
      return response;
    } catch {
      throw new Error('Failed to fetch all service ticket data.');
    }
  }
);

// Async thunk to fetch all service ticket data
// const uid = '123'
// dispatch(fetchServiceTickets({uid}));
// dispatch(fetchServiceTickets({assignedTo}));
// dispatch(fetchServiceTickets());
const fetchServiceTicketsCreatedBy = createAsyncThunk(
  'serviceTicket/fetchServiceTicketsCreatedBy',
  async (uid) => {
    try {
      const response = await get(
        '/service-tickets/get-service-tickets-created-by',
        { uid }
      );
      return response;
    } catch {
      throw new Error('Failed to fetch all service ticket data.');
    }
  }
);

// Async thunk to fetch service ticket data
// const uid = '123'
// dispatch(fetchServiceTicket(uid));
const fetchServiceTicket = createAsyncThunk(
  'serviceTicket/fetchServiceTicket',
  async (uid) => {
    try {
      const response = await get(
        '/service-tickets/get-service-ticket-details',
        {
          uid,
        }
      );
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

// dispatch(updateServiceTicket({ uid, updateData }));
const updateServiceTicket = createAsyncThunk(
  'serviceTicket/updateServiceTicket',
  async ({ uid, updateData }) => {
    try {
      const response = await patch('/service-tickets/update-service-ticket', {
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
    serviceTickets: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearServiceTicketData: (state) => {
      return {
        data: null,
        serviceTickets: [],
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Create service ticket record
      .addCase(createServiceTicket.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createServiceTicket.fulfilled, (state, action) => {
        console.log(action);
        return {
          ...state,
          data: action.payload,
          serviceTickets: [...state.serviceTickets, action.payload],
          loading: false,
          error: null,
        };
      })
      .addCase(createServiceTicket.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })
      // Get service tickets record details
      .addCase(fetchServiceTickets.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchServiceTickets.fulfilled, (state, action) => {
        return {
          ...state,
          serviceTickets: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchServiceTickets.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })
      // Get service tickets record details for assigned to
      .addCase(fetchServiceTicketsAssignedTo.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchServiceTicketsAssignedTo.fulfilled, (state, action) => {
        return {
          ...state,
          serviceTickets: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchServiceTicketsAssignedTo.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })
      // Get service tickets record details for created by
      .addCase(fetchServiceTicketsCreatedBy.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchServiceTicketsCreatedBy.fulfilled, (state, action) => {
        return {
          ...state,
          serviceTickets: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchServiceTicketsCreatedBy.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })
      // Get service ticket record details
      .addCase(fetchServiceTicket.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchServiceTicket.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchServiceTicket.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })
      // Update service ticket record details
      .addCase(updateServiceTicket.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(updateServiceTicket.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(updateServiceTicket.rejected, (state, action) => {
        return {
          ...state,
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
  fetchServiceTickets,
  fetchServiceTicketsAssignedTo,
  fetchServiceTicketsCreatedBy,
  fetchServiceTicket,
  updateServiceTicket,
  clearServiceTicketData,
};
