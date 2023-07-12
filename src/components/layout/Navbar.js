import { useEffect, useState } from 'react';

// Components
import Notifications from 'pages/notifications/components/Notifications';
import { ReactComponent as DaedalusFlying } from 'assets/images/daedalus.svg';

// Constants
import routes from 'constants/routes';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

// MUI
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';

// React Router
import { Link, Outlet } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from 'store/slices/notificationsSlice';

export default function Navbar() {
  const theme = useTheme();
  const auth = getAuth();
  const db = getFirestore();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [navLinks, setNavLinks] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(null);

  const { data: userData } = useSelector((state) => state.user);
  const { data: notificationsData, loading: notificationsLoading } =
    useSelector((state) => state.notifications);

  useEffect(() => {
    const filteredNotifications = notificationsData?.filter(
      (notification) => !notification?.hasBeenRead
    );
    setUnreadNotifications(filteredNotifications?.length);
  }, [notificationsData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setNavLinks([
          {
            name: 'Dashboard',
            route: `${routes.DASHBOARD.replace(':uid', user?.uid)}`,
            variant: 'text',
          },
          {
            name: 'Notifications',
            route: `${routes.NOTIFICATIONS.replace(':uid', user?.uid)}`,
            variant: 'text',
            badgeContent: unreadNotifications,
          },
        ]);
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
  }, [auth, unreadNotifications]);

  useEffect(() => {
    if (!userData?.uid) return;

    const q = query(
      collection(db, 'notifications'),
      where('notificationOwner', '==', userData?.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationData = snapshot.docs.map((doc) => doc.data());
      dispatch(fetchNotifications(userData?.uid));
    });

    return () => unsubscribe();
  }, [userData, db]);

  const toggleDrawer = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(!isDrawerOpen);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {navLinks.map((navLink) => (
          <ListItem key={navLink.name} disablePadding>
            <ListItemButton component={Link} to={navLink.route}>
              <ListItemText primary={navLink.name} />
              {navLink.badgeContent > 0 && (
                <Badge badgeContent={navLink.badgeContent} color='error' />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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

              {isMobile ? (
                <IconButton color='primary' onClick={toggleDrawer}>
                  <MenuIcon />
                </IconButton>
              ) : (
                <>
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
                        {navLink.badgeContent ? (
                          <Badge
                            badgeContent={navLink.badgeContent}
                            color='error'
                          >
                            {navLink.name}
                          </Badge>
                        ) : (
                          navLink.name
                        )}
                      </Button>
                    </Link>
                  ))}
                </>
              )}
            </Toolbar>
          </AppBar>
          <Drawer anchor='right' open={isDrawerOpen} onClose={toggleDrawer}>
            {list()}
          </Drawer>
        </Container>
      </Box>
      <Outlet />
    </>
  );
}
