/* eslint-disable camelcase */
import { TabContext, TabList, TabPanel } from '@mui/lab';
// material
import { Box, Card, Tab } from '@mui/material';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import ReportBtn from 'pages/report/components/ReportBtn';
import ReportDatePicker from 'pages/report/components/ReportDatePicker';
import ReportPage from 'pages/report/components/ReportPage';
import React, { useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { fDate, fTime } from 'utils/formatTime';
import EmployeeStatistics from '../components/EmployeeStatistics';
import ProductSaleDetail from '../components/ProductSaleDetail';
import RevenueOverview from '../components/RevenueOverview';
import TopStoreRevenue from '../components/TopStoreRevenue';

// icons
export default function OverviewDate() {
  const [activeTab, setActiveTab] = useState('1');
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { t } = useLocales();

  return (
    <ReportPage
      title={`Tổng quan ngày: ${fDate(date)}`}
      content={date.toDateString() === today.toDateString() ? `Tính đến: ${fTime(date)}` : ``}
      actions={[
        <ReportDatePicker
          key="choose-day"
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
            <TopStoreRevenue date={date} />
          </TabPanel>
          <TabPanel value="3">
            <ProductSaleDetail date={date} />
          </TabPanel>
          <TabPanel value="4">
            <EmployeeStatistics />
          </TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
}
