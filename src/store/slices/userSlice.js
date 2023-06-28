// Lib
import { get, post, patch, del } from 'lib/axios';

// Redux
import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

// Services (Firebase Services)
import {
  login,
  signup,
  logout,
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
    const response = await del('/user/delete-user', { uid });
    return response;
  } catch (error) {
    throw new Error('Failed to delete user data.');
  }
});

// API Requests to Firestore Database

// Async thunk to create user data
// const email: 'caleb@caleb.com'
// const uid: '123'
// dispatch(createUser({ email, uid }));
const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, uid, fullName, userType }) => {
    try {
      const response = await post('/user/create-user', {
        email,
        uid,
        fullName,
        userType,
      });
      return response.user;
    } catch (error) {
      throw new Error('Failed to create user data.');
    }
  }
);

// Async thunk to fetch user data
// const uid = '123'
// dispatch(fetchUser(uid));
const fetchUser = createAsyncThunk('user/fetchUser', async (uid) => {
  try {
    const response = await get('/user/get-user-details', { uid });
    return response;
  } catch (error) {
    throw new Error('Failed to fetch user data.');
  }
});

// Async thunk to create user data
// const uid = '123'
// const updateData = {
//   name: {
//     firstName: 'Caleb',
//     lastName: 'Abbott',
//   },
// };

// dispatch(updateUser({ uid, updateData }));
const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ uid, updateData }) => {
    try {
      const response = await patch('/user/update-user', { uid, updateData });
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
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearUserData: (state) => {
      return {
        data: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login user
      .addCase(loginUser.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        return {
          data: action.payload,
          isAuthenticated: true,
          loading: false,
          error: null,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        return {
          isAuthenticated: false,
          loading: false,
          error: action.payload,
        };
      })
      // Sign up user
      .addCase(signUpUser.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        return {
          data: action.payload,
          isAuthenticated: true,
          loading: false,
          error: null,
        };
      })
      .addCase(signUpUser.rejected, (state, action) => {
        return {
          loading: false,
          error: action.payload,
        };
      })
      // Logout user
      .addCase(logoutUser.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(logoutUser.fulfilled, (state) => {
        return {
          data: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        };
      })
      .addCase(logoutUser.rejected, (state, action) => {
        return {
          loading: false,
          error: action.payload,
        };
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(deleteUser.fulfilled, (state) => {
        return {
          data: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        };
      })
      .addCase(deleteUser.rejected, (state, action) => {
        return {
          loading: false,
          error: action.payload,
        };
      })
      // Create user record
      .addCase(createUser.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(createUser.fulfilled, (state, action) => {
        return {
          data: action.payload,
          isAuthenticated: true,
          loading: false,
          error: null,
        };
      })
      .addCase(createUser.rejected, (state, action) => {
        return {
          loading: false,
          error: action.error.message,
        };
      })
      // Get user record details
      .addCase(fetchUser.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        return {
          data: action.payload,
          isAuthenticated: true,
          loading: false,
          error: null,
        };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        return {
          isAuthenticated: false,
          loading: false,
          error: action.error.message,
        };
      })
      // Update user record details
      .addCase(updateUser.pending, (state) => {
        return {
          loading: true,
          error: null,
        };
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        return {
          data: action.payload,
          loading: false,
        };
      })
      .addCase(updateUser.rejected, (state, action) => {
        return {
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
  fetchUser,
  updateUser,
  clearUserData,
};
