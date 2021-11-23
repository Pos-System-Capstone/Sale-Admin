/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Avatar, Button, Card, Container, Stack, Typography } from '@mui/material';
import CategoryModal from 'components/CategoryModal';
import DeleteConfirmDialog from 'components/DelectConfirmDialog';
import Label from 'components/Label';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// components
import { useNavigate } from 'react-router-dom';
import { addCategoy, deleteCategoyById, editCategory, getCategories } from 'redux/category/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { TCategory } from 'types/category';
import { TTableColumn } from 'types/table';

const CategoryListPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const tableRef = useRef<any>();
  const [formModal, setFormModal] = useState(false);
  const [updateCateId, setUpdateCateId] = useState<number | null>(null);
  const [currentDeleteItem, setCurrentDeleteItem] = useState<TCategory | null>(null);

  const columns: TTableColumn<TCategory>[] = [
    {
      title: 'Hình ảnh',
      dataIndex: 'pic_url',
      hideInSearch: true,
      render: (src, { product_name }: any) => (
        <Avatar
          alt={product_name}
          src={src}
          variant="square"
          style={{ width: '54px', height: '54px' }}
        />
      )
    },
    {
      title: translate('categories.table.cateName'),
      dataIndex: 'cate_name'
    },
    {
      title: 'Danh mục extra',
      dataIndex: 'is_extra',
      valueType: 'checkbox',
      valueEnum: [
        {
          label: 'Extra',
          value: true
        },
        {
          label: 'Không phải extra',
          value: false
        }
      ]
    },
    {
      title: translate('categories.table.visible'),
      dataIndex: 'is_available',
      valueType: 'select',
      hideInSearch: true,
      valueEnum: [
        {
          label: 'Hiển thị',
          value: 'true'
        },
        {
          label: 'Không hiển thị',
          value: 'false'
        }
      ],
      render: (isAvailable) => (
        <Label color={isAvailable ? 'success' : 'default'}>
          {isAvailable ? 'Hiển thị' : 'Không hiển thị'}
        </Label>
      )
    },
    {
      title: translate('categories.table.position'),
      dataIndex: 'position',
      hideInSearch: true
    }
  ];

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
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  return (
    <Page title="Dashboard: Danh mục | Sale Reso">
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
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            {translate('categories.list')}
          </Typography>
          <Button
            onClick={() => {
              navigate(PATH_DASHBOARD.categories.new);
            }}
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
          >
            {translate('categories.addBtn')}
          </Button>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <ResoTable
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
      </Container>
    </Page>
  );
};

export default CategoryListPage;
