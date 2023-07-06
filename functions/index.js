const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

// Import route modules
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const contractorRoutes = require('./routes/contractorRoutes');
const serviceTicketRoutes = require('./routes/serviceTicketRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

app.use('/users', userRoutes);
app.use('/customers', customerRoutes);
app.use('/contractors', contractorRoutes);
app.use('/service-tickets', serviceTicketRoutes);
app.use('/notifications', notificationRoutes.router);

// Import the notification functions from notificationRoutes.js
const {
  createNotificationOnTicketCreation,
  createNotificationOnTicketAssignment,
  createNotificationOnStatusChange,
} = require('./routes/notificationRoutes');

// Assign the notification functions as Firebase Cloud Functions
exports.createNotificationOnTicketCreation = createNotificationOnTicketCreation;
exports.createNotificationOnTicketAssignment =
  createNotificationOnTicketAssignment;
exports.createNotificationOnStatusChange = createNotificationOnStatusChange;

exports.api = functions.https.onRequest(app);
