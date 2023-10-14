// technicianRoutes.js
const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

router.post('/create-technician', async (req, res) => {
  try {
    const { firstName, lastName, ownerId } = req.body;
    const newTechnician = {
      fullName: {
        firstName,
        lastName,
      },
      ownerId,
    };

    const newTechnicianRef = await admin
      .firestore()
      .collection('technicians')
      .add(newTechnician);

    // Retrieve the document ID
    const technicianId = newTechnicianRef.id;
    await newTechnicianRef.update({ uid: technicianId });

    // Retrieve the created technician data from Firestore
    const createdTechnicianDoc = await newTechnicianRef.get();
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

    const doc = querySnapshot.docs[0]; // Assuming only one document is returned
    const technicianData = doc.data();

    return res.status(200).json(technicianData); // Update response message and variable names
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
