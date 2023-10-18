import { useEffect, useState } from 'react';

// Components
import Drawer from 'components/layout/Drawer';
import Logout from 'components/common/Logout';

import { ReactComponent as DaedalusFlying } from 'assets/images/daedalus.svg';

// Constants
import routes from 'constants/routes';
// import UserType from 'constants/userType';

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

// Helpers
import getUserInitials from 'services/helpers/getUserInitials';

// MUI
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import Settings from '@mui/icons-material/Settings';

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

  const [businessData, setBusinessData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(null);

  const { data: userData } = useSelector((state) => state.user);

  const { data: administratorData } = useSelector(
    (state) => state.administrator
  );

  const { data: contractorData } = useSelector((state) => state.contractor);

  const { data: customerData } = useSelector((state) => state.customer);

  const { data: technicianData } = useSelector((state) => state.technician);

  const { data: notificationsData } = useSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    const filteredNotifications = notificationsData?.filter(
      (notification) => !notification?.hasBeenRead
    );
    setUnreadNotifications(filteredNotifications?.length);
  }, [notificationsData]);

  useEffect(() => {
    const dataToUse = [
      administratorData,
      contractorData,
      customerData,
      technicianData,
    ].find((data) => data?.uid);

    if (dataToUse) {
      setBusinessData(dataToUse);

      const q = query(
        collection(db, 'notifications'),
        where('notificationOwner', '==', dataToUse.uid),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const notificationData = snapshot.docs.map((doc) => doc.data());
        dispatch(fetchNotifications(dataToUse.uid));
      });

      return () => unsubscribe();
    }
  }, [administratorData, contractorData, customerData, technicianData, db]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
              {userData ? (
                isMobile ? (
                  <>
                    <Drawer
                      userData={userData}
                      businessData={businessData}
                      unreadNotifications={unreadNotifications}
                      sx={{ position: 'relative' }}
                    />
                    <Badge
                      badgeContent={unreadNotifications}
                      color='error'
                      sx={{
                        position: 'absolute',
                        top: 20,
                        right: 25,
                      }}
                    />
                  </>
                ) : (
                  <>
                    <Tooltip title='Menu'>
                      <IconButton
                        onClick={handleClick}
                        size='small'
                        sx={{ ml: 2, position: 'relative' }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup='true'
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <Avatar>{getUserInitials(userData?.fullName)}</Avatar>
                        <Badge
                          badgeContent={unreadNotifications}
                          color='error'
                          sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </>
                )
              ) : (
                <MenuItem
                  component={Link}
                  to={routes.LOGIN}
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                  }}
                >
                  Login
                </MenuItem>
              )}
            </Toolbar>
          </AppBar>
        </Container>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        sx={{
          mt: 1.5,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem component={Link} to={routes.NOTIFICATIONS}>
          <Typography variant='inherit' sx={{ mr: 3 }}>
            Notifications
          </Typography>
          <Badge badgeContent={unreadNotifications} color='error' />
        </MenuItem>
        <Divider />
        <Typography variant='overline' sx={{ ml: 2 }}>
          Account
        </Typography>
        <MenuItem component={Link} to={routes.PROFILE}>
          My profile
        </MenuItem>
        <Divider />
        <Typography variant='overline' sx={{ ml: 2 }}>
          Business
        </Typography>

        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <Logout />
      </Menu>
      <Outlet />
    </>
  );
}
