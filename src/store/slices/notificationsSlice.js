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

// Async thunk to update notification data
// const uid = '123'
// const updateData = {
//   hasNotificationBeenRead: true,
// };

// dispatch(updateUpdateNotification({ uid, updateData }));
const updateNotification = createAsyncThunk(
  'notifications/updateNotification',
  async ({ uid, updateData }) => {
    try {
      const response = await patch('/notification/update-notification', {
        uid,
        updateData,
      });
      return response.notification;
    } catch (error) {
      throw new Error('Failed to update notification data.');
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
      })
      // Update notification details
      .addCase(updateNotification.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        return {
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updateNotification.rejected, (state, action) => {
        return {
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: notificationsReducer } = notificationsSlice;
export { fetchNotifications, updateNotification, clearNotificationData };
