import { useEffect, useState } from 'react';

// Constants
import UserType from 'constants/userType';

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
import { updateCustomer } from 'store/slices/customerSlice';
import { updateContractor } from 'store/slices/contractorSlice';

const ContactInformationComponent = ({ uid, data, userType, loading }) => {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);

  const handleEditSwitch = () => {
    setEditMode(!editMode);
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      primaryContact: {
        firstName: data?.primaryContact?.firstName,
        lastName: data?.primaryContact?.lastName,
        email: data?.email,
      },
    },
  });

  const onSubmit = (data) => {
    const updateData = {
      primaryContact: {
        firstName: data.primaryContact.firstName,
        lastName: data.primaryContact.lastName,
        email: data.primaryContact.email,
      },
    };

    if (userType === UserType.CUSTOMER)
      dispatch(updateCustomer({ uid, updateData }));

    if (userType === UserType.CONTRACTOR)
      dispatch(updateContractor({ uid, updateData }));

    setEditMode(false);
  };

  const missingInformation = <div>Mising information</div>;

  if (loading) return <p>Loading...</p>;

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <Grid container spacing={3} sx={{ mt: 0, mb: 3 }}>
          <Grid item xs={9}>
            <Typography variant='h6' sx={{ textDecoration: 'underline' }}>
              Contact Information
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
                defaultValue={data?.primaryContact?.firstName || ''}
                {...register('primaryContact.firstName')}
              />
            ) : (
              <>
                <Typography variant='subtitle2'>
                  Primary Contact Name
                </Typography>
                <Typography variant='p'>
                  {data?.primaryContact?.firstName}{' '}
                  {data?.primaryContact?.lastName}
                </Typography>
              </>
            )}
          </Grid>
          <Grid item xs={6}>
            {editMode ? (
              <TextField
                label='Last Name'
                defaultValue={data?.primaryContact?.lastName || ''}
                {...register('primaryContact.lastName')}
              />
            ) : null}
          </Grid>
          <Grid item xs={12}>
            {editMode ? (
              <TextField
                label='Email'
                fullWidth
                defaultValue={data?.primaryContact?.email || ''}
                {...register('primaryContact.email')}
              />
            ) : (
              <>
                <Typography variant='subtitle2'>
                  Primary Contact Email
                </Typography>
                <Typography variant='p'>
                  {data?.primaryContact?.email}
                </Typography>
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
                  Update Contact Information
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
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactInformationComponent;
