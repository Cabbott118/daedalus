import { useState } from 'react';

// Constants
import routes from 'constants/routes';

// Firebase
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

// MUI
import {
  Button,
  Box,
  Container,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// React Router
import { Link, useNavigate } from 'react-router-dom';

const linkStyles = {
  color: '#124559',
  fontSize: '.9rem',
};

export default function ForgotPassword() {
  const auth = getAuth();
  const theme = useTheme();
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setIsError(false);
    try {
      await sendPasswordResetEmail(auth, data.email);
      navigate(routes.FORGOT_PASSWORD_CONFRIMATION);
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Container maxWidth='xs'>
        <Typography
          variant='h1'
          sx={{
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: theme.palette.text.primary,
          }}
        >
          Reset your password
        </Typography>
        <Typography
          variant='body1'
          sx={{ color: theme.palette.text.secondary, mb: '2rem' }}
        >
          Enter the email address associated with your account and we'll send
          you a link to reset your password.
        </Typography>
        <TextField
          label='Email Address'
          type='email'
          fullWidth
          autoFocus
          {...register('email', { required: true })}
          error={errors.email?.type === 'required' || isError}
          helperText={
            (errors.email?.type === 'required' && 'Email is required') ||
            (isError ? 'This email address was not found' : null)
          }
        />
        <Button
          variant='contained'
          type='submit'
          fullWidth
          sx={{ mt: 3, mb: 2, textTransform: 'none' }}
        >
          Send Email
        </Button>
        <Link to={routes.SIGNUP} style={linkStyles}>
          Don't have an account? Sign up
        </Link>
      </Container>
    </Box>
  );
}
