/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Stack, Typography, useTheme } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ProductTypeEnum } from 'types/product';
import LoadingAsyncButton from '../../components/LoadingAsyncButton/LoadingAsyncButton';
import Page from '../../components/Page';
import useDashboard from '../../hooks/useDashboard';
import { DashboardNavLayout } from '../../layouts/dashboard/DashboardNavbar';
import { createMasterProd } from '../../redux/product/api';
import MiddleForm from './components/MiddleForm';
import { UpdateProductForm, validationSchema } from './type';
import { normalizeDraftEdtior, transformProductForm } from './utils';

const CreateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const theme = useTheme();

  const methods = useForm<UpdateProductForm & any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      tags: [],
      category: '5',
      description: ''
    }
  });
  const { handleSubmit } = methods;

  const onSubmit = (values: UpdateProductForm) => {
    const data = normalizeDraftEdtior(values);
    data.product_type = data.hasVariant ? ProductTypeEnum.General : ProductTypeEnum.Single;
    return createMasterProd(transformProductForm(data))
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
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
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
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
          <Typography px={1} variant="h3" component="h4" gutterBottom>
            Tạo dòng sản phẩm
          </Typography>
          <Box display="flex">
            <MiddleForm />
            {/* <RightForm /> */}
          </Box>
        </Container>
      </Page>
    </FormProvider>
  );
};

export default CreateProduct;
