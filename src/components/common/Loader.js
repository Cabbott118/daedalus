// Assets
import 'assets/css/loader.css';
import { ReactComponent as Daedalus } from 'assets/images/daedalus.svg';

// MUI
import { Container, useTheme } from '@mui/material';

const Loader = ({ color }) => {
  const theme = useTheme();

  return (
    <Container maxWidth='xs' sx={{ pt: 20 }}>
      <svg
        className='react-spinner-loader-svg-calLoader'
        xmlns='http://www.w3.org/2000/svg'
        width='200'
        height='200'
      >
        <Daedalus
          height='100px'
          width='100px'
          style={{
            fill: theme.palette.primary.main,
          }}
        />
      </svg>
    </Container>
  );
};

export default Loader;
