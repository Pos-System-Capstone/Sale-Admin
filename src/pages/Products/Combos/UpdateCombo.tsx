import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import { DraftEditorField } from 'components/form';
import SeoForm from 'components/form/Seo/SeoForm';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useProduct from 'hooks/products/useProduct';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { getComboById, updateProdById } from 'redux/product/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { CombinationModeEnum, CreateComboForm } from 'types/product';
import { CardTitle } from '../components/Card';
import BasicProductInfoForm from '../components/form/BasicProductInfoForm';
import CategoryTreeForm from '../components/form/CategoryTreeForm';
import ProductImagesForm from '../components/form/ProductImagesForm';
import { validationSchema } from '../type';
import { normalizeProductCombo, transformComboForm, transformDraftToStr } from '../utils';
import ChoiceGroupComboForm from './components/form/ChoiceGroupComboForm';

interface Props {}
const STEPS = ['Thông tin', 'Nhóm sản phẩm'];

const UpdateCombo = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { comboId } = useParams();

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const { data: combo } = useQuery(['combo', Number(comboId)], () =>
    getComboById(Number(comboId)).then((res) => res.data)
  );

  console.log(combo);

  const createComboForm = useForm({
    defaultValues: {
      ...combo
    },
    resolver: activeStep === 0 ? yupResolver(validationSchema) : undefined
  });
  const { data: product, isLoading } = useProduct(Number(comboId), {
    select: (res) => normalizeProductCombo(res as any),
    onSuccess: (res) => {
      console.log(`res`, res);
      createComboForm.reset(res as CreateComboForm);
    },
    staleTime: Infinity
  });
  React.useEffect(() => {
    if (product) {
      createComboForm.reset(product as CreateComboForm);
    }
  }, [product]);
  const { handleSubmit } = createComboForm;

  const onSubmit = (values: any) => {
    const data = transformDraftToStr(values);
    return updateProdById(
      Number(comboId),
      transformComboForm(data, CombinationModeEnum.ChoiceCombo)
    )
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

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <FormProvider {...createComboForm}>
      <DashboardNavLayout>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => navigate(`${PATH_DASHBOARD.combos.new}?cloneProductId=${comboId}`)}
            variant="outlined"
          >
            Sao chép
          </Button>
          {activeStep !== 0 && (
            <Button onClick={() => setActiveStep(activeStep - 1)}>Quay lại</Button>
          )}
          {activeStep !== STEPS.length - 1 && (
            <Button
              variant="contained"
              onClick={async () => {
                const valid = await createComboForm.trigger();
                console.log(`valid`, valid);
                if (valid) setActiveStep((prev) => prev + 1);
              }}
            >
              Tiếp tục
            </Button>
          )}
          {activeStep === STEPS.length - 1 && (
            <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
              Lưu
            </LoadingAsyncButton>
          )}
        </Stack>
      </DashboardNavLayout>
      <Page title="Cập nhật combo">
        <Container maxWidth="lg" sx={{ mx: 'auto' }}>
          <Box py={2}>
            <Stepper alternativeLabel activeStep={activeStep}>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-label': {
                        typography: 'subtitle2',
                        color: 'text.disabled'
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box display="flex">
            {activeStep === 0 && (
              <Stack p={1} spacing={3}>
                <Card id="product-detail">
                  <Stack spacing={2} textAlign="left">
                    <CardTitle mb={2} variant="subtitle1">
                      Thông tin sản phẩm
                    </CardTitle>
                    <BasicProductInfoForm />
                    <Box>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography my={2} variant="subtitle2">
                          Danh mục chứa sản phẩm
                        </Typography>
                      </Stack>
                    </Box>
                    <CategoryTreeForm />
                  </Stack>
                </Card>

                <Card>
                  <CardTitle mb={2} variant="subtitle1">
                    Mô tả
                  </CardTitle>
                  <Controller
                    name="description"
                    render={({ field }) => (
                      <DraftEditorField value={field.value} onChange={field.onChange} />
                    )}
                  />
                </Card>

                <Card>
                  <ProductImagesForm />
                </Card>

                <Card id="seo">
                  <CardTitle mb={2} variant="subtitle1">
                    SEO
                  </CardTitle>
                  <Box textAlign="left">
                    <SeoForm />
                  </Box>
                </Card>
              </Stack>
            )}
            {activeStep === 1 && (
              <Stack width="100%">
                <Card>
                  <ChoiceGroupComboForm />
                </Card>
              </Stack>
            )}
          </Box>
        </Container>
      </Page>
    </FormProvider>
  );
};

export default UpdateCombo;
