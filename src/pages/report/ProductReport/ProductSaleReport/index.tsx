/* eslint-disable camelcase */
// material
import { DateRangePicker, TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Tab, TextField } from '@mui/material';
import productApi from 'api/report/products';
import ResoTable from 'components/ResoTable/ResoTable';
import ReportBtn from 'pages/report/components/ReportBtn';
import ReportPage from 'pages/report/components/ReportPage';
import { useEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { formatDate, fTime } from 'utils/formatTime';
import { productSaleColumn } from './column';

const ProductSaleReport = () => {
  // const [store, setStore] = useState<any>([]);

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await storeApi.get();
  //     const store = data.map((item: any) => {
  //       return {
  //         value: item.id,
  //         label: item.name
  //       };
  //     });
  //     setStore(store);
  //   })();
  // }, []);
  // const productSaleColumn: TTableColumn<ProductSaleBase>[] = [
  //   {
  //     title: 'Cửa hàng',
  //     hideInTable: true,
  //     valueType: 'select',
  //     dataIndex: 'storeId',
  //     // valueEnum: store
  //     renderFormItem: () => <AutocompleteStore name="storeId" label="Cửa hàng" />
  //   },
  //   {
  //     title: 'Tên sản phẩm',
  //     hideInSearch: true,
  //     dataIndex: 'productName'
  //   },
  //   {
  //     title: 'Số lượng',
  //     hideInSearch: true,
  //     dataIndex: 'quantity',
  //     render: (value) => fNumber(value)
  //   },
  //   {
  //     title: 'Tỉ trọng (%)',
  //     hideInSearch: true,
  //     dataIndex: 'percent',
  //     render: (value) => fPercent(value)
  //   },
  //   {
  //     title: 'Tổng tiền trước giảm giá',
  //     hideInSearch: true,
  //     dataIndex: 'totalBeforeDiscount',
  //     render: (value) => formatCurrency(value)
  //   },
  //   {
  //     title: 'Giảm giá',
  //     hideInSearch: true,
  //     dataIndex: 'discount',
  //     render: (value) => formatCurrency(value)
  //   },
  //   {
  //     title: 'Tổng tiền sau giảm giá',
  //     hideInSearch: true,
  //     dataIndex: 'totalAfterDiscount',
  //     render: (value) => formatCurrency(value)
  //   },
  //   // Wait api
  //   // {
  //   //   title: 'Loại',
  //   //   hideInTable: true,
  //   //   valueEnum: [
  //   //     {
  //   //       label: 'Sản phẩm',
  //   //       value: 'true'
  //   //     },
  //   //     {
  //   //       label: 'Nhóm sản phẩm',
  //   //       value: 'false'
  //   //     }
  //   //   ],
  //   //   valueType: 'select'
  //   // },
  //   {
  //     title: 'Chọn biểu đồ',
  //     hideInTable: true,
  //     dataIndex: 'checkDeal',
  //     valueType: 'select',
  //     valueEnum: [
  //       {
  //         label: 'Trước giảm giá',
  //         value: 'beforeDeal'
  //       },
  //       {
  //         label: 'Giảm giá',
  //         value: 'afterDeal'
  //       }
  //     ]
  //   }
  // ];

  const ref = useRef<any>();

  const [activeTab, setActiveTab] = useState('1');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  const [dateRange, setDateRange] = useState<any>([yesterday, today]);

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('FromDate', formatDate(dateRange[0]!));
      ref.current.formControl.setValue('ToDate', formatDate(dateRange[1]!));
    }
  }, [dateRange]);

  //chart
  const chartFill = {
    series: [44, 55, 13, 43, 22],
    options: {
      title: {
        text: 'Doanh thu sản phẩm',
        align: 'center'
      },
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: [
        'Iced Espresso (M)',
        'Iced Espresso With Milk (M)',
        'Card 200K',
        'Iced Espresso With Milk (L)',
        'Phần còn lại'
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    }
  };

  return (
    <ReportPage
      title="Báo cáo doanh thu sản phẩm"
      content={dateRange[1]?.getDate() === today?.getDate() ? `Tính đến ${fTime(today)}` : ''}
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
              defaultFilters={{
                checkDeal: 'beforeDeal'
              }}
            />
          </TabPanel>
          <TabPanel value="2">
            <ReactApexChart
              options={chartFill.options}
              series={chartFill.series}
              type="pie"
              height={380}
            />
          </TabPanel>
        </TabContext>
      </Card>
    </ReportPage>
  );
};

export default ProductSaleReport;
