import { useEffect } from 'react';

// Constants
import StatusType from 'constants/statusType';

// user type will eventually be used to conditionally render action items on service tickets
import UserType from 'constants/userType';

// MUI
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  TextField,
  Typography,
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
  }, [uid]);

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt._seconds * 1000);
    return date.toLocaleString();
  };

  const renderAssignmentStatus = () => {
    if (serviceTicketData?.status === StatusType.NEW) {
      return (
        <Typography variant='body1'>
          This ticket will be assigned shortly
        </Typography>
      );
    }
    if (serviceTicketData?.status === StatusType.ASSIGNED) {
      return (
        <>
          <Typography variant='body1'>
            This ticket has been assigned to:
          </Typography>
          <Typography variant='body2'>
            {serviceTicketData?.contractorName}
          </Typography>
        </>
      );
    }
    if (serviceTicketData?.status === StatusType.ACCEPTED) {
      return (
        <>
          <Typography variant='body1'>This ticket has been accepted</Typography>
          <Typography variant='body1'>Services to be rendered by:</Typography>
          <Typography variant='body2'>
            {serviceTicketData?.contractorName}
          </Typography>
        </>
      );
    }
    if (serviceTicketData?.status === StatusType.IN_PROGRESS) {
      return (
        <>
          <Typography variant='body1'>This ticket is in progress</Typography>
          <Typography variant='body1'>Services being rendered by:</Typography>
          <Typography variant='body2'>
            {serviceTicketData?.contractorName}
          </Typography>
        </>
      );
    }
    if (serviceTicketData?.status === StatusType.COMPETE) {
      return (
        <>
          <Typography variant='body1'>
            This ticket has been completed
          </Typography>
          <Typography variant='body1'>Services rendered by:</Typography>
          <Typography variant='body2'>
            {serviceTicketData?.contractorName}
          </Typography>
        </>
      );
    }
  };

  if (serviceTicketLoading)
    return (
      <Container>
        <Typography variant='p'>Loading...</Typography>
      </Container>
    );

  return (
    <Container maxWidth='sm'>
      <Typography variant='h2' align='center' sx={{ fontSize: '1.5rem' }}>
        Service Request
      </Typography>
      <Grid container>
        <Grid item xs={8}>
          <Typography
            variant='h6'
            sx={{ fontWeight: 400, letterSpacing: '0.05rem', mb: -1 }}
          >
            {serviceTicketData?.customerName}
          </Typography>
          <Typography variant='caption'>
            {formatCreatedAt(serviceTicketData?.createdAt)}
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ my: 1 }}>
          <Chip label='HVAC' variant='filled' color='primary' />
        </Grid>
        <Grid item xs={2} sx={{ my: 1 }}>
          <Chip
            label={serviceTicketData?.status}
            variant='filled'
            color='primary'
            sx={{ textTransform: 'uppercase' }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sx={{ bgcolor: '#eee', p: 3, borderRadius: 2, mt: 2 }}
        >
          <Typography variant='body1' sx={{}}>
            Reason for services:
          </Typography>
          <Typography variant='body2' sx={{ mb: 2 }}>
            {serviceTicketData?.reasonForServices}
          </Typography>
          <Typography variant='body1' sx={{}}>
            Site location:
          </Typography>
          <Typography variant='body2' sx={{ mb: 2, color: 'green' }}>
            1234 Tester's Lane, Polk City, FL 33868
          </Typography>
          <Typography variant='body1'>Not to exceed (NTE):</Typography>
          <Typography variant='body2' sx={{ color: 'green' }}>
            $5,000
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          {renderAssignmentStatus()}
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServiceTicket;
