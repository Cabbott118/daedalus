// MUI
import { Typography } from '@mui/material';

const WelcomeBanner = ({ userData, theme }) => {
  return (
    <Typography variant='h4' component='h1'>
      <b style={{ color: theme.palette.primary.main }}>Welcome,</b>{' '}
      {userData?.fullName?.firstName}
    </Typography>
  );
};

export default WelcomeBanner;
