import { useEffect } from 'react';

// MUI
import {
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
} from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from 'store/slices/notificationsSlice';

const Notifications = ({ uid }) => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications(uid));
  }, []);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt._seconds * 1000);
    return date.toLocaleString();
  };

  return (
    <Container>
      <Typography variant='h6'>Notifications</Typography>
      <Divider />
      {loading ? (
        <Typography variant='p'>Loading notifications...</Typography>
      ) : (
        <List>
          {data?.map((notification, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton component='a'>
                <ListItemText
                  primary={notification.message}
                  primaryTypographyProps={
                    {
                      // sx: {
                      //   fontSize: '.8rem',
                      //   wordWrap: 'break-word',
                      // },
                    }
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Notifications;
