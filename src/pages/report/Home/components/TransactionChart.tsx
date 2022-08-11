import { merge } from 'lodash';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Box, Card, CardHeader, TextField } from '@mui/material';
import { BaseOptionChart } from 'components/charts';
//

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    topPerformingStore: 'Passio Coffee - 542 Huỳnh Tấn Phát',
    topSellingItem: 'Espresso sữa',
    orders: [{ name: 'Doanh thu', data: [198, 158, 140, 149, 96, 176, 190] }],
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
  }
];

export default function TransactionChart() {
  const [seriesData, setSeriesData] = useState('Espresso sữa');

  const handleChangeSeriesData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeriesData(String(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: [
        '2022-08-01',
        '2022-08-05',
        '2022-08-06',
        '2022-08-04',
        '2022-08-07',
        '2022-08-03',
        '2022-08-02'
      ]
    }
  });

  return (
    <Card>
      <CardHeader
        title="Number of transactions"
        subheader="+13.66% from previous"
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': {
                pl: 1,
                py: 0.5,
                pr: '24px !important',
                typography: 'subtitle2'
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 0.75,
                bgcolor: 'background.neutral'
              },
              '& .MuiNativeSelect-icon': {
                top: 4,
                right: 0,
                width: 20,
                height: 20
              }
            }}
          >
            {CHART_DATA.map((option) => (
              <option key={option.topSellingItem} value={option.topSellingItem}>
                {option.topSellingItem}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.topSellingItem} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.topSellingItem === seriesData && (
            <ReactApexChart type="line" series={item.orders} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
