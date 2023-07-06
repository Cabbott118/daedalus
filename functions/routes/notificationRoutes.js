//notificationRoutes.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

router.get('/get-notifications', async (req, res) => {
  try {
    const userId = req.query.userId;
    const notificationsRef = admin.firestore().collection('notifications');
    const querySnapshot = await notificationsRef
      .where('notificationOwner', '==', userId)
      .orderBy('createdAt', 'desc') // Add orderBy clause
      .get();

    if (querySnapshot.empty) {
      return res
        .status(404)
        .json({ message: 'No notifications found for the specified owner' });
    }

    const notificationData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(notificationData);
  } catch (error) {
    console.error('Error retrieving notification details:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.patch('/update-notification', async (req, res) => {
  try {
    const { uid, updateData } = req.body;
    await admin
      .firestore()
      .collection('notifications')
      .doc(uid)
      .update(updateData);
    // Retrieve the updated notification data from Firestore
    const updatedNotificationDoc = await admin
      .firestore()
      .collection('notifications')
      .doc(uid)
      .get();
    const updatedNotification = updatedNotificationDoc.data();
    return res.status(200).json({
      message: 'Notification document updated successfully',
      notification: updatedNotification,
    });
  } catch (error) {
    console.error('Error updating notification document', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

const createNotificationOnTicketCreation = functions.firestore
  .document('serviceTickets/{ticketId}')
  .onCreate(async (snapshot, context) => {
    try {
      const ticketId = context.params.ticketId;

      // Create a new notification document
      console.log(snapshot.data());
      const notificationData = {
        ticketId,
        notificationType: 'service ticket',
        hasBeenRead: false,
        notificationOwner: snapshot.data().createdBy,
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

const createNotificationOnTicketAssignment = functions.firestore
  .document('serviceTickets/{ticketId}')
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();
    const ticketId = context.params.ticketId;

    // Check if the status field changed from "new" to "assigned"
    if (newValue.contractorId) {
      try {
        const contractorsRef = admin.firestore().collection('contractors');
        const contractorSnapshot = await contractorsRef
          .doc(newValue.contractorId)
          .get();

        if (contractorSnapshot.exists) {
          const contractorData = contractorSnapshot.data();
          const ownerId = contractorData.ownerId;

          // Create a new notification document in the notifications collection
          const notificationRef = admin
            .firestore()
            .collection('notifications')
            .doc();

          const uid = notificationRef.id;

          // Set the notification properties
          const notificationData = {
            uid,
            ticketId,
            notificationType: 'service ticket',
            hasBeenRead: false,
            notificationOwner: ownerId,
            message: 'You have been assigned a ticket',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
          };

          // Add or update the notification document
          await notificationRef.set(notificationData);

          console.log('Notification created:', notificationRef.id);
        } else {
          console.error('Contractor document not found');
        }
      } catch (error) {
        console.error('Error creating notification:', error);
      }
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
          notificationOwner: newValue.createdBy, // Access createdBy from the newValue object
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
  createNotificationOnTicketAssignment,
  createNotificationOnStatusChange,
};
