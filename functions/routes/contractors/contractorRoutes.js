// contractorRoutes.js
const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

router.post('/create-contractor', async (req, res) => {
  try {
    const { companyName, linesOfService, ownerId } = req.body;
    const newContractor = {
      name: companyName,
      ownerId,
      linesOfService,
    };

    const newContractorRef = await admin
      .firestore()
      .collection('contractors')
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

router.get('/get-all-contractors', async (req, res) => {
  try {
    const contractorsRef = admin.firestore().collection('contractors');
    const querySnapshot = await contractorsRef.get();
    const contractorsData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(contractorsData);
  } catch (error) {
    console.error('Error retrieving contractors:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-contractor-details-by-owner-id', async (req, res) => {
  try {
    const ownerId = req.query.ownerId;
    const contractorsRef = admin.firestore().collection('contractors');
    const querySnapshot = await contractorsRef
      .where('ownerId', '==', ownerId)
      .get();

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ message: 'No contractor found for the specified owner' });
    }

    const doc = querySnapshot.docs[0]; // Assuming only one document is returned
    const contractorData = doc.data();

    return res.status(200).json(contractorData);
  } catch (error) {
    console.error('Error retrieving contractor details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-contractor-details-by-contact-id', async (req, res) => {
  try {
    const contactId = req.query.contactId;
    const contractorsRef = admin.firestore().collection('contractors');
    const querySnapshot = await contractorsRef
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

router.patch('/update-contractor', async (req, res) => {
  try {
    const {
      contractorId,
      firstName,
      lastName,
      primaryContactId,
      email,
      contacts,
    } = req.body;
    await admin
      .firestore()
      .collection('contractors')
      .doc(contractorId)
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
    // Retrieve the updated contractor data from Firestore
    const updatedContractorDoc = await admin
      .firestore()
      .collection('contractors')
      .doc(contractorId)
      .get();
    const updatedContractor = updatedContractorDoc.data();
    return res.status(200).json({
      message: 'Contractor document updated successfully',
      contractor: updatedContractor,
    });
  } catch (error) {
    console.error('Error updating contractor document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/add-contacts', async (req, res) => {
  try {
    const { contactId, contractorId } = req.body;

    // Check if the contractor with the specified contractorId exists
    const contractorRef = admin
      .firestore()
      .collection('contractors')
      .doc(contractorId);
    const contractorSnapshot = await contractorRef.get();

    if (!contractorSnapshot.exists) {
      return res.status(404).json({ message: 'Contractor not found' });
    }

    // Update the contacts array in the contractor document
    const contactsArray = contractorSnapshot.get('contacts') || [];

    // Merge the new contacts with the existing ones
    const updatedContacts = [...contactsArray, ...contactId];

    await contractorRef.update({ contacts: updatedContacts });

    const updatedContractorDoc = await contractorRef.get();
    const updatedContractor = updatedContractorDoc.data();

    return res
      .status(200)
      .json({
        message: 'Contacts added to contractor successfully',
        contractor: updatedContractor,
      });
  } catch (error) {
    console.error('Error adding contacts to contractor:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
