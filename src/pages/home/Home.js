import { useEffect } from 'react';

// Components
import Loader from 'components/common/Loader';
import AirplaneLoader from 'components/common/AirplaneLoader';
import Hero from 'pages/home/components/Hero';
import EnrollmentBanner from 'pages/home/components/EnrollmentBanner';

// Constants
import UserType from 'constants/userType';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// MUI
import { Button, Container, Grid, Typography, useTheme } from '@mui/material';

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
    <Container maxWidth='sm'>
      {userData && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='p'>User name:</Typography>
              <Typography variant='p'>
                {userData?.fullName?.firstName} {userData?.fullName?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='p'>User type:</Typography>
              <Typography variant='p'>{userData?.userType}</Typography>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
}
