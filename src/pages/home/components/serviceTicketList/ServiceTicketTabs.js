import { useState } from 'react';

// Components
import OpenTickets from 'pages/home/components/serviceTicketList/OpenTickets';
import ClosedTickets from 'pages/home/components/serviceTicketList/ClosedTickets';

// MUI
import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material';

const ServiceTicketTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (e, newTab) => {
    setSelectedTab(newTab);
  };
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label='Open' sx={{ textTransform: 'none', minWidth: '150px' }} />
          <Tab
            label='Closed'
            sx={{ textTransform: 'none', minWidth: '150px' }}
          />
        </Tabs>
      </Box>
      {/* TODO: Create Ticket Tiles to pass in as children */}
      <OpenTickets
        children='Ticket Tile - Open'
        value={selectedTab}
        index={0}
      />
      <ClosedTickets
        children='Ticket Tile - Closed'
        value={selectedTab}
        index={1}
      />
    </Box>
  );
};

export default ServiceTicketTabs;
