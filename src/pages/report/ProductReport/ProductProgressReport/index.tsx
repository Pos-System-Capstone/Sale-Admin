/* eslint-disable camelcase */
// material
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab } from '@mui/material';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import ReportBtn from 'pages/report/components/ReportBtn';
import ReportDatePicker from 'pages/report/components/ReportDatePicker';
import ReportPage from 'pages/report/components/ReportPage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductProgressColumn from './column';

const ProductProgressReport = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const data = [
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    }
  ];

  //
  const [activeTab, setActiveTab] = useState('1');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const today = new Date();
  const [date, setDate] = useState<Date>(today);

  return (
    <ReportPage
      title="Báo cáo diễn tiến sản phẩm"
      content={
        date.toDateString() === today.toDateString()
          ? `Tính đến: ${moment().format('hh:mm:ss')}`
          : ''
      }
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
      <Card>
        <TabContext value={activeTab}>
          <Box mb={2}>
            <TabList onChange={handleChangeTab}>
              <Tab label="Báo cáo doanh thu" value="1" />
              <Tab label="Sơ đồ doanh thu" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ResoTable showAction={false} columns={ProductProgressColumn} dataSource={data} />
          </TabPanel>
          <TabPanel value="2">
            <h1>Chart here</h1>
          </TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
};

export default ProductProgressReport;
