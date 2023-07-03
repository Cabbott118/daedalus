import { useEffect } from 'react';

// Components
import EnrollmentBanner from './components/EnrollmentBanner';

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

  const { data: userData, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const { data: customerData, loading: customerLoading } = useSelector(
    (state) => state.customer
  );
  const { data: contractorData, loading: contractorLoading } = useSelector(
    (state) => state.contractor
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await dispatch(fetchUser(user.uid));
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  useEffect(() => {
    if (userData?.userType === UserType.CUSTOMER) {
      dispatch(fetchCustomer(userData.uid));
    } else if (userData?.userType === UserType.CONTRACTOR) {
      dispatch(fetchContractor(userData.uid));
    }
  }, [userData, dispatch]);

  if (userLoading || customerLoading || contractorLoading)
    return (
      <Container maxWidth='sm'>
        <Typography>Loading...</Typography>
      </Container>
    );

  if (!userData) return <EnrollmentBanner />;

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
