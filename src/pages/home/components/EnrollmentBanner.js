// Constants
import routes from 'constants/routes';

// MUI
import {
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

const EnrollmentBanner = () => {
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate(routes.CUSTOMER_ENROLLMENT);
  };

  const handleContractorClick = () => {
    navigate(routes.CONTRACTOR_ENROLLMENT);
  };

  return (
    <Container maxWidth='sm'>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardActionArea onClick={handleCustomerClick}>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  Customer
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Connect effortlessly with a skilled contractor, ensuring you
                  find the ideal professional for your requirements, by
                  enrolling as a Customer
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardActionArea onClick={handleContractorClick}>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  Contractor
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Experience increased visibility and access to a wide range of
                  potential customers by enrolling as a Contractor
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EnrollmentBanner;
