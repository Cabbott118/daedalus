import { useEffect } from 'react';

// Components
import EnrollmentBanner from './components/EnrollmentBanner';

// Constants
import UserType from 'constants/userType';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';

// MUI
import {
  Button,
  Container,
  Grid,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  useTheme,
} from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from 'store/slices/userSlice';
import {
  fetchContractor,
  fetchContractors,
} from 'store/slices/contractorSlice';
import { fetchCustomer } from 'store/slices/customerSlice';
import { fetchServiceTickets } from 'store/slices/serviceTicketSlice';

export default function Home() {
  document.title = 'Daedalus';

  const auth = getAuth();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { data: userData, loading: userLoading } = useSelector(
    (state) => state.user
  );
  const { data: customerData, loading: customerLoading } = useSelector(
    (state) => state.customer
  );
  const { data: contractorData, loading: contractorLoading } = useSelector(
    (state) => state.contractor
  );

  const {
    data: serviceTicketData,
    serviceTickets,
    loading: serviceTicketLoading,
  } = useSelector((state) => state.serviceTicket);

  const handleContractorsClick = () => {
    dispatch(fetchContractors());
  };

  const handleServiceTicketsClick = () => {
    dispatch(fetchServiceTickets());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await dispatch(fetchUser(user.uid));
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch]);

  useEffect(() => {
    if (userData?.userType === UserType.CUSTOMER) {
      dispatch(fetchCustomer(userData.uid));
    } else if (userData?.userType === UserType.CONTRACTOR) {
      dispatch(fetchContractor(userData.uid));
    }
  }, [userData, dispatch]);

  if (userLoading || customerLoading || contractorLoading)
    return (
      <Container maxWidth='sm'>
        <Typography>Loading...</Typography>
      </Container>
    );

  if (!userData) return <EnrollmentBanner />;

  return (
    <Container maxWidth='sm'>
      {userData && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='p'>User name:</Typography>
              <Typography variant='p'>
                {userData?.fullName?.firstName} {userData?.fullName?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='p'>User type:</Typography>
              <Typography variant='p'>{userData?.userType}</Typography>
            </Grid>
            {userData?.userType === UserType.ADMIN && (
              <>
                <Grid item xs={12}>
                  <Button onClick={handleContractorsClick}>
                    Query Contractors
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={handleServiceTicketsClick}>
                    Query Service Tickets
                  </Button>
                </Grid>
              </>
            )}
          </Grid>

          {serviceTickets && userData?.userType === UserType.ADMIN && (
            <>
              <Typography variant='h6'>Service Tickets:</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Created By</TableCell>
                      <TableCell>Company Receiving Services</TableCell>
                      <TableCell>Reason for Services</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Created At</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {serviceTickets?.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{data.createdBy}</TableCell>
                        <TableCell>{data.companyReceivingServices}</TableCell>
                        <TableCell>{data.reasonForServices}</TableCell>
                        <TableCell>{data.status}</TableCell>
                        <TableCell>{formatCreatedAt(data.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

          {contractorData && userData?.userType === UserType.ADMIN && (
            <>
              <Typography variant='h6'>Contractors:</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Contractor Name</TableCell>
                      <TableCell>Owner ID</TableCell>
                      <TableCell>UID</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contractorData?.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{data.contractorName}</TableCell>
                        <TableCell>{data.ownerId}</TableCell>
                        <TableCell>{data.uid}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      )}
    </Container>
  );
}
