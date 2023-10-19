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

// Service Ticket
import ServiceTicket from 'pages/serviceTicket/ServiceTicket';

// General
import Home from 'pages/home/Home';
import ForgotPassword from 'pages/forgotPassword/ForgotPassword';
import ForgotPasswordConfirmation from 'pages/forgotPassword/ForgotPasswordConfirmation';
import RequireAuth from 'routes/requireAuth';

// Notifications
import Notifications from 'pages/notifications/Notifications';

// Business Management
import ManageBusiness from 'pages/manageBusiness/ManageBusiness';
import CreateCustomer from 'pages/manageBusiness/createCustomer/CreateCustomer';
import CreateContractor from 'pages/manageBusiness/createContractor/CreateContractor';
import CreateTechnician from 'pages/manageBusiness/createTechnician/CreateTechnician';

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
            <Route index element={<Home />} />

            <Route
              path={routes.USER}
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route index path='profile' element={<Dashboard />} />
              <Route index path='notifications' element={<Notifications />} />
            </Route>

            <Route
              path={routes.MANAGE_BUSINESSES}
              element={
                <RequireAuth>
                  <ManageBusiness />
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route
                index
                path={routes.CREATE_CUSTOMER}
                element={<CreateCustomer />}
              />
              <Route
                index
                path={routes.CREATE_CONTRACTOR}
                element={<CreateContractor />}
              />
              <Route
                index
                path={routes.CREATE_TECHNICIAN}
                element={<CreateTechnician />}
              />
            </Route>

            <Route
              path={routes.SERVICE_TICKET}
              element={
                <RequireAuth>
                  <Outlet />
                </RequireAuth>
              }
            >
              <Route index path=':uid' element={<ServiceTicket />} />
            </Route>

            <Route
              path='*'
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
