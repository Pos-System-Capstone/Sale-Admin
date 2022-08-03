import { Stack, Typography } from '@mui/material';
import overviewApi from 'api/report/overview';
import ResoTable from 'components/ResoTable/ResoTable';
import { useRef } from 'react';
import { TTopStoreRevenueBase } from 'types/report/overview';
import { TTableColumn } from 'types/table';
import { fNumber } from 'utils/formatNumber';
import { formatCurrency } from 'utils/utils';
function TopStoreRevenue() {
  const ref = useRef<any>();

  const data = [
    {
      index: 1,
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      index: 2,
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 1,
      totalProduct: 1,
      saleRevenue: 132121,
      billRevenue: 1,
      totalRevenue: 132121
    },
    {
      index: 1,
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      index: 2,
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 1,
      totalProduct: 1,
      saleRevenue: 132121,
      billRevenue: 1,
      totalRevenue: 132121
    },
    {
      index: 1,
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      index: 2,
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 1,
      totalProduct: 1,
      saleRevenue: 132121,
      billRevenue: 1,
      totalRevenue: 132121
    },
    {
      index: 1,
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      index: 2,
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 1,
      totalProduct: 1,
      saleRevenue: 132121,
      billRevenue: 1,
      totalRevenue: 132121
    },
    {
      index: 1,
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      index: 2,
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 1,
      totalProduct: 1,
      saleRevenue: 132121,
      billRevenue: 1,
      totalRevenue: 132121
    }
  ];

  const orderColumns: TTableColumn<TTopStoreRevenueBase>[] = [
    {
      title: 'Ngày',
      // dataIndex: 'create_at',
      valueType: 'date',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: 'STT',
      hideInSearch: true,
      dataIndex: 'index'
    },
    {
      title: 'Cửa hàng',
      hideInSearch: true
      // dataIndex: 'name'
    },
    {
      title: 'Tổng sản phẩm',
      hideInSearch: true,
      // dataIndex: 'bill',
      render: (value) => fNumber(value)
    },
    {
      title: 'Hóa đơn bán hàng',
      hideInSearch: true,
      // dataIndex: 'bill',
      render: (value) => fNumber(value)
    },
    {
      title: 'Trung bình bill',
      hideInSearch: true,
      // dataIndex: '',
      render: (value) => fNumber(value)
    },
    {
      title: 'DT trước giảm giá',
      hideInSearch: true,
      // dataIndex: 'bill',
      render: (value) => fNumber(value)
    },
    {
      title: 'Giảm giá',
      hideInSearch: true,
      // dataIndex: 'totalProduct',
      render: (value) => fNumber(value)
    },
    {
      title: 'DT sau giảm giá',
      hideInSearch: true,
      // dataIndex: 'saleRevenue',
      render: (value) => formatCurrency(value)
    },
    {
      title: 'Hóa đơn nạp thẻ',
      hideInSearch: true,
      // dataIndex: 'billCard',
      render: (value) => formatCurrency(value)
    },
    {
      title: 'Doanh thu nạp thẻ',
      hideInSearch: true,
      // dataIndex: 'saleRevenue',
      render: (value) => formatCurrency(value)
    },
    {
      title: 'Phiên bản (Version)',
      hideInSearch: true
      // dataIndex: 'saleRevenue',
    },
    {
      title: 'Ngày cập nhật (Updated at)',
      hideInSearch: true
      // dataIndex: 'saleRevenue',
    }
  ];
  return (
    <Stack direction={'column'}>
      {/* V. Top Doanh Thu Sản Phẩm*/}
      <Stack spacing={2}>
        <Typography pl={2} variant="h4">
          V. Top Doanh Thu Cửa Hàng
        </Typography>
        <ResoTable
          showAction={false}
          columns={orderColumns}
          ref={ref}
          getData={overviewApi.getTopStoreRevenue}
          scroll={{ y: '320px' }}
        />
      </Stack>
    </Stack>
  );
}

export default TopStoreRevenue;
