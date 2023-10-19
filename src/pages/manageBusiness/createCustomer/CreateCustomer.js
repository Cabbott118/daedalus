import { useState } from 'react';

// Constants
import UserType from 'constants/userType';
import serviceTypes from 'constants/serviceTypes';
import states from 'constants/states.json';

// MUI
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { createFirebaseUser } from 'store/slices/userSlice';
import { createCustomer } from 'store/slices/customerSlice';

const CreateCustomer = () => {
  const dispatch = useDispatch();

  const [selectedLinesOfService, setSelectedLinesOfService] = useState([]);

  const { data: userData, loading: userLoading } = useSelector(
    (state) => state.user
  );

  const { data: administratorData, loading: administratorLoading } =
    useSelector((state) => state.administrator);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleServiceTypeChange = (event) => {
    const serviceType = event.target.name;
    setSelectedLinesOfService((prevSelected) => {
      if (prevSelected.includes(serviceType)) {
        // Deselect the service type if it was previously selected
        return prevSelected.filter((item) => item !== serviceType);
      } else {
        // Select the service type if it was not previously selected
        return [...prevSelected, serviceType];
      }
    });
  };

  const onSubmit = (data) => {
    const {
      email,
      firstName,
      lastName,
      companyName,
      street,
      city,
      zipCode,
      state,
    } = data;

    const ownerId = administratorData?.uid;
    dispatch(
      createFirebaseUser({
        email,
        firstName,
        lastName,
        userType: 'customer',
      })
    ).then((action) => {
      dispatch(
        createCustomer({
          companyName,
          predefinedLinesOfService: selectedLinesOfService,
          ownerId,
          street,
          city,
          zipCode,
          state,
          firstName,
          lastName,
          primaryContactId: action.payload.uid,
          email,
          contactId: action.payload.uid,
        })
      );
    });
  };

  if (userData?.userType !== UserType.ADMINISTRATOR) return null;

  return (
    <>
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth='xs'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant='h6' component='h1' sx={{ mb: 1 }}>
                Business Information
              </Typography>
              <TextField
                label='Name of Company'
                fullWidth
                {...register('companyName', { required: true })}
                error={errors.companyName?.type === 'required'}
                helperText={
                  errors.companyName?.type === 'required' &&
                  'Last Name is required'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Street Address'
                fullWidth
                {...register('street', { required: true })}
                error={errors.street?.type === 'required'}
                helperText={
                  errors.street?.type === 'required' &&
                  'Street Address is required'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='City'
                fullWidth
                {...register('city', { required: true })}
                error={errors.city?.type === 'required'}
                helperText={
                  errors.city?.type === 'required' && 'City is required'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='State'
                select
                fullWidth
                defaultValue={'FL'}
                {...register('state')}
              >
                {states.map((state) => (
                  <MenuItem key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Zip Code'
                fullWidth
                {...register('zipCode', { required: true })}
                error={errors.zipCode?.type === 'required'}
                helperText={
                  errors.zipCode?.type === 'required' && 'Zip Code is required'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel component='legend'>
                Assign services this Customer accepts
              </FormLabel>
              <FormGroup>
                {serviceTypes.map((service) => (
                  <FormControlLabel
                    key={service.name}
                    control={
                      <Checkbox
                        checked={selectedLinesOfService.includes(service.name)}
                        onChange={handleServiceTypeChange}
                        name={service.name}
                        size='small'
                      />
                    }
                    label={service.name}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' component='h1' sx={{ mb: 1 }}>
                Primary Contact Information
              </Typography>
              <TextField
                label='First Name'
                fullWidth
                {...register('firstName', { required: true })}
                error={errors.firstName?.type === 'required'}
                helperText={
                  errors.firstName?.type === 'required' &&
                  'First Name is required'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Last Name'
                fullWidth
                {...register('lastName', { required: true })}
                error={errors.lastName?.type === 'required'}
                helperText={
                  errors.lastName?.type === 'required' &&
                  'Last Name is required'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Email'
                fullWidth
                {...register('email', { required: true })}
                error={errors.email?.type === 'required'}
                helperText={
                  errors.email?.type === 'required' && 'Email is required'
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                type='submit'
                fullWidth
                sx={{ textTransform: 'none' }}
              >
                Create Customer
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CreateCustomer;
