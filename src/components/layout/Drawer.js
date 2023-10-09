import { useState } from 'react';

// Components
import Logout from 'components/common/Logout';

// Constants
import routes from 'constants/routes';
import UserType from 'constants/userType';

// MUI
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

// React Router
import { Link } from 'react-router-dom';

const Drawer = ({ userData, businessData, unreadNotifications }) => {
  const theme = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setIsDrawerOpen(!isDrawerOpen);
  };

  const list = () => (
    <Box
      sx={{ width: 300, pt: 1 }}
      role='presentation'
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List dense>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={`${routes.NOTIFICATIONS.replace(':uid', userData?.uid)}`}
          >
            <NotificationsIcon color='primary' />
            <ListItemText primary='Notifications' sx={{ pl: 2 }} />
            <Badge badgeContent={unreadNotifications} color='error' />
          </ListItemButton>
        </ListItem>
      </List>
      <List dense sx={{ flexGrow: 1 }}>
        <Typography variant='overline' sx={{ p: 2 }}>
          Account
        </Typography>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={`${routes.USER_DASHBOARD.replace(':uid', userData?.uid)}`}
          >
            <PersonIcon color='primary' />
            <ListItemText
              primary={`${userData?.fullName?.firstName}'s Dashboard`}
              sx={{ pl: 2 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      {userData?.userType !== UserType.ADMIN ? (
        <List dense>
          <Typography variant='overline' sx={{ p: 2 }}>
            Business
          </Typography>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={`${routes.BUSINESS_DASHBOARD.replace(
                ':uid',
                businessData?.uid
              )}`}
            >
              <BusinessIcon color='primary' />
              <ListItemText
                primary={`${businessData?.businessName} Dashboard`}
                sx={{ pl: 2 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List dense>
          <Typography variant='overline' sx={{ p: 2 }}>
            Admin
          </Typography>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={`${routes.ADMIN_DASHBOARD.replace(':uid', userData?.uid)}`}
            >
              <AdminPanelSettingsIcon color='primary' />
              <ListItemText primary='Admin Dashboard' sx={{ pl: 2 }} />
            </ListItemButton>
          </ListItem>
        </List>
      )}
      <List dense>
        <Divider />
        <ListItem>
          <Logout />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <MuiDrawer anchor='right' open={isDrawerOpen} onClose={toggleDrawer}>
        {list()}
      </MuiDrawer>
      <IconButton color='primary' onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default Drawer;
