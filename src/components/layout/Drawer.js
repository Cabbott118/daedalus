import { useState } from 'react';

// Components
import Logout from 'components/common/Logout';

// Constants
import routes from 'constants/routes';

// MUI
import {
  Badge,
  Box,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
  useTheme,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CloseIcon from '@mui/icons-material/Close';

// React Router
import { Link } from 'react-router-dom';

const MenuItem = ({ icon, primaryText, to, notifications = 0, onClick }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={to} onClick={onClick}>
        {icon}
        <ListItemText
          primary={primaryText}
          primaryTypographyProps={{
            fontSize: 16,
            fontWeight: 500,
          }}
          sx={{ pl: 1 }}
        />
        {notifications > 0 && (
          <Badge badgeContent={notifications} color='error' />
        )}
      </ListItemButton>
    </ListItem>
  );
};

const Drawer = ({ userData, unreadNotifications }) => {
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

  return (
    <>
      <MuiDrawer anchor='top' open={isDrawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ pt: 1, minHeight: '100vh' }}
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List sx={{ height: 50 }}>
            <ListItem
              secondaryAction={
                <IconButton edge='end' sx={{ mr: 2, mt: 1 }}>
                  <CloseIcon />
                </IconButton>
              }
            />
          </List>
          <Divider />
          <List
            dense
            subheader={
              <ListSubheader
                component='div'
                sx={{ textTransform: 'uppercase', letterSpacing: 1 }}
              >
                Menu
              </ListSubheader>
            }
            sx={{ pt: 3 }}
          >
            <MenuItem
              icon={<HomeOutlinedIcon />}
              primaryText='Home'
              to={routes.HOME}
              onClick={toggleDrawer}
            />
            <MenuItem
              icon={<CorporateFareOutlinedIcon />}
              primaryText='Manage businesses'
              to={routes.MANAGE_BUSINESSES}
              onClick={toggleDrawer}
            />
          </List>
          <Divider variant='middle' sx={{ my: 3 }} />
          <List
            dense
            subheader={
              <ListSubheader
                component='div'
                sx={{ textTransform: 'uppercase' }}
              >
                Account
              </ListSubheader>
            }
            sx={{ flexGrow: 1 }}
          >
            <MenuItem
              icon={<AccountCircleOutlinedIcon />}
              primaryText='Your profile'
              to={routes.PROFILE}
              onClick={toggleDrawer}
            />
            <MenuItem
              icon={<SettingsOutlinedIcon />}
              primaryText='Account settings'
              to={routes.ACCOUNT}
              onClick={toggleDrawer}
            />
            <MenuItem
              icon={<NotificationsOutlinedIcon />}
              primaryText='Notifications'
              to={routes.NOTIFICATIONS}
              onClick={toggleDrawer}
              notifications={unreadNotifications}
            />
          </List>
          <Divider variant='middle' sx={{ my: 3 }} />
          <List
            dense
            subheader={
              <ListSubheader
                component='div'
                sx={{ textTransform: 'uppercase' }}
              >
                Resources & Support
              </ListSubheader>
            }
            sx={{ flexGrow: 1 }}
          >
            <MenuItem
              icon={<GroupsOutlinedIcon />}
              primaryText='About us'
              to={routes.ABOUT_US}
              onClick={toggleDrawer}
            />
            <MenuItem
              icon={<ContactSupportOutlinedIcon />}
              primaryText='Contact us'
              to={routes.CONTACT_US}
              onClick={toggleDrawer}
            />
          </List>
          <Divider variant='middle' sx={{ mt: 3, mb: 1 }} />
          <List>
            <ListItem>
              <Logout />
            </ListItem>
          </List>
        </Box>
      </MuiDrawer>
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default Drawer;
