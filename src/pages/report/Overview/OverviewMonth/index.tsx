/* eslint-disable camelcase */
import { TabContext, TabList, TabPanel } from '@mui/lab';
// material
import { Box, Card, Tab } from '@mui/material';
import ReportBtn from 'pages/report/components/ReportBtn';
import { ReportMonthPicker } from 'pages/report/components/ReportDatePicker';
import ReportPage from 'pages/report/components/ReportPage';
import React, { useState } from 'react';
// components
import { fDate, fTime } from 'utils/formatTime';
// import OverviewPage from '././components/OverviewPage';
// import TableCard, { fakeData, MiniTableCard } from '././components/TableCard';
import EmployeeStatistics from '../components/EmployeeStatistics';
import ProductSaleDetail from '../components/ProductSaleDetail';
import RevenueOverview from '../components/RevenueOverview';
import TopStoreRevenue from '../components/TopStoreRevenue';
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
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const today = new Date();
  const [date, setDate] = useState<Date>(today);

  return (
    <ReportPage
      title={`Tổng quan tháng ${fDate(date)}`}
      content={date.toDateString() === today.toDateString() ? `Tính đến: ${fTime(date)}` : ''}
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
