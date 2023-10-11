// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';

// MUI
import { Chip, Grid, Paper, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const OpenTickets = ({ serviceTickets, value, index, ...other }) => {
  const chipData = [
    { label: 'status', key: 'status' },
    { label: 'typeOfServices', key: 'typeOfServices' },
  ];
  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      {value === index && (
        <div>
          {serviceTickets.map((serviceTicket, index) => (
            <Paper key={index} elevation={3} sx={{ p: 1, my: 2 }}>
              <Grid
                container
                direction='row'
                justifyContent='center'
                alignItems='center'
                sx={{ p: 1 }}
              >
                <Grid item xs={11} container>
                  <Grid item>
                    {chipData.map((chipItem) => (
                      <Chip
                        key={chipItem.key}
                        label={serviceTicket[chipItem.key]}
                        variant='filled'
                        color='secondary'
                        size='small'
                        sx={{ textTransform: 'capitalize', mr: 1 }}
                      />
                    ))}
                    <Typography variant='h6' sx={{ fontWeight: 400 }}>
                      {serviceTicket.titleForServices} for{' '}
                      {serviceTicket.owner.name}
                    </Typography>
                    <Typography variant='body2'>
                      {formatCreatedAt(serviceTicket?.createdAt)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={1}>
                  <KeyboardArrowRightIcon fontSize='small' />
                </Grid>
              </Grid>
            </Paper>
          ))}
        </div>
      )}
    </div>
  );
};

export default OpenTickets;
