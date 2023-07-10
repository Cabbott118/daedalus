import { useEffect } from 'react';

// Constants
import StatusType from 'constants/statusType';

// Helpers
import formatCreatedAt from 'services/helpers/dateFormatter';

// MUI
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateServiceTicket } from 'store/slices/serviceTicketSlice';
import { fetchContractors } from 'store/slices/contractorSlice';

const ServiceTicketDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const { data: serviceTicketData, loading: serviceTicketLoading } =
    useSelector((state) => state.serviceTicket);
  const { data: contractorData, loading: contractorLoading } = useSelector(
    (state) => state.contractor
  );

  const { register, handleSubmit } = useForm({
    defaultValues: {
      assignedTo: serviceTicketData?.contractorName,
    },
  });

  useEffect(() => {
    dispatch(fetchContractors());
  }, [dispatch]);

  const onSubmit = async (data) => {
    const selectedContractor = contractorData?.find(
      (contractor) => contractor.uid === data.assignedTo
    );

    const uid = serviceTicketData?.uid;
    const updateData = {
      contractorId: data.assignedTo,
      contractorName: selectedContractor?.businessName,
      assigned: true,
      status: StatusType.ASSIGNED,
    };

    await dispatch(updateServiceTicket({ uid, updateData }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle sx={{ textDecoration: 'underline' }}>
          Service Ticket Details
        </DialogTitle>

        <DialogContent>
          {serviceTicketData && (
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant='h6'
                  sx={{ fontWeight: 400, letterSpacing: '0.05rem', mb: -1 }}
                >
                  {serviceTicketData?.customerName}
                </Typography>
                <Typography variant='caption'>
                  {formatCreatedAt(serviceTicketData?.createdAt)}
                </Typography>
                <Grid item xs={12} sx={{ my: 2 }}>
                  <Chip label='HVAC' variant='filled' color='primary' />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ bgcolor: '#eee', p: 3, borderRadius: 2, mt: 2 }}
              >
                <Typography variant='body1' sx={{}}>
                  Reason for services:
                </Typography>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  {serviceTicketData?.reasonForServices}
                </Typography>
                <Typography variant='body1' sx={{}}>
                  Site location:
                </Typography>
                <Typography variant='body2' sx={{ mb: 2, color: 'green' }}>
                  1234 Tester's Lane, Polk City, FL 33868
                </Typography>
                <Typography variant='body1'>Not to exceed (NTE):</Typography>
                <Typography variant='body2' sx={{ color: 'green' }}>
                  $5,000
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                {!serviceTicketData?.assigned ? (
                  <>
                    <Typography
                      variant='subtitle2'
                      sx={{ color: 'red', mb: 1 }}
                    >
                      This ticket requires action
                    </Typography>
                    <TextField
                      label='Assign to Contractor'
                      select
                      fullWidth
                      defaultValue={contractorData?.contractorName || ''}
                      {...register('assignedTo')}
                    >
                      {contractorData?.map((contractor, index) => (
                        <MenuItem key={index} value={contractor.uid}>
                          {contractor.businessName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </>
                ) : (
                  <>
                    <Typography variant='body1'>
                      Service ticket assigned to:
                    </Typography>
                    <Typography variant='body2'>
                      {serviceTicketData?.contractorName}
                    </Typography>
                    <Typography variant='body1' sx={{ mt: 2 }}>
                      Service ticket status:
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ textTransform: 'uppercase' }}
                    >
                      {serviceTicketData?.status}
                    </Typography>
                  </>
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} sx={{ textTransform: 'none' }}>
            Close
          </Button>
          {!serviceTicketData?.assigned && (
            <Button
              variant='contained'
              type='submit'
              sx={{ textTransform: 'none' }}
            >
              Update
            </Button>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ServiceTicketDialog;
