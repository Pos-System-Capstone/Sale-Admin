/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProductTypeEnum } from 'types/product';
import LoadingAsyncButton from '../../components/LoadingAsyncButton/LoadingAsyncButton';
import Page from '../../components/Page';
import useDashboard from '../../hooks/useDashboard';
import { DashboardNavLayout } from '../../layouts/dashboard/DashboardNavbar';
import { createMasterProd } from '../../redux/product/api';
import MiddleForm from './components/MiddleForm';
import { UpdateProductForm, validationSchema } from './type';
import { transformDraftToStr, transformProductForm } from './utils';

const CreateProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const productType: any = Number(searchParams.get('productType') ?? ProductTypeEnum.Single);

  const methods = useForm<UpdateProductForm & any>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      tags: [],
      category: '5',
      description: '',
      product_type: productType
    }
  });
  const { handleSubmit } = methods;

  const onSubmit = (values: UpdateProductForm) => {
    const data = transformDraftToStr(values);
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
        <Box display="flex">
          <MiddleForm />
        </Box>
      </Page>
    </FormProvider>
  );
};

export default CreateProduct;
