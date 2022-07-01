/* eslint-disable camelcase */
// material
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab } from '@mui/material';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import ReportBtn from 'pages/report/components/ReportBtn';
import ReportDatePicker from 'pages/report/components/ReportDatePicker';
import ReportPage from 'pages/report/components/ReportPage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fTime } from 'utils/formatTime';
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

  //charts
  const chartFill = {
    series: [
      {
        name: 'Passiopuccino',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'BIỂU ĐỒ DOANH THU',
        align: 'center'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      }
    }
  };

  return (
    <ReportPage
      title="Báo cáo diễn tiến sản phẩm"
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
      <Card>
        <TabContext value={activeTab}>
          <Box mb={2}>
            <TabList onChange={handleChangeTab}>
              <Tab label="Báo cáo doanh thu" value="1" />
              <Tab label="Sơ đồ doanh thu" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ResoTable
              showAction={false}
              columns={ProductProgressColumn}
              dataSource={data}
              scroll={{ y: '320px' }}
            />
          </TabPanel>
          <TabPanel value="2">
            {/* <ReactApexChart
              option={chartFill.options}
              series={chartFill.series}
              type="line"
              height={350}
            /> */}
          </TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
};

export default ProductProgressReport;
