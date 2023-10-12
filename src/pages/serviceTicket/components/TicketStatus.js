// Constants
import StatusType from 'constants/statusType';

// MUI
import { Typography } from '@mui/material';

const TicketStatus = ({ serviceTicketData, theme }) => {
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
        <Typography variant='body1' sx={{ color: theme.palette.text.primary }}>
          This ticket has been assigned to:
        </Typography>
        <Typography variant='body2' sx={{ color: theme.palette.text.primary }}>
          {serviceTicketData?.serviceProvider?.name}
        </Typography>
      </>
    );
  }
  if (serviceTicketData?.status === StatusType.ACCEPTED) {
    return (
      <>
        <Typography variant='body1' sx={{ color: theme.palette.text.primary }}>
          This ticket has been accepted
        </Typography>
        <Typography variant='body1' sx={{ color: theme.palette.text.primary }}>
          Services to be rendered by:
        </Typography>
        <Typography variant='body2' sx={{ color: theme.palette.text.primary }}>
          {serviceTicketData?.serviceProvider?.name}
        </Typography>
      </>
    );
  }
  if (serviceTicketData?.status === StatusType.IN_PROGRESS) {
    return (
      <>
        <Typography variant='body1' sx={{ color: theme.palette.text.primary }}>
          This ticket is in progress
        </Typography>
        <Typography variant='body1' sx={{ color: theme.palette.text.primary }}>
          Services being rendered by:
        </Typography>
        <Typography variant='body2' sx={{ color: theme.palette.text.primary }}>
          {serviceTicketData?.serviceProvider?.name}
        </Typography>
      </>
    );
  }
  if (serviceTicketData?.status === StatusType.COMPETE) {
    return (
      <>
        <Typography variant='body1' sx={{ color: theme.palette.text.primary }}>
          This ticket has been completed
        </Typography>
        <Typography variant='body1' sx={{ color: theme.palette.text.primary }}>
          Services rendered by:
        </Typography>
        <Typography variant='body2' sx={{ color: theme.palette.text.primary }}>
          {serviceTicketData?.serviceProvider?.name}
        </Typography>
      </>
    );
  }
};

export default TicketStatus;
