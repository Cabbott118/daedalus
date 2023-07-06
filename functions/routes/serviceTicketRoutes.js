// serviceTicketRoutes.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

router.get('/get-service-ticket-details', async (req, res) => {
  try {
    const uid = req.query.uid;
    const ticketRef = admin.firestore().collection('serviceTickets').doc(uid);
    const ticketDoc = await ticketRef.get();

    if (!ticketDoc.exists) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const ticketDetails = ticketDoc.data();
    return res.status(200).json(ticketDetails);
  } catch (error) {
    console.error('Error retrieving ticket details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-all-service-tickets', async (req, res) => {
  try {
    const ticketsRef = admin.firestore().collection('serviceTickets');
    let query = ticketsRef; // Initialize the query

    const querySnapshot = await query.orderBy('createdAt', 'desc').get(); // Execute the query
    const ticketsData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(ticketsData);
  } catch (error) {
    console.error('Error retrieving ticket details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-service-tickets-assigned-to', async (req, res) => {
  try {
    const uid = req.query.uid;
    const ticketsRef = admin.firestore().collection('serviceTickets');
    const querySnapshot = await ticketsRef
      .where('contractorId', '==', uid)
      .orderBy('contractorId', 'desc')
      .get(); // Initialize the query

    if (querySnapshot.empty) {
      return res.status(404).json({
        message: 'No service tickets found for the specified contractor',
      });
    }

    const ticketsData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(ticketsData);
  } catch (error) {
    console.error('Error retrieving ticket details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-service-tickets-created-by', async (req, res) => {
  try {
    const uid = req.query.uid;
    const ticketsRef = admin.firestore().collection('serviceTickets');
    const querySnapshot = await ticketsRef
      .where('createdBy', '==', uid)
      .orderBy('createdAt', 'desc')
      .get(); // Initialize the query

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ message: 'No service tickets found for the specified owner' });
    }

    const ticketsData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(ticketsData);
  } catch (error) {
    console.error('Error retrieving ticket details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/create-service-ticket', async (req, res) => {
  try {
    const { uid, customerName, customerId, reasonForServices } = req.body;
    const newTicket = {
      createdBy: uid,
      status: 'new',
      assigned: false,
      customerName,
      customerId,
      reasonForServices,
      uid: '',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const ticketRef = await admin
      .firestore()
      .collection('serviceTickets')
      .add(newTicket);

    const ticketId = ticketRef.id;
    await ticketRef.update({ uid: ticketId });

    const createdTicketDoc = await ticketRef.get();
    const createdTicket = createdTicketDoc.data();

    return res.status(201).json({
      message: 'Service ticket document created successfully',
      ticket: createdTicket,
    });
  } catch (error) {
    console.error('Error creating service ticket document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/update-service-ticket', async (req, res) => {
  try {
    const { uid, updateData } = req.body;
    await admin
      .firestore()
      .collection('serviceTickets')
      .doc(uid)
      .update(updateData);
    // Retrieve the updated service ticket data from Firestore
    const updatedTicketDoc = await admin
      .firestore()
      .collection('serviceTickets')
      .doc(uid)
      .get();
    const updatedTicket = updatedTicketDoc.data();
    return res.status(200).json({
      message: 'Service ticket document updated successfully',
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error('Error updating service ticket document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
