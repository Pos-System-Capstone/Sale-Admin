import { ProductProgressBase } from 'types/report/productProgress';
import { TTableColumn } from 'types/table';
import { fPercent, fShortenNumber } from 'utils/formatNumber';
import { formatCurrency } from 'utils/utils';

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
    dataIndex: 'quantity',
    render: (value) => fShortenNumber(value)
  },
  {
    title: 'Doanh thu trước giảm giá',
    hideInSearch: true,
    dataIndex: 'revenueBefore',
    render: (value) => formatCurrency(value)
  },
  {
    title: 'Giảm giá',
    hideInSearch: true,
    dataIndex: 'discount',
    render: (value) => fPercent(value)
  },
  {
    title: 'Doanh thu',
    hideInSearch: true,
    dataIndex: 'revenue',
    render: (value) => formatCurrency(value)
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
