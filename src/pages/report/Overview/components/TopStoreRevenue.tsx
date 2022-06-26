import { Stack, Typography } from '@mui/material';
import ResoTable from 'components/ResoTable/ResoTable';
import { useRef } from 'react';
import { TTableColumn } from 'types/table';
import { fNumber } from 'utils/formatNumber';
import { formatCurrency } from 'utils/utils';
function TopStoreRevenue({ date }: any) {
  const ref = useRef<any>();

  // useEffect(() => {
  //   if (ref.current) {
  //     ref.current.formControl.setValue(
  //       'create_at',
  //       date.toLocaleDateString('zh-Hans-CN', {
  //         year: 'numeric',
  //         month: '2-digit',
  //         day: '2-digit'
  //       })
  //     );
  //   }
  // }, [date]);

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

  type ProductSaleDetail = {
    index?: any;
    name?: any;
    bill?: any;
    billCard?: any;
    totalProduct?: any;
    saleRevenue?: any;
    billRevenue?: any;
    totalRevenue?: any;
  };

  const orderColumns: TTableColumn<ProductSaleDetail>[] = [
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
      hideInSearch: true,
      dataIndex: 'name'
    },
    {
      title: 'Hóa Đơn Bán Hàng',
      hideInSearch: true,
      dataIndex: 'bill',
      render: (value) => fNumber(value)
    },
    {
      title: 'Hóa Đơn Nạp thẻ',
      hideInSearch: true,
      dataIndex: 'bill',
      render: (value) => fNumber(value)
    },
    {
      title: 'Tổng sản phẩm',
      hideInSearch: true,
      dataIndex: 'totalProduct',
      render: (value) => fNumber(value)
    },
    {
      title: 'DT bán hàng',
      hideInSearch: true,
      dataIndex: 'saleRevenue',
      render: (value) => formatCurrency(value)
    },
    {
      title: 'DT nạp thẻ',
      hideInSearch: true,
      dataIndex: 'billCard',
      render: (value) => formatCurrency(value)
    },
    {
      title: 'Tổng danh thu',
      hideInSearch: true,
      dataIndex: 'saleRevenue',
      render: (value) => formatCurrency(value)
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
          defaultFilters={{
            create_at: date.toLocaleDateString('zh-Hans-CN', {
              year: 'numeric',
              month: '2-digit',
              day: 'numeric'
            })
          }}
          showAction={false}
          columns={orderColumns}
          ref={ref}
          dataSource={data}
        />
      </Stack>
    </Stack>
  );
}

export default TopStoreRevenue;
