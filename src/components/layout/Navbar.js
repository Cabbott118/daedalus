import { useEffect, useState } from 'react';

// Components
import Notifications from 'pages/notifications/components/Notifications';
// import { ReactComponent as DaedalusFlying } from 'assets/images/daedalus-flying.svg';
import { ReactComponent as DaedalusFlying } from 'assets/images/daedalus.svg';

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
  const theme = useTheme();
  const auth = getAuth();
  const dispatch = useDispatch();

  const [navLinks, setNavLinks] = useState([]);

  const { data: userData } = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
      <Box
        sx={{
          flexGrow: 1,
          // bgcolor: theme.palette.secondary.main,
        }}
      >
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
                    color: theme.palette.text.primary,
                  }}
                >
                  <DaedalusFlying
                    height='50px'
                    width='50px'
                    style={{
                      fill: theme.palette.primary.main,
                      marginBottom: -10,
                    }}
                  />
                </Button>
              </Link>

              {navLinks.map((navLink) => (
                <Link key={navLink.name} to={navLink.route}>
                  <Button
                    variant={navLink.variant}
                    onClick={navLink.onClick}
                    sx={{
                      textTransform: 'none',
                      color: theme.palette.text.primary,
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
