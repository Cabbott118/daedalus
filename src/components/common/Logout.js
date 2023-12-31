// MUI
import { Button, Divider } from '@mui/material';

// React Router
import { useNavigate, useLocation } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { clearUserData, logoutUser } from 'store/slices/userSlice';
import { clearCustomerData } from 'store/slices/customerSlice';
import { clearContractorData } from 'store/slices/contractorSlice';
import { clearAdministratorData } from 'store/slices/administratorSlice';
import { clearTechnicianData } from 'store/slices/technicianSlice';
import { clearServiceTicketData } from 'store/slices/serviceTicketSlice';
import { clearNotificationData } from 'store/slices/notificationsSlice';

// Routes
import routes from 'constants/routes';

export default function Logout({ variant }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async (event) => {
    event.preventDefault();
    await Promise.all([
      dispatch(logoutUser()),
      dispatch(clearUserData()),
      dispatch(clearCustomerData()),
      dispatch(clearContractorData()),
      dispatch(clearAdministratorData()),
      dispatch(clearTechnicianData()),
      dispatch(clearServiceTicketData()),
      dispatch(clearNotificationData()),
    ]);

    navigate(routes.LOGIN, { state: { from: location } });
  };

  return (
    <>
      <Divider light variant='middle' />
      <Button
        color='error'
        variant={variant}
        fullWidth
        onClick={handleLogout}
        sx={{ textTransform: 'none' }}
      >
        Logout
      </Button>
    </>
  );
}
