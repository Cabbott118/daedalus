import { useEffect } from 'react';

// Components
import Loader from 'components/common/Loader';
import Hero from 'pages/home/components/Hero';
import EnrollmentBanner from 'pages/home/components/EnrollmentBanner';
import ServiceTicketTabs from 'pages/home/components/serviceTicketList/ServiceTicketTabs';
import TicketCounter from 'pages/home/components/TicketCounter';
import WelcomeBanner from 'pages/home/components/WelcomeBanner';

// Constants
import UserType from 'constants/userType';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// MUI
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';
import { fetchContractor } from 'store/slices/contractorSlice';
import { fetchCustomer } from 'store/slices/customerSlice';
import {
  fetchServiceTicketsAssignedTo,
  fetchServiceTicketsCreatedBy,
} from 'store/slices/serviceTicketSlice';

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
  const { serviceTickets } = useSelector((state) => state.serviceTicket);

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
        dispatch(fetchCustomer(userData?.uid));
        dispatch(fetchServiceTicketsCreatedBy(userData?.uid));
      } else if (userData.userType === UserType.CONTRACTOR) {
        dispatch(fetchContractor(userData?.uid));
      }
    }
    dispatch(fetchServiceTicketsAssignedTo(contractorData?.uid));
  }, [userData, customerData, contractorData, dispatch]);

  const colors = [
    theme.palette.primary.light,
    theme.palette.secondary.main,
    'white',
  ];
  console.log(serviceTickets);

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
    <>
      <Box
        sx={{
          height: 80,
          bgcolor: theme.palette.primary.dark,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {[...Array(30)].map((_, index) => {
          const size = Math.random() * 10 + 2; // Random size between 5px and 25px

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                width: `${size}px`, // Symmetrical width
                height: `${size}px`, // Symmetrical height
                backgroundColor: colors[index % colors.length], // Cycle through the colors array
                borderRadius: '50%',
                top: `${Math.random() * 80}px`, // Random top position
                left: `${Math.random() * 100}%`, // Random left position
              }}
            ></div>
          );
        })}
      </Box>

      <Container maxWidth='md' sx={{ mt: 3 }}>
        {userData && (
          <>
            <Grid container>
              <Grid item xs={12}>
                <WelcomeBanner userData={userData} theme={theme} />
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
                <TicketCounter theme={theme} />
              </Grid>
              <Grid item xs={12} md={8}>
                <ServiceTicketTabs />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}
