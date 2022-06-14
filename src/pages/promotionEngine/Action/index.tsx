/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Stack } from '@mui/material';
import storeApi from 'api/store';
import DeleteConfirmDialog from 'components/DelectConfirmDialog';
// import { SelectField } from 'components/form';
// import Label from 'components/Label';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { getStores } from 'redux/store/api';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TStore } from 'types/store';
const ActionPage = () => {
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
  const columns = [
    {
      title: 'No',
      dataIndex: '',
      hideInSearch: true
    },
    {
      title: 'Name',
      dataIndex: '',
      hideInSearch: true
    },
    {
      title: 'Type',
      dataIndex: '',
      hideInSearch: true
    },
    {
      title: 'Created date',
      dataIndex: '',
      hideInSearch: true
    },
    {
      title: 'Updated date',
      dataIndex: '',
      hideInSearch: true
    }
    // {
    //   title: translate('pages.stores.table.isAvailable'),
    //   dataIndex: 'is_available',
    //   render: (isAvai: any) => (
    //     <Label color={isAvai ? 'success' : 'default'}>
    //       {isAvai ? translate('common.available') : translate('common.notAvailable')}
    //     </Label>
    //   ),
    //   renderFormItem: () => (
    //     <SelectField
    //       fullWidth
    //       sx={{ minWidth: '150px' }}
    //       options={[
    //         {
    //           label: translate('common.all'),
    //           value: ''
    //         },
    //         {
    //           label: translate('common.available'),
    //           value: 'true'
    //         },
    //         {
    //           label: translate('common.notAvailable'),
    //           value: 'false'
    //         }
    //       ]}
    //       name="is-available"
    //       size="small"
    //       label={translate('pages.stores.table.isAvailable')}
    //     />
    //   )
    // }
  ];

  return (
    <Page
      title={`${translate('pages.stores.listTitle')}`}
      actions={() => [
        <Button
          key="create-store"
          onClick={() => {
            navigate(PATH_PROMOTION_APP.action.new);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          {translate('menu.promotion.actionBtn')}
        </Button>
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
            rowKey="id"
            ref={tableRef}
            onEdit={(stores: any) => navigate(`${PATH_PROMOTION_APP.action.root}/${stores.id}`)}
            getData={getStores}
            onDelete={setCurrentDeleteItem}
            columns={columns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default ActionPage;
