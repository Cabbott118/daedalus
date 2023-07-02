import { useState } from 'react';

// Components
import Alert from 'components/common/Alert';

// Constants
import routes from 'constants/routes';

// MUI
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch } from 'react-redux';
import {
  createServiceTicket,
  clearServiceTicketData,
} from 'store/slices/serviceTicketSlice';

const CreateServiceTicketDialog = ({ userId: uid, customerData }) => {
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = ({ reasonForServices }) => {
    dispatch(
      createServiceTicket({
        uid,
        customerName: customerData?.businessName,
        customerId: customerData?.uid,
        reasonForServices,
      })
    );
    setDialogOpen(false);
  };

  return (
    <>
      <Button
        fullWidth
        variant='contained'
        color='primary'
        onClick={handleClickOpenDialog}
        sx={{ textTransform: 'none' }}
      >
        Create Service Ticket
      </Button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{ minWidth: '20rem' }}
        >
          <DialogTitle>{`Service Ticket for ${customerData?.businessName}`}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 0 }}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  label='Describe your issue'
                  multiline
                  rows={4}
                  fullWidth
                  {...register('reasonForServices', { required: true })}
                  error={errors.reasonForServices?.type === 'required'}
                  helperText={
                    errors.reasonForServices?.type === 'required' &&
                    'A description of the issue is required'
                  }
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} sx={{ textTransform: 'none' }}>
              Cancel
            </Button>
            <Button type='submit' sx={{ textTransform: 'none' }}>
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default CreateServiceTicketDialog;
