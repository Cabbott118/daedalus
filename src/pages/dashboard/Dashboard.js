import { useEffect, useState } from 'react';

// Components
import DeleteDialog from 'pages/dashboard/components/DeleteDialog';
import UpdateDialog from 'pages/dashboard/components/UpdateDialog';
import Logout from 'components/common/Logout';

// Helpers
import getUserInitials from 'services/helpers/getUserInitials';

// MUI
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';

export default function Dashboard() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.user);

  document.title = data?.fullName?.firstName
    ? `${data.fullName.firstName}'s Dashboard`
    : 'Dashboard';

  const [activeItem, setActiveItem] = useState('Account');
  const dashboardNavList = [
    {
      text: 'Account',
    },
    {
      text: 'Address',
    },
    {
      text: 'Payment method',
    },
    {
      text: 'Security',
    },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    if (data && data.uid) {
      dispatch(fetchUser(data.uid));
      console.log(data);
    }
  }, []);

  const renderContent = () => {
    if (activeItem === 'Account') return <div>Account</div>;
    if (activeItem === 'Address') return <div>Address</div>;
    if (activeItem === 'Payment method') return <div>Payment method</div>;
    return <div>Security</div>;
  };

  return (
    <Container maxWidth='md'>
      <Grid container spacing={2}>
        <Grid item container direction='column' xs={12} sm={4} spacing={2}>
          <Grid item>
            <Typography variant='h6'>Settings</Typography>
          </Grid>
          <Grid item>
            <Paper>
              <Grid container>
                {dashboardNavList.map((navListItem) => (
                  <Grid item xs={12} key={navListItem.text}>
                    <Button
                      fullWidth
                      variant={
                        activeItem === navListItem.text ? 'contained' : 'text'
                      }
                      onClick={() => handleItemClick(navListItem.text)}
                      sx={{ textTransform: 'none' }}
                    >
                      {navListItem.text}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        <Grid item container direction='column' xs={12} sm={8} spacing={2}>
          <Grid item>
            <Typography variant='h6'>{activeItem}</Typography>
          </Grid>

          <Grid item>
            <Paper>{renderContent()}</Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
