import { Box, Button, Card, Grid, InputAdornment, Stack, Typography } from '@material-ui/core';
import { InputField, UploadImageField } from 'components/form';
import * as yup from 'yup';
import { CardTitle } from 'pages/Products/components/Card';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useLocales from 'hooks/useLocales';
import { TFunction } from 'i18next';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useNavigate } from 'react-router';
import useDashboard from 'hooks/useDashboard';
import { unionBy } from 'lodash';

import Page from 'components/Page';
import Icon from '@iconify/react';
import searchIcon from '@iconify/icons-eva/search-outline';
import EmptyContent from 'components/EmptyContent';
import ModalProductForm from 'components/ModalProductForm/ModalProductForm';
import AddProductTable from './AddProductTable';

const collectionSchema = (translate: TFunction) =>
  yup.object({
    name: yup.string().required(translate('common.required', { name: 'Bộ sưu tập' }))
  });

const CreateCollectionPage = () => {
  const { translate } = useLocales();
  const form = useForm({
    defaultValues: {
      name: '',
      thumbnail: '',
      description: ''
    },
    resolver: yupResolver(collectionSchema(translate))
  });
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isDirty, errors }
  } = form;

  const onSubmit = (values: any) => console.log(`values`, values);

  const [products, setProducts] = useState([
    {
      product_id: 1,
      pic_url: null,
      product_name: 'Coca cola'
    }
  ]);

  const handleRemoveProd = (prodId: number) => {
    setProducts((prev) => prev.filter(({ product_id }) => product_id !== prodId));
  };

  const handleAddProd = (ids: number[], selectedProds: any[]) => {
    const allSelectedProds = unionBy(products, selectedProds, 'product_id');
    const updateSelectedProds = allSelectedProds.filter(({ product_id }: { product_id: number }) =>
      ids.includes(product_id)
    );
    setProducts(updateSelectedProds);
  };

  return (
    <Page title="Tạo bộ sưu tập">
      <Box px={4}>
        <Typography variant="h3" component="h2" gutterBottom>
          Cập nhật sản phẩm
        </Typography>
      </Box>
      <Box px={2}>
        <FormProvider {...form}>
          <DashboardNavLayout
            onOpenSidebar={() => setNavOpen(true)}
            sx={{
              backgroundColor: 'white',
              boxShadow: 1
            }}
          >
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
              <CardTitle mb={2} variant="subtitle1">
                Thông tin
              </CardTitle>
              <Grid spacing={2} container>
                <Grid item xs={4}>
                  <Card>
                    <UploadImageField.Avatar label="Hình ảnh" name="thumbnail" />
                  </Card>
                </Grid>
                <Grid item xs={8}>
                  <Stack spacing={2}>
                    <InputField fullWidth required name="name" label="Tên bộ sưu tập" />
                    <InputField rows={4} multiline fullWidth name="description" label="Miêu tả" />
                  </Stack>
                </Grid>
              </Grid>
            </Card>
            <Card>
              <CardTitle mb={2} variant="subtitle1">
                Sản phẩm
              </CardTitle>
              <Stack spacing={1} direction="row">
                <InputField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon icon={searchIcon} />
                      </InputAdornment>
                    )
                  }}
                  name="search"
                  label="Tìm sản phẩm"
                  fullWidth
                  size="small"
                />
                <ModalProductForm
                  selected={products?.map(({ product_id }) => product_id)}
                  onSubmit={handleAddProd}
                  trigger={<Button variant="outlined">Thêm</Button>}
                />
              </Stack>
              <Box mt={2}>
                {!products?.length ? (
                  <EmptyContent title="Chưa có sản phẩm nào được thêm" />
                ) : (
                  <AddProductTable onRemove={handleRemoveProd} data={products} />
                )}
              </Box>
            </Card>
          </Stack>
        </FormProvider>
      </Box>
    </Page>
  );
};

export default CreateCollectionPage;
