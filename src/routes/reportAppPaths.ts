// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/report';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_REPORT_APP = {
  root: ROOTS_DASHBOARD,
  general: {
    reportDashboard: path(ROOTS_DASHBOARD, '/dashboard'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics')
  },
  overviewDate: path(ROOTS_DASHBOARD, '/overview-date'),
  overviewMonth: path(ROOTS_DASHBOARD, '/overview-month'),
  payment: path(ROOTS_DASHBOARD, '/payment'),
  productSale: path(ROOTS_DASHBOARD, '/product-sale'),
  productProgress: path(ROOTS_DASHBOARD, '/product-progress'),
  promotion: path(ROOTS_DASHBOARD, '/promotion'),
  trading: path(ROOTS_DASHBOARD, '/trading')
};
