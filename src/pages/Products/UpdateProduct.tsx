/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CircularProgress,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  Typography
} from '@mui/material';
import plusFill from '@iconify/icons-eva/plus-fill';
import EmptyContent from 'components/EmptyContent';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { Icon } from '@iconify/react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import LoadingAsyncButton from '../../components/LoadingAsyncButton/LoadingAsyncButton';
import Page from '../../components/Page';
import useDashboard from '../../hooks/useDashboard';
import { DashboardNavLayout } from '../../layouts/dashboard/DashboardNavbar';
import { getProdById, updateProdById } from '../../redux/product/api';
import MiddleForm from './components/MiddleForm';
import { DEFAULT_VALUES, UpdateProductForm, validationSchema } from './type';
import { transformDraftToStr, normalizeProductData, transformProductForm } from './utils';
import ModalForm from 'components/ModalForm/ModalForm';
import { CheckBoxField, InputField, SelectField } from 'components/form';
import { useRequest } from 'ahooks';
import { getMenus } from 'redux/menu/api';
// import ProductInMenuDialog from '../Menus/components/EditProductDialog';
import { addProductInMenus, updateProdInMenuInfo } from 'redux/menu/api';
import { get } from 'lodash';
import { TProductBase } from 'types/product';
import useLocales from 'hooks/useLocales';

const UpdateProduct = () => {
  const { data: menus } = useRequest<any>(getMenus, { formatResult: (res) => res.data.data });

  const [currentProduct, setCurrentProduct] = React.useState<TProductBase | null>(null);
  const [isAddProduct, setIsAddProduct] = React.useState(false);
  const [menuId, setMenuId] = React.useState(0);

  const ref = React.useRef<any>();

  const run = ref.current?.reload;

  const addProductToMenuHandler = (datas: any) => {
    addProductInMenus(+datas.id!, datas)
      .then(() =>
        enqueueSnackbar(`Th??m th??nh c??ng`, {
          variant: 'success'
        })
      )
      .then(() => {
        setIsAddProduct(false);
        setCurrentProduct(null);
      })
      .then(run)
      .catch((err: { response: any }) => {
        const errMsg = get(err.response, ['data', 'message'], `C?? l???i x???y ra. Vui l??ng th??? l???i`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });
  };

  const updateProdInMenu = (values: any) =>
    updateProdInMenuInfo(Number(id)!, currentProduct?.product_id!, values)
      .then(() =>
        enqueueSnackbar(`C???p nh???t th??nh c??ng`, {
          variant: 'success'
        })
      )
      .then(() => {
        setIsAddProduct(false);
        setCurrentProduct(null);
      })
      .then(run)
      .catch((err: { response: any }) => {
        const errMsg = get(err.response, ['data', 'message'], `C?? l???i x???y ra. Vui l??ng th??? l???i`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();

  const { translate } = useLocales();

  const { data, isLoading, error } = useQuery(
    ['products', Number(id)],
    () => getProdById(Number(id)),
    {
      select: (res) => res.data
    }
  );

  const menuForm = useForm({
    defaultValues: data
  });

  const { reset: menuReset, handleSubmit: handleSubmitMenuForm } = menuForm;
  useEffect(() => {
    if (data) {
      const priceData = { ...data };
      for (let index = 0; index < 10; index++) {
        priceData[`price${index + 1}`] = data.price;
      }
      menuReset(priceData);
    }
  }, [menuReset, data]);

  const priceInputs = useMemo(() => {
    const inputs = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 10; index++) {
      inputs.push(
        <Grid key={`price_${index}`} item xs={6}>
          <InputField
            autoFocus
            type="number"
            name={`price${index + 1}`}
            label={`Gi?? ${index + 1}`}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
      );
    }
    return inputs;
  }, []);

  const defaultValues = {
    ...DEFAULT_VALUES,
    ...normalizeProductData(data)
  };

  const form = useForm<UpdateProductForm>({
    resolver: yupResolver(validationSchema),
    defaultValues
  });
  const { handleSubmit, reset } = form;

  React.useEffect(() => {
    if (data) {
      reset({ ...normalizeProductData(data) });
    }
  }, [data, reset]);

  const onSubmit = (values: UpdateProductForm) => {
    const data = transformDraftToStr(values);
    return updateProdById(Number(id), transformProductForm(data))
      .then((res) => {
        enqueueSnackbar(`C???p nh???t th??nh c??ng ${values.product_name}`, {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar(`C?? l???i x???y ra. Vui l??ng th??? l???i`, {
          variant: 'error'
        });
      });
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%'
        }}
        minHeight="40vh"
        borderRadius="1px"
        flexDirection="column"
        zIndex={999}
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%'
        }}
        minHeight="40vh"
        borderRadius="1px"
        flexDirection="column"
        zIndex={999}
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <EmptyContent title="Kh??ng t??m th???y s???n ph???m" />
      </Box>
    );
  }

  return (
    <FormProvider<UpdateProductForm> {...form}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            H???y
          </Button>
          <Button
            onClick={() => navigate(`${PATH_DASHBOARD.products.newProduct}?cloneProductId=${id}`)}
            variant="outlined"
          >
            Sao ch??p
          </Button>
          <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            L??u
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page
        title="C???p nh???t s???n ph???m"
        actions={() => [
          <ModalForm
            key="create-menu"
            title={<Typography variant="h3">Th??m V??o Menu</Typography>}
            trigger={
              <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
                Th??m v??o menu
              </Button>
            }
            onOk={async () => {
              try {
                await handleSubmitMenuForm(addProductToMenuHandler, (e) => {
                  throw e;
                })();
                return true;
              } catch (error) {
                return false;
              }
            }}
            maxWidth="lg"
          >
            <Stack spacing={4}>
              <FormProvider {...menuForm}>
                <SelectField
                  required
                  fullWidth
                  name="id"
                  label="Ch???n menu"
                  defaultValue=""
                  size="small"
                >
                  {menus?.map(({ menu_id, menu_name }: any) => (
                    <MenuItem value={Number(menu_id)} key={`cate_select_${menu_id}`}>
                      {menu_name}
                    </MenuItem>
                  ))}
                </SelectField>
                <DialogTitle>
                  {translate('common.create')} {data?.product_name} {translate('menu.store-menu')}
                </DialogTitle>
                <DialogContent>
                  <InputField name="product_id" sx={{ display: 'none' }} />
                  <CheckBoxField name="is_fixed_price" label="Gi?? c??? ?????nh" />
                  <Grid container py={2} spacing={2}>
                    {priceInputs}
                  </Grid>
                </DialogContent>
              </FormProvider>
            </Stack>
          </ModalForm>
        ]}
      >
        <MiddleForm updateMode={false} />
      </Page>
    </FormProvider>
  );
};

export default UpdateProduct;
