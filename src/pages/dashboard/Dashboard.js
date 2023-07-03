import { useEffect, useState } from 'react';

// Components
import DeleteDialog from 'pages/dashboard/components/DeleteDialog';
import UpdateDialog from 'pages/dashboard/components/UpdateDialog';
import AccountComponent from 'pages/dashboard/components/AccountComponent';
import ServiceTicketsComponent from 'pages/dashboard/components/ServiceTicketsComponent';
import BusinessInformationComponent from 'pages/dashboard/components/BusinessInformationComponent';
import PaymentDetailsComponent from 'pages/dashboard/components/PaymentDetailsComponent';
import SecurityComponent from 'pages/dashboard/components/SecurityComponent';
import AdminComponent from 'pages/dashboard/components/AdminComponent';
import Logout from 'components/common/Logout';

// Constants
import UserType from 'constants/userType';

// MUI
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import {
  AdminPanelSettings,
  Person,
  Business,
  ListAlt,
  CreditCard,
  Security,
} from '@mui/icons-material';

// Redux
import { useSelector } from 'react-redux';

export default function Dashboard() {
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
    {
      text: 'Service Tickets',
      icon: ListAlt,
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
      text: 'Service Tickets',
      icon: ListAlt,
    },
  ];

  const adminNavItems = [
    {
      text: 'Account',
      icon: Person,
    },
    {
      text: 'Admin',
      icon: AdminPanelSettings,
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
    if (activeItem === 'Service Tickets')
      return (
        <ServiceTicketsComponent
          uid={userData?.uid}
          userData={userData}
          customerData={customerData}
          contractorData={contractorData}
        />
      );
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
      </Grid>
    </Container>
  );
}
