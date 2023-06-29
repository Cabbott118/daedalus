import { useEffect, useState } from 'react';

// Components
import Notifications from 'pages/notifications/components/Notifications';

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
import { useDispatch, useSelector } from 'react-redux';

export default function Navbar() {
  const auth = getAuth();
  const dispatch = useDispatch();

  const [navLinks, setNavLinks] = useState([]);

  const { data: userData } = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        const newNavLinks = [
          {
            name: 'Dashboard',
            route: `${routes.DASHBOARD.replace(':uid', user?.uid)}`,
            variant: 'text',
          },
        ];
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
  }, [auth]);

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
              <Notifications userId={userData?.uid} />
            </Toolbar>
          </AppBar>
        </Container>
      </Box>
      <Outlet />
    </>
  );
}
