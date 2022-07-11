import AutocompleteStore from 'components/form/common/report/AutocompleteStore';
import { TProductSaleReportBase } from 'types/report/product';
import { TTableColumn } from 'types/table';
import { fNumber } from 'utils/formatNumber';
import { formatCurrency } from 'utils/utils';

export const productSaleColumn: TTableColumn<TProductSaleReportBase>[] = [
  {
    title: 'Cửa hàng',
    hideInTable: true,
    valueType: 'select',
    dataIndex: 'storeId',
    renderFormItem: () => <AutocompleteStore name="storeId" label="Cửa hàng" />
  },
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
  },
  {
    title: 'Tên sản phẩm',
    hideInSearch: true,
    dataIndex: 'productName'
  },
  {
    title: 'Đơn vị tính',
    hideInSearch: true,
    dataIndex: 'unitPrice'
  },
  {
    title: 'Số lượng bán ra',
    hideInSearch: true,
    dataIndex: 'quantity',
    render: (value) => fNumber(value)
  },
  {
    title: 'Đơn giá (Chưa VAT)',
    hideInSearch: true
    // dataIndex: 'unitPrice',
    // render: (value) => fNumber(value)
  },
  {
    title: 'Đơn giá (Đã VAT)',
    hideInSearch: true
    // dataIndex: 'unitPrice',
    // render: (value) => fNumber(value)
  },
  {
    title: 'Doanh thu (Chưa VAT)',
    hideInSearch: true,
    dataIndex: 'totalPriceBeforeVat',
    render: (value) => formatCurrency(value)
  },
  {
    title: 'Doanh thu (Đã VAT)',
    hideInSearch: true,
    // dataIndex: 'totalPriceAfterVat',
    render: (value) => formatCurrency(value)
  }
];
