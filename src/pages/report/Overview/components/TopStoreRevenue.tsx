import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import overviewApi from 'api/report/overview';
import ResoTable from 'components/ResoTable/ResoTable';
import ReportBtn from 'pages/report/components/ReportBtn';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { TTopStoreRevenueBase } from 'types/report/overview';
import { TTableColumn } from 'types/table';
import { formatDate } from 'utils/formatTime';
function TopStoreRevenue({ dateRange }: any) {
  const ref = useRef<any>();
  const { storeId } = useParams();

  const orderColumns: TTableColumn<TTopStoreRevenueBase>[] = [
    {
      title: 'STT',
      hideInSearch: true,
      dataIndex: 'index'
    },
    {
      title: 'Cửa hàng',
      hideInSearch: true,
      dataIndex: 'storeName'
    },
    {
      title: 'Tổng sản phẩm',
      hideInSearch: true,
      dataIndex: 'totalProduct',
      valueType: 'digit'
    },
    {
      title: 'Hóa đơn bán hàng',
      hideInSearch: true,
      dataIndex: 'totalOrderSale',
      valueType: 'digit'
    },
    {
      title: 'Trung bình bill',
      hideInSearch: true,
      dataIndex: 'avgRevenueSale',
      valueType: 'digit'
    },
    {
      title: 'DT trước giảm giá',
      hideInSearch: true,
      dataIndex: 'totalRevenueBeforeDiscount',
      valueType: 'digit'
    },
    {
      title: 'Giảm giá',
      hideInSearch: true,
      dataIndex: 'totalDiscount',
      valueType: 'digit'
    },
    {
      title: 'DT sau giảm giá',
      hideInSearch: true,
      dataIndex: 'totalRevenueSale',
      valueType: 'money'
    },
    {
      title: 'Hóa đơn nạp thẻ',
      hideInSearch: true,
      dataIndex: 'totalOrderCard',
      valueType: 'money'
    },
    {
      title: 'Doanh thu nạp thẻ',
      hideInSearch: true,
      dataIndex: 'totalRevenueCard',
      valueType: 'money'
    },
    {
      title: 'Phiên bản (Version)',
      hideInSearch: true,
      dataIndex: 'version'
    },
    {
      title: 'Ngày cập nhật (Updated at)',
      hideInSearch: true,
      dataIndex: 'updateAt'
    }
  ];

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('FromDate', formatDate(dateRange[0]!));
      ref.current.formControl.setValue('ToDate', formatDate(dateRange[1]!));
    }
  }, [dateRange]);

  return (
    <Stack direction={'column'}>
      {/* V. Top Doanh Thu Sản Phẩm*/}
      <Stack spacing={2}>
        <Stack justifyContent="space-between">
          <Typography pl={2} variant="h4">
            V. Top Doanh Thu Cửa Hàng
          </Typography>
          <Box marginLeft="1050px" marginTop="-10px">
            <ReportBtn key="export-excel" onClick={() => console.log('Export excel')} />
          </Box>
        </Stack>
        <ResoTable
          showAction={false}
          columns={orderColumns}
          ref={ref}
          getData={overviewApi.getTopStoreRevenue}
          pagination
          defaultFilters={{
            storeId,
            FromDate: formatDate(dateRange[0]!),
            ToDate: formatDate(dateRange[1]!)
          }}
        />
      </Stack>
    </Stack>
  );
}

export default TopStoreRevenue;
