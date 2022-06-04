import BlogNewPost from 'pages/dashboard/BlogNewPost';
// static
import BlogPost from 'pages/dashboard/BlogPost';
// layouts
import BlogPosts from 'pages/dashboard/BlogPosts';
import DashBoardReport from 'pages/report/DashBoardReport';
import Sample from 'pages/report/SampleReport/sampleReport';
import { lazy, Suspense } from 'react';
import { Navigate, useLocation, useRoutes } from 'react-router-dom';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
// guards
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';

// import ReportGeneralApp from 'pages/report/GeneralReport/GeneralApp';

// ----------------------------------------------------------------------

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={['admin']}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to="/dashboard/reportDashboard" replace /> },
        { path: 'reportDashboard', element: <ReportDashboard /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        {
          path: 'analytics',
          element: <GeneralAnalytics />
        },
        {
          path: 'orders',
          children: [
            { path: '', element: <OrderListPage /> },
            { path: 'new', element: <CreateProduct /> },
            { path: ':id', element: <UpdateProduct /> },
            { path: 'master', element: <Products /> }
          ]
        },
        {
          path: 'products',
          children: [
            { path: '', element: <Products /> },
            { path: 'new', element: <CreateProduct /> },
            { path: ':id', element: <UpdateProduct /> },
            { path: 'master', element: <Products /> }
          ]
        },
        {
          path: 'combos',
          children: [
            { path: '', element: <ComboListPage /> },
            { path: 'new', element: <CreateComboPage /> },
            { path: ':comboId', element: <UpdateComboPage /> },
            { path: 'master', element: <Products /> }
          ]
        },
        {
          path: 'collections',
          children: [
            { path: '', element: <CollectionListPage /> },
            { path: 'new', element: <CreateCollectionPage /> },
            { path: ':id', element: <UpdateCollectionPage /> }
          ]
        },
        {
          path: 'categories',
          children: [
            { path: 'extra', element: <CategoryListPage isExtra /> },
            { path: '', element: <CategoryListPage /> },
            { path: 'new', element: <CreateCategoryPage /> },
            { path: ':id', element: <UpdateCategoryPage /> }
          ]
        },
        {
          path: 'menus',
          children: [
            { path: '', element: <MenusPage /> },
            { path: ':id', element: <UpdateMenuPage /> }
          ]
        },
        { path: 'menu-in-store', element: <MenuInStorePage /> },
        {
          path: 'customers',
          children: [
            { path: '', element: <CustomerListPage /> },
            { path: 'new', element: <ComingSoon /> }
          ]
        },
        {
          path: 'stores',
          children: [
            { path: '', element: <StoreListPage /> },
            {
              path: 'new',
              element: <CreateStorePage />
            },
            { path: ':id', element: <UpdateStorePage /> }
          ]
        }
      ]
    },
    {
      path: 'report',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={['admin']}>
            <DashBoardReport />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to="/report/reportDashboard" replace /> },
        { path: 'reportDashboard', element: <ReportDashboard /> },
        {
          path: 'sample',
          element: <Sample />
        },
        {
          path: 'overview-date',
          element: <OverviewDate />
        },
        {
          path: 'overview-month',
          element: <OverviewMonth />
        },
        {
          path: 'payment',
          children: [{ path: '', element: <PaymentReport /> }]
        },
        {
          path: 'product-progress',
          children: [{ path: '', element: <ProductProgressReport /> }]
        },
        {
          path: 'product-sale',
          children: [{ path: '', element: <ProductSaleReport /> }]
        },
        {
          path: 'trading-report',
          children: [
            { path: '', element: <TradingReport /> },
            { path: ':id', element: <UpdateMenuPage /> }
          ]
        },
        {
          path: 'promotion',
          children: [{ path: '', element: <PromotionReport /> }]
        }
      ]
    },

    // FOR STORE ADMIN
    {
      path: 'store-admin',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={['store-admin']}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to="/store-admin/orders" replace /> },
        { path: 'reportDashboard', element: <ReportDashboard /> },

        {
          path: 'orders',
          children: [
            { path: '', element: <OrderListPage /> },
            {
              path: 'new',
              element: <CreateStorePage />
            },
            { path: ':id', element: <UpdateStorePage /> }
          ]
        },
        {
          path: 'blog',
          children: [
            { path: '', element: <Navigate to="/dashboard/blog/posts" replace /> },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new-post', element: <BlogNewPost /> }
          ]
        },
        {
          path: 'menus',
          element: <MenuStoreManagementPage />
        }
      ]
    },

    {
      path: '/',
      element: <Navigate to="/auth/login" replace />
    },
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const ReportDashboard = Loadable(lazy(() => import('../pages/dashboard/ReportDashboard')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));

const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Components
const Products = Loadable(lazy(() => import('../pages/Products/Products')));
const UpdateProduct = Loadable(lazy(() => import('../pages/Products/UpdateProduct')));
const CreateProduct = Loadable(lazy(() => import('../pages/Products/create')));

// Menu
const TradingReport = Loadable(lazy(() => import('../pages/TradingReport')));
const MenusPage = Loadable(lazy(() => import('../pages/Menus')));
const UpdateMenuPage = Loadable(lazy(() => import('../pages/Menus/update')));
const MenuInStorePage = Loadable(lazy(() => import('../pages/Menus/MenuInStore')));

// Collection
const CollectionListPage = Loadable(lazy(() => import('../pages/collections')));
const UpdateCollectionPage = Loadable(lazy(() => import('../pages/collections/update')));
const CreateCollectionPage = Loadable(lazy(() => import('../pages/collections/create')));

// Store
const PromotionReport = Loadable(lazy(() => import('../pages/PromotionReport')));
const StoreListPage = Loadable(lazy(() => import('../pages/Stores')));
const CreateStorePage = Loadable(lazy(() => import('../pages/Stores/create')));
const UpdateStorePage = Loadable(lazy(() => import('../pages/Stores/update')));

// Store-Order
const OrderListPage = Loadable(lazy(() => import('../pages/Orders/OrderList')));
const MenuStoreManagementPage = Loadable(lazy(() => import('../pages/Orders/MenuOfStore')));

// Categories
const CategoryListPage = Loadable(lazy(() => import('../pages/Categories')));
const CreateCategoryPage = Loadable(lazy(() => import('../pages/Categories/CreateCategory')));
const UpdateCategoryPage = Loadable(lazy(() => import('../pages/Categories/UpdateCategory')));

// customers
const CustomerListPage = Loadable(lazy(() => import('../pages/Customer/CustomerListPage')));

// combos
const ComboListPage = Loadable(lazy(() => import('../pages/Products/Combos/ComboList')));
const CreateComboPage = Loadable(lazy(() => import('../pages/Products/Combos/CreateCombo')));
const UpdateComboPage = Loadable(lazy(() => import('../pages/Products/Combos/UpdateCombo')));

// report
const OverviewDate = Loadable(lazy(() => import('../pages/report/Overview/OverviewDate')));
const OverviewMonth = Loadable(lazy(() => import('../pages/report/Overview/OverviewMonth')));
const ProductSaleReport = Loadable(
  lazy(() => import('../pages/report/ProductReport/ProductSaleReport'))
);
const ProductProgressReport = Loadable(
  lazy(() => import('../pages/report/ProductReport/ProductProgressReport'))
);
const PaymentReport = Loadable(lazy(() => import('../pages/report/PaymentReport')));
