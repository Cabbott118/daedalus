// customerRoutes.js
const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

router.post('/create-customer', async (req, res) => {
  try {
    const { ownerId, businessName } = req.body;
    const newCustomer = {
      ownerId,
      businessName,
      uid: '',
    };

    const newCustomerRef = await admin
      .firestore()
      .collection('customers')
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

router.get('/get-customer-details', async (req, res) => {
  try {
    const ownerId = req.query.ownerId;
    const customersRef = admin.firestore().collection('customers');
    const querySnapshot = await customersRef
      .where('ownerId', '==', ownerId)
      .get();

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ message: 'No customer found for the specified owner' });
    }

    const doc = querySnapshot.docs[0]; // Assuming only one document is returned
    const customerData = doc.data();

    return res.status(200).json(customerData);
  } catch (error) {
    console.error('Error retrieving customer details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/update-customer', async (req, res) => {
  try {
    const { uid, updateData } = req.body;
    await admin.firestore().collection('customers').doc(uid).update(updateData);
    // Retrieve the updated customer data from Firestore
    const updatedCustomerDoc = await admin
      .firestore()
      .collection('customers')
      .doc(uid)
      .get();
    const updatedCustomer = updatedCustomerDoc.data();
    return res.status(200).json({
      message: 'Customer document updated successfully',
      customer: updatedCustomer,
    });
  } catch (error) {
    console.error('Error updating customer document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
