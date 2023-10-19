// React Routes - ** Not API Routes **
// Link to uid routes by referencing to={`${routes.ROUTE_NAME.replace(':uid', someId)}`}

const routes = {
  // Base
  HOME: '/',
  FORGOT_PASSWORD: '/forgot-password',
  FORGOT_PASSWORD_CONFRIMATION: '/forgot-password-confirmation',

  // Auth
  LOGIN: '/login',
  SIGNUP: '/signup',
  USER: '/user',

  // Manage
  MANAGE_BUSINESSES: '/manage-businesses',

  // Create
  CREATE_CUSTOMER: '/manage-businesses/create-customer',
  CREATE_CONTRACTOR: '/manage-businesses/create-contractor',
  CREATE_TECHNICIAN: '/manage-businesses/create-technician',

  // User
  PROFILE: '/user/profile',
  ACCOUNT: '/user/account',
  NOTIFICATIONS: '/user/notifications',

  // Service Ticket
  SERVICE_TICKET: '/service-ticket',

  // Misc
  ABOUT_US: '/about-us',
  CONTACT_US: '/contact-us',
};

export default routes;
