const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();

const app = express();
app.use(cors({ origin: true }));

// Import route modules
const userRoutes = require('./routes/users/userRoutes');
const administratorRoutes = require('./routes/administrators/administratorRoutes');
const customerRoutes = require('./routes/customers/customerRoutes');
const contractorRoutes = require('./routes/contractors/contractorRoutes');
const technicianRoutes = require('./routes/technicians/technicianRoutes');
const businesRoutes = require('./routes/businessRoutes');
const serviceTicketRoutes = require('./routes/serviceTickets/serviceTicketRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

app.use('/users', userRoutes);
app.use('/administrators', administratorRoutes);
app.use('/customers', customerRoutes);
app.use('/contractors', contractorRoutes);
app.use('/technicians', technicianRoutes);
app.use('/businesses', businesRoutes);
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
