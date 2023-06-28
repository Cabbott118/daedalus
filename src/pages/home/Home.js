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

  const { data, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await dispatch(fetchUser(user.uid));
        if (data?.userType === 'customer') {
          dispatch(fetchCustomer(user.uid));
        } else if (data?.userType === 'contractor') {
          dispatch(fetchContractor(user.uid));
        }
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  if (loading) return <p>Loading...</p>;

  if (!data) return <EnrollmentBanner />;

  return (
    <Container maxWidth='sm'>
      <Typography>
        {data?.fullName?.firstName} {data.userType}
      </Typography>
    </Container>
  );
}
