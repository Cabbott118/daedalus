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
  Toolbar,
  useTheme,
} from '@mui/material';

// React Router
import { Link, Outlet } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from 'store/slices/notificationsSlice';

// Notifications component
import Notifications from 'pages/notifications/Notifications';

export default function Navbar() {
  const auth = getAuth();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [navLinks, setNavLinks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(null);

  const { data: userData } = useSelector((state) => state.user);
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
  }, [
    auth,
    // userData, customerData, contractorData
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Function to run every 10 seconds
      console.log('Running every 10 seconds');
      dispatch(fetchNotifications(userData?.uid));
    }, 10000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filteredNotifications = notificationsData?.filter(
      (notification) => !notification?.notificationHasBeenRead
    );
    setUnreadNotifications(filteredNotifications?.length);
  }, [notificationsData]);

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
              {auth?.currentUser && (
                <Button
                  aria-haspopup='true'
                  aria-controls='notifications-menu'
                  onClick={handleNotificationsClick}
                  sx={{
                    textTransform: 'none',
                  }}
                >
                  <Badge
                    badgeContent={unreadNotifications}
                    // badgeContent={notificationsData?.length}
                    color='error'
                  >
                    Notifications
                  </Badge>
                </Button>
              )}
              <Menu
                id='notifications-menu'
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleNotificationsClose}
              >
                <Notifications onClose={handleNotificationsClose} />
              </Menu>
            </Toolbar>
          </AppBar>
        </Container>
      </Box>
      <Outlet />
    </>
  );
}
