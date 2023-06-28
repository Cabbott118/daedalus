import { useEffect } from 'react';

// Components
import EnrollmentBanner from './components/EnrollmentBanner';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// MUI
import { Box, Container, Typography, useTheme } from '@mui/material';

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

  const { data: userData, loading } = useSelector((state) => state.user);
  const { data: customerData } = useSelector((state) => state.customer);
  const { data: contractorData } = useSelector((state) => state.contractor);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await dispatch(fetchUser(user.uid));
        if (userData?.userType === 'customer') {
          dispatch(fetchCustomer(user.uid));
        } else if (userData?.userType === 'contractor') {
          dispatch(fetchContractor(user.uid));
        }
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  if (loading)
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
          <Typography>User name:</Typography>
          <Typography>
            {userData?.fullName?.firstName} {userData?.fullName?.lastName}
          </Typography>
        </>
      )}
      {customerData && (
        <>
          <Typography>Customer name: </Typography>{' '}
          <Typography>{customerData?.customerName}</Typography>
        </>
      )}
      {contractorData && (
        <>
          <Typography>Contractor name: </Typography>{' '}
          <Typography>{contractorData?.contractorName}</Typography>
        </>
      )}
    </Container>
  );
}
