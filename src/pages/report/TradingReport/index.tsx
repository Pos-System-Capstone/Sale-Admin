/* eslint-disable camelcase */
import { yupResolver } from '@hookform/resolvers/yup';
import activityFill from '@iconify/icons-eva/activity-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import clockIcon from '@iconify/icons-eva/clock-fill';
// import { Icon } from '@iconify/react';
import { DateRangePicker, TabContext, TabList, TabPanel } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// material
import { Card, Stack, Tab, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
// import { TTradingBase } from '@types/report/trading';
import menuApi from 'api/menu';
import tradingApi from 'api/report/trading';
import AutocompleteTrading from 'components/form/common/report/AutocompleteTrading';
import { menuSchema } from 'components/form/Menu/helper';
import confirm from 'components/Modal/confirm';
// import ModalForm from 'components/ModalForm/ModalForm';
import ResoTable from 'components/ResoTable/ResoTable';
import MenuWidgets from 'components/_dashboard/general-app/MenuWidgets';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import Chart from 'react-apexcharts';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PATH_REPORT_APP } from 'routes/reportAppPaths';
import { Menu } from 'types/menu';
import { TTradingBase } from 'types/report/trading';
import { TTableColumn } from 'types/table';
import { fNumber } from 'utils/formatNumber';
import { formatDate } from 'utils/formatTime';
import ReportPage from '../components/ReportPage';
// import Page from './components/Page';
export const menuColumns: TTableColumn<TTradingBase>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    hideInSearch: true
  },
  {
    fixed: 'left',
    title: 'Ngày',
    valueType: 'select',
    hideInTable: true,
    valueEnum: [
      {
        label: 'Tháng này',
        value: true
      },
      {
        label: 'Tháng trước',
        value: false
      },
      {
        label: 'Tuỳ chọn',
        value: false
      }
    ]
  },
  {
    title: 'Mang đi',
    dataIndex: 'totalOrderTakeAway',
    hideInSearch: true,
    render: (x) => fNumber(x)
  },
  {
    title: 'Tại store',
    dataIndex: 'totalOrderAtStore',
    hideInSearch: true,
    render: (x) => fNumber(x)
  },
  {
    title: 'Giao hàng',
    dataIndex: 'totalOrderDelivery',
    hideInSearch: true,
    render: (x) => fNumber(x)
  },
  {
    title: 'Cửa hàng',
    dataIndex: 'storeName',
    valueType: 'select',
    renderFormItem: () => <AutocompleteTrading name="storeName" label="Cửa hàng" />
  },
  {
    title: 'Tổng số bill',
    dataIndex: 'totalBills',
    hideInSearch: true,
    render: (x) => fNumber(x)
  },
  {
    title: 'Tổng doanh thu',
    dataIndex: 'totalSales',
    hideInSearch: true,
    render: (x) =>
      x.toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
      })
  },
  {
    title: 'Tiền giảm giá',
    dataIndex: 'totalDiscount',
    hideInSearch: true,
    render: (x) =>
      x.toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
      })
  },
  {
    title: 'Tổng doanh thu sau giảm giá',
    dataIndex: 'totalSalesAfterDiscount',
    hideInSearch: true,
    render: (x) =>
      x.toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
      })
  }
];

const DayReport = () => {
  const navigate = useNavigate();
  const tableRef = useRef<any>();
  const { enqueueSnackbar } = useSnackbar();

  const createMenuForm = useForm({
    resolver: yupResolver(menuSchema),
    shouldUnregister: true,
    defaultValues: {
      time_ranges: [{ from: null, to: null }],
      allDay: false,
      priority: 0
    }
  });

  const onDeleteMenu = async (menuId: number) => {
    try {
      await menuApi.delete(menuId);
      enqueueSnackbar('Xoá thành công', {
        variant: 'success'
      });
      console.log(`tableRef.current`, tableRef.current);
      tableRef.current?.reload();
    } catch (error) {
      console.log(`error`, error);
      enqueueSnackbar((error as any).message, {
        variant: 'error'
      });
    }
  };

  const onConfirmDelete = async (menu: Menu) => {
    confirm({
      title: 'Xác nhận xoá',
      content: `Bạn đồng ý xóa menu "${menu.menu_name}"?`,
      onOk: async () => {
        await onDeleteMenu(menu.menu_id);
      },
      onCancle: () => {}
    });
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };
  const [activeTab, setActiveTab] = useState('1');

  const ChartFill = {
    options: {
      chart: {
        id: 'basic-line'
      },
      xaxis: {
        categories: [
          '1/6/2022',
          '2/6/2022',
          '3/6/2022',
          '4/6/2022',
          '5/6/2022',
          '6/6/2022',
          '7/6/2022',
          '8/6/2022',
          '9/6/2022',
          '10/6/2022',
          '11/6/2022',
          '12/6/2022',
          '13/6/2022',
          '14/6/2022',
          '15/6/2022',
          '16/6/2022',
          '17/6/2022',
          '18/6/2022',
          '19/6/2022',
          '20/6/2022',
          '21/6/2022',
          '22/6/2022',
          '23/6/2022',
          '24/6/2022',
          '25/6/2022',
          '26/6/2022',
          '27/6/2022',
          '28/6/2022',
          '29/6/2022',
          '30/6/2022'
        ]
      }
    },
    series: [
      {
        name: 'Mang đi',
        data: [
          6822, 6154, 6555, 4517, 3651, 6862, 6860, 6793, 6535, 6618, 4598, 3481, 6707, 6706, 6466,
          6634, 6222, 4471, 3031, 6646, 6523, 6369, 5146, 0, 0, 0, 0, 0, 0, 0
        ]
      },
      {
        name: 'Tại store',
        data: [
          4315, 4087, 4065, 3426, 3077, 4136, 4230, 4287, 4227, 4238, 3440, 2670, 4249, 4448, 4546,
          4223, 4086, 3086, 2843, 3864, 3963, 4165, 3317, 0, 0, 0, 0, 0, 0, 0
        ]
      },
      {
        name: 'Giao hàng',
        data: [
          177, 163, 181, 122, 74, 174, 178, 178, 167, 164, 102, 87, 170, 173, 171, 164, 161, 97, 75,
          188, 162, 147, 126, 0, 0, 0, 0, 0, 0, 0
        ]
      }
    ]
  };

  const Feature = [
    {
      title: 'GIỜ',
      icon: clockIcon,
      color: '#FAD02C',
      hoverColor: '#B47324',
      path: PATH_REPORT_APP.timeReport
    },
    {
      title: 'THỨ',
      icon: activityFill,
      color: '#189AB4',
      hoverColor: '#05445E',
      path: PATH_REPORT_APP.dateReport
    },
    {
      title: 'NGÀY',
      icon: alertCircleFill,
      color: '#76B947',
      hoverColor: '#2F5233',
      path: PATH_REPORT_APP.dayReport
    },
    {
      title: 'THÁNG',
      icon: alertTriangleFill,
      color: '#C197D2',
      hoverColor: '#613659',
      path: PATH_REPORT_APP.monthReport
    }
  ];

  const day = new Date();
  const yesterday = day.setDate(day.getDate() - 1);
  const [fromDate, setFromDate] = useState<Date>(new Date(yesterday));
  const [toDate, setToDate] = useState<Date>(new Date());

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.formControl.setValue('FromDate', formatDate(fromDate!));
      tableRef.current.formControl.setValue('ToDate', formatDate(toDate!));
    }
  }, [fromDate, toDate]);

  return (
    <ReportPage
      title={`Báo cáo doanh thu theo ngày: ${day.toLocaleDateString('vi-VI', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })}`}
      // content={
      //   day.getDate() === current.getDate() ? `Tính đến: ${moment().format('hh:mm:ss')}` : ''
      // }
      actions={[
        <DateRangePicker
          disableFuture
          value={[fromDate, toDate]}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} label="Từ" />
              <Box sx={{ mx: 2 }}> - </Box>
              <TextField {...endProps} label="Đến" />
            </>
          )}
          onChange={(e) => {
            setFromDate(e[0]!);
            setToDate(e[1]!);
          }}
          key="date-range"
        />
      ]}
    >
      <Box sx={{ width: '100%', paddingBottom: '20px' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {Feature.map((item) => (
            <Grid key={item.title} item xs={3}>
              <MenuWidgets Features={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Card>
        <TabContext value={activeTab}>
          <Box>
            <TabList onChange={handleChangeTab}>
              <Tab label="Báo cáo doanh thu" value="1" />
              <Tab label="Sơ đồ doanh thu" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Stack spacing={2}>
              <Box sx={{ paddingTop: '40px' }}>
                <ResoTable
                  showAction={false}
                  rowKey="trading_id"
                  ref={tableRef}
                  getData={tradingApi.getTrading}
                  // getData={({ storeName }: any) => tradingApi.getTrading(storeName)}
                  // defaultFilters={{
                  //   storeName: ''
                  // }}
                  columns={menuColumns}
                  scroll={{ y: '500px' }}
                />
              </Box>
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <Grid container rowSpacing={1} columnSpacing={{ xs: 12 }}>
              <Grid item>
                <Chart
                  // updateSeries={this.data.storeName}
                  options={ChartFill.options}
                  series={ChartFill.series}
                  // getData={`${days} ${total}`}
                  type="line"
                  width="1100"
                  height="500"
                />
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
};

export default DayReport;
