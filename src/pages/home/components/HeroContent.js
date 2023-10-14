// Constants
import routes from 'constants/routes';

// MUI
import { Button, Grid, Typography, useTheme } from '@mui/material';

// React Router
import { Link, useNavigate } from 'react-router-dom';

const HeroContent = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // const handleCustomerClick = () => {
  //   navigate(routes.CUSTOMER_ENROLLMENT);
  // };

  // const handleContractorClick = () => {
  //   navigate(routes.CONTRACTOR_ENROLLMENT);
  // };

  return (
    <Grid
      container
      direction='column'
      justifyContent='space-between'
      alignItems='center'
      sx={{ height: '70%' }}
    >
      <Grid item></Grid>
      <Grid
        item
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={3}
        sx={{ px: 4 }}
      >
        <Grid item>
          <Typography
            variant='h4'
            component='h1'
            align='center'
            sx={{ color: 'white', fontWeight: '700', pb: 1 }}
          >
            Service Requests, Made Simple
          </Typography>
          <Typography
            variant='subtitle'
            component='h4'
            align='center'
            sx={{ color: 'white', fontWeight: '300' }}
          >
            Connect with industry leading service providers of all trades.
          </Typography>
        </Grid>
        <Grid item sx={{ mt: 8 }}>
          <Button
            variant='contained'
            fullWidth
            component={Link}
            to='/signup'
            sx={{
              width: '300px',
              color: '#fff',
              borderColor: '#fff',
              '&:hover': {
                color: '#eee',
                borderColor: '#eee',
              },
            }}
          >
            Take Flight
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant='text'
            fullWidth
            sx={{
              width: '300px',
              color: '#fff',
              borderColor: '#fff',
              '&:hover': {
                color: '#eee',
                borderColor: '#eee',
              },
            }}
          >
            About Daedalus
          </Button>
        </Grid>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
};

export default HeroContent;
