/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Avatar
} from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import React from 'react';
import { useRequest } from 'ahooks';
import Icon from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { get } from 'lodash-es';
import { deleteProductInMenu, getProductInMenus, updateProdInMenuInfo } from 'redux/menu/api';
import DrawerProductForm from 'components/DrawerProductForm/DrawerProductForm';
import { InputField } from 'components/form';
import { formatCurrency } from 'utils/utils';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import EmptyContent from 'components/EmptyContent';
import ResoTable from 'components/ResoTable/ResoTable';
import { getAllProduct } from 'redux/product/api';
import { CardTitle } from 'pages/Products/components/Card';
import EditProductDialog from '../components/EditProductDialog';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const random = Math.floor(Math.random() * 12) + 1;
  return (
    <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <CardMedia
        sx={{ height: '151px', width: '100%', objectFit: 'cover' }}
        image={`https://minimals.cc/static/mock-images/products/product_${
          product.product_name.length % 12
        }.jpg`}
        title="Live from space album cover"
      />
      <CardContent sx={{ flex: '1 0 auto', px: 1, py: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle2" pr={2} noWrap>
            {product.product_name}
          </Typography>
          <Typography component="span" variant="body1">
            {formatCurrency(product.price1)}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', py: 2 }}>
        <Button onClick={onDelete} size="small" color="error">
          Xóa
        </Button>
        <Button onClick={onEdit} size="small" color="primary">
          Điều chỉnh
        </Button>
      </CardActions>
    </Card>
  );
};

const createProduct = (name) => ({
  product_name: name,
  price1: 100000,
  price2: 100000
});

const DEFAULT_DATA = [
  createProduct('Pizza Hải sản'),
  createProduct('Coca Cola'),
  createProduct('Pizza Bánh xèo'),
  createProduct('Pizza Hải sản'),
  createProduct('Coca Cola'),
  createProduct('Pizza Bánh xèo'),
  createProduct('Pizza Hải sản'),
  createProduct('Coca Cola'),
  createProduct('Pizza Bánh xèo'),
  createProduct('Pizza Hải sản'),
  createProduct('Coca Cola'),
  createProduct('Pizza Bánh xèo')
];

// eslint-disable-next-line react/prop-types
const ProductInMenuTab = ({ id, onAddProduct }) => {
  const {
    data = DEFAULT_DATA,
    loading,
    run
  } = useRequest(() => getProductInMenus(id), {
    formatResult: (res) => res.data.data
  });

  const [currentDeleteItem, setCurrentDeleteItem] = React.useState(null);
  const [currentProduct, setCurrentProduct] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleUpdateProdInMenu = (values) =>
    updateProdInMenuInfo(id, values)
      .then(() =>
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        })
      )
      .then(() => setCurrentProduct(null))
      .then(run)
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variantF: 'error'
        });
      });

  const onDelete = () =>
    deleteProductInMenu(id, [currentDeleteItem.product_id])
      .then((res) => {
        enqueueSnackbar(`Xóa thành công `, {
          variant: 'success'
        });
      })
      .then(run)
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      })
      .finally(() => setCurrentDeleteItem(null));

  return (
    <Box flex={1}>
      <EditProductDialog
        open={currentProduct}
        onClose={() => setCurrentProduct(null)}
        data={currentProduct}
        onSubmit={handleUpdateProdInMenu}
      />
      <Dialog
        open={currentDeleteItem}
        onClose={() => setCurrentDeleteItem(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Xác nhận xóa <strong>{currentDeleteItem?.product_name}</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Xác nhận xóa sản phẩm?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCurrentDeleteItem(null)} variant="text" color="secondary">
            Hủy
          </Button>
          <LoadingAsyncButton onClick={onDelete} color="error" variant="contained" autoFocus>
            Xác nhận
          </LoadingAsyncButton>
        </DialogActions>
      </Dialog>
      <Box as={Card} p={2}>
        <CardTitle>Danh sách sản phẩm</CardTitle>
        <Stack justifyContent="space-between" mb={2} direction="row" spacing={2}>
          <InputField size="small" label="Tên sản phẩm" name="product-name" />
          <DrawerProductForm
            onSubmit={(ids, data) => onAddProduct(data)}
            trigger={
              <Button size="small" startIcon={<Icon icon={plusFill} />} variant="contained">
                Thêm sản phẩm
              </Button>
            }
          />
        </Stack>
        {loading ? (
          <CircularProgress />
        ) : (
          <ResoTable
            getData={getAllProduct}
            rowKey="product_id"
            onEdit={setCurrentProduct}
            onDelete={setCurrentDeleteItem}
            columns={[
              {
                title: 'Mã sản phẩm',
                dataIndex: 'code'
              },
              {
                title: 'Hình ảnh',
                dataIndex: 'pic_url',
                render: (src, { product_name }) => (
                  <Avatar
                    alt={product_name}
                    src={src}
                    variant="square"
                    style={{ width: '54px', height: '54px' }}
                  />
                )
              },
              {
                title: 'Tên sản phẩm',
                dataIndex: 'product_name'
              },
              {
                title: 'Giá',
                dataIndex: 'price1',
                render: (value) => <Typography>{formatCurrency(value)}</Typography>
              }
            ]}
          />
        )}
      </Box>
    </Box>
  );
};

export default ProductInMenuTab;
