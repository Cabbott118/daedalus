import { useEffect, useState } from 'react';

// Constants
import routes from 'constants/routes';

// MUI
import { Box, Container, Typography, useTheme } from '@mui/material';

// React Router
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordConfirmation() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimeout(() => {
      navigate(routes.LOGIN);
    }, 5000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  return (
    <Box
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
          Check your inbox
        </Typography>
        <Typography
          variant='body1'
          sx={{ color: theme.palette.text.secondary, marginBottom: '1rem' }}
        >
          We've sent an email containing a link to reset your password.
        </Typography>
        <Typography
          variant='body1'
          sx={{ color: theme.palette.text.secondary, marginBottom: '2rem' }}
        >
          You'll be automatically redirected to the Login Page in {timer} second
          {timer !== 1 && 's'}.
        </Typography>
      </Container>
    </Box>
  );
}
