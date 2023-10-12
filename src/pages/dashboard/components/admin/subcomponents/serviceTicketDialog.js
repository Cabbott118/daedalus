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
  useTheme,
} from '@mui/material';

// React Hook Form
import { useForm } from 'react-hook-form';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { updateServiceTicket } from 'store/slices/serviceTicketSlice';

const ServiceTicketDialog = ({ businessData, open, onClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { data: serviceTicketData, loading: serviceTicketLoading } =
    useSelector((state) => state.serviceTicket);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      assignedTo: serviceTicketData?.contractorName,
    },
  });

  const onSubmit = async (data) => {
    const selectedContractor = businessData?.find(
      (contractor) => contractor.uid === data.assignedTo
    );

    const uid = serviceTicketData?.uid;
    const updateData = {
      serviceProvider: {
        id: data.assignedTo,
        name: selectedContractor?.businessName,
      },
      assigned: true,
      status: StatusType.ASSIGNED,
    };

    await dispatch(updateServiceTicket({ uid, updateData }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{
            textDecoration: 'underline',
            color: theme.palette.text.primary,
          }}
        >
          Service Ticket Details
        </DialogTitle>

        <DialogContent>
          {serviceTicketData && (
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: 400,
                    letterSpacing: '0.05rem',
                    mb: -1,
                    color: theme.palette.text.primary,
                  }}
                >
                  {serviceTicketData?.owner?.name}
                </Typography>
                <Typography
                  variant='caption'
                  sx={{ color: theme.palette.text.primary }}
                >
                  {formatCreatedAt(serviceTicketData?.createdAt)}
                </Typography>
                <Grid item xs={12} sx={{ my: 2 }}>
                  <Chip
                    label={serviceTicketData?.typeOfServices}
                    variant='filled'
                    color='primary'
                  />
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  bgcolor: theme.additionalPalette.primary,
                  p: 3,
                  borderRadius: 2,
                  mt: 2,
                }}
              >
                <Typography
                  variant='body1'
                  sx={{ color: theme.palette.text.primary }}
                >
                  Reason for services:
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ mb: 2, color: theme.palette.text.primary }}
                >
                  {serviceTicketData?.reasonForServices}
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ color: theme.palette.text.primary }}
                >
                  Site location:
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ mb: 2, color: theme.palette.text.primary }}
                >
                  1234 Tester's Lane, Polk City, FL 33868
                </Typography>
                <Typography
                  variant='body1'
                  sx={{ color: theme.palette.text.primary }}
                >
                  Not to exceed (NTE):
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: theme.palette.text.primary }}
                >
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
                      color='primary'
                      defaultValue={businessData?.businessName || ''}
                      {...register('assignedTo')}
                    >
                      {businessData?.map((contractor, index) => (
                        <MenuItem key={index} value={contractor.uid}>
                          {contractor.businessName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </>
                ) : (
                  <>
                    <Typography
                      variant='body1'
                      sx={{ color: theme.palette.text.primary }}
                    >
                      Service ticket assigned to:
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: theme.palette.text.primary }}
                    >
                      {serviceTicketData?.serviceProvider.name}
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{ mt: 2, color: theme.palette.text.primary }}
                    >
                      Service ticket status:
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{
                        textTransform: 'uppercase',
                        color: theme.palette.text.primary,
                      }}
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
          <Button
            onClick={onClose}
            sx={{ textTransform: 'none', color: theme.palette.text.primary }}
          >
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
