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
// import promotionApi from 'api/report/promotion';
import { SelectField } from 'components/form';
import Label from 'components/Label';
// import { TPromotionBase } from 'types/report/promotion';
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
  type TPromotionBase = {
    CustomerName?: string;
    OrderQty?: number;
    SumAmount?: number;
    SumDiscount?: number;
    SumFinal?: number;
    PromoID?: number;
    Id?: number;
  };
  const fakeapi = [
    {
      CustomerName: 'Trần Hữu Ninh',
      OrderQty: 1,
      SumAmount: 25000,
      SumDiscount: 25000,
      SumFinal: 0,
      PromoID: 1,
      Id: 5795
    },
    {
      CustomerName: 'Hồ Ngọc Ẩn',
      OrderQty: 1,
      SumAmount: 25000,
      SumDiscount: 25000,
      SumFinal: 0,
      PromoID: 1,
      Id: 5799
    },
    {
      CustomerName: 'nguyễn văn thuấn',
      OrderQty: 2,
      SumAmount: 70000,
      SumDiscount: 70000,
      SumFinal: 0,
      PromoID: 1,
      Id: 5802
    },
    {
      CustomerName: 'Vũ Đinh',
      OrderQty: 1,
      SumAmount: 19000,
      SumDiscount: 19000,
      SumFinal: 0,
      PromoID: 1,
      Id: 6533
    },
    {
      CustomerName: 'Nguyễn Phạm Quang Trí',
      OrderQty: 1,
      SumAmount: 55000,
      SumDiscount: 55000,
      SumFinal: 0,
      PromoID: 1,
      Id: 11857
    },
    {
      CustomerName: 'Võ Tuấn Thanh AM',
      OrderQty: 3,
      SumAmount: 135000,
      SumDiscount: 135000,
      SumFinal: 0,
      PromoID: 1,
      Id: 13957
    },
    {
      CustomerName: 'quynh nguyen',
      OrderQty: 2,
      SumAmount: 150000,
      SumDiscount: 150000,
      SumFinal: 0,
      PromoID: 1,
      Id: 13986
    },
    {
      CustomerName: 'huỳnh văn tuyển',
      OrderQty: 2,
      SumAmount: 60000,
      SumDiscount: 60000,
      SumFinal: 0,
      PromoID: 1,
      Id: 29424
    },
    {
      CustomerName: 'Long',
      OrderQty: 1,
      SumAmount: 350000,
      SumDiscount: 350000,
      SumFinal: 0,
      PromoID: 1,
      Id: 31440
    },
    {
      CustomerName: 'Viết Khôi',
      OrderQty: 1,
      SumAmount: 47000,
      SumDiscount: 47000,
      SumFinal: 0,
      PromoID: 1,
      Id: 41288
    }
  ];

  const columns: TTableColumn<TPromotionBase>[] = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'CustomerName'
      // hideInSearch: true
    },
    {
      title: 'Số lần sử dụng thẻ',
      dataIndex: 'OrderQty',
      hideInSearch: true
    },
    {
      title: 'Số tiền',
      dataIndex: 'SumAmount',
      hideInSearch: true
    },
    {
      title: 'Số tiền giảm giá',
      dataIndex: 'SumDiscount',
      hideInSearch: true
    },
    {
      title: 'Thanh toán',
      dataIndex: 'SumFinal',
      hideInSearch: true
    },
    {
      title: 'Xem các hóa đơn',
      dataIndex: 'PromoID',
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
            showAction={false}
            rowKey="promotion-id"
            ref={tableRef}
            // getData={PromotionBase}
            dataSource={fakeapi}
            columns={columns}
          />
        </Stack>
      </Card>
    </ReportPage>
  );
};

export default PromotionReport;
