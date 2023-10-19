// Constants
import routes from 'constants/routes';

// MUI
import { Button, useTheme } from '@mui/material';

// React Router
import { useLocation, Link } from 'react-router-dom';

const ManageBusiness = () => {
  const location = useLocation();
  const isCreate = location.pathname !== routes.MANAGE_BUSINESSES;

  if (isCreate) return null;
  return (
    <>
      <Link to={routes.CREATE_CUSTOMER}>
        <Button>Create Customer</Button>
      </Link>
      <Link to={routes.CREATE_CONTRACTOR}>
        <Button>Create Contractor</Button>
      </Link>
      <Link to={routes.CREATE_TECHNICIAN}>
        <Button>Create Technician</Button>
      </Link>
    </>
  );
};

export default ManageBusiness;
