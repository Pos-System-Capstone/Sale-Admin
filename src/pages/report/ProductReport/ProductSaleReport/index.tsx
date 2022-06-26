/* eslint-disable camelcase */
// material
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab } from '@mui/material';
import productApi from 'api/report/products';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import ReportDatePicker from 'pages/report/components/ReportDatePicker';
import ReportPage from 'pages/report/components/ReportPage';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import productSaleColumn from './column';

const ProductSaleReport = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const { watch } = useForm();

  const ref = useRef<any>();

  //
  const [activeTab, setActiveTab] = useState('1');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  // const [openChart, setOpenChart] = useState(false);
  const today = new Date();
  const yesterday = today.setDate(today.getDate() - 1);
  const [fromDate, setFromDate] = useState<Date>(new Date(yesterday));
  const [toDate, setToDate] = useState<Date>(new Date());

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue(
        'FromDate',
        fromDate?.toLocaleDateString('zh-Hans-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      );
      ref.current.formControl.setValue(
        'toDate',
        toDate?.toLocaleDateString('zh-Hans-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      );
    }
  }, [fromDate, toDate]);

  return (
    <ReportPage
      title="Báo cáo doanh thu sản phẩm"
      // content={`${fDate(fromDate)} to ${fDate(toDate)}`}
      actions={[
        <ReportDatePicker
          key="choose-from-date"
          value={fromDate || null}
          onChange={(newValue) => {
            setFromDate(newValue || new Date());
          }}
        />,
        <ReportDatePicker
          key="choose-to-date"
          value={toDate || null}
          onChange={(newValue) => {
            setToDate(newValue || new Date());
          }}
        />
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
              ref={ref}
              columns={productSaleColumn}
              getData={productApi.getProductReport}
              showAction={false}
              pagination={true}
              scroll={{ y: '320px' }}
            />
          </TabPanel>
          <TabPanel value="2">
            <h1>Chart here</h1>
          </TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
};

export default ProductSaleReport;
