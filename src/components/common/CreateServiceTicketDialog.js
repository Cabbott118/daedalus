import { useState } from 'react';

// Components
import Alert from 'components/common/Alert';

// Constants
import services from 'constants/serviceTypes';

// Constants
import routes from 'constants/routes';

// MUI
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
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

const CreateServiceTicketDialog = ({ userId, customerData }) => {
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const dispatch = useDispatch();

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(value);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = ({
    titleForServices,
    lineOfService,
    notToExceed,
    reasonForServices,
  }) => {
    dispatch(
      createServiceTicket({
        userId,
        customerId: customerData?.uid,
        customerName: customerData?.name,
        titleForServices,
        lineOfService,
        notToExceed,
        reasonForServices,
        serviceProviderId: customerData?.ownerId,
        street: customerData?.primaryAddress.street,
        city: customerData?.primaryAddress.city,
        state: customerData?.primaryAddress.state,
        zipCode: customerData?.primaryAddress.zipCode,
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
        sx={{ textTransform: 'none', mt: 3 }}
      >
        Create Service Ticket
      </Button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          sx={{ minWidth: '20rem' }}
        >
          <DialogTitle>{`Service Ticket for ${customerData?.name}`}</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 0 }}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  label='Ticket Title'
                  fullWidth
                  {...register('titleForServices', { required: true })}
                  error={errors.titleForServices?.type === 'required'}
                  helperText={
                    errors.titleForServices?.type === 'required' &&
                    'A title the issue is required'
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Service Type'
                  select
                  fullWidth
                  defaultValue={''}
                  {...register('lineOfService', { required: true })}
                  error={errors.lineOfService?.type === 'required'}
                  helperText={
                    errors.lineOfService?.type === 'required' &&
                    'The type of service is required'
                  }
                >
                  {customerData?.predefinedLinesOfService.map((service) => (
                    <MenuItem key={service} value={service}>
                      {service}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='Not to Exceed'
                  type='number'
                  fullWidth
                  onChange={handleAmountChange}
                  // Use InputProps to customize the input field
                  InputProps={{
                    startAdornment: (
                      <div style={{ marginRight: '8px', color: '#777' }}>$</div>
                    ),
                  }}
                  {...register('notToExceed', { required: true })}
                  error={errors.notToExceed?.type === 'required'}
                  helperText={
                    errors.notToExceed?.type === 'required' &&
                    'A not to exceed value is required'
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
            <Button
              variant='contained'
              type='submit'
              sx={{ textTransform: 'none' }}
            >
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default CreateServiceTicketDialog;
