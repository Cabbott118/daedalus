// React Routes - ** Not API Routes **
// Link to uid routes by referencing to={`${routes.ROUTE_NAME.replace(':uid', someId)}`}

const routes = {
  // Auth
  LOGIN: '/login',
  SIGNUP: '/signup',
  USER: '/user',

  // Customer
  CUSTOMER_ENROLLMENT: '/enrollment-customer',
  CUSTOMER: '/customer/:uid/dashboard',

  // Contractor
  CONTRACTOR_ENROLLMENT: '/enrollment-contractor',
  CONTRACTOR: '/contractor/:uid/dashboard',

  // Dashboard
  DASHBOARD: '/user/:uid/dashboard',

  // Service Ticket
  SERVICE_TICKET: '/service-ticket',

  // Notifications
  NOTIFICATIONS: '/user/:uid/notifications',

  // General
  HOME: '/',
  FORGOT_PASSWORD: '/forgot-password',
  FORGOT_PASSWORD_CONFRIMATION: '/forgot-password-confirmation',
};

export default routes;
