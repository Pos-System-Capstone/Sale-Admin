import { Stack, Typography } from '@mui/material';
import overviewApi from 'api/report/overview';
import ResoTable from 'components/ResoTable/ResoTable';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { TTopStoreRevenueBase } from 'types/report/overview';
import { TTableColumn } from 'types/table';
import { fNumber } from 'utils/formatNumber';
import { formatDate } from 'utils/formatTime';
import { formatCurrency } from 'utils/utils';
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
      render: (value) => fNumber(value)
    },
    {
      title: 'Hóa đơn bán hàng',
      hideInSearch: true,
      dataIndex: 'totalOrderSale',
      render: (value) => fNumber(value)
    },
    {
      title: 'Trung bình bill',
      hideInSearch: true,
      dataIndex: 'avgRevenueSale',
      render: (value) => fNumber(value)
    },
    {
      title: 'DT trước giảm giá',
      hideInSearch: true,
      dataIndex: 'totalRevenueBeforeDiscount',
      render: (value) => fNumber(value)
    },
    {
      title: 'Giảm giá',
      hideInSearch: true,
      dataIndex: 'totalDiscount',
      render: (value) => fNumber(value)
    },
    {
      title: 'DT sau giảm giá',
      hideInSearch: true,
      dataIndex: 'totalRevenueSale',
      render: (value) => formatCurrency(value)
    },
    {
      title: 'Hóa đơn nạp thẻ',
      hideInSearch: true,
      dataIndex: 'totalOrderCard',
      render: (value) => formatCurrency(value)
    },
    {
      title: 'Doanh thu nạp thẻ',
      hideInSearch: true,
      dataIndex: 'totalRevenueCard',
      render: (value) => formatCurrency(value)
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
        <Typography pl={2} variant="h4">
          V. Top Doanh Thu Cửa Hàng
        </Typography>
        <ResoTable
          showAction={false}
          columns={orderColumns}
          ref={ref}
          getData={overviewApi.getTopStoreRevenue}
          scroll={{ y: '320px' }}
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
