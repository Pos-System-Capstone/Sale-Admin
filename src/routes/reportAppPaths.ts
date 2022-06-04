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
    reportDashboard: path(ROOTS_DASHBOARD, '/reportDashboard'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics')
  },
  products: {
    root: path(ROOTS_DASHBOARD, '/products'),
    list: path(ROOTS_DASHBOARD, '/products'),
    editById: path(ROOTS_DASHBOARD, '/products/:id'),
    master: path(ROOTS_DASHBOARD, '/products/master'),
    newProduct: path(ROOTS_DASHBOARD, '/products/new')
  },
  // tradingReport: {
  //   root: path(ROOTS_DASHBOARD, '/trading-report'),
  //   list: path(ROOTS_DASHBOARD, '/trading-report'),
  //   editById: path(ROOTS_DASHBOARD, '/trading-report/:id'),
  //   newProduct: path(ROOTS_DASHBOARD, '/trading-report/new'),
  //   storeMenu: path(ROOTS_DASHBOARD, '/trading-report/stores')
  // },
  orders: {
    root: path(ROOTS_DASHBOARD, '/orders'),
    list: path(ROOTS_DASHBOARD, '/orders'),
    editById: path(ROOTS_DASHBOARD, '/orders/:id'),
    new: path(ROOTS_DASHBOARD, '/orders/new')
  },
  sample: {
    root: path(ROOTS_DASHBOARD, '/sample')
  },
  overviewDate: path(ROOTS_DASHBOARD, '/overview-date'),
  overviewMonth: path(ROOTS_DASHBOARD, '/overview-month'),
  paymentReport: path(ROOTS_DASHBOARD, '/payment'),
  productSaleReport: path(ROOTS_DASHBOARD, '/product-sale'),
  productProgressReport: path(ROOTS_DASHBOARD, '/product-progress'),
  promotion: path(ROOTS_DASHBOARD, '/promotion'),
  tradingReport: path(ROOTS_DASHBOARD, '/trading-report')
};
