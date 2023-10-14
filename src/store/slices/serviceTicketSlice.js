// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API Requests to Firestore Database

const createServiceTicket = createAsyncThunk(
  'serviceTicket/createServiceTicket',
  async ({
    userId,
    customerId,
    customerName,
    titleForServices,
    reasonForServices,
    lineOfService,
    notToExceed,
    serviceProviderId,
    serviceProviderName,
  }) => {
    try {
      const response = await post('/service-tickets/create-service-ticket', {
        userId,
        customerId,
        customerName,
        titleForServices,
        reasonForServices,
        lineOfService,
        notToExceed,
        serviceProviderId,
        serviceProviderName,
      });
      return response.ticket;
    } catch (error) {
      throw new Error('Failed to create service ticket data.');
    }
  }
);

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

const fetchServiceTicketDetails = createAsyncThunk(
  'serviceTicket/fetchServiceTicketDetails',
  async (ticketId) => {
    try {
      const response = await get(
        '/service-tickets/get-service-ticket-details',
        { ticketId }
      );
      return response;
    } catch {
      throw new Error('Failed to fetch service ticket data.');
    }
  }
);

const fetchServiceTicketsCreatedBy = createAsyncThunk(
  'serviceTicket/fetchServiceTicketsCreatedBy',
  async (customerId) => {
    try {
      const response = await get(
        '/service-tickets/get-service-tickets-created-by',
        { customerId }
      );
      return response;
    } catch {
      throw new Error('Failed to fetch all service ticket data created by.');
    }
  }
);

const fetchServiceTicketsAssignedToProvider = createAsyncThunk(
  'serviceTicket/fetchServiceTicketsAssignedToProvider',
  async (serviceProviderId) => {
    try {
      const response = await get(
        '/service-tickets/get-service-tickets-assigned-to-provider',
        { serviceProviderId }
      );
      return response;
    } catch {
      throw new Error(
        'Failed to fetch all service ticket data for service provider.'
      );
    }
  }
);

const fetchServiceTicketsAssignedToTechnician = createAsyncThunk(
  'serviceTicket/fetchServiceTicketsAssignedToTechnician',
  async (technicianId) => {
    try {
      const response = await get(
        '/service-tickets/get-service-tickets-assigned-to-technician',
        { technicianId }
      );
      return response;
    } catch {
      throw new Error(
        'Failed to fetch all service ticket data for technician.'
      );
    }
  }
);

const updateServiceTicketStatus = createAsyncThunk(
  'serviceTicket/updateServiceTicketStatus',
  async ({ uid, status }) => {
    try {
      const response = await patch(
        '/service-tickets/update-service-ticket-status',
        {
          uid,
          status,
        }
      );
      return response.ticket;
    } catch (error) {
      throw new Error('Failed to update service ticket status.');
    }
  }
);

const updateServiceTicketTechnician = createAsyncThunk(
  'serviceTicket/updateServiceTicketTechnician',
  async ({ uid, technicianId, firstName, lastName }) => {
    try {
      const response = await patch(
        '/service-tickets/update-service-ticket-technician',
        {
          uid,
          technicianId,
          firstName,
          lastName,
        }
      );
      return response.ticket;
    } catch (error) {
      throw new Error('Failed to update service ticket status.');
    }
  }
);

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

      .addCase(createServiceTicket.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createServiceTicket.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          serviceTickets: [action.payload, ...state.serviceTickets],
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

      .addCase(fetchServiceTicketDetails.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchServiceTicketDetails.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchServiceTicketDetails.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

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

      .addCase(fetchServiceTicketsAssignedToProvider.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(
        fetchServiceTicketsAssignedToProvider.fulfilled,
        (state, action) => {
          return {
            ...state,
            serviceTickets: action.payload,
            loading: false,
            error: null,
          };
        }
      )
      .addCase(
        fetchServiceTicketsAssignedToProvider.rejected,
        (state, action) => {
          return {
            ...state,
            loading: false,
            error: action.error.message,
          };
        }
      )

      .addCase(fetchServiceTicketsAssignedToTechnician.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(
        fetchServiceTicketsAssignedToTechnician.fulfilled,
        (state, action) => {
          return {
            ...state,
            serviceTickets: action.payload,
            loading: false,
            error: null,
          };
        }
      )
      .addCase(
        fetchServiceTicketsAssignedToTechnician.rejected,
        (state, action) => {
          return {
            ...state,
            loading: false,
            error: action.error.message,
          };
        }
      )

      .addCase(updateServiceTicketStatus.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(updateServiceTicketStatus.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(updateServiceTicketStatus.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(updateServiceTicketTechnician.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(updateServiceTicketTechnician.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(updateServiceTicketTechnician.rejected, (state, action) => {
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
  fetchServiceTicketDetails,
  fetchServiceTicketsCreatedBy,
  fetchServiceTicketsAssignedToProvider,
  fetchServiceTicketsAssignedToTechnician,
  updateServiceTicketStatus,
  updateServiceTicketTechnician,
  clearServiceTicketData,
};
