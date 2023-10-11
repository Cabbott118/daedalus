import { useEffect, useState } from 'react';

// Constants
import StatusType from 'constants/statusType';

// MUI
import { Grid, Paper, Typography } from '@mui/material';

const TicketCounter = ({ serviceTickets, theme }) => {
  let [openTaskCount, setOpenTaskCount] = useState([]);
  let [closedTaskCount, setClosedTaskCount] = useState([]);

  useEffect(() => {
    const sortedOpenTickets = serviceTickets.filter(
      (ticket) => ticket.status !== StatusType.COMPLETE
    );
    const sortedClosedTickets = serviceTickets.filter(
      (ticket) => ticket.status === StatusType.COMPLETE
    );

    setOpenTaskCount(sortedOpenTickets);
    setClosedTaskCount(sortedClosedTickets);
  }, [serviceTickets]);

  return (
    <Paper
      variant='outlined'
      sx={{
        p: 3,
        borderTop: `1rem solid ${theme.palette.primary.main}`,
      }}
    >
      <Typography
        variant='h6'
        component='h1'
        align='center'
        sx={{ fontSize: 20 }}
      >
        My Tickets
      </Typography>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={6}
        sx={{ pt: 1 }}
      >
        <Grid item>
          <Typography variant='body1'>
            <span style={{ color: theme.palette.primary.main }}>
              {openTaskCount.length}
            </span>{' '}
            Open
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='body1'>
            <span style={{ color: theme.palette.primary.main }}>
              {closedTaskCount.length}
            </span>{' '}
            Closed
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TicketCounter;
