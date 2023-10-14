// customerRoutes.js
const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

router.post('/create-customer', async (req, res) => {
  try {
    const {
      companyName,
      ownerId,
      predefinedLinesOfService,
      street,
      city,
      zip,
      state,
    } = req.body;
    const newCustomer = {
      name: companyName,
      ownerId,
      predefinedLinesOfService,
      primaryAddress: {
        street,
        city,
        zip,
        state,
      },
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

router.get('/get-customer-details-by-owner-id', async (req, res) => {
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

router.get('/get-customer-details-by-contact-id', async (req, res) => {
  try {
    const contactId = req.query.contactId;
    const customersRef = admin.firestore().collection('customers');
    const querySnapshot = await customersRef
      .where('contacts', 'array-contains', { id: contactId })
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
    const {
      customerId,
      firstName,
      lastName,
      primaryContactId,
      email,
      contacts,
    } = req.body;
    await admin
      .firestore()
      .collection('customers')
      .doc(customerId)
      .update({
        primaryContact: {
          fullName: {
            firstName,
            lastName,
          },
          // this is the user's id
          id: primaryContactId,
          email,
        },
        contacts,
      });
    // Retrieve the updated customer data from Firestore
    const updatedCustomerDoc = await admin
      .firestore()
      .collection('customers')
      .doc(customerId)
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

router.post('/add-contacts', async (req, res) => {
  try {
    const { contactId, customerId } = req.body;

    // Check if the customer with the specified customerId exists
    const customerRef = admin
      .firestore()
      .collection('customers')
      .doc(customerId);
    const customerSnapshot = await customerRef.get();

    if (!customerSnapshot.exists) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Update the contacts array in the customer document
    const contactsArray = customerSnapshot.get('contacts') || [];

    // Merge the new contacts with the existing ones
    const updatedContacts = [...contactsArray, ...contactId];

    await customerRef.update({ contacts: updatedContacts });

    const updatedCustomerDoc = await customerRef.get();
    const updatedCustomer = updatedCustomerDoc.data();

    return res
      .status(200)
      .json({
        message: 'Contacts added to customer successfully',
        customer: updatedCustomer,
      });
  } catch (error) {
    console.error('Error adding contacts to customer:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
