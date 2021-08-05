/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useSnackbar } from 'notistack5';
import { ProductTypeEnum, TProductMaster } from 'types/product';
import { getCbn } from 'utils/utils';

import Page from '../../components/Page';
import MiddleForm from './components/MiddleForm';
import RightForm from './components/RightForm';
import { getProdById, updateProdById } from '../../redux/product/api';
import { PRODUCT_MASTER } from '../../constraints';
import { DashboardNavLayout } from '../../layouts/dashboard/DashboardNavbar';
import useDashboard from '../../hooks/useDashboard';
import LoadingAsyncButton from '../../components/LoadingAsyncButton/LoadingAsyncButton';
import { DEFAULT_VALUES, UpdateProductForm, validationSchema } from './type';
import { transformProductForm } from './utils';

const UpdateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();

  const { data, loading } = useRequest(() => getProdById(id), {
    formatResult: (res) => res.data
  });

  const form = useForm<UpdateProductForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      ...data,
      variants: [
        {
          optName: 'size',
          values: []
        }
      ]
    }
  });
  const { handleSubmit, reset } = form;

  React.useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data, reset]);

  const onSubmit = (values: UpdateProductForm) =>
    updateProdById(id, transformProductForm(values))
      .then((res) => {
        enqueueSnackbar(`Cập nhật thành công ${values.product_name}`, {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });

  if (loading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%'
        }}
        minHeight="40vh"
        borderRadius={1}
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

  return (
    <FormProvider<UpdateProductForm> {...form}>
      <DashboardNavLayout
        onOpenSidebar={() => setNavOpen(true)}
        sx={{
          backgroundColor: 'white',
          boxShadow: 1
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Hủy
          </Button>
          <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            Lưu
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="Tạo sản phẩm">
        <Box px={4}>
          <Typography variant="h3" component="h2" gutterBottom>
            Cập nhật sản phẩm
          </Typography>
        </Box>
        <Box display="flex" px={2}>
          <MiddleForm />
          <RightForm />
        </Box>
      </Page>
    </FormProvider>
  );
};

export default UpdateProduct;
