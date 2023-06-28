import { useEffect, useState } from 'react';

// Constants
import routes from 'constants/routes';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// MUI
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  useTheme,
} from '@mui/material';

// React Router
import { Link, Outlet } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

export default function Navbar() {
  const auth = getAuth();
  const theme = useTheme();

  const [navLinks, setNavLinks] = useState([]);

  const { data: userData } = useSelector((state) => state.user);
  const { data: customerData } = useSelector((state) => state.customer);
  const { data: contractorData } = useSelector((state) => state.contractor);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const newNavLinks = [
          {
            name: 'Dashboard',
            route: `${routes.USER}/${userData?.uid}/dashboard`,
            variant: 'text',
          },
        ];

        // if (userData?.userType === 'customer') {
        //   newNavLinks.unshift({
        //     name: customerData?.[0]?.customerName ?? 'Customer Dashboard',
        //     route: `${routes.CUSTOMER}/${customerData?.[0]?.uid}/dashboard`,
        //     variant: 'text',
        //   });
        // } else if (userData?.userType === 'contractor') {
        //   newNavLinks.unshift({
        //     name: contractorData?.[0]?.contractorName ?? 'Contractor Dashboard',
        //     route: `${routes.CONTRACTOR}/${contractorData?.[0]?.uid}/dashboard`,
        //     variant: 'text',
        //   });
        // }

        setNavLinks(newNavLinks);
      } else {
        setNavLinks([
          {
            name: 'Login',
            route: routes.LOGIN,
            variant: 'contained',
          },
        ]);
      }
    });

    return () => unsubscribe();
  }, [auth, userData, customerData, contractorData]);

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
                <Button sx={{ textTransform: 'none' }}>Home</Button>
              </Link>

              {navLinks.map((navLink) => (
                <Link key={navLink.name} to={navLink.route}>
                  <Button
                    variant={navLink.variant}
                    onClick={navLink.onClick}
                    sx={{
                      textTransform: 'none',
                    }}
                  >
                    {navLink.name}
                  </Button>
                </Link>
              ))}
            </Toolbar>
          </AppBar>
        </Container>
      </Box>
      <Outlet />
    </>
  );
}
