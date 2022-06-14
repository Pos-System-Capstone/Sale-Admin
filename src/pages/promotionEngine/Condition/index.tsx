/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Stack } from '@mui/material';
import CategoryModal from 'components/CategoryModal';
import DeleteConfirmDialog from 'components/DelectConfirmDialog';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { addCategoy, deleteCategoyById, editCategory, getCategories } from 'redux/category/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { TCategory } from 'types/category';
import { TTableColumn } from 'types/table';

const ConditionPage = ({ isExtra = false }: { isExtra?: boolean }) => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  console.log(`isExtra`, isExtra);

  const tableRef = useRef<any>();
  const [formModal, setFormModal] = useState(false);
  const [updateCateId, setUpdateCateId] = useState<number | null>(null);
  const [currentDeleteItem, setCurrentDeleteItem] = useState<TCategory | null>(null);

  const columns: TTableColumn<TCategory>[] = [
    {
      title: 'NO',
      dataIndex: 'position',
      hideInSearch: true
    },
    {
      title: 'NAME',
      dataIndex: 'position',
      hideInSearch: true
    },
    {
      title: 'DESCRIDTION',
      dataIndex: 'position',
      hideInSearch: true
    },
    {
      title: 'Updated date',
      dataIndex: 'position',
      hideInSearch: true
    }
  ];

  useEffect(() => {
    const form = tableRef.current?.formControl;
    if (form) {
      form.setValue('is-extra', isExtra);
    }
  }, [isExtra, tableRef]);

  const addCategoryHander = (values: TCategory) =>
    addCategoy(values)
      .then(() =>
        enqueueSnackbar(`Tạo thành công`, {
          variant: 'success'
        })
      )
      .then(() => setUpdateCateId(null))
      .then(tableRef.current?.reload)
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const editCategoryHander = (values: TCategory) =>
    editCategory(updateCateId!, values)
      .then(tableRef.current?.reload)
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

  const deleteCategoryHander = () =>
    deleteCategoyById(currentDeleteItem?.cate_id!)
      .then(() => setCurrentDeleteItem(null))
      .then(tableRef.current?.reload)
      .then(() =>
        enqueueSnackbar(`Xóa thành công`, {
          variant: 'success'
        })
      )
      .then(() => tableRef.current?.reload())
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  return (
    <Page
      title={isExtra ? 'Manage Action' : 'Manage Condition'}
      actions={() => [
        <Button
          key="add-category"
          onClick={() => {
            navigate(`${PATH_PROMOTION_APP.condition.new}?isExtra=${isExtra}`);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          New Condition
          {/* {translate('categories.addBtn')} */}
        </Button>
      ]}
    >
      <CategoryModal
        open={formModal}
        cate_id={updateCateId}
        onClose={() => setFormModal(false)}
        onAdd={addCategoryHander}
        onEdit={editCategoryHander}
      />
      <DeleteConfirmDialog
        open={Boolean(currentDeleteItem)}
        onClose={() => setCurrentDeleteItem(null)}
        onDelete={deleteCategoryHander}
        title={
          <>
            {translate('common.confirmDeleteTitle')} <strong>{currentDeleteItem?.cate_name}</strong>
          </>
        }
      />
      <Card>
        <Stack spacing={2}>
          <ResoTable
            defaultFilters={{
              'is-extra': isExtra
            }}
            ref={tableRef}
            onEdit={(cate: TCategory) => {
              navigate(`${PATH_DASHBOARD.categories.editById(cate.cate_id)}`);
            }}
            onDelete={(cate: TCategory) => setCurrentDeleteItem(cate)}
            rowKey="cate_id"
            getData={getCategories}
            columns={columns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default ConditionPage;
