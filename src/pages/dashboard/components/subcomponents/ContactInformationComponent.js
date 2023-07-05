import { useEffect, useState } from 'react';
import UserType from 'constants/userType';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateCustomer } from 'store/slices/customerSlice';
import { updateContractor } from 'store/slices/contractorSlice';

const ContactInformationComponent = ({
  uid,
  data = {},
  userType,
  userData,
  loading,
}) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { register, handleSubmit, setValue } = useForm({});

  useEffect(() => {
    setValue('primaryContact.firstName', data?.primaryContact?.firstName);
    setValue('primaryContact.lastName', data?.primaryContact?.lastName);
    setValue('primaryContact.email', data?.primaryContact?.email);
  }, [
    data?.primaryContact?.firstName,
    data?.primaryContact?.lastName,
    data?.primaryContact?.email,
    setValue,
  ]);

  const handleEditSwitch = () => {
    setEditMode(!editMode);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  const onSubmit = (data) => {
    let updateData = {};
    if (isChecked) {
      updateData = {
        primaryContact: {
          firstName: userData?.fullName?.firstName,
          lastName: userData?.fullName?.lastName,
          email: userData?.email,
        },
      };
    } else {
      updateData = {
        primaryContact: {
          firstName: data.primaryContact.firstName,
          lastName: data.primaryContact.lastName,
          email: data.primaryContact.email,
        },
      };
    }

    switch (userType) {
      case UserType.CUSTOMER:
        dispatch(updateCustomer({ uid, updateData }));
        break;
      case UserType.CONTRACTOR:
        dispatch(updateContractor({ uid, updateData }));
        break;
      default:
        break;
    }

    setEditMode(false);
  };

  const renderMissingInformation = () => (
    <Grid item xs={12} sx={{ mt: -2 }}>
      <Typography variant='subtitle1'>
        Add a primary business contact
      </Typography>
      <FormControlLabel
        control={
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        }
        label={`Use ${userData?.fullName?.firstName} ${userData?.fullName?.lastName} as primary contact`}
      />
      <Typography variant='body2'>or</Typography>
    </Grid>
  );

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

          {data?.primaryContact ? (
            <Grid item xs={3}>
              <Button
                onClick={handleEditSwitch}
                disabled={editMode}
                sx={{ textTransform: 'none' }}
              >
                Edit
              </Button>
            </Grid>
          ) : (
            renderMissingInformation()
          )}

          <Grid item xs={6}>
            {editMode || !data?.primaryContact ? (
              <TextField
                label='First Name'
                {...register('primaryContact.firstName')}
                disabled={isChecked}
              />
            ) : (
              <>
                <Typography variant='subtitle2'>Name</Typography>
                <Typography variant='p'>
                  {data?.primaryContact?.firstName}{' '}
                  {data?.primaryContact?.lastName}
                </Typography>
              </>
            )}
          </Grid>

          <Grid item xs={6}>
            {editMode || !data?.primaryContact ? (
              <TextField
                label='Last Name'
                {...register('primaryContact.lastName')}
                disabled={isChecked}
              />
            ) : null}
          </Grid>

          <Grid item xs={12}>
            {editMode || !data?.primaryContact ? (
              <TextField
                label='Email'
                fullWidth
                {...register('primaryContact.email')}
                disabled={isChecked}
              />
            ) : (
              <>
                <Typography variant='subtitle2'>Email Address</Typography>
                <Typography variant='p'>
                  {data?.primaryContact?.email}
                </Typography>
              </>
            )}
          </Grid>

          {editMode || !data?.primaryContact ? (
            <>
              <Grid item xs={12}>
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
              {data?.primaryContact && (
                <Grid item xs={12} sx={{ mt: -2 }}>
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
              )}
            </>
          ) : null}
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactInformationComponent;
