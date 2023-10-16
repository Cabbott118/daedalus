// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// Services (Firebase Services)
import {
  login,
  signup,
  logout,
  changeEmail,
  deleteCredentials,
} from 'services/firebaseServices';

// Async thunk to log in a user
const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Call the signInWithEmailAndPassword function from the authentication service
      const user = await login(email, password);
      return user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to sign up a user
const signUpUser = createAsyncThunk(
  'user/signUpUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Call the createUserWithEmailAndPassword function from the authentication service
      const user = await signup(email, password);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to log out a user
const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Call the signOut function from the authentication service
      await logout();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete a user's credentials & records in Firestore
const deleteUser = createAsyncThunk('user/deleteUser', async (uid) => {
  try {
    await deleteCredentials();
    const response = await del('/users/delete-user', { uid });
    return response;
  } catch (error) {
    throw new Error('Failed to delete user data.');
  }
});

// API Requests to Firestore Database

const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, userId, firstName, lastName, userType }) => {
    try {
      const response = await post('/users/create-user', {
        email,
        userId,
        firstName,
        lastName,
        userType,
      });
      return response.user;
    } catch (error) {
      throw new Error('Failed to create user data.');
    }
  }
);

const createFirebaseUser = createAsyncThunk(
  'user/createFirebaseUser',
  async ({ email, firstName, lastName, userType }) => {
    try {
      const response = await post('/users/create-firebase-user', {
        email,
        password: process.env.REACT_APP_STANDARD_USER_CREATION,
        firstName,
        lastName,
        userType,
      });
      console.log(response);
      return response.user;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create firebase user.');
    }
  }
);

const fetchUser = createAsyncThunk('user/fetchUser', async (uid) => {
  try {
    const response = await get('/users/get-user-details', { uid });
    return response;
  } catch (error) {
    throw new Error('Failed to fetch user data.');
  }
});

const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ uid, updateData }) => {
    try {
      changeEmail(updateData.email);
      const response = await patch('/users/update-user', { uid, updateData });
      return response.user;
    } catch (error) {
      throw new Error('Failed to update user data.');
    }
  }
);

// Action to clear user data, typically after logout
const clearUserData = createAction('user/clearUserData');

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserData: (state) => {
      return {
        data: null,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })

      .addCase(signUpUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(signUpUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })

      .addCase(logoutUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(logoutUser.fulfilled, (state) => {
        return {
          ...state,
          data: null,
          loading: false,
          error: null,
        };
      })
      .addCase(logoutUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })

      .addCase(deleteUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(deleteUser.fulfilled, (state) => {
        return {
          ...state,
          data: null,
          loading: false,
          error: null,
        };
      })
      .addCase(deleteUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })

      .addCase(createUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createUser.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(createUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(createFirebaseUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(createFirebaseUser.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          error: null,
        };
      })
      .addCase(createFirebaseUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(fetchUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      })

      .addCase(updateUser.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: null,
        };
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updateUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.error.message,
        };
      });
  },
});

// Export the async thunk and reducer
export const { reducer: userReducer } = userSlice;
export {
  loginUser,
  signUpUser,
  logoutUser,
  deleteUser,
  createUser,
  createFirebaseUser,
  fetchUser,
  updateUser,
  clearUserData,
};
