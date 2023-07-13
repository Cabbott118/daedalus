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
  const db = getFirestore();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { data: notificationsData, loading: notificationsLoading } =
    useSelector((state) => state.notifications);

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

  const handleMarkAsRead = (uid) => {
    const updateData = {
      hasBeenRead: true,
    };
    dispatch(updateNotification({ uid, updateData }));
  };

  return (
    <>
      <Container maxWidth='md'>
        <Typography variant='h6' sx={{ color: theme.palette.text.primary }}>
          Notifications
        </Typography>

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
                      bgcolor: notification.hasBeenRead
                        ? null
                        : theme.additionalPalette.primary,
                      borderRadius: '5px',
                    }}
                  >
                    <ListItemButton
                      component={Link}
                      to={`${routes.SERVICE_TICKET}/${notification.ticketId}`}
                      onClick={() => {
                        !notification.hasBeenRead &&
                          handleMarkAsRead(notification.uid);
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
                          color: theme.palette.text.primary,
                          fontWeight: notification.hasBeenRead ? '400' : '600',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant='body1' sx={{ my: 3 }}>
                No notifications to display
              </Typography>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Notifications;
