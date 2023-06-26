import { useState } from 'react';

// Components
import Alert from 'components/common/Alert';

// Constants
import routes from 'constants/routes';

// Helpers
import errorTransformer from 'constants/errorTransformer';

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
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, clearData } from 'store/slices/userSlice';

const DeleteDialog = ({ userId: uid }) => {
  const [isAlertShowing, setIsAlertShowing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const handleClickOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: {
        firstName: data?.fullName?.firstName,
        lastName: data?.fullName?.lastName,
      },
      email: data?.email,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const updateData = {
      fullName: {
        firstName: data.fullName.firstName,
        lastName: data.fullName.lastName,
      },
      email: data.email,
    };

    dispatch(updateUser({ uid, updateData }));
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
        Update Details
      </Button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <Box component='form' onSubmit={handleSubmit(onSubmit)}>
          <Container maxWidth='xs'>
            <DialogTitle>{'Update your information'}</DialogTitle>
            <DialogContent>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={6}>
                  <TextField
                    autoFocus
                    label='First Name'
                    {...register('fullName.firstName')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label='Last Name'
                    {...register('fullName.lastName')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField label='Email' fullWidth {...register('email')} />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDialog}
                sx={{ textTransform: 'none' }}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={loading}
                sx={{ textTransform: 'none' }}
              >
                Update Details
              </Button>
            </DialogActions>
          </Container>
        </Box>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
