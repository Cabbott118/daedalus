import { useEffect, useState } from 'react';

// Constants
import routes from 'constants/routes';

// Firebase
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from 'firebase/firestore'; // Add necessary imports

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';

// MUI
import {
  Badge,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Menu,
  Typography,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

// React Router
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNotifications,
  updateNotification,
} from 'store/slices/notificationsSlice';

const Notifications = ({ userId }) => {
  const auth = getAuth();
  const db = getFirestore();
  const dispatch = useDispatch();

  const [unreadNotifications, setUnreadNotifications] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const { data: notificationsData, loading: notificationsLoading } =
    useSelector((state) => state.notifications);

  useEffect(() => {
    const filteredNotifications = notificationsData?.filter(
      (notification) => !notification?.hasBeenRead
    );
    setUnreadNotifications(filteredNotifications?.length);
  }, [notificationsData]);

  useEffect(() => {
    if (!userId) return;
    // Set up the onSnapshot listener for real-time updates
    const q = query(
      collection(db, 'notifications'),
      where('ticketOwner', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationData = snapshot.docs.map((doc) => doc.data());
      dispatch(fetchNotifications(userId)); // Fetch notifications to update the Redux store
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [userId, db]);

  const handleMarkAsRead = (uid) => {
    const updateData = {
      hasBeenRead: true,
    };
    dispatch(updateNotification({ uid, updateData }));
    setAnchorEl(null);
  };

  const handleNotificationsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {auth?.currentUser && (
        <Button
          aria-haspopup='true'
          aria-controls='notifications-menu'
          onClick={handleNotificationsClick}
          sx={{
            textTransform: 'none',
          }}
        >
          <Badge badgeContent={unreadNotifications} color='error'>
            Notifications
          </Badge>
        </Button>
      )}
      <Menu
        id='notifications-menu'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleNotificationsClose}
      >
        <Container>
          <Typography variant='h6'>Notifications</Typography>
          <Divider />
          {notificationsLoading ? (
            <Typography variant='body1'>Loading notifications...</Typography>
          ) : (
            <>
              {notificationsData?.length !== 0 ? (
                <List dense={true}>
                  {notificationsData?.map((notification, index) => (
                    <ListItem key={notification.uid} disablePadding>
                      <ListItemButton
                        component={Link}
                        to={`${routes.SERVICE_TICKET}/${notification.ticketId}`}
                        onClick={() => handleMarkAsRead(notification.uid)}
                      >
                        {!notification.hasBeenRead && (
                          <ListItemIcon>
                            <CircleIcon
                              color='primary'
                              sx={{ fontSize: '.5rem' }}
                            />
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={notification.message}
                          secondary={formatCreatedAt(notification.createdAt)}
                          inset={notification.hasBeenRead ? true : undefined}
                          primaryTypographyProps={{
                            fontWeight: notification.hasBeenRead
                              ? '400'
                              : '600',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant='body1'>
                  No notifications to display
                </Typography>
              )}
            </>
          )}
        </Container>
      </Menu>
    </>
  );
};

export default Notifications;
