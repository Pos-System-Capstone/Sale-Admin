import { yupResolver } from '@hookform/resolvers/yup';
import plusFill from '@iconify/icons-eva/plus-fill';
import Icon from '@iconify/react';
import { Box, Button, Card, Stack, Typography } from '@material-ui/core';
import DeleteConfirmDialog from 'components/DelectConfirmDialog';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash-es';
import { useSnackbar } from 'notistack5';
import { menuColumns } from 'pages/Menus';
import MenuSearchForm from 'pages/Menus/components/MenuSearchForm';
import { CardTitle } from 'pages/Products/components/Card';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addProductInMenus, getMenus, updateMenuInfo } from 'redux/menu/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { convertDateToStr } from 'utils/utils';
import ModalMenuForm from './components/AddMenuModal';
import StoreForm from './components/StoreForm';
import { storeSchemaBuilder } from './utils';

const UpdateMenuPage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [filters, setFilters] = useState(null);
  const [currentDeleteItem, setCurrentDeleteItem] = useState(null);

  const form = useForm({
    resolver: yupResolver(storeSchemaBuilder(translate)),
    defaultValues: {
      ...state
      //   from: convertStrToDate(get(state, ['time_from_to', '0'], null), 'HH:mm').toDate(),
      //   to: convertStrToDate(get(state, ['time_from_to', '1'], null), 'HH:mm').toDate()
    }
  });

  const onUpdateMenu = (updateMenu) => {
    updateMenu.time_from_to = [
      convertDateToStr(updateMenu.from, 'HH:mm'),
      convertDateToStr(updateMenu.to, 'HH:mm')
    ];

    return updateMenuInfo(+id, updateMenu)
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
  };

  const addProductToMenu = (datas) =>
    addProductInMenus(+id, datas)
      .then(() =>
        enqueueSnackbar(`Thêm thành công`, {
          variant: 'success'
        })
      )
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const handleDelete = () =>
    new Promise((res) =>
      setTimeout(() => {
        res();
      }, 2000)
    )
      .then(() => setCurrentDeleteItem(null))
      .then(() =>
        enqueueSnackbar(translate('common.deleteSuccess'), {
          variant: 'success'
        })
      );

  return (
    <FormProvider {...form}>
      <DeleteConfirmDialog
        open={Boolean(currentDeleteItem)}
        onClose={() => setCurrentDeleteItem(null)}
        onDelete={handleDelete}
        title={
          <>
            {translate('common.confirmDeleteTitle')} <strong>{currentDeleteItem?.menu_name}</strong>
            ?
          </>
        }
      />
      <Page title={translate('pages.stores.updateTitle')}>
        <Box px={2} mx="auto">
          <Stack mb={2} direction="row" justifyContent="space-between">
            <Typography px={1} variant="h3" component="h4" gutterBottom>
              {translate('pages.stores.updateTitle')}
            </Typography>
            <Button size="small" color="error" variant="outlined">
              {translate('common.delete')}
            </Button>
          </Stack>
          <Stack direction="column" mt={2} spacing={2}>
            <Card>
              <CardTitle>{translate('pages.stores.storeInfoTitle')}</CardTitle>

              <StoreForm />
              <Box textAlign="right" mt={2}>
                <LoadingAsyncButton size="small" onClick={onUpdateMenu} variant="contained">
                  {translate('common.update')}
                </LoadingAsyncButton>
              </Box>
            </Card>

            <Card>
              <Box display="flex" justifyContent="space-between">
                <CardTitle>{translate('pages.stores.storeMenu')}</CardTitle>
                <ModalMenuForm
                  selected={[]}
                  onSubmit={console.log}
                  trigger={
                    <Button size="small" startIcon={<Icon icon={plusFill} />}>
                      {translate('pages.stores.applyMenuStore')}
                    </Button>
                  }
                />
              </Box>
              <Box flex={1}>
                <Stack spacing={2}>
                  <MenuSearchForm onChange={setFilters} />

                  <ResoTable
                    getData={getMenus}
                    rowKey="meunu_id"
                    filters={filters}
                    onDelete={setCurrentDeleteItem}
                    onEdit={(menu) =>
                      navigate(`${PATH_DASHBOARD.menus.root}/${menu.meunu_id}`, { state: menu })
                    }
                    columns={menuColumns}
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

export default UpdateMenuPage;
