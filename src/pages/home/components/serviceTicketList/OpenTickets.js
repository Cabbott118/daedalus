import { useEffect, useState } from 'react';

// Components
import ServiceTicketModal from 'pages/home/components/ServiceTicketModal';

// Constants
import routes from 'constants/routes';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';

// MUI
import {
  Box,
  Chip,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const OpenTickets = ({ serviceTickets, value, index, ...other }) => {
  const [selectedSort, setSelectedSort] = useState('option1');
  const [sortedServiceTickets, setSortedServiceTickets] =
    useState(serviceTickets);
  const [openModal, setOpenModal] = useState(false);
  const [selectedServiceTicket, setSelectedServiceTicket] = useState(null);

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  useEffect(() => {
    // Define a sorting function based on the selectedSort value
    const customSort = (a, b) => {
      if (selectedSort === 'option1') {
        // Sort by status
        return a.status.localeCompare(b.status);
      } else if (selectedSort === 'option2') {
        // Sort by typeOfServices
        return a.typeOfServices.localeCompare(b.typeOfServices);
      } else if (selectedSort === 'option3') {
        // Sort by createdAt (assuming createdAt is a timestamp)
        return b.createdAt - a.createdAt;
      }
      return 0;
    };

    // Sort the serviceTickets array based on the selectedSort
    const sortedServiceTickets = [...serviceTickets].sort(customSort);
    setSortedServiceTickets(sortedServiceTickets);
    // Update openTickets and closedTickets accordingly
    // Replace openTickets and closedTickets with the sortedServiceTickets
  }, [selectedSort, serviceTickets]);

  const handleOpenModal = (serviceTicket) => {
    setSelectedServiceTicket(serviceTicket);
    setOpenModal(true);
    console.log(selectedServiceTicket);
  };

  const handleDialogClose = () => {
    setOpenModal(false);
  };

  const chipData = [
    { label: 'status', key: 'status' },
    { label: 'typeOfServices', key: 'typeOfServices' },
  ];
  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      {value === index && (
        <div>
          <Grid container>
            <Grid item xs={12} md={6}>
              <TextField
                label='Sort by'
                fullWidth
                select
                color='primary'
                value={selectedSort}
                onChange={handleSortChange}
              >
                <MenuItem value='option1'>Status</MenuItem>
                <MenuItem value='option2'>Service Type</MenuItem>
                <MenuItem value='option3'>Date</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          {sortedServiceTickets.map((serviceTicket, index) => (
            <Box
              key={index}
              onClick={() => handleOpenModal(serviceTicket)}
              sx={{ textDecoration: 'none' }}
            >
              <Paper elevation={3} sx={{ p: 1, my: 2, cursor: 'pointer' }}>
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
            </Box>
          ))}
        </div>
      )}
      <ServiceTicketModal
        open={openModal}
        onClose={handleDialogClose}
        serviceTicket={selectedServiceTicket}
      />
    </div>
  );
};

export default OpenTickets;
