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

// Customer
import CustomerEnrollment from 'pages/auth/CustomerEnrollment';
import Customer from 'pages/customer/Customer';

// Service Ticket
import ServiceTicket from 'pages/serviceTicket/ServiceTicket';

// Contractor
import ContractorEnrollment from 'pages/auth/ContractorEnrollment';
import Contractor from 'pages/contractor/Contractor';

// General
import Home from 'pages/home/Home';
import ForgotPassword from 'pages/forgotPassword/ForgotPassword';
import ForgotPasswordConfirmation from 'pages/forgotPassword/ForgotPasswordConfirmation';
import RequireAuth from 'routes/requireAuth';

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

  const toggleTheme = () => {
    setSelectedTheme((prevTheme) => {
      let updatedTheme;
      if (prevTheme === lightTheme) {
        updatedTheme = darkTheme;
      } else if (prevTheme === darkTheme) {
        updatedTheme = sunTheme;
      } else if (prevTheme === sunTheme) {
        updatedTheme = earthTheme;
      } else {
        updatedTheme = lightTheme;
      }

      // localStorage.setItem('selectedTheme', JSON.stringify(updatedTheme));
      console.log(updatedTheme);
      return updatedTheme;
    });
  };

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
              <Route index path=':uid/dashboard' element={<Dashboard />} />
              <Route
                index
                path=':uid/notifications'
                element={<Notifications />}
              />
            </Route>
            <Route
              path={routes.CUSTOMER} // place all routes that need user logged in under /customer/
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              {/* Place your 'authenticated routes in here! They can be referenced by /customer/<route> */}
              <Route index path=':uid/dashboard' element={<Customer />} />
            </Route>
            <Route
              path={routes.CONTRACTOR} // place all routes that need user logged in under /contractor/
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              {/* Place your 'authenticated routes in here! They can be referenced by /contractor/<route> */}
              <Route index path=':uid/dashboard' element={<Contractor />} />
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
          <Route
            path={routes.CUSTOMER_ENROLLMENT}
            element={<CustomerEnrollment />}
          />
          <Route
            path={routes.CONTRACTOR_ENROLLMENT}
            element={<ContractorEnrollment />}
          />
          <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route
            path={routes.FORGOT_PASSWORD_CONFRIMATION}
            element={<ForgotPasswordConfirmation />}
          />
        </Routes>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
