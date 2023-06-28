//notificationRoutes.js
const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

router.get('/get-notifications', async (req, res) => {
  try {
    const createdBy = req.query.createdBy;
    const notificationsRef = admin.firestore().collection('notifications');
    const querySnapshot = await notificationsRef
      .where('ticketOwner', '==', createdBy)
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

module.exports = router;
