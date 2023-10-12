import { useEffect, useState } from 'react';

// MUI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

const ServiceTicketModal = ({ open, onClose, serviceTicket }) => {
  if (!serviceTicket) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Service Ticket Details</DialogTitle>
      <DialogContent>
        {/* Display the serviceTicket data here */}
        <Typography>{serviceTicket.titleForServices}</Typography>
        <Typography>{serviceTicket.owner.name}</Typography>
        {/* Add other details as needed */}
      </DialogContent>
    </Dialog>
  );
};

export default ServiceTicketModal;
