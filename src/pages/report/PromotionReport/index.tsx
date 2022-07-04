/* eslint-disable camelcase */
// material
import { Card, Stack } from '@mui/material';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useRef, useState } from 'react';
// components
import { SelectField } from 'components/form';
import Label from 'components/Label';
import { TTableColumn } from 'types/table';
import promotionApi from 'api/report/promotion';
import AutocompleteStore from 'components/form/common/report/AutocompleteStore';
import { PromotionBase } from 'types/report/promotion';
import ReportBtn from '../components/ReportBtn';
import ReportDatePicker from '../components/ReportDatePicker';
import ReportPage from '../components/ReportPage';
const PromotionReport = () => {
  const { translate } = useLocales();
  const tableRef = useRef<any>();

  const columns: TTableColumn<PromotionBase>[] = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'storeId',
      hideInTable: true,
      valueType: 'select',
      renderFormItem: () => <AutocompleteStore name="storeId" label="Cửa hàng" />
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName'
      // hideInSearch: true
    },
    {
      title: 'Số lần sử dụng thẻ',
      // dataIndex: 'OrderQty',
      hideInSearch: true
    },
    {
      title: 'Số tiền',
      dataIndex: 'sumAmount',
      hideInSearch: true
    },
    {
      title: 'Số tiền giảm giá',
      // dataIndex: 'SumDiscount',
      hideInSearch: true
    },
    {
      title: 'Thanh toán',
      // dataIndex: 'SumFinal',
      hideInSearch: true
    },
    {
      title: 'Xem các hóa đơn',
      // dataIndex: 'PromoID',
      hideInSearch: true,
      render: (isAvai: any) => (
        <Label color={isAvai ? 'success' : 'default'}>
          {isAvai ? translate('common.available') : translate('common.notAvailable')}
        </Label>
      ),
      renderFormItem: () => (
        <SelectField
          fullWidth
          sx={{ minWidth: '150px' }}
          options={[
            {
              label: translate('Hôm nay'),
              value: ''
            },
            {
              label: translate('Tuần này'),
              value: ''
            },
            {
              label: translate('Tuần trước'),
              value: ''
            },
            {
              label: translate('Tháng này'),
              value: ''
            },
            {
              label: translate('Tháng trước'),
              value: ''
            },
            {
              label: translate('Tuỳ chọn'),
              value: ''
            }
          ]}
          name="is-available"
          size="small"
          label={translate('pages.stores.table.isAvailable')}
        />
      )
    }
  ];

  const current = new Date();
  const [day, setDay] = useState<Date>(current);

  return (
    <ReportPage
      title="Báo cáo theo khuyến mãi"
      actions={[
        <ReportDatePicker
          key="choose-day"
          value={day}
          onChange={(newValue) => {
            setDay(newValue || new Date());
          }}
        />,
        <ReportBtn key="export-excel" onClick={() => console.log('Export excel')} />
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoTable
            showAction={false}
            rowKey="promotion-id"
            ref={tableRef}
            getData={({ storeId, ...params }: any) => promotionApi.getPromotion(storeId, params)}
            defaultFilters={{
              storeId: 0
            }}
            columns={columns}
          />
        </Stack>
      </Card>
    </ReportPage>
  );
};

export default PromotionReport;
