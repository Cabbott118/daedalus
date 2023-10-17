import { useEffect, useState } from 'react';

// Components
import {
  ManageAccountsAndUsers,
  ManageBusiness,
} from 'pages/business/components/Manage';

// Constants
import UserType from 'constants/userType';

// MUI
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Person,
  Business as BusinessIcon,
  ListAlt,
  CreditCard,
  Security,
} from '@mui/icons-material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchContractorByOwnerId } from 'store/slices/contractorSlice';
import { fetchCustomerByOwnerId } from 'store/slices/customerSlice';
import { fetchTechnicianDetailsByOwnerId } from 'store/slices/technicianSlice';

const Business = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [activeItem, setActiveItem] = useState('Manage Accounts & Users');

  const { data: userData, loading: userLoading } = useSelector(
    (state) => state.user
  );

  const { data: administratorData, loading: administratorLoading } =
    useSelector((state) => state.administrator);

  const {
    data: contractorData,
    owned: ownedContractors,
    loading: contractorLoading,
  } = useSelector((state) => state.contractor);

  const {
    data: customerData,
    owned: ownedCustomers,
    loading: customerLoading,
  } = useSelector((state) => state.customer);

  const {
    data: technicianData,
    owned: ownedTechnicians,
    loading: technicianrLoading,
  } = useSelector((state) => state.technician);

  useEffect(() => {
    if (administratorData) {
      dispatch(fetchContractorByOwnerId(administratorData?.uid));
      dispatch(fetchCustomerByOwnerId(administratorData?.uid));
      dispatch(fetchTechnicianDetailsByOwnerId(administratorData?.uid));
    }
    if (contractorData) {
      dispatch(fetchTechnicianDetailsByOwnerId(contractorData?.uid));
    }
  }, []);

  const menuItems = [
    { text: 'Manage Accounts & Users', icon: Person },
    { text: 'Manage Business', icon: BusinessIcon },
  ];

  const renderSelectedComponent = () => {
    if (activeItem === menuItems[0].text)
      return (
        <ManageAccountsAndUsers
          administratorData={administratorData}
          contractorData={contractorData}
          ownedContractors={ownedContractors}
          ownedCustomers={ownedCustomers}
          customerData={customerData}
          technicianData={technicianData}
          ownedTechnicians={ownedTechnicians}
        />
      );
    if (activeItem === menuItems[1].text) return <ManageBusiness />;
  };

  return (
    <Container maxWidth='md'>
      <Grid container spacing={2}>
        <Grid item container direction='column' xs={12} md={4} spacing={2}>
          <Grid item>
            <Typography variant='h6' sx={{ color: theme.palette.text.primary }}>
              Menu
            </Typography>
          </Grid>
          <Grid item>
            <Grid container>
              {menuItems.map((menuItem) => (
                <Grid item xs={12} key={menuItem.text} sx={{ m: 0.5 }}>
                  <Paper variant='outlined'>
                    <Button
                      fullWidth
                      startIcon={
                        <menuItem.icon
                          color={
                            activeItem === menuItem.text
                              ? 'primary'
                              : 'disabled'
                          }
                        />
                      }
                      variant={
                        activeItem === menuItem.text ? 'outlined' : 'text'
                      }
                      onClick={() => setActiveItem(menuItem.text)}
                      sx={{
                        textTransform: 'none',
                        justifyContent: 'flex-start',
                      }}
                    >
                      {menuItem.text}
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid item container direction='column' xs={12} md={8} spacing={2}>
          <Grid item>
            <Typography variant='h6' sx={{ color: theme.palette.text.primary }}>
              {activeItem}
            </Typography>
          </Grid>

          <Grid item sx={{ m: 0.5 }}>
            {renderSelectedComponent()}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Business;
