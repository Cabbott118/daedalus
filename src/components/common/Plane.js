// Assets
import 'assets/css/Plane.css';
import { ReactComponent as FiveSvg } from 'assets/images/6.svg';

// MUI
import { Container, useTheme } from '@mui/material';

const Plane = ({ color }) => {
  const theme = useTheme();

  return (
    <Container maxWidth='xs' sx={{ pt: 10 }}>
      <svg
        className='react-spinner-loader-svg-calLoader'
        xmlns='http://www.w3.org/2000/svg'
        width='150'
        height='150'
      >
        <FiveSvg height='150px' style={{ fill: theme.palette.primary.main }} />
      </svg>
    </Container>
  );
};

export default Plane;
