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

const CreateServiceTicketDialog = ({ userId: uid, businessData }) => {
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

  const onSubmit = ({
    titleForServices,
    typeOfServices,
    reasonForServices,
  }) => {
    dispatch(
      createServiceTicket({
        uid,
        ownerId: businessData?.uid,
        ownerName: businessData?.businessName,
        titleForServices,
        typeOfServices,
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
          <DialogTitle>{`Service Ticket for ${businessData?.businessName}`}</DialogTitle>
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
                  {...register('typeOfServices', { required: true })}
                  error={errors.typeOfServices?.type === 'required'}
                  helperText={
                    errors.typeOfServices?.type === 'required' &&
                    'The type of service is required'
                  }
                >
                  {services.map((service) => (
                    <MenuItem key={service.value} value={service.value}>
                      {service.name}
                    </MenuItem>
                  ))}
                </TextField>
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
