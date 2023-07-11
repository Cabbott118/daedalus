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
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Menu,
  Typography,
  useTheme,
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
  const theme = useTheme();

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

    const q = query(
      collection(db, 'notifications'),
      where('notificationOwner', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationData = snapshot.docs.map((doc) => doc.data());
      dispatch(fetchNotifications(userId));
    });

    return () => unsubscribe();
  }, [userId, db]);

  const handleMarkAsRead = (notification) => {
    if (!notification.hasBeenRead) {
      const uid = notification.uid;
      const updateData = {
        hasBeenRead: true,
      };
      dispatch(updateNotification({ uid, updateData }));
    }

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
            color: theme.palette.text.primary,
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
          <Grid container justifyContent='space-between'>
            <Grid item xs={9}>
              <Typography variant='h6'>Notifications</Typography>
            </Grid>
            <Grid item xs={3}>
              {notificationsData?.length !== 0 && (
                <Link to={`${routes.NOTIFICATIONS.replace(':uid', userId)}`}>
                  <Button
                    onClick={handleNotificationsClose}
                    sx={{
                      textTransform: 'none',
                      color: theme.palette.text.primary,
                    }}
                  >
                    See All
                  </Button>
                </Link>
              )}
            </Grid>
          </Grid>
          <Divider />
          {notificationsLoading ? (
            <Typography variant='body1'>Loading notifications...</Typography>
          ) : (
            <>
              {notificationsData?.length !== 0 ? (
                <List dense={true}>
                  {notificationsData?.map((notification, index) => (
                    <ListItem
                      key={index}
                      disablePadding
                      sx={{
                        bgcolor: notification.hasBeenRead ? null : '#102A43',
                        borderRadius: '5px',
                      }}
                    >
                      <ListItemButton
                        component={Link}
                        to={`${routes.SERVICE_TICKET}/${notification.ticketId}`}
                        onClick={() => {
                          handleMarkAsRead(notification);
                        }}
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
                            color: theme.palette.text.primary,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Container sx={{ p: '1rem' }}>
                  <Typography
                    variant='body1'
                    sx={{ color: theme.palette.text.primary }}
                  >
                    No notifications to display
                  </Typography>
                </Container>
              )}
            </>
          )}
        </Container>
      </Menu>
    </>
  );
};

export default Notifications;
