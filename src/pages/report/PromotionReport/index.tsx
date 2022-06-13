/* eslint-disable camelcase */
import { Icon } from '@iconify/react';
// material
import { Button, Card, Stack } from '@mui/material';
import storeApi from 'api/store';
import DeleteConfirmDialog from 'components/DelectConfirmDialog';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
// components
import { SelectField } from 'components/form';
import Label from 'components/Label';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { TPromotionBase } from 'types/report/promotion';
import { TStore } from 'types/store';
import { TTableColumn } from 'types/table';
import promotionApi from 'api/report/promotion';
const PromotionReport = () => {
  const navigate = useNavigate();
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
  const date = current.toLocaleDateString('vi-VI', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return (
    <Page
      title="Báo cáo theo khuyến mãi"
      actions={() => [
        <Button
          key="create-store"
          onClick={() => {
            navigate(PATH_DASHBOARD.promotion.new);
          }}
          variant="contained"
          startIcon={<Icon icon="fa-solid:file-export" />}
        >
          {translate('Xuất file Excel')}
        </Button>
      ]}
    >
      <p style={{ marginTop: '-45px', paddingBottom: '50px' }}>({date})</p>
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
            rowKey="id"
            ref={tableRef}
            getData={promotionApi.getPromotion}
            columns={columns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default PromotionReport;
