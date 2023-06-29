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

router.post('/create-service-ticket', async (req, res) => {
  try {
    const { uid, companyReceivingServices, reasonForServices } = req.body;
    const newTicket = {
      createdBy: uid,
      status: 'new',
      companyReceivingServices,
      reasonForServices,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const ticketRef = admin.firestore().collection('serviceTickets').doc();
    await ticketRef.set(newTicket);
    const ticketId = ticketRef.id;

    // Retrieve the created user data from Firestore
    const createdTicketDoc = await admin
      .firestore()
      .collection('serviceTickets')
      .doc(ticketId)
      .get();

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

const createNotificationOnTicketCreation = functions.firestore
  .document('serviceTickets/{ticketId}')
  .onCreate(async (snapshot, context) => {
    try {
      const ticketId = context.params.ticketId;

      // Create a new notification document
      const notificationData = {
        ticketId,
        notificationType: 'service ticket',
        hasBeenRead: false,
        ticketOwner: snapshot.data().createdBy,
        message: 'A new service ticket has been created',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const notificationRef = await admin
        .firestore()
        .collection('notifications')
        .add(notificationData);

      const uid = notificationRef.id;

      // Update the notification document with the uid field
      await notificationRef.update({ uid });

      console.log('New notification ID:', uid);
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  });

const createNotificationOnStatusChange = functions.firestore
  .document('serviceTickets/{ticketId}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();
    const ticketId = context.params.ticketId;

    // Check if the status field changed from "new" to "assigned"
    if (newValue.status === 'assigned' && previousValue.status === 'new') {
      try {
        // Create a new notification document in the notifications collection
        const notificationRef = admin
          .firestore()
          .collection('notifications')
          .doc(); // Use uid as the document ID

        const uid = notificationRef.id;

        // Set the notification properties
        const notificationData = {
          uid, // Add the uid field
          ticketId,
          notificationType: 'service ticket',
          hasBeenRead: false,
          ticketOwner: newValue.createdBy, // Access createdBy from the newValue object
          message: 'Your ticket has been assigned',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        // Add or update the notification document
        await notificationRef.set(notificationData);

        console.log('Notification created:', notificationRef.id);
      } catch (error) {
        console.error('Error creating notification:', error);
      }
    }
  });

module.exports = {
  router,
  createNotificationOnTicketCreation,
  createNotificationOnStatusChange,
};
