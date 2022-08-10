import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
import { fNumber, fPercent } from 'utils/formatNumber';
import { BaseOptionChart } from 'components/charts';
import { useState } from 'react';

//

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

// ----------------------------------------------------------------------

const PERCENT = 2.6;
const TOTAL_SOLD = 765;
const CHART_DATA = [{ data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14] }];

// const data1 = data?.[trends] || [];
export default function NetSale() {
  const [testData, setTestData] = useState({
    topPerformingStore: 'Passio Coffee - 542 Huỳnh Tấn Phát',
    topSellingItem: 'Espresso sữa',
    orders: [
      {
        date: '2022-08-01',
        value: '198'
      },
      {
        date: '2022-08-05',
        value: '158'
      },
      {
        date: '2022-08-06',
        value: '140'
      },
      {
        date: '2022-08-04',
        value: '149'
      },
      {
        date: '2022-08-07',
        value: '96'
      },
      {
        date: '2022-08-03',
        value: '176'
      },
      {
        date: '2022-08-02',
        value: '190'
      }
    ],
    trends: [
      {
        name: 'total_transaction',
        value: '1107',
        trend: '0.13655'
      },
      {
        name: 'gross_sales',
        value: '1.31396e+08',
        trend: '0.147864'
      },
      {
        name: 'net_sales',
        value: '1.31396e+08',
        trend: '0.147864'
      },
      {
        name: 'average_transaction_amount',
        value: '118695.5736',
        trend: '0.009954'
      },
      {
        name: 'total_customers',
        value: '827',
        trend: '0.120596'
      }
    ]
  });
  const data = testData?.trends;
  console.log(data);
  const chartOptions = merge(BaseOptionChart(), {
    chart: { animations: { enabled: true }, sparkline: { enabled: true } },
    stroke: { width: 2 },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName: string) => fNumber(seriesName),

        title: {
          formatter: (seriesName: string) => `#${seriesName}`
        }
      },
      marker: { show: false }
    }
  });

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" paragraph>
          Net Sales
        </Typography>
        <Typography variant="h3" gutterBottom>
          {/* {fNumber(TOTAL_SOLD)} */}
          {data?.find((x: any) => x.name === 'net_sales')?.value ?? 0}
        </Typography>

        <Stack direction="row" alignItems="center" flexWrap="wrap">
          <IconWrapperStyle
            sx={{
              ...(PERCENT < 0 && {
                color: 'error.main',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.16)
              })
            }}
          >
            <Icon width={16} height={16} icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill} />
          </IconWrapperStyle>

          <Typography variant="subtitle2" component="span">
            {PERCENT > 0 && '+'}
            {fPercent(PERCENT)}
          </Typography>
          <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
            &nbsp;than last week
          </Typography>
        </Stack>
      </Box>

      <ReactApexChart
        type="line"
        series={CHART_DATA}
        options={chartOptions}
        width={120}
        height={80}
      />
    </Card>
  );
}
