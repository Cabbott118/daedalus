import { useEffect, useState } from 'react';

// Components
import Alert from 'components/common/Alert';
import AuthenticationHeader from 'pages/auth/components/AuthenticationHeader';
import AuthenticationFooter from 'pages/auth/components/AuthenticationFooter';

// Constants
import routes from 'constants/routes';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Helpers
import errorTransformer from 'constants/errorTransformer';

// MUI
import { Box, Button, Container, Grid, TextField } from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// React Router
import { Navigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearUserData, fetchUser } from 'store/slices/userSlice';

export default function Login() {
  const pageName = 'Login';
  document.title = pageName;

  const auth = getAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAlertShowing, setIsAlertShowing] = useState(false);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(clearUserData());
    dispatch(loginUser({ email, password }));
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await dispatch(fetchUser(user.uid));
      }
    });
    return () => unsubscribe();
  }, [auth, dispatch]);

  if (data) {
    return <Navigate to={routes.HOME} replace />;
  }

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <AuthenticationHeader title={pageName} />
        <Grid container spacing={3}>
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
              error={errors.password?.type === 'required'}
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
              Login
            </Button>
          </Grid>
        </Grid>
        <AuthenticationFooter type={pageName} />
      </Container>
    </Box>
  );
}
