// serviceTicketRoutes.js
// const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Firestore } = require('firebase-admin/firestore');
const express = require('express');
const router = express.Router();

router.post('/create-service-ticket', async (req, res) => {
  try {
    const {
      userId,
      customerId,
      customerName,
      titleForServices,
      reasonForServices,
      lineOfService,
      notToExceed,
      serviceProviderId,
      street,
      city,
      state,
      zipCode,
    } = req.body;

    // Function to query the 'contractors' collection
    const queryContractors = admin
      .firestore()
      .collection('contractors')
      .doc(serviceProviderId)
      .get();

    // Function to query the 'administrators' collection
    const queryAdministrators = admin
      .firestore()
      .collection('administrators')
      .doc(serviceProviderId)
      .get();

    // Wait for both queries to complete
    const [contractorSnapshot, administratorSnapshot] = await Promise.all([
      queryContractors,
      queryAdministrators,
    ]);

    const newTicket = {
      status: 'new',
      assigned: false,
      customer: {
        id: customerId,
        name: customerName,
        createdByUserId: userId,
        address: {
          street,
          city,
          state,
          zipCode,
        },
      },
      titleForServices,
      reasonForServices,
      lineOfService,
      notToExceed,
      serviceProvider: {
        id: serviceProviderId,
        // Check if a document was found in 'contractors' or 'administrators'
        name: contractorSnapshot.exists
          ? contractorSnapshot.data().name
          : administratorSnapshot.data().name,
      },
      createdAt: Firestore.FieldValue.serverTimestamp(),
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

// Super admin
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

router.get('/get-service-ticket-details', async (req, res) => {
  try {
    const ticketId = req.query.ticketId;
    const ticketRef = admin
      .firestore()
      .collection('serviceTickets')
      .doc(ticketId);
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

router.get('/get-service-tickets-created-by', async (req, res) => {
  try {
    const customerId = req.query.customerId;
    const ticketsRef = admin.firestore().collection('serviceTickets');
    const querySnapshot = await ticketsRef
      .where('customer.id', '==', customerId)
      .orderBy('createdAt', 'desc')
      .get(); // Initialize the query

    if (querySnapshot.empty) {
      return res.status(404).json({
        message: 'No service tickets found for the specified business',
      });
    }

    const ticketsData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(ticketsData);
  } catch (error) {
    console.error('Error retrieving ticket details:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-service-tickets-assigned-to-provider', async (req, res) => {
  try {
    const serviceProviderId = req.query.serviceProviderId;
    const ticketsRef = admin.firestore().collection('serviceTickets');
    const querySnapshot = await ticketsRef
      .where('serviceProvider.id', '==', serviceProviderId)
      .orderBy('createdAt', 'desc')
      .get(); // Initialize the query

    if (querySnapshot.empty) {
      return res.status(404).json({
        message: 'No service tickets found for the specified contractor',
      });
    }

    const ticketsData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(ticketsData);
  } catch (error) {
    console.error('Error retrieving ticket details: ', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/get-service-tickets-assigned-to-technician', async (req, res) => {
  try {
    const technicianId = req.query.technicianId;
    const ticketsRef = admin.firestore().collection('serviceTickets');
    const querySnapshot = await ticketsRef
      .where('serviceProvider.technician.id', '==', technicianId)
      .orderBy('createdAt', 'desc')
      .get(); // Initialize the query

    if (querySnapshot.empty) {
      return res.status(404).json({
        message: 'No service tickets found for the specified technician',
      });
    }

    const ticketsData = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(ticketsData);
  } catch (error) {
    console.error('Error retrieving ticket details: ', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/update-service-ticket-status', async (req, res) => {
  try {
    const { ticketId, status } = req.body;
    await admin
      .firestore()
      .collection('serviceTickets')
      .doc(ticketId)
      .update({ status });
    // Retrieve the updated service ticket data from Firestore
    const updatedTicketDoc = await admin
      .firestore()
      .collection('serviceTickets')
      .doc(ticketId)
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

router.patch('/update-service-ticket-technician', async (req, res) => {
  try {
    const { ticketId, technicianId, firstName, lastName } = req.body;
    const serviceTicketRef = admin
      .firestore()
      .collection('serviceTickets')
      .doc(ticketId);

    const fieldPath = new Firestore.FieldPath('serviceProvider', 'technician');

    // Construct the update object with the specific field to update
    const updateObject = {};
    updateObject[fieldPath] = {
      id: technicianId,
      fullName: {
        firstName,
        lastName,
      },
    };

    await serviceTicketRef.update(updateObject);

    // Retrieve the updated service ticket data from Firestore
    const updatedTicketDoc = await serviceTicketRef.get();
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
