// MUI
import { Box, Typography, useTheme } from '@mui/material';

const ClosedTickets = ({
  serviceTickets,
  children,
  value,
  index,
  ...other
}) => {
  if (serviceTickets.length === 0)
    return (
      <div role='tabpanel' hidden={value !== index} {...other}>
        <Typography>You don't have any closed tickets</Typography>
      </div>
    );

  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>title</Typography>
        </Box>
      )}
    </div>
  );
};

export default ClosedTickets;
