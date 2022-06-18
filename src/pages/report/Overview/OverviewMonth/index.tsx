/* eslint-disable camelcase */
import { TabContext, TabList, TabPanel } from '@mui/lab';
// material
import { Box, Card, Grid, Stack, Tab, Typography } from '@mui/material';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import ReportBtn from 'pages/report/components/ReportBtn';
import { ReportMonthPicker } from 'pages/report/components/ReportDatePicker';
import ReportPage from 'pages/report/components/ReportPage';
import React, { useEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// components
import { useNavigate } from 'react-router-dom';
import { Menu } from 'types/menu';
import { TTableColumn } from 'types/table';
import TableCard, { fakeData, MiniTableCard } from '../components/TableCard';
// import OverviewPage from '././components/OverviewPage';
// import TableCard, { fakeData, MiniTableCard } from '././components/TableCard';

const list: any = [
  {
    title: 'Doanh thu trước giảm giá (2)',
    dataIndex: 'TotalRevenueWithDiscount',
    highlight: true
  },
  {
    title: 'Giảm giá Passio100 (2.1)',
    dataIndex: 'TotalRevenueWithDiscount',
    fontSize: 'small'
  },
  {
    title: 'Giảm giá bán hàng (2.2)',
    dataIndex: 'TotalRevenueWithDiscount',
    fontSize: 'small'
  },
  {
    title: 'Giảm giá bán hàng (2.2)',
    dataIndex: 'TotalDiscount',
    fontSize: 'small'
  },
  {
    title: 'Giảm giá bán hàng (2.2)',
    dataIndex: 'TotalRevenueAtStore2',
    highlight: true
  }
];

export default function OverviewMonth() {
  const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();
  console.log('ref', ref);
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { t } = useLocales();

  const orderColumns: TTableColumn<Menu>[] = [
    {
      title: 'Ngày',
      dataIndex: 'create_at',
      valueType: 'date',
      hideInSearch: true
    },
    {
      title: 'STT',
      hideInSearch: true
    },
    {
      title: 'Tên sản phẩm',
      hideInSearch: true
    },
    {
      title: 'Số lượng bán ra',
      hideInSearch: true
    },
    {
      title: 'Doanh thu',
      hideInSearch: true
    }
  ];
  const employeeColumns: TTableColumn<Menu>[] = [
    {
      title: 'Họ và tên',
      hideInSearch: true
    },
    {
      title: 'Thành phần',
      hideInSearch: true
    },
    {
      title: 'Tổng',
      hideInSearch: true
    }
  ];
  useEffect(() => {
    // console.log(today.getDate());
    // console.log(
    //   'date',
    //   date.toLocaleDateString('zh-Hans-CN', {
    //     year: 'numeric',
    //     month: '2-digit',
    //     day: '2-digit'
    //   })
    // );
    if (ref.current) {
      ref.current.formControl.setValue(
        'create_at',
        date.toLocaleDateString('zh-Hans-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      );
    }
  }, [date]);
  // Chart
  const chart = {
    series: [25, 25, 50],

    chartOptions: {
      legend: { show: true, fontSize: '14px' },
      labels: ['Tại cửa hàng', 'Giao hàng', 'Mang về'],
      colors: ['#FF4842', '#00AB55', '#B78103']
    }
  };

  return (
    <ReportPage
      title={`Tổng quan tháng ${date.toLocaleDateString('vi-VI', {
        year: 'numeric',
        month: 'numeric'
      })}`}
      content={
        date.toDateString() === today.toDateString()
          ? `Tính đến: ${moment().format('hh:mm:ss')}`
          : ''
      }
      actions={[
        <ReportMonthPicker
          key="month-date-picker"
          value={date}
          onChange={(newValue) => {
            setDate(newValue || new Date());
          }}
        />,
        <ReportBtn key="export-excel" onClick={() => console.log('Export excel')} />
      ]}
    >
      <Card>
        <TabContext value={activeTab}>
          <Box>
            <TabList onChange={handleChangeTab}>
              <Tab label="Tổng quan doanh thu" value="1" />
              <Tab label="Chi tiết doanh thu sản phẩm" value="2" />
              <Tab label="Thống kê nhân viên" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                mt: '30px'
              }}
            >
              {/* I. Bán hàng */}
              <Stack spacing={2}>
                <Typography variant="h4">I. Bán hàng</Typography>

                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TableCard
                        bc="primary.main"
                        bch="primary.lighter1"
                        data={list}
                        fakeData={fakeData}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TableCard
                        bc="secondary.main"
                        bch="secondary.light"
                        data={list}
                        fakeData={fakeData}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Stack>

              {/* II. Nạp thẻ */}
              <Stack spacing={2}>
                <Typography variant="h4">II. Nạp thẻ</Typography>

                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TableCard
                        bc="primary.main"
                        bch="primary.lighter1"
                        data={list}
                        fakeData={fakeData}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TableCard
                        bc="secondary.main"
                        bch="secondary.light"
                        data={list}
                        fakeData={fakeData}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Stack>

              {/* III. Thành phần doanh thu*/}
              <Stack spacing={2}>
                <Typography variant="h4">III. Thành phần doanh thu</Typography>

                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <MiniTableCard />
                    </Grid>
                    <Grid item xs={3}>
                      <MiniTableCard />
                    </Grid>
                    <Grid item xs={3}>
                      <MiniTableCard />
                    </Grid>
                    <Grid item xs={3}>
                      <MiniTableCard />
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <ReactApexChart
                        options={chart.chartOptions}
                        series={chart.series}
                        type="pie"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <ReactApexChart
                        options={chart.chartOptions}
                        series={chart.series}
                        type="pie"
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TableCard bc="error.main" bch="error.dark" data={list} fakeData={fakeData} />
                    </Grid>
                    <Grid item xs={6}>
                      <TableCard
                        bc="primary.main"
                        bch="primary.dark"
                        data={list}
                        fakeData={fakeData}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TableCard
                        bc="warning.dark"
                        bch="warning.darker"
                        data={list}
                        fakeData={fakeData}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TableCard
                        bc="purple.main"
                        bch="purple.light"
                        data={list}
                        fakeData={fakeData}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Stack>

              {/* IV. Thanh Toán & Thu Ngân*/}
              <Stack spacing={2}>
                <Typography variant="h4">IV. Thanh Toán & Thu Ngân</Typography>

                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TableCard
                        bc="primary.main"
                        bch="primary.lighter1"
                        data={list}
                        fakeData={fakeData}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TableCard
                        bc="secondary.main"
                        bch="secondary.light"
                        data={list}
                        fakeData={fakeData}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '11px',
                mt: '30px'
              }}
            >
              {/* V. Top Doanh Thu Sản Phẩm*/}
              <Stack spacing={2}>
                <Typography>V. Top Doanh Thu Sản Phẩm</Typography>
                <ResoTable
                  defaultFilters={{
                    create_at: date.toLocaleDateString('zh-Hans-CN', {
                      year: 'numeric',
                      month: '2-digit',
                      day: 'numeric'
                    })
                  }}
                  showAction={false}
                  columns={orderColumns}
                  ref={ref}
                />
              </Stack>
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '11px',
                mt: '30px'
              }}
            >
              {/*Thống kê doanh thu theo nhân viên*/}
              <Stack spacing={2}>
                <Typography>
                  <TabPanel value="3">Thống kê doanh thu theo nhân viên</TabPanel>
                </Typography>
                <ResoTable showAction={false} columns={employeeColumns} />
              </Stack>
            </Box>
          </TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
}
