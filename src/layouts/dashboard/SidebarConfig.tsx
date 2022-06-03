// routes
import { PATH_REPORT_APP } from 'routes/reportAppPaths';
import { PATH_STORE_APP } from 'routes/storeAppPaths';
import SvgIconStyle from '../../components/SvgIconStyle';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  kanban: getIcon('ic_kanban'),
  tag: getIcon('tag'),
  menu: getIcon('menu'),
  store: getIcon('ic_store'),
  order: getIcon('ic_order'),
  category: getIcon('ic_category'),
  extraCategory: getIcon('ic_extra_category'),
  storeApply: getIcon('ic_store_apply'),
  combo: getIcon('ic_combo'),
  product: getIcon('ic_product'),
  collection: getIcon('ic_collection')
};

const sidebarConfig = [
  {
    subheader: 'general',
    items: [
      {
        title: 'reportDashboard',
        path: PATH_DASHBOARD.general.reportDashboard,
        icon: ICONS.dashboard
      },
      {
        title: 'order',
        path: PATH_DASHBOARD.orders.list,
        icon: ICONS.order
      }
    ]
  },
  {
    subheader: 'menu-subheader',
    items: [
      { title: 'menu-list', path: PATH_DASHBOARD.tradingReport.list, icon: ICONS.menu },
      {
        title: 'store-menu-apply',
        path: PATH_DASHBOARD.tradingReport.storeMenu,
        icon: ICONS.storeApply
      }
    ]
  },
  {
    subheader: 'product-subheader',
    items: [
      // MANAGEMENT : PRODUCT
      {
        title: 'master',
        path: PATH_DASHBOARD.products.list,
        icon: ICONS.product
      },
      {
        title: 'combo-list',
        path: PATH_DASHBOARD.combos.list,
        icon: ICONS.combo
      }
    ]
  },
  {
    subheader: 'group-subheader',
    path: PATH_DASHBOARD.group.root,
    items: [
      {
        title: 'category',
        path: PATH_DASHBOARD.categories.list,
        icon: ICONS.category
      },
      {
        title: 'extra-category',
        path: PATH_DASHBOARD.categories.extra,
        icon: ICONS.extraCategory
      },
      {
        title: 'collection',
        path: PATH_DASHBOARD.collections.list,
        icon: ICONS.collection
      }
    ]
  },

  {
    subheader: 'store-subheader',
    items: [
      {
        title: 'store',
        path: PATH_DASHBOARD.promotion.list,
        icon: ICONS.store
      }
    ]
  }
];

export const storeAppSidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'reportDashboard',
        path: PATH_STORE_APP.general.reportDashboard,
        icon: ICONS.dashboard
      }
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : PRODUCT

      {
        title: 'order',
        path: PATH_STORE_APP.orders.list,
        icon: ICONS.order
      },
      {
        title: 'store-menu',
        path: PATH_STORE_APP.tradingReport.list,
        icon: ICONS.menu
      }
    ]
  }
];

export const reportAppSidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'dashboard',
        path: PATH_REPORT_APP.general.reportDashboard,
        icon: ICONS.dashboard
      }
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : PRODUCt
      { title: 'report.overviewDate', path: PATH_REPORT_APP.overviewDate, icon: ICONS.calendar },
      { title: 'report.overviewMonth', path: PATH_REPORT_APP.overviewMonth, icon: ICONS.calendar },
      {
        title: 'report.productSaleReport',
        path: PATH_REPORT_APP.productSaleReport,
        icon: ICONS.product
      },
      {
        title: 'report.productProgressReport',
        path: PATH_REPORT_APP.productProgressReport,
        icon: ICONS.analytics
      },
      {
        title: 'report.paymentReport',
        path: PATH_REPORT_APP.paymentReport,
        icon: ICONS.ecommerce
      },
      {
        title: 'tradingReport',
        path: PATH_DASHBOARD.tradingReport.root,
        icon: ICONS.menu
      },
      {
        title: 'promotionReport',
        path: PATH_DASHBOARD.promotion.root,
        icon: ICONS.kanban
      }
    ]
  }
];

export default sidebarConfig;
