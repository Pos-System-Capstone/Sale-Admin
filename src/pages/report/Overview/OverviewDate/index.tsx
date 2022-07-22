/* eslint-disable camelcase */
import { DateRange, DateRangePicker, TabContext, TabList, TabPanel } from '@mui/lab';
// material
import { Box, Card, Tab, TextField } from '@mui/material';
import moment from 'moment';
import ReportBtn from 'pages/report/components/ReportBtn';
import ReportPage from 'pages/report/components/ReportPage';
import React, { useState } from 'react';
// components
import EmployeeStatistics from '../components/EmployeeStatistics';
import RevenueOverview from '../components/RevenueOverview';
import TopStoreRevenue from '../components/TopStoreRevenue';

export default function OverviewDate() {
  const [activeTab, setActiveTab] = useState('1');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  const [dateRange, setDateRange] = useState<DateRange<Date>>([yesterday, today]);
  const [done, setDone] = useState(true);
  const [loading, setLoading] = useState(true);
  return (
    <ReportPage
      title={`Báo cáo tổng quan`}
      actions={[
        <DateRangePicker
          minDate={moment(`${today.getFullYear()}/${today.getMonth() + 1}/01`).toDate()}
          disabled={loading}
          disableFuture
          value={dateRange}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} label="Từ" />
              <Box sx={{ mx: 2 }}> - </Box>
              <TextField {...endProps} label="Đến" />
            </>
          )}
          onChange={(e) => {
            if (e[0] && e[1]) {
              setDateRange(e);
            }
          }}
          onOpen={() => setDone(false)}
          onClose={() => setDone(true)}
          key="date-range"
        />,
        <ReportBtn key="export-excel" onClick={() => console.log('Export excel')} />
      ]}
    >
      <Card sx={{ paddingBottom: 5 }}>
        <TabContext value={activeTab}>
          <Box mb={2}>
            <TabList onChange={handleChangeTab}>
              <Tab label="Tổng quan doanh thu" value="1" />
              <Tab label="Top doanh thu cửa hàng" value="2" />
              {/* <Tab label="Chi tiết doanh thu sản phẩm" value="3" /> */}
              <Tab label="Thống kê nhân viên" value="4" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <RevenueOverview
              dateRange={dateRange}
              done={done}
              loading={loading}
              setLoading={setLoading}
            />
          </TabPanel>

          <TabPanel value="2">
            <TopStoreRevenue />
          </TabPanel>

          {/* <TabPanel value="3">
            <ProductSaleDetail />
          </TabPanel> */}

          <TabPanel value="4">
            <EmployeeStatistics />
          </TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
}
