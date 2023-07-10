// Constants
import routes from 'constants/routes';

// MUI
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';

// React Router
import { useNavigate } from 'react-router-dom';

const HeroContent = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate(routes.CUSTOMER_ENROLLMENT);
  };

  const handleContractorClick = () => {
    navigate(routes.CONTRACTOR_ENROLLMENT);
  };

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      sx={{ height: '50%' }}
    >
      <Grid item>
        <Typography
          variant='h3'
          component='h1'
          align='center'
          // color='primary'
          sx={{ color: 'white' }}
        >
          Welcome to Daedalus
        </Typography>
      </Grid>
      <Grid item sx={{ pb: 3 }}>
        <Typography
          variant='body1'
          component='h4'
          align='center'
          sx={{ color: 'white', px: '1rem' }}
        >
          Whether you're looking for a reliable service provider or are a
          skilled professional hoping to showcase your expertise, Daedalus
          empowers you to effortlessly connect and collaborate
        </Typography>
      </Grid>
      <Grid item sx={{ minWidth: '250px', mt: '10px' }}>
        <Button
          variant='outlined'
          fullWidth
          sx={{
            // textTransform: 'none',
            color: '#fff',
            borderColor: '#fff',
            '&:hover': {
              color: '#eee',
              borderColor: '#eee',
            },
          }}
        >
          Get Started
        </Button>
      </Grid>
      <Grid item sx={{ minWidth: '250px', mt: '10px' }}>
        <Button
          variant='outlined'
          fullWidth
          sx={{
            // textTransform: 'none',
            color: '#fff',
            borderColor: '#fff',
            '&:hover': {
              color: '#eee',
              borderColor: '#eee',
            },
          }}
        >
          About Us
        </Button>
      </Grid>
    </Grid>
  );
};

export default HeroContent;
