// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}
const ROOTS_AUTH = '/auth';
export const ROOTS_DASHBOARD = `/report`;
const id = localStorage.getItem('storeId');
console.log(id);

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
    reportDashboard: path(ROOTS_DASHBOARD, '/dashboard')
  },
  overviewDate: path(ROOTS_DASHBOARD, '/overview-date'),
  overviewMonth: path(ROOTS_DASHBOARD, '/overview-month'),
  payment: path(ROOTS_DASHBOARD, '/payment'),
  productSale: path(ROOTS_DASHBOARD, '/product-sale'),
  productProgress: path(ROOTS_DASHBOARD, '/product-progress'),
  promotion: path(ROOTS_DASHBOARD, '/promotion'),
  dayReport: path(ROOTS_DASHBOARD, '/day-report'),
  timeReport: path(ROOTS_DASHBOARD, '/day-report/time-report'),
  dateReport: path(ROOTS_DASHBOARD, '/day-report/date-report'),
  monthReport: path(ROOTS_DASHBOARD, '/day-report/month-report'),
  stores: path(ROOTS_DASHBOARD, '/stores')
};
