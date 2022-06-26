import { Stack, Typography } from '@mui/material';
import ResoTable from 'components/ResoTable/ResoTable';
import { useEffect, useRef } from 'react';
import { TTableColumn } from 'types/table';
import { fNumber } from 'utils/formatNumber';
import { formatCurrency } from 'utils/utils';
function TabTwo({ date }: any) {
  const ref = useRef<any>();

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue(
        'create_at',
        date.toLocaleDateString('zh-Hans-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      );
    }
  }, [date]);

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

  const data = [
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    },
    {
      name: 'HCM.UN.FPTMALL.D1\r\n',
      bill: 355,
      billCard: 0,
      totalProduct: 0,
      saleRevenue: 132121,
      billRevenue: 0,
      totalRevenue: 132121
    }
  ];

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
      title: 'Tổng sản phẩm',
      hideInSearch: true,
      dataIndex: 'totalProduct',
      render: (value) => fNumber(value)
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
      {/* VI. Chi tiet Doanh Thu Sản Phẩm*/}
      <Stack spacing={2}>
        <Typography pl={2} variant="h4">
          VI. Top Doanh Thu Sản Phẩm
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
          // getData={getFakeApi}
        />
      </Stack>
    </Stack>
  );
}

export default TabTwo;
