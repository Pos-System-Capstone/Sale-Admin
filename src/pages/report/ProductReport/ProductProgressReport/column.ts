import { ProductProgressBase } from 'types/report/productProgress';
import { TTableColumn } from 'types/table';

const ProductProgressColumn: TTableColumn<ProductProgressBase>[] = [
  {
    title: 'Ngày',
    valueType: 'select',
    hideInSearch: true,
    dataIndex: 'date'
  },
  {
    title: 'Số lượng',
    hideInSearch: true,
    dataIndex: 'quantity'
  },
  {
    title: 'Doanh thu trước giảm giá',
    hideInSearch: true,
    dataIndex: 'revenueBefore'
  },
  {
    title: 'Giảm giá',
    hideInSearch: true,
    dataIndex: 'discount'
  },
  {
    title: 'Doanh thu',
    hideInSearch: true,
    dataIndex: 'revenue'
  },
  {
    title: 'Loại',
    hideInTable: true,
    valueEnum: [
      {
        label: 'Sản phẩm',
        value: 'true'
      },
      {
        label: 'Nhóm sản phẩm',
        value: 'false'
      }
    ],
    valueType: 'select'
  },
  {
    title: 'Chọn biểu đồ',
    hideInTable: true,
    valueEnum: [
      {
        label: 'Giảm giá',
        value: 'true'
      },
      {
        label: 'Trước giảm giá',
        value: 'false'
      }
    ],
    valueType: 'select'
  }
];

export default ProductProgressColumn;
