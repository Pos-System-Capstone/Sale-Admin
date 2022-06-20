// material
import { Grid } from '@mui/material';
// hooks
// components
import dashboardFill from '@iconify/icons-ant-design/dashboard-fill';
import clockOuline from '@iconify/icons-eva/clock-outline';
import repeatFill from '@iconify/icons-eva/repeat-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import trendingUp from '@iconify/icons-eva/trending-up-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import DashboarWidgets from 'components/_dashboard/general-app/DashboarWidgets';
import { PATH_REPORT_APP } from 'routes/reportAppPaths';
import Page from '../../components/Page';
// ----------------------------------------------------------------------
const Widgets = [
  {
    title: 'TỔNG QUAN',
    icon: dashboardFill,
    color: '#50C878',
    hoverColor: '#2D8F4E',
    path: PATH_REPORT_APP.overviewDate
  },
  {
    title: 'THỜI GIAN',
    icon: clockOuline,
    color: '#228B22',
    hoverColor: '#116530',
    path: PATH_REPORT_APP.dayReport
  },
  {
    title: 'SẢN PHẨM',
    icon: shoppingBagFill,
    color: '#FFA500',
    hoverColor: '#A36A00',
    path: PATH_REPORT_APP.productSale
  },
  {
    title: 'DIỄN TIẾN NGÀY',
    icon: trendingUp,
    color: '#E4021B',
    hoverColor: '#bb0909',
    path: PATH_REPORT_APP.productProgress
  },
  {
    title: 'SO SÁNH SẢN PHẨM',
    icon: repeatFill,
    color: '#30D5C8',
    hoverColor: '#1D8D84',
    path: PATH_REPORT_APP.productProgress
  },
  {
    title: 'SO SÁNH DOANH THU',
    icon: peopleFill,
    color: '#A020F0',
    hoverColor: '#6C0BA9',
    path: PATH_REPORT_APP.productProgress
  }
];

export default function ReportDashboard() {
  return (
    <Page title="Dashboard">
      <Grid container spacing={3}>
        {Widgets?.map((item) => (
          <Grid key={item.title} item xs={12} md={4}>
            <DashboarWidgets Widget={item} />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
