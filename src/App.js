// Components
import Navbar from 'components/layout/Navbar';

// Constants
import routes from 'constants/routes';

// MUI
import { Container, Typography, ThemeProvider } from '@mui/material';
import theme from './styles/theme';

// Pages
import Login from 'pages/auth/Login';
import Signup from 'pages/auth/Signup';
import CustomerEnrollment from 'pages/auth/CustomerEnrollment';
import ContractorEnrollment from 'pages/auth/ContractorEnrollment';
import Dashboard from 'pages/dashboard/Dashboard';
import Home from 'pages/home/Home';
import ForgotPassword from 'pages/forgotPassword/ForgotPassword';
import ForgotPasswordConfirmation from 'pages/forgotPassword/ForgotPasswordConfirmation';
import RequireAuth from 'routes/requireAuth';

// React Router
import { Outlet, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <ThemeProvider theme={theme}>
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
