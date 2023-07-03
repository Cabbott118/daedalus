import { useState } from 'react';

// Components
import Logout from 'components/common/Logout';

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
import { useDispatch } from 'react-redux';
import { updateUser } from 'store/slices/userSlice';

const AccountComponent = ({ uid, userData, loading }) => {
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  const handleEditSwitch = () => {
    setEditMode(!editMode);
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: {
        firstName: userData?.fullName?.firstName,
        lastName: userData?.fullName?.lastName,
      },
      email: userData?.email,
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
    setEditMode(false);
  };

  if (loading) return <p>loading...</p>;

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <Grid container spacing={3} sx={{ mt: 0, mb: 3 }}>
          <Grid item xs={9}>
            <Typography variant='h6' sx={{ textDecoration: 'underline' }}>
              Personal Information
            </Typography>
          </Grid>
          <Grid item xs={3}>
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
                <Typography variant='p'>
                  {userData?.fullName?.firstName} {userData?.fullName?.lastName}
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
                <Typography variant='p'>{userData?.email}</Typography>
              </>
            )}
          </Grid>
          {editMode && (
            <>
              <Grid item xs={12} sx={{ mb: -2 }}>
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
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant='text'
                  onClick={handleEditSwitch}
                  disabled={loading}
                  sx={{ textTransform: 'none' }}
                >
                  Cancel
                </Button>
              </Grid>
            </>
          )}
          <Grid item>
            <Logout />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AccountComponent;
