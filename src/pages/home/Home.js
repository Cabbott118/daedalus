import { useEffect } from 'react';

// Components
import EnrollmentBanner from './components/EnrollmentBanner';

// MUI
import { Box, Container, Typography, useTheme } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';

export default function Home() {
  document.title = 'Daedalus';

  const theme = useTheme();

  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (data && data.uid) {
      dispatch(fetchUser(data.uid));
      console.log(data);
    }
  }, []);

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
