const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

router.post('/create-service-ticket', async (req, res) => {
  try {
    const { uid } = req.body;
    const newTicket = {
      createdBy: uid,
      status: 'new',
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

const createNotificationOnTicketCreation = functions.firestore
  .document('serviceTickets/{ticketId}')
  .onCreate(async (snapshot, context) => {
    try {
      const { ticketId } = context.params;

      // Create a new notification document
      const notificationData = {
        ticketId,
        message: 'New ticket created',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      await admin.firestore().collection('notifications').add(notificationData);
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  });

const createNotificationOnStatusChange = functions.firestore
  .document('serviceTickets/{ticketId}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();

    // Check if the status field changed from "new" to "assigned"
    if (newValue.status === 'assigned' && previousValue.status === 'new') {
      // Create a new notification document in the notifications collection
      const notificationRef = admin
        .firestore()
        .collection('notifications')
        .doc();

      // Set the notification properties
      await notificationRef.set({
        ticketId: context.params.ticketId,
        message: 'Ticket assigned. Please take action.',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log('Notification created:', notificationRef.id);
    }
  });

module.exports = {
  router,
  createNotificationOnTicketCreation,
  createNotificationOnStatusChange,
};
