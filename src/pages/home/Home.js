import { useEffect } from 'react';

// Components
import Loader from 'components/common/Loader';
import Hero from 'pages/home/components/Hero';
import EnrollmentBanner from 'pages/home/components/EnrollmentBanner';
import ServiceTicketTabs from 'pages/home/components/serviceTicketList/ServiceTicketTabs';

// Constants
import UserType from 'constants/userType';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// MUI
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';
import { fetchContractor } from 'store/slices/contractorSlice';
import { fetchCustomer } from 'store/slices/customerSlice';

export default function Home() {
  document.title = 'Daedalus';

  const auth = getAuth();
  const theme = useTheme();
  const dispatch = useDispatch();

  const {
    data: userData,
    userProfileLoaded,
    loading: userLoading,
  } = useSelector((state) => state.user);
  const { data: customerData, loading: customerLoading } = useSelector(
    (state) => state.customer
  );
  const { data: contractorData, loading: contractorLoading } = useSelector(
    (state) => state.contractor
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && !userProfileLoaded) {
        await dispatch(fetchUser(user.uid));
      }
    });
    return () => unsubscribe();
  }, [auth, dispatch, userProfileLoaded]);

  useEffect(() => {
    if (!customerData && !contractorData && userData) {
      if (userData.userType === UserType.CUSTOMER) {
        dispatch(fetchCustomer(userData.uid));
      } else if (userData.userType === UserType.CONTRACTOR) {
        dispatch(fetchContractor(userData.uid));
      }
    }
  }, [userData, customerData, contractorData, dispatch]);

  if (userLoading || customerLoading || contractorLoading)
    return <Loader style={{ fill: theme.palette.primary.main }} />;

  if (!userData)
    return (
      <>
        <Hero />
        <EnrollmentBanner />
      </>
    );

  return (
    <Container maxWidth='md' sx={{ mt: 3 }}>
      {userData && (
        <>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant='h4' component='h1'>
                <b style={{ color: theme.palette.primary.main }}>Welcome,</b>{' '}
                {userData?.fullName?.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {customerData && (
                <Typography variant='subtitle1' component='h1'>
                  {customerData?.businessName} - Daedalus
                </Typography>
              )}
              {contractorData && (
                <Typography variant='subtitle1' component='h1'>
                  {contractorData?.businessName} - Daedalus
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{ mt: 5 }}>
            <Grid item xs={12} md={4}>
              {/* TODO: Make this its own component */}
              <Paper
                variant='outlined'
                sx={{
                  p: 3,
                  borderTop: `1rem solid ${theme.palette.primary.main}`,
                }}
              >
                <Typography
                  variant='h5'
                  component='h1'
                  align='center'
                  sx={{ fontSize: 20 }}
                >
                  My Tickets
                </Typography>
                <Grid
                  container
                  direction='row'
                  justifyContent='space-evenly'
                  alignItems='center'
                >
                  <Grid item sx={{ pt: 2 }}>
                    0 Open
                  </Grid>
                  <Grid item sx={{ pt: 2 }}>
                    0 Closed
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <ServiceTicketTabs />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
