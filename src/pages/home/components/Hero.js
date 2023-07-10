// Assets
import heroImage from 'assets/images/pexels-pixabay-40723.jpg';

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
} from '@mui/material';

// React Router
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate(routes.CUSTOMER_ENROLLMENT);
  };

  const handleContractorClick = () => {
    navigate(routes.CONTRACTOR_ENROLLMENT);
  };

  return (
    <Box maxWidth='xl' sx={{ height: 'calc(100vh - 64px)' }}>
      <img
        src={heroImage}
        style={{
          objectFit: 'cover',
          filter: 'brightness(0.4)',
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default Hero;
