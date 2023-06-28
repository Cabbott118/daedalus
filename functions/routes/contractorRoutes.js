// contractorRoutes.js
const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

router.post('/create-contractor', async (req, res) => {
  try {
    const { ownerId, contractorName } = req.body;
    const newContractor = {
      ownerId,
      contractorName,
      uid: '',
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

router.get('/get-contractor-details', async (req, res) => {
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

module.exports = router;
