import { useEffect, useState } from 'react';

// Components
import DeleteDialog from 'pages/dashboard/components/DeleteDialog';
import UpdateDialog from 'pages/dashboard/components/UpdateDialog';
import CreateServiceTicketDialog from 'pages/customer/components/CreateServiceTicketDialog';
import AccountComponent from 'pages/dashboard/components/AccountComponent';
import BusinessInformationComponent from 'pages/dashboard/components/BusinessInformationComponent';
import PaymentDetailsComponent from 'pages/dashboard/components/PaymentDetailsComponent';
import SecurityComponent from 'pages/dashboard/components/SecurityComponent';
import AdminComponent from './components/AdminComponent';
import Logout from 'components/common/Logout';

// Constants
import UserType from 'constants/userType';

// MUI
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Person, Business, CreditCard, Security } from '@mui/icons-material';

// Redux
import { useDispatch, useSelector } from 'react-redux';

export default function Dashboard() {
  const dispatch = useDispatch();

  const [menuItems, setMenuItems] = useState([]);
  const [activeItem, setActiveItem] = useState('Account');

  const { data: userData, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const { data: customerData, loading: customerLoading } = useSelector(
    (state) => state.customer
  );
  const { data: contractorData, loading: contractorLoading } = useSelector(
    (state) => state.contractor
  );

  document.title = userData?.fullName?.firstName
    ? `${userData.fullName.firstName}'s Dashboard`
    : 'Dashboard';

  useEffect(() => {
    if (userData?.userType === UserType.CUSTOMER) {
      setMenuItems(customerNavItems);
    }
    if (userData?.userType === UserType.CONTRACTOR) {
      setMenuItems(contractorNavItems);
    }
    if (userData?.userType === UserType.ADMIN) {
      setMenuItems(adminNavItems);
    }
  }, []);

  const customerNavItems = [
    {
      text: 'Account',
      icon: Person,
    },
    {
      text: 'Business Information',
      icon: Business,
    },
  ];

  const contractorNavItems = [
    {
      text: 'Account',
      icon: Person,
    },
    {
      text: 'Business Information',
      icon: Business,
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

  const adminNavItems = [
    {
      text: 'Admin',
      icon: Person,
    },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const renderContent = () => {
    if (activeItem === 'Account')
      return <AccountComponent uid={userData?.uid} userData={userData} />;
    if (activeItem === 'Business Information')
      return <BusinessInformationComponent userData={userData} />;
    if (activeItem === 'Payment details') return <PaymentDetailsComponent />;
    if (activeItem === 'Security') return <SecurityComponent />;
    if (activeItem === 'Admin') return <AdminComponent />;
  };

  return (
    <Container maxWidth='md'>
      <Grid container spacing={2}>
        <Grid item container direction='column' xs={12} sm={4} spacing={2}>
          <Grid item>
            <Typography variant='h6'>Menu</Typography>
          </Grid>
          <Grid item>
            <Grid container>
              {menuItems.map((menuItem) => (
                <Grid item xs={12} key={menuItem.text} sx={{ m: 0.5 }}>
                  <Paper variant='outlined'>
                    <Button
                      startIcon={
                        <menuItem.icon
                          color={
                            activeItem === menuItem.text
                              ? 'primary'
                              : 'disabled'
                          }
                        />
                      }
                      fullWidth
                      variant={
                        activeItem === menuItem.text ? 'outlined' : 'text'
                      }
                      onClick={() => handleItemClick(menuItem.text)}
                      sx={{
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                      }}
                    >
                      {menuItem.text}
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
          <Typography>
            Catch-all (not the final place for the below items)
          </Typography>
        </Grid>
        <Grid item>
          <CreateServiceTicketDialog
            userId={userData?.uid}
            companyReceivingServices={customerData?.customerName}
          />
        </Grid>
        <Grid item>
          <Logout />
        </Grid>
      </Grid>
    </Container>
  );
}
