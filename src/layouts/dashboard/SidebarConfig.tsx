// routes
import { PATH_STORE_APP } from 'routes/storeAppPaths';
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

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
  order: getIcon('ic_order')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'product-subheader',
    items: [
      // MANAGEMENT : PRODUCT
      {
        title: 'product',
        path: PATH_DASHBOARD.products.root,
        icon: ICONS.tag,
        children: [
          {
            title: 'master',
            path: PATH_DASHBOARD.products.list
          },
          {
            title: 'collection',
            path: PATH_DASHBOARD.collections.list
          },
          {
            title: 'categories',
            path: PATH_DASHBOARD.categories.list
          }
        ]
      }
    ]
  },
  {
    subheader: 'menu-subheader',
    items: [
      {
        title: 'menu',
        path: PATH_DASHBOARD.menus.list,
        icon: ICONS.menu,
        children: [
          { title: 'list', path: PATH_DASHBOARD.menus.list },
          { title: 'store-menu', path: PATH_DASHBOARD.menus.storeMenu }
        ]
      }
    ]
  },
  {
    subheader: 'store-subheader',
    items: [
      {
        title: 'store',
        path: PATH_DASHBOARD.stores.list,
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
        title: 'app',
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
      },
      {
        title: 'store-menu',
        path: PATH_STORE_APP.menus.list,
        icon: ICONS.menu
      }
    ]
  }
];

export default sidebarConfig;
