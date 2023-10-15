import { useEffect } from 'react';

// Components
import Loader from 'components/common/Loader';
import Hero from 'pages/home/components/Hero';
// import EnrollmentBanner from 'pages/home/components/EnrollmentBanner';
import ServiceTicketTabs from 'pages/home/components/serviceTicketList/ServiceTicketTabs';
import TicketCounter from 'pages/home/components/TicketCounter';
import WelcomeBanner from 'pages/home/components/WelcomeBanner';
import CreateServiceTicketDialog from 'components/common/CreateServiceTicketDialog';

// POC
import CreateContractor from './CreateContractor';
import CreateCustomer from './CreateCustomer';
import CreateTechnician from './CreateTechnician';

// Constants
import UserType from 'constants/userType';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// MUI
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';
import {
  fetchServiceTicketsAssignedTo,
  fetchServiceTicketsCreatedBy,
} from 'store/slices/serviceTicketSlice';
import { fetchAdministrator } from 'store/slices/administratorSlice';
import { fetchCustomerByContactId } from 'store/slices/customerSlice';
import { fetchContractorByContactId } from 'store/slices/contractorSlice';
import { fetchTechnicianDetailsByUserId } from 'store/slices/technicianSlice';

export default function Home() {
  document.title = 'Daedalus';

  const auth = getAuth();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { data: userData, loading: userLoading } = useSelector(
    (state) => state.user
  );

  const { serviceTickets, loading: serviceTicketsLoading } = useSelector(
    (state) => state.serviceTicket
  );
  const { data: administratorData, loading: administratorLoading } =
    useSelector((state) => state.administrator);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await dispatch(fetchUser(user.uid));
      }
    });
    return () => unsubscribe();
  }, [auth, dispatch]);

  useEffect(() => {
    if (userData?.userType === UserType.ADMINISTRATOR) {
      dispatch(fetchAdministrator(userData?.uid));
    } else if (userData?.userType === UserType.CONTRACTOR) {
      dispatch(fetchContractorByContactId(userData?.uid));
    } else if (userData?.userType === UserType.CUSTOMER) {
      dispatch(fetchCustomerByContactId(userData?.uid));
    } else if (userData?.userType === UserType.TECHNICIAN) {
      dispatch(fetchTechnicianDetailsByUserId(userData?.uid));
    }

    // if (businessData && userData) {
    //   if (userData?.userType === UserType.CUSTOMER) {
    //     dispatch(fetchServiceTicketsCreatedBy(businessData?.uid));
    //   } else if (userData?.userType === UserType.CONTRACTOR) {
    //     dispatch(fetchServiceTicketsAssignedTo(businessData?.uid));
    //   }
    // }
  }, [userData]);

  const colors = [
    theme.palette.primary.light,
    theme.palette.secondary.main,
    'white',
  ];

  if (userLoading || administratorLoading)
    return <Loader style={{ fill: theme.palette.primary.main }} />;

  if (!userData)
    return (
      <>
        <Hero />
        {/* <EnrollmentBanner /> */}
      </>
    );

  return (
    <>
      <Box
        sx={{
          height: 100,
          bgcolor: theme.palette.primary.dark,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {[...Array(30)].map((_, index) => {
          const size = Math.random() * 10 + 2; // Random size between 5px and 25px

          return (
            <Box
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
            ></Box>
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
                {administratorData && (
                  <Typography variant='subtitle1' component='h1'>
                    {administratorData?.name} - Daedalus
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: 5 }}>
              <Grid item xs={12} md={4}>
                <TicketCounter
                  serviceTickets={serviceTickets}
                  serviceTicketsLoading={serviceTicketsLoading}
                  theme={theme}
                />
                {userData?.userType === UserType.CUSTOMER ? (
                  <CreateServiceTicketDialog
                    userId={userData?.uid}
                    // businessData={businessData}
                  />
                ) : null}
              </Grid>
              <Grid item xs={12} md={8}>
                <ServiceTicketTabs
                  serviceTickets={serviceTickets}
                  serviceTicketsLoading={serviceTicketsLoading}
                  theme={theme}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
      <CreateContractor />
      <CreateCustomer />
      <CreateTechnician />
    </>
  );
}
