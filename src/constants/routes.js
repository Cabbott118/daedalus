// React Routes - ** Not API Routes **
// Link to uid routes by referencing to={`${routes.ROUTE_NAME.replace(':uid', someId)}`}

const routes = {
  // Auth
  LOGIN: '/login',
  SIGNUP: '/signup',
  USER: '/user',

  // Customer
  CUSTOMER_BASE: '/customer',
  CUSTOMER_ENROLLMENT: '/enrollment-customer',
  CUSTOMER: '/customer/:uid/dashboard',

  // Contractor
  CONTRACTOR_BASE: '/contractor',
  CONTRACTOR_ENROLLMENT: '/enrollment-contractor',
  CONTRACTOR_DASHBOARD: '/contractor/:uid/dashboard',

  // User
  USER_DASHBOARD: '/user/:uid/dashboard',

  // Business
  BUSINESS_BASE: '/business',
  BUSINESS_DASHBOARD: '/business/:uid/dashboard',

  // Service Ticket
  SERVICE_TICKET: '/service-ticket',

  // Notifications
  NOTIFICATIONS: '/user/:uid/notifications',

  // General
  HOME: '/',
  FORGOT_PASSWORD: '/forgot-password',
  FORGOT_PASSWORD_CONFRIMATION: '/forgot-password-confirmation',

  // Admin
  ADMIN_BASE: '/admin',
  ADMIN_DASHBOARD: '/admin/:uid/dashboard',
};

export default routes;
