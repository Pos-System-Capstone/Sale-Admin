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
    title: 'STT',
    hideInSearch: true,
    dataIndex: 'index'
  },
  {
    title: 'Mã sản phẩm',
    hideInSearch: true,
    dataIndex: 'productCode'
  },
  {
    title: 'Tên sản phẩm',
    hideInSearch: true,
    dataIndex: 'productName'
  },
  {
    title: 'Danh mục',
    hideInSearch: true,
    dataIndex: 'cateName'
  },
  {
    title: 'Đơn vị tính',
    hideInSearch: true,
    dataIndex: 'unitPrice',
    render: (value) => fNumber(value)
  },
  {
    title: 'Số lượng bán ra',
    hideInSearch: true,
    dataIndex: 'quantity',
    render: (value) => fNumber(value)
  },
  {
    title: 'Đơn giá (Chưa VAT)',
    hideInSearch: true,
    dataIndex: 'unitPriceNoVat',
    render: (value) => fNumber(value)
  },
  {
    title: 'Đơn giá (Đã VAT)',
    hideInSearch: true,
    dataIndex: 'unitPrice',
    render: (value) => fNumber(value)
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
  },
  {
    title: 'Phiên bản (Version)',
    hideInSearch: true
    // dataIndex: 'saleRevenue',
  },
  {
    title: 'Ngày cập nhật (Updated at)',
    hideInSearch: true
    // dataIndex: 'saleRevenue',
  }
];
