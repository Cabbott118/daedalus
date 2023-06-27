import { useEffect } from 'react';

// Components
import EnrollmentBanner from './components/EnrollmentBanner';

// MUI
import { Box, Container, Typography, useTheme } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';
import { fetchContractor } from 'store/slices/contractorSlice';
import { fetchCustomer } from 'store/slices/customerSlice';

export default function Home() {
  document.title = 'Daedalus';

  const theme = useTheme();

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (data && data.uid && !data.customerId && !data.contractorId) {
      dispatch(fetchUser(data.uid));
    } else if (data?.userType === 'customer' && data?.customerId) {
      dispatch(fetchCustomer(data.customerId));
    } else if (data?.userType !== 'customer' && data?.contractorId) {
      dispatch(fetchContractor(data.contractorId));
    }
  }, [data, dispatch]);

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
