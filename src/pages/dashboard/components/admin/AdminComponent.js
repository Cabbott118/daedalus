import { useState, useEffect } from 'react';

// Components
import ServiceTicketDialog from 'pages/dashboard/components/admin/subcomponents/serviceTicketDialog';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';

// MUI
import { DataGrid } from '@mui/x-data-grid';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchServiceTicket,
  fetchServiceTickets,
} from 'store/slices/serviceTicketSlice';

const AdminComponent = () => {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);

  //   const { data: customerData, loading: customerLoading } = useSelector(
  //     (state) => state.customer
  //   );

  const { serviceTickets, loading: serviceTicketLoading } = useSelector(
    (state) => state.serviceTicket
  );

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    dispatch(fetchServiceTicket(params.row.uid));
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(fetchServiceTickets());
  };

  useEffect(() => {
    if (serviceTickets.length === 0) {
      dispatch(fetchServiceTickets());
    }
  }, [serviceTickets, dispatch]);

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
      uid: ticket.uid,
    }));
  }

  if (serviceTicketLoading) return <p>Loading...</p>;

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
      <ServiceTicketDialog open={open} onClose={handleDialogClose} />
    </div>
  );
};

export default AdminComponent;
