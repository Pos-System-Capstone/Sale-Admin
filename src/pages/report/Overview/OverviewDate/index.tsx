/* eslint-disable camelcase */
import { DateRange, DateRangePicker, TabContext, TabList, TabPanel } from '@mui/lab';
// material
import { Box, Card, Tab, TextField } from '@mui/material';
import ReportBtn from 'pages/report/components/ReportBtn';
import ReportPage from 'pages/report/components/ReportPage';
import React, { useState } from 'react';
// components
import EmployeeStatistics from '../components/EmployeeStatistics';
import ProductSaleDetail from '../components/ProductSaleDetail';
import RevenueOverview from '../components/RevenueOverview';
import TopStoreRevenue from '../components/TopStoreRevenue';

// icons
export default function OverviewDate() {
  const [activeTab, setActiveTab] = useState('1');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  const [dateRange, setDateRange] = useState<DateRange<Date>>([yesterday, today]);

  return (
    <ReportPage
      // title={`Tổng quan ngày: ${fDate(date)}`}
      title={`Báo cáo tổng quan`}
      // content={dateRange[1].getDate() === today.getDate() ? `Tính đến: ${fTime(today)}` : ``}
      // actions={[
      //   <ReportDatePicker
      //     key="choose-day"
      //     value={date}
      //     onChange={(newValue) => {
      //       setDate(newValue || new Date());
      //     }}
      //   />
      // ]}
      actions={[
        <DateRangePicker
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
              <Tab label="Chi tiết doanh thu sản phẩm" value="3" />
              <Tab label="Thống kê nhân viên" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <RevenueOverview />
          </TabPanel>
          {/* Top doanh thu san cua hang */}
          <TabPanel value="2">
            <TopStoreRevenue />
          </TabPanel>
          <TabPanel value="3">
            <ProductSaleDetail />
          </TabPanel>
          <TabPanel value="4">
            <EmployeeStatistics />
          </TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
}
