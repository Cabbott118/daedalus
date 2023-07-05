import { useEffect, useState } from 'react';
import UserType from 'constants/userType';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateCustomer } from 'store/slices/customerSlice';
import { updateContractor } from 'store/slices/contractorSlice';

const BusinessNameComponent = ({ uid, data = {}, userType, loading }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, setValue } = useForm({});

  useEffect(() => {
    setValue('businessName', data?.businessName);
  }, [data?.businessName, setValue]);

  const handleEditSwitch = () => {
    setEditMode(!editMode);
  };

  const onSubmit = (data) => {
    const updateData = {
      businessName: data.businessName,
    };

    switch (userType) {
      case UserType.CUSTOMER:
        dispatch(updateCustomer({ uid, updateData }));
        break;
      case UserType.CONTRACTOR:
        dispatch(updateContractor({ uid, updateData }));
        break;
      default:
        break;
    }

    setEditMode(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth='xs'>
        <Grid container spacing={3} sx={{ mt: 0, mb: 3 }}>
          <Grid item xs={9}>
            <Typography variant='h6' sx={{ textDecoration: 'underline' }}>
              Business Name
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button
              onClick={handleEditSwitch}
              disabled={editMode}
              sx={{ textTransform: 'none' }}
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={12}>
            {editMode ? (
              <TextField
                label='Business Name'
                fullWidth
                {...register('businessName')}
              />
            ) : (
              <>
                <Typography variant='subtitle2'>Business Name</Typography>
                <Typography variant='p'>{data?.businessName}</Typography>
              </>
            )}
          </Grid>
          {editMode && (
            <>
              <Grid item xs={12} sx={{ mb: -2 }}>
                <Button
                  fullWidth
                  variant='contained'
                  type='submit'
                  disabled={loading}
                  sx={{ textTransform: 'none' }}
                >
                  Update Business Name
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant='text'
                  onClick={handleEditSwitch}
                  disabled={loading}
                  sx={{ textTransform: 'none' }}
                >
                  Cancel
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default BusinessNameComponent;
