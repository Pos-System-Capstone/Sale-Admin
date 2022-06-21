import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CancelIcon from '@mui/icons-material/Cancel';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import palette from 'theme/palette';
import { fNumber } from 'utils/formatNumber';
import TableCard, { fakeData, MiniTableCard } from '../components/TableCard';
import config from './config';

function RevenueOverview() {
  // Chart
  const actualRevenueChart = {
    series: [
      fakeData.TotalRevenueAtStore,
      fakeData.TotalRevenueTakeAway,
      fakeData.TotalRevenueDelivery
    ],
    chartOptions: {
      legend: { show: true, fontSize: '16px' },
      labels: ['Tại cửa hàng', 'Mang về', 'Giao hàng'],
      colors: [
        palette.light.reportPalette.red1,
        palette.light.reportPalette.darkGreen1,
        palette.light.reportPalette.yellow1
      ]
    }
  };

  const billOfSaleChart = {
    series: [fakeData.TotalOrderAtStore, fakeData.TotalOrderTakeAway, fakeData.TotalOrderDelivery],
    options: {
      legend: { show: true, fontSize: '16px' },
      labels: ['Tại cửa hàng', 'Mang về', 'Giao hàng'],
      colors: [
        palette.light.reportPalette.red1,
        palette.light.reportPalette.darkGreen1,
        palette.light.reportPalette.yellow1
      ]
    }
  };
  return (
    <Stack spacing={4} mt={4}>
      {/* I. Bán hàng */}
      <Stack spacing={2}>
        <Typography pl={1} variant="h4">
          I. Bán hàng
        </Typography>

        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TableCard
                titleHeader="Tổng doanh thu bán hàng"
                subtitleHeader="Đơn vị (VNĐ)"
                bc="reportPalette.green1"
                bch="reportPalette.green2"
                columnData={config.totalSalesRevenue}
                fakeData={fakeData}
              />
            </Grid>
            <Grid item xs={6}>
              <TableCard
                titleHeader="Tổng số hóa đơn bán hàng"
                subtitleHeader="Đơn vị (Hóa đơn)"
                bc="reportPalette.blue1"
                bch="reportPalette.blue2"
                columnData={config.totalSalesInvoice}
                fakeData={fakeData}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>

      {/* II. Nạp thẻ */}
      <Stack spacing={2}>
        <Typography pl={1} variant="h4">
          II. Nạp thẻ
        </Typography>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TableCard
                titleHeader="Tổng doanh thu nạp thẻ"
                subtitleHeader="Đơn vị (VNĐ)"
                bc="reportPalette.green1"
                bch="reportPalette.green2"
                columnData={config.TotalRevenueCardRecharge}
                fakeData={fakeData}
              />
            </Grid>
            <Grid item xs={6}>
              <TableCard
                titleHeader="Tổng số hóa đơn nạp thẻ"
                subtitleHeader="Đơn vị (Hóa đơn)"
                bc="reportPalette.blue1"
                bch="reportPalette.blue2"
                columnData={config.totalBillOfCard}
                fakeData={fakeData}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>

      {/* III. Thành phần doanh thu*/}
      <Stack spacing={2}>
        <Typography pl={1} variant="h4">
          III. Thành phần doanh thu
        </Typography>

        <Box>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <MiniTableCard
                title="Doanh thu"
                subtitle="Đơn vị (VNĐ)"
                bc="reportPalette.pine1"
                bch="reportPalette.darkGreen2"
                data={config.totalRevenue}
                fakeData={fakeData}
              />
            </Grid>
            <Grid item xs={3}>
              <MiniTableCard
                title="Tổng hóa đơn"
                subtitle="Đơn vị(Hóa đơn)"
                bc="reportPalette.blue1"
                bch="reportPalette.blue2"
                data={config.totalBill}
                fakeData={fakeData}
              />
            </Grid>
            <Grid item xs={3}>
              <MiniTableCard
                title="Bình Quân hóa đơn"
                subtitle="VNĐ/Hoá đơn"
                bc="reportPalette.green1"
                bch="reportPalette.green2"
                data={config.averageBill}
                fakeData={fakeData}
              />
            </Grid>
            <Grid item xs={3}>
              <MiniTableCard
                title="Bình quân sản phẩm"
                subtitle="Sản phẩm/Hoá đơn"
                bc="reportPalette.yellow1"
                bch="reportPalette.yellow2"
                data={config.averageProduct}
                fakeData={fakeData}
              />
            </Grid>
          </Grid>
        </Box>

        <Box pt={1}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card>
                <Box p={1}>
                  <Typography textAlign="center" variant="h4">
                    Doanh thu thực tế
                  </Typography>
                  <Typography p={1} textAlign="center" variant="body1">
                    Tông số:{' '}
                    {fakeData.TotalRevenue.toLocaleString('vi', {
                      style: 'currency',
                      currency: 'VND'
                    })}
                  </Typography>
                </Box>
                <ReactApexChart
                  options={actualRevenueChart.chartOptions}
                  series={actualRevenueChart.series}
                  type="pie"
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <Box p={1}>
                  <Typography textAlign="center" variant="h4">
                    Hóa đơn bán hàng
                  </Typography>
                  <Typography p={1} textAlign="center" variant="body1">
                    Tông số hóa đơn bán hàng: {fNumber(fakeData.TotalOrder)}
                  </Typography>
                </Box>
                <ReactApexChart
                  options={billOfSaleChart.options}
                  series={billOfSaleChart.series}
                  type="pie"
                />
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box pt={1}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TableCard
                smallCard={true}
                titleHeader={<HomeIcon />}
                subtitleHeader="Tại cửa hàng"
                bc="reportPalette.red1"
                bch="reportPalette.red2"
                columnData={config.atStore}
                fakeData={fakeData}
              />
            </Grid>
            <Grid item xs={3}>
              <TableCard
                smallCard={true}
                titleHeader={<BusinessCenterIcon />}
                subtitleHeader="Mang về"
                bc="reportPalette.darkGreen1"
                bch="reportPalette.darkGreen2"
                columnData={config.atStore}
                fakeData={fakeData}
              />
            </Grid>
            <Grid item xs={3}>
              <TableCard
                smallCard={true}
                titleHeader={<DeliveryDiningIcon />}
                subtitleHeader="Giao hàng"
                bc="reportPalette.yellow1"
                bch="reportPalette.yellow2"
                columnData={config.atStore}
                fakeData={fakeData}
              />
            </Grid>
            <Grid item xs={3}>
              <TableCard
                smallCard={true}
                titleHeader={<CancelIcon />}
                subtitleHeader="Hóa đơn hủy"
                bc="reportPalette.green1"
                bch="reportPalette.green2"
                columnData={config.atStore}
                fakeData={fakeData}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>

      {/* IV. Thanh Toán & Thu Ngân*/}
      <Stack spacing={2}>
        <Typography pl={1} variant="h4">
          IV. Thanh Toán & Thu Ngân
        </Typography>

        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TableCard
                titleHeader="Tổng thanh toán"
                subtitleHeader="(1) + (2) + (3) + (4) + (5) + (6)| Đơn vị (VNĐ)"
                bc="reportPalette.purple1"
                bch="reportPalette.purple2"
                columnData={config.totalPayment}
                fakeData={fakeData}
              />
            </Grid>
            <Grid item xs={6}>
              <TableCard
                titleHeader="Tổng lượt thanh toán"
                subtitleHeader="(1) + (2) + (3) + (4) + (5) + (6)| Đơn vị (Hóa đơn)"
                bc="reportPalette.blue1"
                bch="reportPalette.blue2"
                columnData={config.totalAmountPayment}
                fakeData={fakeData}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Stack>
  );
}

export default RevenueOverview;
