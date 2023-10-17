import { useEffect } from 'react';

// Components
import TicketStatus from 'pages/serviceTicket/components/TicketStatus';

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
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateServiceTicketTechnician } from 'store/slices/serviceTicketSlice';
import { updateServiceTicketStatus } from 'store/slices/serviceTicketSlice';

const ServiceTicket = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { data: serviceTicketData, loading: serviceTicketLoading } =
    useSelector((state) => state.serviceTicket);

  const { data: userData, loading: userLoading } = useSelector(
    (state) => state.user
  );

  const acceptServiceTicket = async () => {
    await dispatch(
      updateServiceTicketStatus({
        ticketId: serviceTicketData?.uid,
        status: StatusType.ACCEPTED,
      })
    );
    await dispatch(
      updateServiceTicketTechnician({
        ticketId: serviceTicketData?.uid,
        technicianId: userData?.uid,
        firstName: userData?.fullName.firstName,
        lastName: userData?.fullName.lastName,
      })
    );
  };

  const declineServiceTicket = () => {
    alert('Declining cannot be done yet - to be developed');
  };

  if (serviceTicketLoading)
    return (
      <Container>
        <Typography variant='body1'>Loading...</Typography>
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
        <Grid item xs={8} md={12}>
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
        <Grid item xs={2} md={12}>
          <Chip
            label={serviceTicketData?.lineOfService}
            variant='filled'
            color='secondary'
            size='small'
          />
        </Grid>
        <Grid item xs={2} md={12}>
          <Chip
            label={serviceTicketData?.status}
            variant='filled'
            color='secondary'
            size='small'
            sx={{ textTransform: 'capitalize' }}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TicketStatus serviceTicketData={serviceTicketData} theme={theme} />
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
            {serviceTicketData?.customer.address.street},{' '}
            {serviceTicketData?.customer.address.city},{' '}
            {serviceTicketData?.customer.address.state}.{' '}
            {serviceTicketData?.customer.address.zipCode}
          </Typography>

          <Typography
            variant='body1'
            sx={{ color: theme.palette.text.primary }}
          >
            Not to exceed (NTE){' '}
            <Tooltip
              title='This can be edited from your profile.'
              placement='top'
            >
              <InfoIcon
                color='secondary'
                sx={{
                  bgcolor: theme.palette.secondary.contrastText,
                  fontSize: 12,
                  borderRadius: '50%',
                }}
              />
            </Tooltip>
          </Typography>

          <Typography
            variant='body2'
            sx={{ color: theme.palette.text.primary }}
          >
            ${serviceTicketData?.notToExceed}
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
