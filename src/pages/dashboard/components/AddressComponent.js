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
  Select,
} from '@mui/material';

// React Hook Form
import { useForm, Controller } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, clearData } from 'store/slices/userSlice';

const AddressComponent = ({ uid }) => {
  const dispatch = useDispatch();
  const { data, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

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
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <Grid container spacing={3} sx={{ mt: 0, mb: 3 }}>
          <Grid item xs={12}>
            <Typography variant='h6' sx={{ fontSize: '1rem' }}>
              Address Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Address'
              fullWidth
              {...register('address.addressLineOne')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label='City' fullWidth {...register('address.city')} />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Zip Code'
              fullWidth
              {...register('address.zipCode')}
            />
          </Grid>
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
        </Grid>
      </Container>
    </Box>
  );
};

export default AddressComponent;
