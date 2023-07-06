import { useEffect } from 'react';

// Components
import CreateServiceTicketDialog from 'pages/customer/components/CreateServiceTicketDialog';

// Constants
import UserType from 'constants/userType';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';

// MUI
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchServiceTicketsAssignedTo,
  fetchServiceTicketsCreatedBy,
} from 'store/slices/serviceTicketSlice';

const ServiceTicketsComponent = ({
  uid,
  userData,
  customerData,
  contractorData,
}) => {
  const dispatch = useDispatch();
  const { serviceTickets } = useSelector((state) => state.serviceTicket);

  useEffect(() => {
    if (
      userData?.userType === UserType.CUSTOMER &&
      customerData?.address &&
      customerData?.primaryContact &&
      uid
    ) {
      dispatch(fetchServiceTicketsCreatedBy(uid));
    }

    if (userData?.userType === UserType.CONTRACTOR && contractorData?.uid) {
      const assignedToId = contractorData?.uid;
      dispatch(fetchServiceTicketsAssignedTo(assignedToId));
    }
  }, [dispatch, uid, userData, customerData, contractorData]);

  if (userData?.userType === UserType.CUSTOMER) {
    if (!customerData?.address || !customerData?.primaryContact) {
      return <p>Complete Business Information</p>;
    }

    return (
      <>
        <CreateServiceTicketDialog
          userId={userData?.uid}
          customerData={customerData}
        />
        {serviceTickets && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company Receiving Services</TableCell>
                  <TableCell>Reason for Services</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serviceTickets?.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.customerName}</TableCell>
                    <TableCell>
                      <Typography
                        variant='body2'
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: 200, // Adjust the value as needed
                        }}
                      >
                        {data.reasonForServices}
                      </Typography>
                    </TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{formatCreatedAt(data.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </>
    );
  }

  if (userData?.userType === UserType.CONTRACTOR) {
    if (!contractorData?.address || !contractorData?.primaryContact) {
      return <p>Complete Business Information</p>;
    }
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Receiving Services</TableCell>
              <TableCell>Reason for Services</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceTickets?.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.customerName}</TableCell>
                <TableCell>{data.reasonForServices}</TableCell>
                <TableCell>{data.status}</TableCell>
                <TableCell>{formatCreatedAt(data.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return null;
};

export default ServiceTicketsComponent;
