// Constants
import UserType from 'constants/userType';
import routes from 'constants/routes';

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
import { createTechnician } from 'store/slices/technicianSlice';

const CreateTechnician = () => {
  const dispatch = useDispatch();

  const { data: userData, loading: userLoading } = useSelector(
    (state) => state.user
  );

  const { data: administratorData, loading: administratorLoading } =
    useSelector((state) => state.administrator);

  const { data: contractorData, loading: contractorLoading } = useSelector(
    (state) => state.contractor
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { email, firstName, lastName } = data;

    let ownerId;
    if (administratorData) {
      ownerId = administratorData?.uid;
    } else {
      ownerId = contractorData?.uid;
    }
    dispatch(
      createFirebaseUser({
        email,
        firstName,
        lastName,
        userType: 'technician',
      })
    ).then((action) => {
      dispatch(
        createTechnician({
          firstName,
          lastName,
          ownerId,
          userId: action.payload.uid,
        })
      );
    });
  };

  if (
    userData?.userType !== UserType.ADMINISTRATOR &&
    userData?.userType !== UserType.CONTRACTOR
  ) {
    return null;
  }

  return (
    <>
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth='xs'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant='h6' component='h1' sx={{ mb: 1 }}>
                Technician Information
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
                Create Technician
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CreateTechnician;
