import { useEffect } from 'react';

// Constants
import ServiceTicketStatusType from 'constants/serviceTicketStatusType';
// user type will eventually be used to conditionally render action items on service tickets
import UserType from 'constants/userType';

// MUI
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';

// React Router
import { useParams } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceTicket } from 'store/slices/serviceTicketSlice';

const ServiceTicket = () => {
  const { uid } = useParams();
  const dispatch = useDispatch();

  const { data: serviceTicketData, loading: serviceTicketLoading } =
    useSelector((state) => state.serviceTicket);

  useEffect(() => {
    dispatch(fetchServiceTicket(uid));
  }, []);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt._seconds * 1000);
    return date.toLocaleString();
  };

  if (serviceTicketLoading)
    return (
      <Container>
        <Typography variant='p'>Loading...</Typography>
      </Container>
    );

  return (
    <Container maxWidth='md'>
      <Typography variant='h5' component='h1' align='center'>
        Service Request for {serviceTicketData?.companyReceivingServices}
      </Typography>
      <Paper variant='outlined' sx={{ minHeight: '250px' }}>
        <Grid container spacing={2}>
          <Grid item xs={8} sx={{ my: '.5rem' }}></Grid>
          <Grid item xs={4} sx={{ my: '.5rem' }}>
            <Chip
              label={serviceTicketData?.status}
              color='info'
              sx={{ width: '6rem' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography>Reason for request:</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>{serviceTicketData?.reasonForServices}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ServiceTicket;
