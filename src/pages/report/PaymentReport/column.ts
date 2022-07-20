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
    title: 'Ngân hàng',
    dataIndex: 'bank',
    hideInSearch: true
  },
  {
    title: 'Momo',
    dataIndex: 'momo',
    hideInSearch: true
  },
  {
    title: 'GrabPay',
    dataIndex: 'grabpay',
    hideInSearch: true
  },
  {
    title: 'GrabFood',
    dataIndex: 'grabfood',
    hideInSearch: true
  },
  {
    title: 'VnPay',
    dataIndex: 'vnpay',
    hideInSearch: true
  },
  {
    title: 'Baemin',
    dataIndex: 'baemin',
    hideInSearch: true
  },
  {
    title: 'ShopeePay',
    dataIndex: 'shopeepay',
    hideInSearch: true
  },
  {
    title: 'ZaloPay',
    // dataIndex: '',
    hideInSearch: true
  }
];
