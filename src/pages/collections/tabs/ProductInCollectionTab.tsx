/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack
} from '@mui/material';
import DrawerProductForm from 'components/DrawerProductForm/DrawerProductForm';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { productCollectionApi } from 'redux/collections/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { TProductBase } from 'types/product';

// eslint-disable-next-line react/prop-types
const ProductInCollectionTab = ({ id, onAddProduct }: any) => {
  const api = productCollectionApi(id);
  const { translate } = useLocales();
  const tableRef = useRef<any>();
  const navigate = useNavigate();

  const [currentDeleteItem, setCurrentDeleteItem] = React.useState<any>(null);
  const { enqueueSnackbar } = useSnackbar();

  const onDelete = () =>
    api
      .delete(Number(currentDeleteItem!.product_id))
      .then((res) => {
        enqueueSnackbar(translate('common.201'), {
          variant: 'success'
        });
      })
      .then(tableRef.current?.reload)
      .catch((err) => {
        enqueueSnackbar(translate('common.error'), {
          variant: 'error'
        });
      })
      .finally(() => setCurrentDeleteItem(null));

  const addProductToCollection = (data: any) =>
    api
      .create(data)
      .then(() =>
        enqueueSnackbar('common.201', {
          variant: 'success'
        })
      )
      .then(tableRef.current?.reload)
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  return (
    <Box flex={1}>
      {currentDeleteItem && (
        <Dialog
          open={!!currentDeleteItem}
          onClose={() => setCurrentDeleteItem(null)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {translate('common.confirmDeleteTitle')}{' '}
            <strong>{currentDeleteItem.product_name}</strong>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {translate('common.confirmDeleteTitle')}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCurrentDeleteItem(null)} variant="text" color="secondary">
              {translate('common.cancel')}
            </Button>
            <LoadingAsyncButton onClick={onDelete} color="error" variant="contained" autoFocus>
              {translate('common.delete')}
            </LoadingAsyncButton>
          </DialogActions>
        </Dialog>
      )}
      <Box component={Card} p={2}>
        <Stack justifyContent="space-between" mb={2} direction="row" spacing={2}>
          <DrawerProductForm
            disabledSelections={[]}
            onSubmit={(ids: any, data: any) => addProductToCollection(ids)}
            trigger={<Button variant="contained">{translate('common.addMore')}</Button>}
          />
        </Stack>
        <ResoTable
          ref={tableRef}
          onDelete={(data: any) => setCurrentDeleteItem(data)}
          onEdit={(data: TProductBase) =>
            navigate(`/${PATH_DASHBOARD.products.list}/${data.product_id}`)
          }
          showSelection={false}
          scroll={{ y: '100%' }}
          rowKey="product_id"
          getData={api.get}
          columns={[
            {
              title: 'ID',
              dataIndex: 'product_id',
              hideInSearch: true
            },
            {
              title: 'Hình ảnh',
              dataIndex: 'pic_url',
              hideInSearch: true,
              render: (src: string, { product_name }: any) => (
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
            }
          ]}
        />
      </Box>
    </Box>
  );
};

export default ProductInCollectionTab;
