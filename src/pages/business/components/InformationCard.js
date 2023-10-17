// MUI
import {
  Button,
  Box,
  Chip,
  Container,
  Grid,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';

const InformationCard = ({
  companyName,
  technician,
  linesOfService,
  primaryContact,
  fullName,
  address,
  value,
  index,
  ...other
}) => {
  const theme = useTheme();
  return (
    <div role='tabpanel' hidden={value !== index} {...other}>
      {value === index && (
        <Paper elevation={3} sx={{ p: 1 }}>
          {companyName && <p>{companyName}</p>}
          {linesOfService && <p>{linesOfService}</p>}
          {primaryContact && (
            <p>
              {primaryContact.fullName.firstName}{' '}
              {primaryContact.fullName.lastName}
            </p>
          )}
          {address && (
            <p>
              {address.street}, {address.city}, {address.state}.{' '}
              {address.zipCode}
            </p>
          )}
          {fullName && (
            <p>
              {fullName.firstName} {fullName.lastName}
            </p>
          )}
        </Paper>
      )}
    </div>
  );
};

export default InformationCard;
