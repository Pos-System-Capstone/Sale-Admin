import { Box, Card, Chip, DialogTitle, Stack, Button } from '@material-ui/core';
import { DialogAnimate } from 'components/animate';
import { useSnackbar } from 'notistack5';
import Label from 'components/Label';
import ResoTable from 'components/ResoTable/ResoTable';
import StoreInMenuForm from 'components/_dashboard/calendar/StoreInMenuForm';
import { DAY_OF_WEEK } from 'constraints';
import { CardTitle } from 'pages/Products/components/Card';
import useLocales from 'hooks/useLocales';
import React, { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import Icon from '@iconify/react';
import DeleteConfirmDialog from 'components/DelectConfirmDialog';
import { StoreInMenu } from '../components/MenuInStoreCalendar';
import { MENUINSTORES } from '../fakeData';

const StoreApplyTab = ({ checkedStores }: any) => {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const [appliedStores, setappliedStores] = useState<StoreInMenu[]>(MENUINSTORES);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updateStoreInMenu, setUpdateStoreInMenu] = useState<StoreInMenu | null>(null);
  const [deleteStoreInMenu, setDeleteStoreInMenu] = useState(null);

  const handleSelect = (id: number) => {
    const sInMenuId = id;

    const storeInMenuIdx = appliedStores.findIndex(({ menu_id: id }) => id === Number(sInMenuId));

    if (storeInMenuIdx !== -1) {
      setUpdateStoreInMenu(appliedStores[storeInMenuIdx]);
      setIsOpenModal(true);
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
    setUpdateStoreInMenu(null);
  };

  const handleUpdate = (values: StoreInMenu) => {};
  const handleDelete = () =>
    new Promise((res) => {
      setTimeout(() => {
        setDeleteStoreInMenu(null);
        return res(true);
      }, 2000);
    }).then(() =>
      enqueueSnackbar(translate('common.deleteSuccess'), {
        variant: 'success'
      })
    );

  return (
    <Box>
      <DeleteConfirmDialog
        open={Boolean(deleteStoreInMenu)}
        onDelete={handleDelete}
        onClose={() => setDeleteStoreInMenu(null)}
        title={translate('common.confirmDeleteTitle')}
      />
      <Card>
        <Box display="flex" justifyContent="space-between">
          <CardTitle>{translate('pages.menus.storeApplyTab.title')}</CardTitle>
          <Button
            onClick={() => {
              setIsOpenModal(true);
            }}
            size="small"
            startIcon={<Icon icon={plusFill} />}
          >
            {translate('pages.menus.storeApplyTab.addStoreInMenu')}
          </Button>
        </Box>
        <Box mt={2}>
          <DialogAnimate open={isOpenModal} onClose={handleClose}>
            <DialogTitle>
              {updateStoreInMenu
                ? translate('pages.menus.storeApplyTab.editStoreInMenu')
                : translate('pages.menus.storeApplyTab.addStoreInMenu')}
            </DialogTitle>

            <StoreInMenuForm
              storeInMenu={updateStoreInMenu}
              onCancel={handleClose}
              onUpdateEvent={handleUpdate}
            />
          </DialogAnimate>
          <ResoTable
            pagination={false}
            dataSource={appliedStores}
            columns={[
              {
                title: '#',
                dataIndex: 'index'
              },
              {
                title: translate('pages.menus.table.storeName'),
                dataIndex: 'store.store_name'
              },
              {
                title: translate('pages.menus.table.timeRange'),
                render: (_: any, { time_range }: StoreInMenu) => (
                  <>
                    {translate('pages.menus.table.fromTime')}{' '}
                    <Label color="success">{time_range[0]}</Label>{' '}
                    {translate('pages.menus.table.toTime')}{' '}
                    <Label color="success">{time_range[1]}</Label>
                  </>
                )
              },
              {
                title: translate('pages.menus.table.dayFilter'),
                render: (_: any, { dayFilters, menu_id }: StoreInMenu) => (
                  <Stack direction="row" spacing={1}>
                    {dayFilters?.map((day) => (
                      <Chip
                        size="small"
                        key={`${menu_id}-${day}`}
                        label={DAY_OF_WEEK.find(({ value }) => value === day)?.label}
                      />
                    ))}
                  </Stack>
                )
              }
            ]}
            rowKey="menu_id"
            onEdit={(data: StoreInMenu) => {
              handleSelect(data.menu_id);
            }}
            onDelete={setDeleteStoreInMenu}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default StoreApplyTab;
