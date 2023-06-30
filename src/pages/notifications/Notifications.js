import { useEffect } from 'react';

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

  const { data: notificationsData, loading: notificationsLoading } =
    useSelector((state) => state.notifications);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, 'notifications'),
      where('ticketOwner', '==', userId),
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
        <Typography variant='h6'>Notifications</Typography>

        <Divider />
        {notificationsLoading ? (
          <Typography variant='body1'>Loading notifications...</Typography>
        ) : (
          <>
            {notificationsData?.length !== 0 && (
              <List dense={true}>
                {notificationsData?.map((notification) => (
                  <ListItem
                    key={notification.uid}
                    disablePadding
                    sx={{
                      bgcolor: notification.hasBeenRead ? null : '#f0fafa',
                      borderRadius: '5px',
                    }}
                  >
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
                          fontWeight: notification.hasBeenRead ? '400' : '600',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Notifications;
