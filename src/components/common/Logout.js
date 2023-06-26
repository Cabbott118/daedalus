// MUI
import { Button } from '@mui/material';

// React Router
import { useNavigate, useLocation } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';
import { clearUserData, logoutUser } from 'store/slices/userSlice';
import { clearCustomerData } from 'store/slices/customerSlice';
import { clearContractorData } from 'store/slices/contractorSlice';

// Routes
import routes from 'constants/routes';

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogout(event) {
    event.preventDefault();
    dispatch(logoutUser());
    dispatch(clearUserData());
    dispatch(clearCustomerData());
    dispatch(clearContractorData());
    navigate(routes.LOGIN, { state: { from: location } });
  }

  return (
    <Button
      color='error'
      variant='contained'
      onClick={handleLogout}
      sx={{ textTransform: 'none' }}
    >
      Logout
    </Button>
  );
}
