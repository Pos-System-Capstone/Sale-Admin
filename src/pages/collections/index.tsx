/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Button, Card, Container, Stack, Typography } from '@material-ui/core';
import DeleteConfirmDialog from 'components/DelectConfirmDialog';
// components
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack5';
// material
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCollection, getCollections } from 'redux/collections/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { TCollection } from 'types/collection';
import { TTableColumn } from 'types/table';

const CollectionListPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const tableRef = useRef<any>();

  const [currentDeleteItem, setCurrentDeleteItem] = useState<TCollection | null>(null);

  const columns: TTableColumn<TCollection>[] = [
    {
      title: translate('collections.table.collectionName'),
      dataIndex: 'name',
      fixed: 'left'
    },
    {
      title: translate('collections.table.collectionNameEn'),
      dataIndex: 'name_eng',
      fixed: 'left',
      hideInSearch: true
    },
    {
      title: translate('collections.table.store'),
      dataIndex: 'store_id',
      fixed: 'left',
      hideInSearch: true
    },
    {
      title: translate('collections.table.position'),
      dataIndex: 'position',
      hideInSearch: true
    }
  ];

  const deleteCategoryHander = () =>
    deleteCollection(currentDeleteItem?.id!)
      .then(() => setCurrentDeleteItem(null))
      .then(tableRef.current?.reload)
      .then(() =>
        enqueueSnackbar(`Xóa thành công`, {
          variant: 'success'
        })
      )
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  return (
    <Page title={`Dashboard: ${translate('collections.list')} | Sale Reso`}>
      <DeleteConfirmDialog
        open={Boolean(currentDeleteItem)}
        onClose={() => setCurrentDeleteItem(null)}
        onDelete={deleteCategoryHander}
        title={
          <>
            {translate('common.confirmDeleteTitle')} <strong>{currentDeleteItem?.name}</strong>
          </>
        }
      />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            {translate('collections.list')}
          </Typography>
          <Button
            onClick={() => {
              navigate(PATH_DASHBOARD.collections.new);
            }}
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
          >
            {translate('collections.addBtn')}
          </Button>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <ResoTable
              ref={tableRef}
              onEdit={(collecton: TCollection) =>
                navigate(`${PATH_DASHBOARD.collections.root}/${collecton.id}`, {
                  state: collecton
                })
              }
              onDelete={setCurrentDeleteItem}
              rowKey="id"
              getData={getCollections}
              columns={columns}
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
};

export default CollectionListPage;
