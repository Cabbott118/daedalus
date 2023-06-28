// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// API Requests to Firestore Database

// Async thunk to fetch contractor data
// const createdBy = '123'
// dispatch(fetchNotifications(createdBy));
const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (createdBy) => {
    try {
      const response = await get('/notification/get-notifications', {
        createdBy,
      });
      return response;
    } catch {
      throw new Error('Failed to fetch notification data.');
    }
  }
);

// Action to clear user data, typically after logout
const clearNotificationData = createAction(
  'notifications/clearNotificationData'
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearNotificationData: (state) => {
      return {
        data: null,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Get notifications record details
      .addCase(fetchNotifications.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        return {
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        return {
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: notificationsReducer } = notificationsSlice;
export { fetchNotifications, clearNotificationData };
