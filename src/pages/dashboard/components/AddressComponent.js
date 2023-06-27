import { useState } from 'react';

// Constants
import states from 'constants/states.json';

// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, clearData } from 'store/slices/userSlice';

const AddressComponent = ({ uid }) => {
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const handleEditSwitch = () => {
    setEditMode(!editMode);
  };

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

  const onSubmit = (data) => {
    const updateData = {
      address: {
        addressLineOne: data.address.addressLineOne,
        city: data.address.city,
        state: data.address.state,
        zipCode: data.address.zipCode,
      },
    };
    dispatch(updateUser({ uid, updateData }));
    setEditMode(false);
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <Grid container spacing={3} sx={{ mt: 0, mb: 3 }}>
          <Grid item xs={9}>
            <Typography variant='h6'>Address Information</Typography>
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
          <Grid item xs={12}>
            {editMode ? (
              <TextField
                label='Address'
                fullWidth
                defaultValue={data?.address?.addressLineOne || ''}
                {...register('address.addressLineOne')}
              />
            ) : (
              <>
                <Typography variant='subtitle2'>Address</Typography>
                <Typography>{data?.address?.addressLineOne}</Typography>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            {editMode ? (
              <TextField
                label='City'
                fullWidth
                defaultValue={data?.address?.city || ''}
                {...register('address.city')}
              />
            ) : (
              <>
                <Typography variant='subtitle2'>City</Typography>
                <Typography>{data?.address?.city}</Typography>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            {editMode ? (
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
                <Typography>{data?.address?.state}</Typography>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            {editMode ? (
              <TextField
                label='Zip Code'
                fullWidth
                defaultValue={data?.address?.zipCode || ''}
                {...register('address.zipCode')}
              />
            ) : (
              <>
                <Typography variant='subtitle2'>Zip Code</Typography>
                <Typography>{data?.address?.zipCode}</Typography>
              </>
            )}
          </Grid>
          {editMode && (
            <>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant='contained'
                  type='submit'
                  disabled={loading}
                  sx={{ textTransform: 'none' }}
                >
                  Update Address
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

export default AddressComponent;
