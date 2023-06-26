// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, clearData } from 'store/slices/userSlice';

const AccountComponent = ({ uid }) => {
  const dispatch = useDispatch();
  const { data, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

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
    const updateData = {
      fullName: {
        firstName: data.fullName.firstName,
        lastName: data.fullName.lastName,
      },
      email: data.email,
    };
    dispatch(updateUser({ uid, updateData }));
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <Grid container spacing={3} sx={{ mt: 0, mb: 3 }}>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ fontSize: '1rem' }}>
              Personal Information
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField label='First Name' {...register('fullName.firstName')} />
          </Grid>
          <Grid item xs={6}>
            <TextField label='Last Name' {...register('fullName.lastName')} />
          </Grid>
          <Grid item xs={12}>
            <TextField label='Email' fullWidth {...register('email')} />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant='contained'
              type='submit'
              disabled={loading}
              sx={{ textTransform: 'none' }}
            >
              Update Details
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AccountComponent;
