import { ProductSaleBase } from 'types/report/productSale';
import { TTableColumn } from 'types/table';
import { fNumber, fPercent } from 'utils/formatNumber';

const productSaleColumn: TTableColumn<ProductSaleBase>[] = [
  {
    title: 'Cửa hàng',
    hideInTable: true,
    valueType: 'select',
    dataIndex: 'storeId'
  },
  {
    title: 'Ngày',
    hideInTable: true,
    valueType: 'select',
    hideInSearch: true
  },
  {
    title: 'Tên sản phẩm',
    hideInSearch: true,
    dataIndex: 'productName'
  },
  {
    title: 'Số lượng',
    hideInSearch: true,
    dataIndex: 'quantity',
    render: (value) => fNumber(value)
  },
  {
    title: 'Tỉ trọng (%)',
    hideInSearch: true,
    dataIndex: 'percent',
    render: (value) => fPercent(value)
  },
  {
    title: 'Tổng tiền trước giảm giá',
    hideInSearch: true,
    dataIndex: 'totalBeforeDiscount',
    render: (value) =>
      value.toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
      })
  },
  {
    title: 'Giảm giá',
    hideInSearch: true,
    dataIndex: 'discount',
    render: (value) =>
      value.toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
      })
  },
  {
    title: 'Tổng tiền sau giảm giá',
    hideInSearch: true,
    dataIndex: 'totalAfterDiscount',
    render: (value) =>
      value.toLocaleString('vi', {
        style: 'currency',
        currency: 'VND'
      })
  },
  // Wait api
  // {
  //   title: 'Loại',
  //   hideInTable: true,
  //   valueEnum: [
  //     {
  //       label: 'Sản phẩm',
  //       value: 'true'
  //     },
  //     {
  //       label: 'Nhóm sản phẩm',
  //       value: 'false'
  //     }
  //   ],
  //   valueType: 'select'
  // },
  {
    title: 'Chọn biểu đồ',
    hideInTable: true,
    dataIndex: 'checkDeal',
    valueType: 'select',
    valueEnum: [
      {
        label: 'Trước giảm giá',
        value: 'beforeDeal'
      },
      {
        label: 'Giảm giá',
        value: 'afterDeal'
      }
    ]
  }
];

export default productSaleColumn;
