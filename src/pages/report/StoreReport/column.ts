import { StoreBase } from 'types/report/store';
import { TTableColumn } from 'types/table';

export const storeColumns: TTableColumn<StoreBase>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    valueType: 'text',
    hideInSearch: true
  },
  {
    title: 'Tên cửa hàng',
    dataIndex: 'name',
    valueType: 'text',
    hideInSearch: true
  },
  {
    title: 'Loại cửa hàng',
    // dataIndex: 'cash',
    hideInSearch: true
  },
  {
    title: 'Lần chạy báo cáo',
    // dataIndex: 'creditCard',
    hideInSearch: true
  }
  // {
  //   title: 'Ngần hàng',
  //   dataIndex: 'bank',
  //   hideInSearch: true
  // },
  // {
  //   title: 'Momo',
  //   dataIndex: 'momo',
  //   hideInSearch: true
  // },
  // {
  //   title: 'Grabpay',
  //   dataIndex: 'grabpay',
  //   hideInSearch: true
  // },
  // {
  //   title: 'Grabfood',
  //   dataIndex: 'grabfood',
  //   hideInSearch: true
  // },
  // {
  //   title: 'Vnpay',
  //   dataIndex: 'vnpay',
  //   hideInSearch: true
  // },
  // {
  //   title: 'Baemin',
  //   dataIndex: 'baemin',
  //   hideInSearch: true
  // },
  // {
  //   title: 'Shopeepay',
  //   dataIndex: 'shopeepay',
  //   hideInSearch: true
  // }
];
