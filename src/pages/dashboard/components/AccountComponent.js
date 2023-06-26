import { useState } from 'react';

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

// Services
import { changeEmail } from 'services/firebaseServices';

const AccountComponent = ({ uid }) => {
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const handleEditSwitch = () => {
    setEditMode(true);
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
    const updateData = {
      fullName: {
        firstName: data.fullName.firstName,
        lastName: data.fullName.lastName,
      },
      email: data.email,
    };
    dispatch(updateUser({ uid, updateData }));
    changeEmail(data.email);
    setEditMode(false);
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <Grid container spacing={3} sx={{ mt: 0, mb: 3 }}>
          <Grid item xs={10}>
            <Typography variant='h6'>Personal Information</Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={handleEditSwitch}
              disabled={editMode}
              sx={{ textTransform: 'none' }}
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={6}>
            {editMode ? (
              <TextField
                label='First Name'
                {...register('fullName.firstName')}
              />
            ) : (
              <>
                <Typography variant='subtitle2'>Name</Typography>
                <Typography>
                  {data?.fullName?.firstName} {data?.fullName?.lastName}
                </Typography>
              </>
            )}
          </Grid>
          <Grid item xs={6}>
            {editMode ? (
              <TextField label='Last Name' {...register('fullName.lastName')} />
            ) : null}
          </Grid>
          <Grid item xs={12}>
            {editMode ? (
              <TextField label='Email' fullWidth {...register('email')} />
            ) : (
              <>
                <Typography variant='subtitle2'>Email Address</Typography>
                <Typography>{data?.email}</Typography>
              </>
            )}
          </Grid>
          {editMode && (
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
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default AccountComponent;
