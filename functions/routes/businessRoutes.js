const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

router.post('/create-business', async (req, res) => {
  try {
    const { contactId, businessName, businessType } = req.body;
    const newBusiness = {
      contacts: [{ id: contactId }],
      businessName,
      businessType,
      uid: '',
    };

    const newBusinessRef = await admin
      .firestore()
      .collection('businesses')
      .add(newBusiness);

    // Retrieve the document ID
    const businessId = newBusinessRef.id;
    await newBusinessRef.update({ uid: businessId });

    // Retrieve the created business data from Firestore
    const createdBusinessDoc = await newBusinessRef.get();
    const createdBusiness = createdBusinessDoc.data();

    return res.status(201).json({
      message: 'Business document created successfully',
      business: createdBusiness,
    });
  } catch (error) {
    console.error('Error creating business document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-all-contractors', async (req, res) => {
  try {
    const contractorsRef = admin.firestore().collection('businesses');

    // Query for businesses with businessType equal to "contractor"
    const querySnapshot = await contractorsRef
      .where('businessType', '==', 'contractor')
      .get();

    const contractorsData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(contractorsData);
  } catch (error) {
    console.error('Error retrieving contractors:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-contractor-details', async (req, res) => {
  try {
    const contactId = req.query.contactId;
    const contractorsRef = admin.firestore().collection('businesses');

    // Query for businesses with businessType equal to "contractor" and contacts containing the specified contactId
    const querySnapshot = await contractorsRef
      .where('businessType', '==', 'contractor')
      .where('contacts', 'array-contains', { id: contactId })
      .get();

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ message: 'No contractor found for the specified contact' });
    }

    const doc = querySnapshot.docs[0]; // Assuming only one document is returned
    const contractorData = doc.data();

    return res.status(200).json(contractorData);
  } catch (error) {
    console.error('Error retrieving contractor details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-all-customers', async (req, res) => {
  try {
    const customersRef = admin.firestore().collection('businesses');

    // Query for businesses with businessType equal to "customer"
    const querySnapshot = await customersRef
      .where('businessType', '==', 'customer')
      .get();

    const customersData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(customersData);
  } catch (error) {
    console.error('Error retrieving customers:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-customer-details', async (req, res) => {
  try {
    const contactId = req.query.contactId;
    const customersRef = admin.firestore().collection('businesses');

    // Query for businesses with businessType equal to "customer" and contacts containing the specified contactId
    const querySnapshot = await customersRef
      .where('businessType', '==', 'customer')
      .where('contacts', 'array-contains', { id: contactId })
      .get();

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ message: 'No customer found for the specified contact' });
    }

    const doc = querySnapshot.docs[0]; // Assuming only one document is returned
    const customerData = doc.data();

    return res.status(200).json(customerData);
  } catch (error) {
    console.error('Error retrieving customer details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/add-contact', async (req, res) => {
  try {
    const { contactId, businessId } = req.body;

    // Validate that contactId and businessId are provided
    if (!contactId || !businessId) {
      return res
        .status(400)
        .json({ message: 'Both contactId and businessId are required' });
    }

    // Check if the business with the specified businessId exists
    const businessRef = admin
      .firestore()
      .collection('businesses')
      .doc(businessId);
    const businessSnapshot = await businessRef.get();

    if (!businessSnapshot.exists) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Update the contacts array in the business document
    const contactsArray = businessSnapshot.get('contacts') || [];
    const updatedContacts = [...contactsArray, { id: contactId }];

    await businessRef.update({ contacts: updatedContacts });

    return res
      .status(200)
      .json({ message: 'Contact added to business successfully' });
  } catch (error) {
    console.error('Error adding contact to business:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
