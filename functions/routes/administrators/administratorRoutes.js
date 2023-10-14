const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

router.post('/create-administrator', async (req, res) => {
  try {
    const { companyName, firstName, lastName, email, linesOfService, ownerId } =
      req.body;
    const newAdministrator = {
      name: companyName,
      primaryContact: {
        fullName: {
          firstName,
          lastName,
        },
        id: ownerId,
        email,
      },
      ownerId,
      contacts: [{ id: ownerId }],
      linesOfService,
    };

    const newAdministratorRef = await admin
      .firestore()
      .collection('administrators')
      .add(newAdministrator);

    // Retrieve the document ID
    const AdministratorId = newAdministratorRef.id;
    await newAdministratorRef.update({ uid: AdministratorId });

    // Retrieve the created administrator data from Firestore
    const createdAdministratorDoc = await newAdministratorRef.get();
    const createdAdministrator = createdAdministratorDoc.data();

    return res.status(201).json({
      message: 'Administrator document created successfully',
      administrator: createdAdministrator,
    });
  } catch (error) {
    console.error('Error creating administrator document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-all-administrators', async (req, res) => {
  try {
    const administratorsRef = admin.firestore().collection('administrators');

    // Query for administrators
    const querySnapshot = await administratorsRef.get();

    const administratorsData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(administratorsData);
  } catch (error) {
    console.error('Error retrieving administrators:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-administrator-details', async (req, res) => {
  try {
    const contactId = req.query.contactId;
    const administratorsRef = admin.firestore().collection('administrators');

    // Query for administrators with contacts containing the specified contactId
    const querySnapshot = await administratorsRef
      .where('contacts', 'array-contains', { id: contactId })
      .get();

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ message: 'No administrator found for the specified contact' });
    }

    const doc = querySnapshot.docs[0]; // Assuming only one document is returned
    const administratorData = doc.data();

    return res.status(200).json(administratorData);
  } catch (error) {
    console.error('Error retrieving administrator details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/add-contacts', async (req, res) => {
  try {
    const { contactId, administratorId } = req.body;

    // Check if the administrator with the specified administratorId exists
    const administratorRef = admin
      .firestore()
      .collection('administrators')
      .doc(administratorId);
    const administratorSnapshot = await administratorRef.get();

    if (!administratorSnapshot.exists) {
      return res.status(404).json({ message: 'Administrator not found' });
    }

    // Update the contacts array in the administrator document
    const contactsArray = administratorSnapshot.get('contacts') || [];

    // Merge the new contacts with the existing ones
    const updatedContacts = [...contactsArray, ...contactId];

    await administratorRef.update({ contacts: updatedContacts });

    // Retrieve the updated administrator document from Firestore
    const updatedAdministratorDoc = await administratorRef.get();
    const updatedAdministrator = updatedAdministratorDoc.data();

    return res.status(200).json({
      message: 'Contacts added to administrator successfully',
      administrator: updatedAdministrator,
    });
  } catch (error) {
    console.error('Error adding contacts to administrator:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/add-lines-of-service', async (req, res) => {
  try {
    const { linesOfService, administratorId } = req.body;

    const administratorRef = admin
      .firestore()
      .collection('administrators')
      .doc(administratorId);
    const administratorSnapshot = await administratorRef.get();

    if (!administratorSnapshot.exists) {
      return res.status(404).json({ message: 'Administrator not found' });
    }

    // Update the line of service array in the administrator document
    const lineOfServiceArray =
      administratorSnapshot.get('linesOfService') || [];
    const updatedLinesOfService = [...lineOfServiceArray, ...linesOfService];

    await administratorRef.update({ linesOfService: updatedLinesOfService });

    // Retrieve the updated administrator document from Firestore
    const updatedAdministratorDoc = await administratorRef.get();
    const updatedAdministrator = updatedAdministratorDoc.data();

    return res.status(200).json({
      message: 'Line of service added to administrator successfully',
      administrator: updatedAdministrator,
    });
  } catch (error) {
    console.error('Error adding line of service to administrator:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
