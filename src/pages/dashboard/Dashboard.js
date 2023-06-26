import { useEffect, useState } from 'react';

// Components
import DeleteDialog from 'pages/dashboard/components/DeleteDialog';
import UpdateDialog from 'pages/dashboard/components/UpdateDialog';
import AccountComponent from 'pages/dashboard/components/AccountComponent';
import AddressComponent from 'pages/dashboard/components/AddressComponent';
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
import { Person, LocationOn, CreditCard, Security } from '@mui/icons-material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';
import { fetchContractor } from 'store/slices/contractorSlice';
import { fetchCustomer } from 'store/slices/customerSlice';

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
      icon: Person,
    },
    {
      text: 'Address',
      icon: LocationOn,
    },
    {
      text: 'Payment details',
      icon: CreditCard,
    },
    {
      text: 'Security',
      icon: Security,
    },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  useEffect(() => {
    if (data && data.uid) {
      dispatch(fetchUser(data.uid));
      if (data.userType === 'customer') {
        fetchCustomer(data.customerId);
      } else {
        fetchContractor(data.contractorId);
      }
    }
  }, []);

  const renderContent = () => {
    if (activeItem === 'Account') return <AccountComponent uid={data?.uid} />;
    if (activeItem === 'Address') return <AddressComponent uid={data?.uid} />;
    if (activeItem === 'Payment details')
      return <div>Placeholder for Payment details</div>;
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
            <Grid container>
              {dashboardNavList.map((navListItem) => (
                <Grid item xs={12} key={navListItem.text} sx={{ m: 0.5 }}>
                  <Paper variant='outlined'>
                    <Button
                      startIcon={
                        <navListItem.icon
                          color={
                            activeItem === navListItem.text
                              ? 'primary'
                              : 'disabled'
                          }
                        />
                      }
                      fullWidth
                      variant={
                        activeItem === navListItem.text ? 'outlined' : 'text'
                      }
                      onClick={() => handleItemClick(navListItem.text)}
                      sx={{
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                      }}
                    >
                      {navListItem.text}
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid item container direction='column' xs={12} sm={8} spacing={2}>
          <Grid item>
            <Typography variant='h6'>{activeItem}</Typography>
          </Grid>

          <Grid item sx={{ m: 0.5 }}>
            <Paper variant='outlined'>{renderContent()}</Paper>
          </Grid>
        </Grid>

        <Grid item>
          <Logout />
        </Grid>
      </Grid>
    </Container>
  );
}
