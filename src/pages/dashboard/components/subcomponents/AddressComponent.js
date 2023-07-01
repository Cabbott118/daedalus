import { useState } from 'react';
import UserType from 'constants/userType';
import states from 'constants/states.json';
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateCustomer } from 'store/slices/customerSlice';
import { updateContractor } from 'store/slices/contractorSlice';

const AddressComponent = ({ uid, data = {}, userType, loading }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      address: {
        addressLineOne: data?.address?.addressLineOne,
        city: data?.address?.city,
        state: data?.address?.state,
        zipCode: data?.address?.zipCode,
      },
    },
  });

  const handleEditSwitch = () => {
    setEditMode(!editMode);
  };

  const onSubmit = (data) => {
    const updateData = {
      address: {
        addressLineOne: data.address.addressLineOne,
        city: data.address.city,
        state: data.address.state,
        zipCode: data.address.zipCode,
      },
    };

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

  const renderMissingInformation = () => {
    return (
      <Grid item xs={12} sx={{ mt: -2 }}>
        <Typography variant='subtitle1'>
          Add a primary business address
        </Typography>
      </Grid>
    );
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <Grid container spacing={3} sx={{ mt: 0, mb: 3 }}>
          <Grid item xs={9}>
            <Typography variant='h6' sx={{ textDecoration: 'underline' }}>
              Address Information
            </Typography>
          </Grid>

          {data?.address ? (
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

          <Grid item xs={12}>
            {editMode || !data?.address ? (
              <TextField
                label='Address'
                fullWidth
                defaultValue={data?.address?.addressLineOne || ''}
                {...register('address.addressLineOne')}
              />
            ) : (
              <>
                <Typography variant='subtitle2'>Address</Typography>
                <Typography variant='p'>
                  {data?.address?.addressLineOne}
                </Typography>
              </>
            )}
          </Grid>

          <Grid item xs={12}>
            {editMode || !data?.address ? (
              <TextField
                label='City'
                fullWidth
                defaultValue={data?.address?.city || ''}
                {...register('address.city')}
              />
            ) : (
              <>
                <Typography variant='subtitle2'>City</Typography>
                <Typography variant='p'>{data?.address?.city}</Typography>
              </>
            )}
          </Grid>

          <Grid item xs={12}>
            {editMode || !data?.address ? (
              <TextField
                label='State'
                select
                fullWidth
                defaultValue={data?.address?.state || ''}
                {...register('address.state')}
              >
                {states.map((state) => (
                  <MenuItem key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <>
                <Typography variant='subtitle2'>State</Typography>
                <Typography variant='p'>{data?.address?.state}</Typography>
              </>
            )}
          </Grid>

          <Grid item xs={12}>
            {editMode || !data?.address ? (
              <TextField
                label='Zip Code'
                fullWidth
                defaultValue={data?.address?.zipCode || ''}
                {...register('address.zipCode')}
              />
            ) : (
              <>
                <Typography variant='subtitle2'>Zip Code</Typography>
                <Typography variant='p'>{data?.address?.zipCode}</Typography>
              </>
            )}
          </Grid>

          {editMode || !data?.address ? (
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
              {data?.address && (
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

export default AddressComponent;
