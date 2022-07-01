import { TProductLineBase } from 'types/report/product';
import { TTableColumn } from 'types/table';
import { fPercent, fShortenNumber } from 'utils/formatNumber';
import { formatCurrency } from 'utils/utils';

const productProgressColumns: TTableColumn<TProductLineBase>[] = [
  {
    title: 'Ngày',
    hideInSearch: true,
    dataIndex: 'startTime'
  },
  {
    title: 'Số lượng',
    hideInSearch: true,
    dataIndex: 'quantity',
    render: (value) => fShortenNumber(value)
  },
  // {
  //   title: 'Doanh thu trước giảm giá',
  //   hideInSearch: true,
  //   dataIndex: 'revenueBefore',
  //   render: (value) => formatCurrency(value)
  // },
  {
    title: 'Giảm giá',
    hideInSearch: true,
    dataIndex: 'discount',
    render: (value) => fPercent(value)
  },
  {
    title: 'Doanh thu',
    hideInSearch: true,
    dataIndex: 'totalPrice',
    render: (value) => formatCurrency(value)
  }
];

export default productProgressColumns;
