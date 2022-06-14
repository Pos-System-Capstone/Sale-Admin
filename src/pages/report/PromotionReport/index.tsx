/* eslint-disable camelcase */
// material
import { Card, Stack } from '@mui/material';
import storeApi from 'api/store';
import DeleteConfirmDialog from 'components/DelectConfirmDialog';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
// components
import promotionApi from 'api/report/promotion';
import { SelectField } from 'components/form';
import Label from 'components/Label';
import { TPromotionBase } from 'types/report/promotion';
import { TStore } from 'types/store';
import { TTableColumn } from 'types/table';
// import { DatePicker, LocalizationProvider } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ReportBtn from '../components/ReportBtn';
import ReportDatePicker from '../components/ReportDatePicker';
import ReportPage from '../components/ReportPage';
const PromotionReport = () => {
  // const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [currentDeleteItem, setCurrentDeleteItem] = useState<TStore | null>(null);
  const tableRef = useRef<any>();

  const deleteStoreHandler = () =>
    storeApi
      .delete(currentDeleteItem?.id!)
      .then(() => setCurrentDeleteItem(null))
      .then(tableRef.current?.reload)
      .then(() =>
        enqueueSnackbar(`Xóa thành công`, {
          variant: 'success'
        })
      )
      .catch((err: any) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });
  const columns: TTableColumn<TPromotionBase>[] = [
    {
      title: 'Chương trình khuyên mãi',
      dataIndex: 'customerName'
      // hideInSearch: true
    },
    {
      title: 'Doanh số trước giảm giá',
      dataIndex: 'sumAmount',
      hideInSearch: true
    },
    {
      title: 'Giảm giá',
      dataIndex: 'storeName',
      hideInSearch: true
    },
    {
      title: 'Doanh số sau giảm giá',
      // dataIndex: 'open_time',
      hideInSearch: true
    },
    // {
    //   title: translate('pages.stores.table.closeTime'),
    //   dataIndex: 'close_time',
    //   hideInSearch: true
    // },
    {
      title: 'Xem các hóa đơn',
      // dataIndex: 'is_available',
      // hideInSearch: true,
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
      <DeleteConfirmDialog
        open={Boolean(currentDeleteItem)}
        onClose={() => setCurrentDeleteItem(null)}
        onDelete={deleteStoreHandler}
        title={
          <>
            {translate('common.confirmDeleteTitle')} <strong>{currentDeleteItem?.name}</strong>
          </>
        }
      />
      <Card>
        <Stack spacing={2}>
          <ResoTable
            rowKey="promotion-id"
            ref={tableRef}
            getData={promotionApi.getPromotion(13)}
            columns={columns}
          />
        </Stack>
      </Card>
    </ReportPage>
  );
};

export default PromotionReport;
