import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, Container, Stack, Typography, useTheme } from '@mui/material';
import categoryApi from 'api/category';
import CategoryForm from 'components/form/common/Category/CategoryForm';
import SeoForm from 'components/form/Seo/SeoForm';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useDashboard from 'hooks/useDashboard';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import {
  normalizeDraftEdtior,
  normalizeProductData,
  transformProductForm
} from 'pages/Products/utils';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { TCategory } from 'types/category';
import * as yup from 'yup';

interface Props {}

const schema = yup.object({
  cate_name: yup.string().required('Vui lòng nhập tên phân mục')
});

const CreateCategory = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const theme = useTheme();

  const createCategoryForm = useForm<TCategory>({
    resolver: yupResolver(schema),
    defaultValues: {}
  });

  const onSubmit = (values: TCategory) => {
    console.log(`data`, values);
    const data = transformProductForm(normalizeDraftEdtior(values));
    return categoryApi
      .create(data)
      .then((res) => {
        enqueueSnackbar(`Tạo thành công`, {
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
    <FormProvider {...createCategoryForm}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Hủy
          </Button>
          <LoadingAsyncButton
            onClick={createCategoryForm.handleSubmit(onSubmit)}
            type="submit"
            variant="contained"
          >
            Lưu
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="Tạo sản phẩm">
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
          <Stack spacing={2}>
            <Card>
              <Typography px={1} variant="h3" component="h4" gutterBottom>
                Tạo phân mục
              </Typography>
              <Box>
                <CategoryForm />
              </Box>
            </Card>
            <Card>
              <Box>
                <SeoForm />
              </Box>
            </Card>
          </Stack>
        </Container>
      </Page>
    </FormProvider>
  );
};

export default CreateCategory;
