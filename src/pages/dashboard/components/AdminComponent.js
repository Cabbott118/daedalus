import { useState, useEffect } from 'react';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';

// MUI
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchContractors } from 'store/slices/contractorSlice';
import { fetchServiceTickets } from 'store/slices/serviceTicketSlice';

const AdminComponent = () => {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);

  //   const { data: customerData, loading: customerLoading } = useSelector(
  //     (state) => state.customer
  //   );
  const { data: contractorData, loading: contractorLoading } = useSelector(
    (state) => state.contractor
  );
  const {
    data: serviceTicketData,
    serviceTickets,
    loading: serviceTicketLoading,
  } = useSelector((state) => state.serviceTicket);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!contractorData) {
      dispatch(fetchContractors());
    }

    if (!serviceTickets) {
      dispatch(fetchServiceTickets({ uid: '' }));
    }
  }, [contractorData, serviceTickets, dispatch]);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      // width: 70
    },
    {
      field: 'customerName',
      headerName: 'Customer',
      //   width: 90,
      flex: 1, // Added flex property for responsiveness
    },
    { field: 'assigned', headerName: 'Assigned', type: 'boolean', width: 80 },
    {
      field: 'reasonForServices',
      headerName: 'Reason',
      //   width: 100,
      flex: 1, // Added flex property for responsiveness
    },
    {
      field: 'createdAt',
      headerName: 'Created On',
      flex: 1, // Added flex property for responsiveness
    },
  ];

  let rows = [];

  if (serviceTickets) {
    rows = serviceTickets.map((ticket, index) => ({
      id: index + 1,
      customerName: ticket.customerName,
      assigned: ticket.assigned,
      reasonForServices: ticket.reasonForServices,
      createdAt: formatCreatedAt(ticket.createdAt),
    }));
  }

  if (contractorLoading || serviceTicketLoading) return <p>Loading...</p>;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // autoHeight // Added autoHeight property for responsiveness
        disableColumnMenu // Disabled column menu for better mobile experience
        disableColumnSelector // Disabled column selector for better mobile experience
        disableDensitySelector // Disabled density selector for better mobile experience
        hideFooterSelectedRowCount // Hides the count of selected rows in the footer
        pagination // Added pagination for better mobile experience
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 100]}
        // checkboxSelection
        onRowClick={handleRowClick}
      />
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Service Ticket Details</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <div>
              <Typography variant='body1'>ID: {selectedRow.id}</Typography>
              <Typography variant='body1'>
                Customer: {selectedRow.customerName}
              </Typography>
              <Typography variant='body1'>
                Assigned: {selectedRow.assigned ? 'Yes' : 'No'}
              </Typography>
              <Typography variant='body1'>
                Reason: {selectedRow.reasonForServices}
              </Typography>
              <Typography variant='body1'>
                Created On: {selectedRow.createdAt}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminComponent;
