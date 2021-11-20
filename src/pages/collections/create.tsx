import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Grid, MenuItem, Slider, Stack, Typography } from '@mui/material';
import EmptyContent from 'components/EmptyContent';
import { InputField, SelectField, UploadImageField } from 'components/form';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import ModalProductForm from 'components/ModalProductForm/ModalProductForm';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import useLocales from 'hooks/useLocales';
import { TFunction } from 'i18next';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { get, unionBy } from 'lodash';
import { useSnackbar } from 'notistack';
import { CardTitle } from 'pages/Products/components/Card';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { createCollection } from 'redux/collections/api';
import { RootState } from 'redux/store';
import { CollectionTypeEnum, TCollection } from 'types/collection';
import * as yup from 'yup';
import AddProductTable from './AddProductTable';

const marks = [
  {
    value: 0,
    label: 'Đầu tiền'
  },
  {
    value: 100,
    label: 'Cuối cùng'
  }
];

const CreateCollectionPage = () => {
  const { translate } = useLocales();
  const [searchParams] = useSearchParams();
  const type: any = Number(searchParams.get('type') ?? CollectionTypeEnum.MenuCollection);
  const isMenuCollection = type === CollectionTypeEnum.MenuCollection;

  const collectionSchema = (translate: TFunction) =>
    yup.object({
      name: yup.string().required(translate('common.required', { name: 'Bộ sưu tập' })),
      store_id: yup
        .number()
        .typeError(translate('common.required', { name: 'Cửa hàng' }))
        .required(translate('common.required', { name: 'Cửa hàng' })),
      products: yup
        .array()
        .min(isMenuCollection ? 0 : 1, 'Vui lòng có ít nhất một sản phẩm')
        .of(
          yup.object().shape({
            position: yup.string().required('Vui lòng chọn giá trị')
          })
        )
    });

  const form = useForm<Partial<TCollection & { products: any[] }>>({
    defaultValues: {
      name: '',
      banner_url: '',
      description: '',
      products: [],
      type
    },
    resolver: yupResolver(collectionSchema(translate))
  });
  const { setNavOpen } = useDashboard();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { stores } = useSelector((state: RootState) => state.admin);

  const {
    handleSubmit,
    formState: { isDirty },
    watch,
    setValue,
    control
  } = form;

  const products = watch('products');
  const setProducts = (products: any[]) => {
    setValue('products', products);
  };

  const onSubmit = (values: any) =>
    createCollection(values)
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

  const handleAddProd = (ids: number[], selectedProds: any[]) => {
    const allSelectedProds = unionBy(products, selectedProds, 'product_id');
    const updateSelectedProds = allSelectedProds.filter(({ product_id }: { product_id: number }) =>
      ids.includes(product_id)
    );
    setProducts([...updateSelectedProds]);
  };

  return (
    <Page title={isMenuCollection ? 'Tạo bộ sưu tập' : 'Tạo nhóm sản phẩm'}>
      <Box px={2} pb={2}>
        <Typography variant="h3" component="h2" gutterBottom>
          {isMenuCollection
            ? translate('collections.createInfo')
            : translate('collections.groupCollection')}
        </Typography>
      </Box>
      <Box px={2}>
        <FormProvider {...form}>
          <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
            <Stack direction="row" spacing={2}>
              <Button onClick={() => navigate(-1)} variant="outlined">
                {translate('common.cancel')}
              </Button>
              <LoadingAsyncButton
                disabled={!isDirty}
                onClick={handleSubmit(onSubmit, console.log)}
                type="submit"
                variant="contained"
              >
                {translate('common.save')}
              </LoadingAsyncButton>
            </Stack>
          </DashboardNavLayout>
          <Stack spacing={2}>
            <Card>
              <CardTitle pb={2} variant="subtitle1">
                {isMenuCollection
                  ? translate('collections.createInfo')
                  : translate('collections.groupCollection')}
              </CardTitle>
              <Box>
                <Grid spacing={2} container>
                  <Grid item xs={4}>
                    <UploadImageField.Avatar
                      label={translate('collections.table.banner_url')}
                      name="banner_url"
                      style={{ margin: '0 auto 40px' }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <InputField
                          size="small"
                          fullWidth
                          name="name"
                          label={translate('collections.table.collectionName')}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputField
                          size="small"
                          fullWidth
                          name="name_eng"
                          label={translate('collections.table.collectionNameEn')}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <SelectField
                          fullWidth
                          label={translate('collections.table.store')}
                          size="small"
                          name="store_id"
                        >
                          {stores?.map(({ id, name }: any) => (
                            <MenuItem value={Number(id)} key={`cate_select_${id}`}>
                              {name}
                            </MenuItem>
                          ))}
                        </SelectField>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputField
                          size="small"
                          rows={4}
                          multiline
                          fullWidth
                          name="description"
                          label={translate('collections.table.description')}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography gutterBottom>
                          {translate('collections.table.position')}
                        </Typography>
                        <Box px={4}>
                          <Controller
                            name="position"
                            render={({ field }) => (
                              <Slider
                                sx={{ width: '100%' }}
                                aria-label="Custom marks"
                                defaultValue={0}
                                step={1}
                                valueLabelDisplay="auto"
                                marks={marks}
                                {...field}
                              />
                            )}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Card>
            <Card>
              <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
                <CardTitle mb={2} variant="subtitle1">
                  {translate('collections.productInCollection')}
                </CardTitle>
                <ModalProductForm
                  selected={products?.map(({ product_id }) => product_id)}
                  onSubmit={handleAddProd}
                  trigger={<Button variant="outlined">Thêm sản phẩm</Button>}
                />
              </Stack>
              <Box mt={2}>
                <AddProductTable control={control} />
              </Box>
            </Card>
          </Stack>
        </FormProvider>
      </Box>
    </Page>
  );
};

export default CreateCollectionPage;
