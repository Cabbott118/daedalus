import { useEffect, useState } from 'react';

// Components
import Logout from 'components/common/Logout';

// Constants
import routes from 'constants/routes';

// Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// MUI
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Menu,
  MenuItem,
  Toolbar,
  useTheme,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// React Router
import { Link, Outlet } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

export default function Navbar() {
  const theme = useTheme();
  const { data } = useSelector((state) => state.user);

  const [navLinks, setNavLinks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = getAuth();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setNavLinks([
          {
            name: `${data?.fullName?.firstName ?? 'Profile'}`,
            onClick: handleMenu,
            icon: ArrowDropDownIcon,
          },
        ]);
      } else {
        setNavLinks([
          {
            name: 'Login',
            route: routes.LOGIN,
          },
          {
            name: 'Signup',
            route: routes.SIGNUP,
            buttonType: 'contained',
          },
        ]);
      }
    });
  }, [onAuthStateChanged, data]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Container maxWidth='md'>
          <AppBar
            position='static'
            color='transparent'
            sx={{ boxShadow: 'none' }}
          >
            <Toolbar>
              <Link to={routes.HOME} style={{ flexGrow: 1 }}>
                <Button
                  sx={{
                    textTransform: 'none',
                    // color: theme.palette.secondary.dark,
                  }}
                >
                  Home
                </Button>
              </Link>

              {navLinks.map((navLink) => (
                <Link key={navLink.name} to={navLink.route}>
                  <Button
                    onClick={navLink.onClick}
                    variant={navLink.buttonType}
                    sx={{
                      textTransform: 'none',
                      // color: theme.palette.secondary.dark,
                    }}
                  >
                    {navLink.name} {navLink.icon && <navLink.icon />}
                  </Button>
                </Link>
              ))}
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  component={Link}
                  to={`${routes.USER}/${data?.uid}/dashboard`}
                  onClick={handleClose}
                >
                  Dashboard
                </MenuItem>
                <Divider />
                <MenuItem>{/* <Logout /> */}</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Container>
      </Box>
      <Outlet />
    </>
  );
}
