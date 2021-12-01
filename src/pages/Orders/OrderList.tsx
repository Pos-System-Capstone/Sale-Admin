/* eslint-disable camelcase */
import { FileDownload, Visibility } from '@mui/icons-material';
// material
import { Button, Card, IconButton, Stack, Tooltip } from '@mui/material';
import orderApi from 'api/order';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { ORDER_STATUS_OPTONS, TOrder } from 'types/order';
import { TTableColumn } from 'types/table';
import OrderDetailDialog from './components/OrderDetailDialog';

const OrderListPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();

  const [detailOrder, setDetailOrder] = useState<number | null>(null);

  const orderColumns: TTableColumn<TOrder>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: translate('pages.orders.table.invoice'),
      dataIndex: 'invoice_id'
    },

    {
      title: translate('pages.orders.table.finalAmount'),
      dataIndex: 'final_amount',
      hideInSearch: true,
      valueType: 'money'
    },
    // {
    //   title: translate('pages.orders.table.paymentType'),
    //   dataIndex: 'paymentType'
    // },
    {
      title: translate('pages.orders.table.orderTime'),
      dataIndex: 'check_in_date',
      hideInSearch: true,
      valueType: 'date'
    },
    // {
    //   title: translate('pages.orders.table.orderType'),
    //   dataIndex: 'order_type',
    //   valueType: 'select',
    //   hideInSearch: true
    // },
    {
      title: translate('pages.orders.table.customerName'),
      dataIndex: 'customer_name'
    },
    {
      title: translate('pages.orders.table.customerPhone'),
      dataIndex: 'customer_phone'
    },
    {
      title: translate('pages.orders.table.note'),
      dataIndex: 'notes',
      hideInSearch: true
    },
    {
      title: translate('pages.orders.table.status'),
      dataIndex: 'order_status',
      valueType: 'select',
      valueEnum: ORDER_STATUS_OPTONS
    },
    {
      title: translate('pages.orders.table.detail'),
      fixed: 'right',
      hideInSearch: true,
      render: (_: any, order: TOrder) => (
        <Tooltip title="Chi tiết">
          <IconButton onClick={() => setDetailOrder(1)} size="large">
            <Visibility />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  return (
    <Page
      title="Danh sách đơn hàng"
      actions={() => [
        <Button
          key="export-file"
          onClick={() => {
            //   navigate('/menus/create');
          }}
          variant="contained"
          startIcon={<FileDownload />}
        >
          Xuất file
        </Button>
      ]}
    >
      <OrderDetailDialog
        orderId={detailOrder}
        open={Boolean(detailOrder)}
        onClose={() => setDetailOrder(null)}
      />
      <Card>
        <Stack spacing={2}>
          <ResoTable
            showAction={false}
            rowKey="menu_id"
            getData={(params: any) => orderApi.get(params)}
            columns={orderColumns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default OrderListPage;
