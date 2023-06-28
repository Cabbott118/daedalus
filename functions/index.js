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

app.use('/user', userRoutes);
app.use('/customer', customerRoutes);
app.use('/contractor', contractorRoutes);
app.use('/service-ticket', serviceTicketRoutes.router);
app.use('/notification', notificationRoutes);

// Import the notification functions from serviceTicketRoutes.js
const {
  createNotificationOnTicketCreation,
  createNotificationOnStatusChange,
} = require('./routes/serviceTicketRoutes');

// Assign the notification functions as Firebase Cloud Functions
exports.createNotificationOnTicketCreation = createNotificationOnTicketCreation;
exports.createNotificationOnStatusChange = createNotificationOnStatusChange;

exports.api = functions.https.onRequest(app);
