/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { Box, Button, Stack, Typography, useTheme } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack5';

import Page from '../../components/Page';

import MiddleForm from './components/MiddleForm';
import RightForm from './components/RightForm';
import { PRODUCT_MASTER } from '../../constraints';
import { createMasterProd } from '../../redux/product/api';
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

const CreateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      product_name: '',
      product_code: '',
      thumbnail: '',
      category_id: '',
      description: '',
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
          menuId: ''
        }
      ],
      collection_id: [],
      tag_id: [],
      seo: {
        title: '',
        link: '',
        description: ''
      }
    }
  });
  const { handleSubmit } = methods;

  const onSubmit = (values) => {
    console.log(`values`, values);

    const transformData = { ...values };

    // transformData.attributes = values.variants?.reduce((acc, { values }) => acc.concat(values), []);

    return createMasterProd(transformData)
      .then((res) => {
        enqueueSnackbar(`Tạo thành công ${values.product_name}`, {
          variant: 'success'
        });
      })
      .catch((err) => {
        enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
          variant: 'error'
        });
      });
  };

  return (
    <FormProvider {...methods}>
      <DashboardNavLayout
        onOpenSidebar={() => setNavOpen(true)}
        sx={{
          backgroundColor: theme.palette.background.paper,
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
        <Box px={2} mx="auto">
          <Typography px={1} variant="h3" component="h4" gutterBottom>
            Tạo dòng sản phẩm
          </Typography>
          <Box display="flex">
            <MiddleForm />
            <RightForm />
          </Box>
        </Box>
      </Page>
    </FormProvider>
  );
};

export default CreateProduct;
