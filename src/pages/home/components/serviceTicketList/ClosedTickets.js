// MUI
import { Box, Typography, useTheme } from '@mui/material';

const ClosedTickets = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

export default ClosedTickets;
