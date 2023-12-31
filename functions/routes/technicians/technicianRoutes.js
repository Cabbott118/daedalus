// technicianRoutes.js
const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

router.post('/create-technician', async (req, res) => {
  try {
    const { firstName, lastName, ownerId, userId } = req.body;
    const newTechnician = {
      uid: userId,
      fullName: {
        firstName,
        lastName,
      },
      ownerId,
    };

    await admin
      .firestore()
      .collection('technicians')
      .doc(userId)
      .set(newTechnician);

    const createdTechnicianDoc = await admin
      .firestore()
      .collection('technicians')
      .doc(userId)
      .get();

    const createdTechnician = createdTechnicianDoc.data();
    return res.status(201).json({
      message: 'Technician document created successfully',
      technician: createdTechnician,
    });
  } catch (error) {
    console.error('Error creating technician document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-all-technicians', async (req, res) => {
  try {
    const techniciansRef = admin.firestore().collection('technicians');
    const querySnapshot = await techniciansRef.get();
    const techniciansData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(techniciansData);
  } catch (error) {
    console.error('Error retrieving contractors:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-technician-details-by-owner-id', async (req, res) => {
  try {
    const ownerId = req.query.ownerId;
    const techniciansRef = admin.firestore().collection('technicians'); // Update collection name to 'technicians'
    const querySnapshot = await techniciansRef
      .where('ownerId', '==', ownerId)
      .get();

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ message: 'No technician found for the specified owner' }); // Update the response message
    }

    const technicianDataArray = [];

    // Iterate over the documents to collect all results
    querySnapshot.forEach((doc) => {
      const technicianData = doc.data();
      technicianDataArray.push(technicianData);
    });

    return res.status(200).json(technicianDataArray); // Update response message and variable names
  } catch (error) {
    console.error('Error retrieving technician details:', error); // Update error message
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-technician-by-id', async (req, res) => {
  try {
    const technicianId = req.query.technicianId;
    const techniciansRef = admin.firestore().collection('technicians'); // Update collection name to 'technicians'
    const doc = await techniciansRef.doc(technicianId).get();

    if (!doc.exists) {
      return res
        .status(404)
        .json({ message: 'No technician found for the specified ID' });
    }

    const technicianData = doc.data();

    return res.status(200).json(technicianData);
  } catch (error) {
    console.error('Error retrieving technician details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
