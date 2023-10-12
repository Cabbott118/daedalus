import { useEffect, useState } from 'react';

// Constants
import routes from 'constants/routes';

// MUI
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from '@mui/material';

// React Router
import { Link } from 'react-router-dom';

const ServiceTicketModal = ({ open, onClose, serviceTicket }) => {
  const theme = useTheme();
  if (!serviceTicket) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Service Ticket Details</DialogTitle>
      <DialogContent>
        {/* Display the serviceTicket data here */}
        <Chip
          label='TODO - Add Content'
          variant='filled'
          color='success'
          size='small'
          sx={{ textTransform: 'capitalize', mr: 1 }}
        />
        <Typography variant='body1'>
          {serviceTicket.titleForServices}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{ textTransform: 'none', color: theme.palette.text.primary }}
        >
          Close
        </Button>

        <Button
          variant='contained'
          type='submit'
          component={Link}
          to={`${routes.SERVICE_TICKET}/${serviceTicket.uid}`}
          sx={{ textTransform: 'none' }}
        >
          Go to Ticket
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceTicketModal;
