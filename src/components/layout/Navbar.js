import { useEffect, useState } from 'react';

// Constants
import routes from 'constants/routes';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// MUI
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  useTheme,
} from '@mui/material';

// React Router
import { Link, Outlet } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

// Notifications component
import Notifications from 'pages/notifications/Notifications';

export default function Navbar() {
  const auth = getAuth();
  const theme = useTheme();

  const [navLinks, setNavLinks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const { data: userData } = useSelector((state) => state.user);
  const { data: customerData } = useSelector((state) => state.customer);
  const { data: contractorData } = useSelector((state) => state.contractor);
  const { data: notificationsData } = useSelector(
    (state) => state.notifications
  );

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

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

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

              <Button
                aria-haspopup='true'
                aria-controls='notifications-menu'
                onClick={handleNotificationsClick}
                sx={{
                  textTransform: 'none',
                }}
              >
                <Badge badgeContent={notificationsData?.length} color='error'>
                  Notifications
                </Badge>
              </Button>
              <Menu
                id='notifications-menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleNotificationsClose}
              >
                <MenuItem>
                  <Notifications uid={userData?.uid} />
                </MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Container>
      </Box>
      <Outlet />
    </>
  );
}
