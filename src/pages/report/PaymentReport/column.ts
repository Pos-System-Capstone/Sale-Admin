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
    hideInSearch: true
  },
  {
    title: 'Thẻ thành viên',
    dataIndex: 'creditCard',
    hideInSearch: true
  },
  {
    title: 'Ngần hàng',
    dataIndex: 'bank',
    hideInSearch: true
  },
  {
    title: 'Momo',
    dataIndex: 'momo',
    hideInSearch: true
  },
  {
    title: 'Grabpay',
    dataIndex: 'grabpay',
    hideInSearch: true
  },
  {
    title: 'Grabfood',
    dataIndex: 'grabfood',
    hideInSearch: true
  },
  {
    title: 'Vnpay',
    dataIndex: 'vnpay',
    hideInSearch: true
  },
  {
    title: 'Baemin',
    dataIndex: 'baemin',
    hideInSearch: true
  },
  {
    title: 'Shopeepay',
    dataIndex: 'shopeepay',
    hideInSearch: true
  }
];
