// Constants
import routes from 'constants/routes';

// MUI
import { Grid } from '@mui/material';

// React Router
import { Link } from 'react-router-dom';

const linkStyles = {
  color: '#fff',
  fontSize: '.9rem',
};

const AuthenticationFooter = ({ type }) => {
  switch (type) {
    case 'Login':
      return (
        <Grid container sx={{ mt: '1rem' }}>
          <Grid item xs>
            <Link to='/forgot-password' style={linkStyles}>
              Forgot password?
            </Link>
          </Grid>
          {/* <Grid item>
            <Link to={routes.SIGNUP} style={linkStyles}>
              Don't have an account? Sign up
            </Link>
          </Grid> */}
        </Grid>
      );

    case 'Sign up':
      return (
        <Grid container justifyContent='flex-end' sx={{ mt: '1rem' }}>
          <Grid item>
            <Link to={routes.LOGIN} style={linkStyles}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      );

    case 'Sign up as a Customer':
      return (
        <Grid container justifyContent='flex-end' sx={{ mt: '1rem' }}>
          <Grid item>
            <Link to={routes.LOGIN} style={linkStyles}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      );

    case 'Sign up as a Contractor':
      return (
        <Grid container justifyContent='flex-end' sx={{ mt: '1rem' }}>
          <Grid item>
            <Link to={routes.LOGIN} style={linkStyles}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      );

    default:
      return;
  }
};

export default AuthenticationFooter;
