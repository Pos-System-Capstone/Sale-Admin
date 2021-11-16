import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  Container,
  CircularProgress,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import categoryApi from 'api/category';
import CategoryForm from 'components/form/common/Category/CategoryForm';
import SeoForm from 'components/form/Seo/SeoForm';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import { EditorState } from 'draft-js';
import useCategory from 'hooks/categories/useCategory';
import useDashboard from 'hooks/useDashboard';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import { normalizeDraftEdtior, transformDraftEdtior } from 'pages/Products/utils';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { TCategory } from 'types/category';
import * as yup from 'yup';

interface Props {}

const schema = yup.object({
  cate_name: yup.string().required('Vui lòng nhập tên phân mục')
});

const UpdateCategory = (props: Props) => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const theme = useTheme();

  const { data: category, isLoading } = useCategory(Number(id));

  const updateCategoryForm = useForm<TCategory>({
    resolver: yupResolver(schema),
    defaultValues: {
      description: EditorState.createEmpty(),
      parent_cate_id: null
    }
  });

  useEffect(() => {
    if (!category) return;
    updateCategoryForm.reset(category);
    console.log(`reset`);
  }, [category, updateCategoryForm]);

  const onSubmit = (values: TCategory) => {
    console.log(`data`, values);
    return categoryApi
      .update(id, normalizeDraftEdtior(values))
      .then((res) => {
        enqueueSnackbar(`Cập nhật thành công`, {
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
    <FormProvider {...updateCategoryForm}>
      <DashboardNavLayout onOpenSidebar={() => setNavOpen(true)}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            Hủy
          </Button>
          <LoadingAsyncButton
            onClick={updateCategoryForm.handleSubmit(onSubmit)}
            type="submit"
            variant="contained"
          >
            Lưu
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="Cập nhật phân mục">
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
          <Typography px={1} variant="h3" component="h4" gutterBottom>
            Cập nhật phân mục
          </Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Stack spacing={2}>
              <Card>
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
          )}
        </Container>
      </Page>
    </FormProvider>
  );
};

export default UpdateCategory;
