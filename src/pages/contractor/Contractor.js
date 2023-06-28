import { useEffect, useState } from 'react';

// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import { AddBox, Pageview, CreditCard, Security } from '@mui/icons-material';

// Redux
import { useDispatch, useSelector } from 'react-redux';

const Contractor = () => {
  const theme = useTheme();

  const { data, loading } = useSelector((state) => state.customer);

  const [activeItem, setActiveItem] = useState('View service tickets');
  const dashboardNavList = [
    {
      text: 'View service tickets',
      icon: Pageview,
    },
    {
      text: 'Security',
      icon: Security,
    },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const renderContent = () => {
    if (activeItem === 'View service tickets')
      return <p>View Tickets component</p>;
    return <div>Security</div>;
  };

  return (
    <Container maxWidth='md'>
      <Grid container spacing={2}>
        <Grid item container direction='column' xs={12} sm={4} spacing={2}>
          <Grid item>
            <Typography variant='h6'>Settings</Typography>
          </Grid>
          <Grid item>
            <Grid container>
              {dashboardNavList.map((navListItem) => (
                <Grid item xs={12} key={navListItem.text} sx={{ m: 0.5 }}>
                  <Paper variant='outlined'>
                    <Button
                      startIcon={
                        <navListItem.icon
                          color={
                            activeItem === navListItem.text
                              ? 'primary'
                              : 'disabled'
                          }
                        />
                      }
                      fullWidth
                      variant={
                        activeItem === navListItem.text ? 'outlined' : 'text'
                      }
                      onClick={() => handleItemClick(navListItem.text)}
                      sx={{
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                      }}
                    >
                      {navListItem.text}
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid item container direction='column' xs={12} sm={8} spacing={2}>
          <Grid item>
            <Typography variant='h6'>{activeItem}</Typography>
          </Grid>

          <Grid item sx={{ m: 0.5 }}>
            <Paper variant='outlined'>{renderContent()}</Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contractor;