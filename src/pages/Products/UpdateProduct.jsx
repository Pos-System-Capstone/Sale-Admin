/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Button, CircularProgress, Stack, Typography } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { useSnackbar } from 'notistack5';

import Page from '../../components/Page';
import MiddleForm from './components/MiddleForm';
import RightForm from './components/RightForm';
import { getProdById, updateProdById } from '../../redux/product/api';
import { PRODUCT_MASTER } from '../../constraints';
import { DashboardNavLayout } from '../../layouts/dashboard/DashboardNavbar';
import useDashboard from '../../hooks/useDashboard';
import LoadingAsyncButton from '../../components/LoadingAsyncButton/LoadingAsyncButton';

const validationSchema = yup.object({
  product_code: yup.string('Nhập mã sản phẩm').required('Vui lòng nhập mã sản phẩm'),
  product_name: yup.string('Nhập tên sản phẩm').required('Vui lòng nhập tên sản phẩm')
  // menus: yup
  //   .array()
  //   .of(
  //     yup.object().shape({
  //       price: yup.number('Nhập giá').required('Nhập giá'), // these constraints take precedence
  //       menuId: yup.number('Chọn menu').required('Chọn menu').typeError('Vui lòng chọn menu') // these constraints take precedence
  //     })
  //   )
  //   .required('Vui lòng chọn 1 bảng giá') // these constraints are shown if and only if inner constraints are satisfied
  //   .min(1, 'Ít nhất 1 bảng giá')
});

const DEFAULT_VALUES = {
  product_name: '',
  product_code: '',
  thumbnail: '',
  category_id: null,
  description: null,
  product_type_id: PRODUCT_MASTER,
  is_available: true,
  variants: [
    {
      optName: 'size',
      values: []
    }
  ],
  menus: [
    {
      price: 0,
      menuId: null
    }
  ],
  collection_id: [],
  tag_id: [],
  seo: {
    title: null,
    link: null,
    description: null
  }
};

const UpdateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();

  const { data, loading } = useRequest(() => getProdById(id), {
    formatResult: (res) => res.data?.data[0]
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: { ...DEFAULT_VALUES, ...data }
  });
  const { handleSubmit, reset } = form;

  React.useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data, reset]);

  const onSubmit = (values) => {
    console.log(`values`, values);

    const transformData = { ...values };

    // transformData.attributes = values.variants?.reduce((acc, { values }) => acc.concat(values), []);

    return updateProdById(id, transformData)
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
  };

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
            Tạo dòng sản phẩm
          </Typography>
        </Box>
        <Box display="flex" px={2}>
          <MiddleForm />
          <RightForm handleSubmit={handleSubmit(onSubmit)} />
        </Box>
      </Page>
    </FormProvider>
  );
};

export default UpdateProduct;
