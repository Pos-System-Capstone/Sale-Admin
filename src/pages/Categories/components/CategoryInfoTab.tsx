import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Box, CircularProgress, Button, Stack } from '@mui/material';
import categoryApi from 'api/category';
import CategoryForm from 'components/form/common/Category/CategoryForm';
import SeoForm from 'components/form/Seo/SeoForm';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { EditorState } from 'draft-js';
import useCategory from 'hooks/categories/useCategory';
import useDashboard from 'hooks/useDashboard';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import { transformDraftToStr } from 'pages/Products/utils';
import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { TCategory } from 'types/category';
import * as yup from 'yup';

interface Props {}

const schema = yup.object({
  cate_name: yup.string().required('Vui lòng nhập tên phân mục')
});

const CategoryInfoTab = (props: Props) => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();

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
      .update(id, transformDraftToStr(values))
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
    </FormProvider>
  );
};

export default CategoryInfoTab;
