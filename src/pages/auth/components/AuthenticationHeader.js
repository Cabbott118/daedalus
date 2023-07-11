// MUI
import { useTheme } from '@mui/material';
import { Box, Typography } from '@mui/material';

const AuthenticationHeader = ({ title }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        mt: 8,
        mb: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        component='h1'
        variant='h3'
        sx={{ color: theme.palette.text.primary }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default AuthenticationHeader;
