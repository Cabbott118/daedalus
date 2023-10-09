import { useEffect } from 'react';

// Constants
import StatusType from 'constants/statusType';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';

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
  useTheme,
} from '@mui/material';

// React Router
import { useParams } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchServiceTicket,
  updateServiceTicket,
} from 'store/slices/serviceTicketSlice';

const ServiceTicket = () => {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();

  const { data: serviceTicketData, loading: serviceTicketLoading } =
    useSelector((state) => state.serviceTicket);
  const { data: userData, loading: userLoading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchServiceTicket(uid));
  }, [uid]);

  const renderAssignmentStatus = () => {
    if (serviceTicketData?.status === StatusType.NEW) {
      return (
        <Typography variant='body1' sx={{ color: theme.palette.text.primary }}>
          This ticket will be assigned shortly
        </Typography>
      );
    }
    if (serviceTicketData?.status === StatusType.ASSIGNED) {
      return (
        <>
          <Typography
            variant='body1'
            sx={{ color: theme.palette.text.primary }}
          >
            This ticket has been assigned to:
          </Typography>
          <Typography
            variant='body2'
            sx={{ color: theme.palette.text.primary }}
          >
            {serviceTicketData?.contractorName}
          </Typography>
        </>
      );
    }
    if (serviceTicketData?.status === StatusType.ACCEPTED) {
      return (
        <>
          <Typography
            variant='body1'
            sx={{ color: theme.palette.text.primary }}
          >
            This ticket has been accepted
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: theme.palette.text.primary }}
          >
            Services to be rendered by:
          </Typography>
          <Typography
            variant='body2'
            sx={{ color: theme.palette.text.primary }}
          >
            {serviceTicketData?.contractorName}
          </Typography>
        </>
      );
    }
    if (serviceTicketData?.status === StatusType.IN_PROGRESS) {
      return (
        <>
          <Typography
            variant='body1'
            sx={{ color: theme.palette.text.primary }}
          >
            This ticket is in progress
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: theme.palette.text.primary }}
          >
            Services being rendered by:
          </Typography>
          <Typography
            variant='body2'
            sx={{ color: theme.palette.text.primary }}
          >
            {serviceTicketData?.contractorName}
          </Typography>
        </>
      );
    }
    if (serviceTicketData?.status === StatusType.COMPETE) {
      return (
        <>
          <Typography
            variant='body1'
            sx={{ color: theme.palette.text.primary }}
          >
            This ticket has been completed
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: theme.palette.text.primary }}
          >
            Services rendered by:
          </Typography>
          <Typography
            variant='body2'
            sx={{ color: theme.palette.text.primary }}
          >
            {serviceTicketData?.contractorName}
          </Typography>
        </>
      );
    }
  };

  const acceptServiceTicket = async () => {
    const updateData = {
      status: StatusType.ACCEPTED,
    };

    await dispatch(updateServiceTicket({ uid, updateData }));
  };

  const declineServiceTicket = () => {
    alert('Declining cannot be done yet - to be developed');
  };

  if (serviceTicketLoading)
    return (
      <Container>
        <Typography variant='p'>Loading...</Typography>
      </Container>
    );

  return (
    <Container
      maxWidth='sm'
      sx={{
        bgcolor: theme.additionalPalette.primary,
        py: 2,
        borderRadius: 2,
      }}
    >
      <Typography
        variant='h2'
        align='center'
        sx={{
          fontSize: '1.5rem',
          my: 3,
          color: theme.palette.text.primary,
        }}
      >
        Service Request
      </Typography>
      <Grid container>
        <Grid item xs={8}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 400,
              letterSpacing: '0.05rem',
              mb: -1,
              color: theme.palette.text.primary,
            }}
          >
            {serviceTicketData?.customer?.name}
          </Typography>
          <Typography
            variant='caption'
            sx={{ color: theme.palette.text.primary }}
          >
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
        <Grid item xs={12} sx={{ mt: 2 }}>
          {renderAssignmentStatus()}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            bgcolor: theme.additionalPalette.secondary,
            p: 3,
            borderRadius: 2,
            mt: 2,
          }}
        >
          <Typography
            variant='body1'
            sx={{ color: theme.palette.text.primary }}
          >
            Reason for services:
          </Typography>
          <Typography
            variant='body2'
            sx={{ mb: 2, color: theme.palette.text.primary }}
          >
            {serviceTicketData?.reasonForServices}
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: theme.palette.text.primary }}
          >
            Site location:
          </Typography>
          <Typography
            variant='body2'
            sx={{ mb: 2, color: theme.palette.text.primary }}
          >
            1234 Tester's Lane, Polk City, FL 33868
          </Typography>
          <Typography
            variant='body1'
            sx={{ color: theme.palette.text.primary }}
          >
            Not to exceed (NTE):
          </Typography>
          <Typography
            variant='body2'
            sx={{ color: theme.palette.text.primary }}
          >
            $5,000
          </Typography>
        </Grid>
        {userData?.userType === UserType.CONTRACTOR &&
          serviceTicketData?.status === StatusType.ASSIGNED && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={acceptServiceTicket}
                  sx={{ textTransform: 'none' }}
                >
                  Accept
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant='contained'
                  color='error'
                  onClick={declineServiceTicket}
                  sx={{ textTransform: 'none' }}
                >
                  Decline
                </Button>
              </Grid>
            </Grid>
          )}
      </Grid>
    </Container>
  );
};

export default ServiceTicket;
