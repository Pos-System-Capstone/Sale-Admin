import { TPaymentReportBase } from 'types/report/payment';
import { TTableColumn } from 'types/table';

export const paymentColumns: TTableColumn<TPaymentReportBase>[] = [
  {
    title: 'Cửa hàng',
    dataIndex: 'storeName',
    valueType: 'text',
    hideInSearch: true
  },
  {
    title: 'Tiền mặt',
    dataIndex: 'cash',
    hideInSearch: true,
    // render: (value) => formatCurrency(value)
    valueType: 'money'
  },
  {
    title: 'Thẻ thành viên',
    dataIndex: 'creditCard',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Ngân hàng',
    dataIndex: 'bank',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Momo',
    dataIndex: 'momo',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'GrabPay',
    dataIndex: 'grabpay',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'GrabFood',
    dataIndex: 'grabfood',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'VnPay',
    dataIndex: 'vnpay',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'Baemin',
    dataIndex: 'baemin',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'ShopeePay',
    dataIndex: 'shopeepay',
    hideInSearch: true,
    valueType: 'money'
  },
  {
    title: 'ZaloPay',
    // dataIndex: '',
    hideInSearch: true,
    valueType: 'money'
  }
];
