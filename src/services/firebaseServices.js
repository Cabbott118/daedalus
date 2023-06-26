import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateEmail,
  deleteUser,
} from 'firebase/auth';

import { auth } from 'providers/firebase';

// Function to sign in a user with email and password
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // You can customize the user object to include any additional data you need
    return { uid: user.uid, email: user.email };
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

// Function to create a user with email and password
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    // You can customize the user object to include any additional data you need
    return { uid: user.uid, email: user.email };
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

// Function to sign out the current user
export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to update user's email address
export const changeEmail = async (email) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await updateEmail(user, email);
    } else {
      throw new Error('User not found.');
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

// Function to delete the current user
export const deleteCredentials = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      await deleteUser(user);
    } else {
      throw new Error('No user is currently signed in.');
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
