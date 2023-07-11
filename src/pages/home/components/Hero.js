// Assets
import heroImage from 'assets/images/pexels-pixabay-40723.jpg';

// Components
import HeroContent from 'pages/home/components/HeroContent';

// Constants
import routes from 'constants/routes';

// MUI
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';

// React Router
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const boxStyles = {
    mt: '-64px',
    height: 'calc(100vh)',
    width: '100%',
    backgroundImage: `url(${heroImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      mt: '-56px',
    },
  };

  return (
    <Box sx={boxStyles}>
      <HeroContent />
    </Box>
  );
};

export default Hero;
