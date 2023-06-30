import { useEffect, useState } from 'react';

// Components
import Alert from 'components/common/Alert';
import AuthenticationHeader from 'pages/auth/components/AuthenticationHeader';
import AuthenticationFooter from 'pages/auth/components/AuthenticationFooter';

// Constants
import routes from 'constants/routes';

// Helpers
import passwordMatch from 'services/helpers/passwordMatch';
import errorTransformer from 'constants/errorTransformer';

// MUI
import { Box, Button, Container, Grid, TextField } from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  signUpUser,
  createUser,
  updateUser,
  clearUserData,
} from 'store/slices/userSlice';
import { createCustomer } from 'store/slices/customerSlice';

export default function CustomerEnrollment() {
  const pageName = 'Sign up as a Customer';
  document.title = pageName;

  const [showPassword, setShowPassword] = useState(false);
  const [passwordMissmatch, setPasswordMissmatch] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAlertShowing, setIsAlertShowing] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { businessName, fullName, email, password, confirmPassword } = data;
    if (passwordMatch(password, confirmPassword)) {
      dispatch(clearUserData());
      dispatch(signUpUser({ email, password })).then((action) => {
        dispatch(
          createUser({
            email,
            uid: action.payload.uid,
            fullName,
            userType: 'customer',
          })
        );
        dispatch(createCustomer({ businessName, ownerId: action.payload.uid }));
      });
    } else {
      setPasswordMissmatch(true);
    }
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(errorTransformer(error));
      setIsAlertShowing(true);
      setTimeout(() => {
        dispatch(clearUserData());
        setIsAlertShowing(false);
      }, 5000);
    }
  }, [error]);

  if (isAuthenticated) {
    return <Navigate to={routes.HOME} replace />;
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <AuthenticationHeader title={pageName} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              label='Business name'
              fullWidth
              {...register('businessName', { required: true })}
              error={errors.businessName?.type === 'required'}
              helperText={
                errors.businessName?.type === 'required' &&
                'Business name is required'
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='First name'
              {...register('fullName.firstName', { required: true })}
              error={errors.fullName?.firstName?.type === 'required'}
              helperText={
                errors.fullName?.firstName?.type === 'required' &&
                'First name is required'
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Last name'
              {...register('fullName.lastName', { required: true })}
              error={errors.fullName?.lastName?.type === 'required'}
              helperText={
                errors.fullName?.lastName?.type === 'required' &&
                'Last name is required'
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
            <TextField
              label='Password'
              type={showPassword ? 'text' : 'password'}
              fullWidth
              {...register('password', { required: true })}
              error={errors.password?.type === 'required' || passwordMissmatch}
              helperText={
                errors.password?.type === 'required' && 'Password is required'
              }
              InputProps={{
                endAdornment: (
                  <Button
                    variant='text'
                    color='secondary'
                    onClick={handleClickShowPassword}
                    sx={{ textTransform: 'none' }}
                  >
                    {!showPassword ? 'Show' : 'Hide'}
                  </Button>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Confirm password'
              type='password'
              fullWidth
              {...register('confirmPassword', { required: true })}
              error={
                errors.confirmPassword?.type === 'required' || passwordMissmatch
              }
              helperText={
                (errors.confirmPassword?.type === 'required' &&
                  'Confirm password is required') ||
                (passwordMissmatch === true && 'Passwords do not match')
              }
            />
          </Grid>
          {isAlertShowing && (
            <Grid item xs={12}>
              <Alert text={errorMessage} severity='error' />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant='contained'
              type='submit'
              fullWidth
              disabled={loading}
              sx={{ textTransform: 'none' }}
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
        <AuthenticationFooter type={pageName} />
      </Container>
    </Box>
  );
}
