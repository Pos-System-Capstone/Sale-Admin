import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Chip, Stack } from '@mui/material';
import { useRequest } from 'ahooks';
import DeleteConfirmDialog from 'components/DelectConfirmDialog';
import Label from 'components/Label';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import { DAY_OF_WEEK } from 'constraints';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash-es';
import { useSnackbar } from 'notistack';
import { CardTitle } from 'pages/Products/components/Card';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { menuInStoreApi } from 'redux/menu/api';
import storeApi from 'redux/store/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { TStore } from 'types/store';
import StoreForm from './components/StoreForm';
import { storeSchemaBuilder } from './utils';

const tranform = (input: any) => {
  const output: any[] = [];
  input?.forEach((mInStore: any) => {
    if (mInStore.menus && mInStore.menus.length !== 0) {
      output.push(
        ...mInStore.menus.map((menu: any) => ({
          menu_in_store_id: mInStore.id,
          store: { id: mInStore.id, store_name: mInStore.name },
          dayFilters: menu.day_filters,
          time_range: menu.time_range,
          menu_id: menu.menu_id,
          menu_name: menu.menu_name
        }))
      );
    }
  });

  return output;
};

const UpdateStorePage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const tableRef = useRef<any>();
  const [currentDeleteItem, setCurrentDeleteItem] = useState<TStore | null>(null);

  const form = useForm({
    resolver: yupResolver(storeSchemaBuilder(translate)),
    defaultValues: {
      ...state
      //   from: convertStrToDate(get(state, ['time_from_to', '0'], null), 'HH:mm').toDate(),
      //   to: convertStrToDate(get(state, ['time_from_to', '1'], null), 'HH:mm').toDate()
    }
  });
  console.log(id);
  const {
    data: menuInStores,
    mutate: setappliedStores,
    run
  } = useRequest(() => menuInStoreApi.get({ 'store-id': [id] }), {
    formatResult: (res) => {
      console.log(`tranform(res.data)`, tranform(res.data));
      return tranform(res.data);
    },
    onError: (error) => console.log(error)
    // debounceInterval: 500
  });

  const onUpdateStore = (storeData: any) =>
    storeApi
      .update(+id!, storeData)
      .then(() =>
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        })
      )
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

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

  return (
    <FormProvider {...form}>
      <DeleteConfirmDialog
        open={Boolean(currentDeleteItem)}
        onClose={() => setCurrentDeleteItem(null)}
        onDelete={deleteStoreHandler}
        title={
          <>
            {translate('common.confirmDeleteTitle')} <strong>{currentDeleteItem?.name!}</strong>?
          </>
        }
      />
      <Page
        title={translate('pages.stores.updateTitle')}
        actions={() => {
          return [
            <Button key="delete" size="small" color="error" variant="outlined">
              {translate('common.delete')}
            </Button>
          ];
        }}
      >
        <Box px={2} mx="auto">
          <Stack direction="column" mt={2} spacing={2}>
            <Card>
              <CardTitle>{translate('pages.stores.storeInfoTitle')}</CardTitle>

              <StoreForm />
              <Box textAlign="right" mt={2}>
                <LoadingAsyncButton
                  size="small"
                  onClick={form.handleSubmit(onUpdateStore)}
                  variant="contained"
                >
                  {translate('common.update')}
                </LoadingAsyncButton>
              </Box>
            </Card>

            <Card>
              <Box display="flex" justifyContent="space-between">
                <CardTitle>{translate('pages.stores.storeMenu')}</CardTitle>
              </Box>
              <Box flex={1}>
                <Stack spacing={2}>
                  <ResoTable
                    dataSource={menuInStores ?? []}
                    rowKey="menu_id"
                    onDelete={setCurrentDeleteItem}
                    onEdit={(menu: any) =>
                      navigate(`${PATH_DASHBOARD.menus.root}/${menu.menu_id}`, { state: menu })
                    }
                    columns={[
                      {
                        title: translate('pages.menus.table.dayFilter'),
                        dataIndex: 'nenu_name'
                      },
                      {
                        title: translate('pages.menus.table.timeRange'),
                        dataIndex: 'time_range',
                        render: (range: any) => (
                          <>
                            {translate('pages.menus.table.fromTime')}{' '}
                            <Label color="success">{range[0]}</Label>{' '}
                            {translate('pages.menus.table.toTime')}{' '}
                            <Label color="success">{range[1]}</Label>
                          </>
                        )
                      },
                      {
                        title: translate('pages.menus.table.dayFilter'),
                        dataIndex: 'dayFilters',
                        render: (dayFilters: any) => (
                          <Stack direction="row" spacing={1}>
                            {dayFilters?.map((day: any) => (
                              <Chip
                                size="small"
                                key={`${day}`}
                                label={DAY_OF_WEEK.find(({ value }) => value === day)?.label}
                              />
                            ))}
                          </Stack>
                        )
                      }
                    ]}
                  />
                </Stack>
              </Box>
            </Card>
          </Stack>
        </Box>
      </Page>
    </FormProvider>
  );
};

export default UpdateStorePage;
