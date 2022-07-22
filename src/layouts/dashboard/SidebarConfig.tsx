// routes
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
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
        title: 'report.dashboard',
        path: PATH_DASHBOARD.general.app,
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
      {
        title: 'menu-list',
        path: PATH_DASHBOARD.menus.root,
        icon: ICONS.menu
      },
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
        path: PATH_DASHBOARD.stores.root,
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
        path: PATH_STORE_APP.general.app,
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
      }
    ]
  }
];
export const promotionAppSidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'promotion.general',
    items: [
      {
        title: 'promotion.dashboard',
        path: PATH_PROMOTION_APP.general.app,
        icon: ICONS.dashboard
      }
    ]
  },
  {
    subheader: 'promotion.campaign',
    items: [
      {
        title: 'promotion.promotion',
        path: PATH_PROMOTION_APP.promotion.root,
        icon: ICONS.category
      },
      {
        title: 'promotion.voucher',
        path: PATH_PROMOTION_APP.voucher.root,
        icon: ICONS.tag
      },
      {
        title: 'promotion.condition',
        path: PATH_PROMOTION_APP.condition.root,
        icon: ICONS.extraCategory
      },
      {
        title: 'promotion.action',
        path: PATH_PROMOTION_APP.action.root,
        icon: ICONS.storeApply
      },
      {
        title: 'promotion.gift',
        path: PATH_PROMOTION_APP.gift.root,
        icon: ICONS.ecommerce
      }
    ]
  },
  {
    subheader: 'promotion.configuration',
    items: [
      {
        title: 'promotion.setting',
        path: PATH_PROMOTION_APP.setting.root,
        icon: ICONS.menu
      },
      {
        title: 'promotion.profile',
        path: PATH_PROMOTION_APP.profile.root,
        icon: ICONS.user
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
        title: 'report.dashboard',
        path: PATH_REPORT_APP.general.reportDashboard,
        icon: ICONS.dashboard
      }
    ]
  },
  {
    subheader: 'report.management',
    items: [
      {
        title: 'report.overviewDate',
        path: PATH_REPORT_APP.overviewDate,
        icon: ICONS.calendar
      },
      // {
      //   title: 'report.overviewMonth',
      //   path: PATH_REPORT_APP.overviewMonth,
      //   icon: ICONS.calendar
      // },
      {
        title: 'report.productProgress',
        path: PATH_REPORT_APP.productProgress,
        icon: ICONS.analytics
      },
      {
        title: 'report.productSale',
        path: PATH_REPORT_APP.productSale,
        icon: ICONS.product
      },
      {
        title: 'report.payment',
        path: PATH_REPORT_APP.payment,
        icon: ICONS.ecommerce
      },
      {
        title: 'report.trading',
        path: PATH_REPORT_APP.dayReport,
        icon: ICONS.menu
      },
      {
        title: 'report.promotion',
        path: PATH_REPORT_APP.promotion,
        icon: ICONS.kanban
      },
      {
        title: 'report.stores',
        path: PATH_REPORT_APP.stores,
        icon: ICONS.store
      }
    ]
  }
];

export default sidebarConfig;
