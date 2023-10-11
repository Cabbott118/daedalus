import { useEffect, useState } from 'react';

// Components
import OpenTickets from 'pages/home/components/serviceTicketList/OpenTickets';
import ClosedTickets from 'pages/home/components/serviceTicketList/ClosedTickets';

// Constants
import StatusType from 'constants/statusType';

// MUI
import { Box, Tab, Tabs } from '@mui/material';

const ServiceTicketTabs = ({ serviceTickets }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [openTickets, setOpenTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);

  const handleTabChange = (e, newTab) => {
    setSelectedTab(newTab);
  };

  useEffect(() => {
    const sortedOpenTickets = serviceTickets.filter(
      (ticket) => ticket.status !== StatusType.COMPLETE
    );
    const sortedClosedTickets = serviceTickets.filter(
      (ticket) => ticket.status === StatusType.COMPLETE
    );

    setOpenTickets(sortedOpenTickets);
    setClosedTickets(sortedClosedTickets);
  }, [serviceTickets]);

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label='Open' sx={{ textTransform: 'none', minWidth: '150px' }} />
          <Tab
            label='Closed'
            sx={{ textTransform: 'none', minWidth: '150px' }}
          />
        </Tabs>
      </Box>
      {/* TODO: Create Ticket Tiles to pass in as children */}
      <OpenTickets serviceTickets={openTickets} value={selectedTab} index={0} />
      <ClosedTickets
        serviceTickets={closedTickets}
        value={selectedTab}
        index={1}
      />
    </Box>
  );
};

export default ServiceTicketTabs;
