// Assets
import plane from 'assets/images/production_id_4434201 (1080p).mp4';

// MUI
import { Box, useTheme } from '@mui/material';

const AirplaneLoader = () => {
  const theme = useTheme();

  const boxStyles = {
    filter: 'grayscale(100%) blur(5px) brightness(50%)',
    mt: '-64px',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      mt: '-56px',
    },
  };

  return (
    <Box sx={boxStyles}>
      <video
        controls
        autoPlay
        loop
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src={plane} type='video/mp4' />
      </video>
    </Box>
  );
};

export default AirplaneLoader;
