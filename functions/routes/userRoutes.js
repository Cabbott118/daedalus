// userRoutes.js
const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

router.post('/create-user', async (req, res) => {
  try {
    const { uid, email, fullName, userType } = req.body;
    const newUser = {
      email,
      fullName,
      uid,
      authProvider: 'local',
      userType,
    };
    await admin.firestore().collection('users').doc(uid).set(newUser);
    // Retrieve the created user data from Firestore
    const createdUserDoc = await admin
      .firestore()
      .collection('users')
      .doc(uid)
      .get();
    const createdUser = createdUserDoc.data();
    return res.status(201).json({
      message: 'User document created successfully',
      user: createdUser,
    });
  } catch (error) {
    console.error('Error creating user document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-user-details', async (req, res) => {
  try {
    const uid = req.query.uid;
    const userRef = admin.firestore().collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userDetails = userDoc.data();
    return res.status(200).json(userDetails);
  } catch (error) {
    console.error('Error retrieving user details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/update-user', async (req, res) => {
  try {
    const { uid, updateData } = req.body;
    await admin.firestore().collection('users').doc(uid).update(updateData);
    // Retrieve the updated user data from Firestore
    const updatedUserDoc = await admin
      .firestore()
      .collection('users')
      .doc(uid)
      .get();
    const updatedUser = updatedUserDoc.data();
    return res.status(200).json({
      message: 'User document updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/delete-user', async (req, res) => {
  try {
    const { uid } = req.query;
    const userRef = admin.firestore().collection('users').doc(uid);

    // Delete the user record from Firestore
    await userRef.delete();

    return res
      .status(200)
      .json({ message: 'User record deleted successfully' });
  } catch (error) {
    console.error('Error deleting user record', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;