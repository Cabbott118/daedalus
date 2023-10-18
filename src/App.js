import { useEffect, useState } from 'react';

// Components
import Navbar from 'components/layout/Navbar';

// Constants
import routes from 'constants/routes';

// MUI
import {
  Container,
  Typography,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import { lightTheme, darkTheme, sunTheme, earthTheme } from 'styles/theme';

// Pages
// Auth
import Login from 'pages/auth/Login';
import Signup from 'pages/auth/Signup';
import Dashboard from 'pages/dashboard/Dashboard';

// Business
import Business from 'pages/business/Business';

// Service Ticket
import ServiceTicket from 'pages/serviceTicket/ServiceTicket';

// General
import Home from 'pages/home/Home';
import ForgotPassword from 'pages/forgotPassword/ForgotPassword';
import ForgotPasswordConfirmation from 'pages/forgotPassword/ForgotPasswordConfirmation';
import RequireAuth from 'routes/requireAuth';

// Admin
import Admin from 'pages/admin/Admin';

// Notifications
import Notifications from 'pages/notifications/Notifications';

// React Router
import { Outlet, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const [selectedTheme, setSelectedTheme] = useState(lightTheme);

  // useEffect(() => {
  //   const storedTheme = localStorage.getItem('selectedTheme');
  //   if (storedTheme) setSelectedTheme(JSON.parse(storedTheme));
  // }, []);

  // const toggleTheme = () => {
  //   setSelectedTheme((prevTheme) => {
  //     let updatedTheme;
  //     if (prevTheme === lightTheme) {
  //       updatedTheme = darkTheme;
  //     } else {
  //       updatedTheme = lightTheme;
  //     }

  //     localStorage.setItem('selectedTheme', JSON.stringify(updatedTheme));

  //     return updatedTheme;
  //   });
  // };

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path={routes.HOME} element={<Navbar />}>
            <Route
              index // Equivalent to saying the page content for '/'
              element={<Home />}
            />

            <Route
              path={routes.USER} // place all routes that need user logged in under /user/
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              {/* Place your 'authenticated routes in here! They can be referenced by /user/<route> */}
              <Route index path='profile' element={<Dashboard />} />
              <Route index path='notifications' element={<Notifications />} />
            </Route>

            <Route
              path={routes.BUSINESS_BASE} // place all routes that need user logged in under /business/
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              {/* Place your 'authenticated routes in here! They can be referenced by /business/<route> */}
              <Route index path=':uid/dashboard' element={<Business />} />
            </Route>

            <Route
              path={routes.SERVICE_TICKET} // place all routes that need user logged in under /service-ticket/
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              {/* Place your 'authenticated routes in here! They can be referenced by /service-ticket/<route> */}
              <Route index path=':uid' element={<ServiceTicket />} />
            </Route>

            <Route
              path={routes.ADMIN_BASE} // place all routes that need user logged in under /admin/
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              {/* Place your 'authenticated routes in here! They can be referenced by /admin/<route> */}
              <Route index path=':uid/dashboard' element={<Admin />} />
            </Route>

            <Route
              path='*' // Providing a 404 page for '/' and thus the whole site.
              element={
                <Container maxWidth='sm'>
                  <Typography variant='h2'>404 Not Found</Typography>
                  <Typography variant='body1'>
                    You'll have to journey elsewhere.
                  </Typography>
                </Container>
              }
            />
          </Route>

          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.SIGNUP} element={<Signup />} />
          <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route
            path={routes.FORGOT_PASSWORD_CONFRIMATION}
            element={<ForgotPasswordConfirmation />}
          />
        </Routes>
        {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
