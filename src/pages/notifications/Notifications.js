// Constants
import routes from 'constants/routes';

// MUI
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  MenuItem,
  Typography,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

// React Router
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateNotification } from 'store/slices/notificationsSlice';

const Notifications = ({ onClose }) => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.notifications);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt._seconds * 1000);
    return date.toLocaleString();
  };

  const handleMarkRead = (uid) => {
    const updateData = {
      notificationHasBeenRead: true,
    };
    dispatch(updateNotification({ uid, updateData }));
  };

  return (
    <Container>
      <Typography variant='h6'>Notifications</Typography>
      <Divider />
      {loading ? (
        <Typography variant='p'>Loading notifications...</Typography>
      ) : (
        <>
          {data?.length != 0 ? (
            <List>
              {data?.map((notification, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    component={Link}
                    to={`${routes.SERVICE_TICKET}/${notification.ticketId}`}
                    onClick={() => {
                      onClose();
                      handleMarkRead(notification.uid);
                    }}
                  >
                    {!notification.notificationHasBeenRead && (
                      <CircleIcon
                        color='primary'
                        sx={{ fontSize: '.5rem', mr: '1rem' }}
                      />
                    )}
                    <ListItemText primary={notification.message} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant='p'>No notifications to display</Typography>
          )}
        </>
      )}
    </Container>
  );
};

export default Notifications;
