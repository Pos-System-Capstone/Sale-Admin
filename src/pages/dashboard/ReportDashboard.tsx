// material
import { Grid } from '@mui/material';
// hooks
// components
import Page from '../../components/Page';
import calendarFill from '@iconify/icons-eva/calendar-fill';
import archiveFill from '@iconify/icons-eva/archive-fill';
import clockOuline from '@iconify/icons-eva/clock-outline';
import castFill from '@iconify/icons-eva/cast-fill';
import pantoneFill from '@iconify/icons-eva/pantone-fill';
import { PATH_REPORT_APP } from 'routes/reportAppPaths';
import DashboarWidgets from 'components/_dashboard/general-app/DashboarWidgets';
// ----------------------------------------------------------------------
const Widgets = [
  {
    title: 'TỔNG QUAN',
    icon: archiveFill,
    color: '#18A558',
    hoverColor: '#4CAF50',
    path: PATH_REPORT_APP.overviewDate
  },
  {
    title: 'THỜI GIAN',
    icon: clockOuline,
    color: '#116530',
    hoverColor: 'green',
    path: PATH_REPORT_APP.trading
  },
  {
    title: 'SẢN PHẨM',
    icon: castFill,
    color: '#E1C340',
    hoverColor: '#FAD02C',
    path: PATH_REPORT_APP.productSale
  },
  {
    title: 'DIỄN TIẾN NGÀY',
    icon: calendarFill,
    color: '#E4021B',
    hoverColor: '#bb0909',
    path: PATH_REPORT_APP.productProgress
  },
  {
    title: 'SO SÁNH SẢN PHẨM',
    icon: pantoneFill,
    color: '#2E8BC0',
    hoverColor: '#009688',
    path: PATH_REPORT_APP.productProgress
  }
];

export default function ReportDashboard() {
  return (
    <Page title="Dashboard">
      <Grid container spacing={3}>
        {Widgets.map((item) => (
          <Grid key={item.title} item xs={12} md={4}>
            <DashboarWidgets Widget={item} />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
