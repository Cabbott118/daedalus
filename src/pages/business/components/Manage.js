import { useEffect, useState } from 'react';

// Components
import InformationCard from 'pages/business/components/InformationCard';
import CreateContractor from 'pages/create/contractor/CreateContractor';
import CreateCustomer from 'pages/create/customer/CreateCustomer';
import CreateTechnician from 'pages/create/technician/CreateTechnician';

// Constants
import UserType from 'constants/userType';

// MUI
import {
  Button,
  Box,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';

export const ManageAccountsAndUsers = ({
  administratorData,
  contractorData,
  ownedContractors,
  customerData,
  ownedCustomers,
  technicianData,
  ownedTechnicians,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (e, newTab) => {
    setSelectedTab(newTab);
  };

  console.log(ownedTechnicians);

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab
            label='Contractors'
            sx={{ textTransform: 'none', width: '33%' }}
          />
          <Tab label='Customers' sx={{ textTransform: 'none', width: '33%' }} />
          <Tab
            label='Technicians'
            sx={{ textTransform: 'none', width: '33%' }}
          />
        </Tabs>

        <>
          <>
            {ownedContractors.map((ownedContractor) => (
              <InformationCard
                value={selectedTab}
                index={0}
                companyName={ownedContractor.name}
                linesOfService={ownedContractor.linesOfService}
                primaryContact={ownedContractor.primaryContact}
                key={ownedContractor.uid}
              />
            ))}
          </>
          <>
            {ownedCustomers.length > 0 && (
              <>
                {ownedCustomers.map((ownedCustomer) => (
                  <InformationCard
                    value={selectedTab}
                    index={1}
                    companyName={ownedCustomer.name}
                    linesOfService={ownedCustomer.predefinedLinesOfService}
                    primaryContact={ownedCustomer.primaryContact}
                    address={ownedCustomer.primaryAddress}
                    key={ownedCustomer.uid}
                  />
                ))}
              </>
            )}
          </>
          <>
            {ownedTechnicians.length > 0 && (
              <>
                {ownedTechnicians.map((ownedTechnician) => (
                  <InformationCard
                    value={selectedTab}
                    index={2}
                    fullName={ownedTechnician.fullName}
                    key={ownedTechnician.uid}
                  />
                ))}
              </>
            )}
          </>
        </>
      </Box>
    </Box>
  );
};

export const ManageBusiness = () => {
  return <p>thing 2</p>;
};
