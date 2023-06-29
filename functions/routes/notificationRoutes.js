//notificationRoutes.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const router = express.Router();

router.get('/get-notifications', async (req, res) => {
  try {
    const createdBy = req.query.createdBy;
    const notificationsRef = admin.firestore().collection('notifications');
    const querySnapshot = await notificationsRef
      .where('ticketOwner', '==', createdBy)
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

exports.notificationListener = functions.firestore
  .document('notifications/{notificationId}')
  .onCreate(async (snapshot, context) => {
    // Get the newly created notification data
    const newNotification = snapshot.data();
    // Perform any desired actions with the new notification data
    console.log('New notification:', newNotification);
  });

module.exports = router;
