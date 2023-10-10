// MUI
import { Grid, Paper, Typography } from '@mui/material';

const TicketCounter = ({ theme }) => {
  return (
    <Paper
      variant='outlined'
      sx={{
        p: 3,
        borderTop: `1rem solid ${theme.palette.primary.main}`,
      }}
    >
      <Typography
        variant='h5'
        component='h1'
        align='center'
        sx={{ fontSize: 20 }}
      >
        My Tickets
      </Typography>
      <Grid
        container
        direction='row'
        justifyContent='space-evenly'
        alignItems='center'
      >
        <Grid item sx={{ pt: 2 }}>
          0 Open
        </Grid>
        <Grid item sx={{ pt: 2 }}>
          0 Closed
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TicketCounter;
