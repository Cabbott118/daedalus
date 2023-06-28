const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

// User Routes

app.post('/create-user', async (req, res) => {
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

app.get('/get-user-details', async (req, res) => {
  try {
    const userId = req.query.uid;
    console.log(req.auth);
    const userRef = admin.firestore().collection('users').doc(userId);
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

app.patch('/update-user', async (req, res) => {
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

app.delete('/delete-user', async (req, res) => {
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

// Customer Routes

app.post('/create-customer', async (req, res) => {
  try {
    const { ownerId, customerName } = req.body;
    const newCustomer = {
      ownerId,
      customerName,
      uid: '',
    };

    const newCustomerRef = await admin
      .firestore()
      .collection('customer')
      .add(newCustomer);

    // Retrieve the document ID
    const customerId = newCustomerRef.id;
    await newCustomerRef.update({ uid: customerId });

    // Retrieve the created customer data from Firestore
    const createdCustomerDoc = await newCustomerRef.get();
    const createdCustomer = createdCustomerDoc.data();

    return res.status(201).json({
      message: 'Customer document created successfully',
      customer: createdCustomer,
    });
  } catch (error) {
    console.error('Error creating customer document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/get-customer-details', async (req, res) => {
  try {
    const ownerId = req.query.ownerId;
    const customersRef = admin.firestore().collection('customer');
    const querySnapshot = await customersRef
      .where('recordOwner', '==', ownerId)
      .get();

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ message: 'No customers found for the specified owner' });
    }

    const customerDetails = [];
    querySnapshot.forEach((doc) => {
      const customerData = doc.data();
      customerDetails.push(customerData);
    });

    return res.status(200).json(customerDetails);
  } catch (error) {
    console.error('Error retrieving customer details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Contractor Routes

app.post('/create-contractor', async (req, res) => {
  try {
    const { ownerId, contractorName } = req.body;
    const newContractor = {
      ownerId,
      contractorName,
      uid: '',
    };

    const newContractorRef = await admin
      .firestore()
      .collection('contractor')
      .add(newContractor);

    // Retrieve the document ID
    const contractorId = newContractorRef.id;
    await newContractorRef.update({ uid: contractorId });

    // Retrieve the created contractor data from Firestore
    const createdContractorDoc = await newContractorRef.get();
    const createdContractor = createdContractorDoc.data();

    return res.status(201).json({
      message: 'Contractor document created successfully',
      contractor: createdContractor,
    });
  } catch (error) {
    console.error('Error creating contractor document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/get-contractor-details', async (req, res) => {
  try {
    const ownerId = req.query.ownerId;
    const contractorRef = admin.firestore().collection('contractor');
    const querySnapshot = await contractorRef
      .where('recordOwner', '==', ownerId)
      .get();

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ message: 'No contractors found for the specified owner' });
    }

    const contractorDetails = [];
    querySnapshot.forEach((doc) => {
      const contractorData = doc.data();
      contractorDetails.push(contractorData);
    });

    return res.status(200).json(contractorDetails);
  } catch (error) {
    console.error('Error retrieving contractor details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

exports.api = functions.https.onRequest(app);
