// Constants
import routes from 'constants/routes';

// MUI
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  useTheme,
} from '@mui/material';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// React Router
import { Link, Outlet } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

export default function Navbar() {
  const theme = useTheme();
  const { data: userData } = useSelector((state) => state.user);
  const { data: customerData } = useSelector((state) => state.customer);
  const { data: contractorData } = useSelector((state) => state.contractor);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth='md'>
          <AppBar
            position='static'
            color='transparent'
            sx={{ boxShadow: 'none' }}
          >
            <Toolbar>
              <Link to={routes.HOME} style={{ flexGrow: 1 }}>
                <Button
                  sx={{
                    textTransform: 'none',
                  }}
                >
                  Home
                </Button>
              </Link>

              {userData?.userType === 'customer' && (
                <Link to={`${routes.CUSTOMER}/${customerData?.uid}/dashboard`}>
                  <Button
                    sx={{
                      textTransform: 'none',
                    }}
                  >
                    {customerData?.testTitle}
                  </Button>
                </Link>
              )}

              {userData?.userType === 'contractor' && (
                <Link
                  to={`${routes.CONTRACTOR}/${contractorData?.uid}/dashboard`}
                >
                  <Button
                    sx={{
                      textTransform: 'none',
                    }}
                  >
                    {contractorData?.testTitle}
                  </Button>
                </Link>
              )}

              <Link to={`${routes.USER}/${userData?.uid}/dashboard`}>
                <Button
                  sx={{
                    textTransform: 'none',
                  }}
                >
                  {userData?.fullName?.firstName}
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Container>
      </Box>
      <Outlet />
    </>
  );
}
