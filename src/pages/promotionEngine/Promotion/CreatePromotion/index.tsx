import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, Step, StepLabel, Stepper } from '@mui/material';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import Page from 'components/Page';
import useProduct from 'hooks/products/useProduct';
import useLocales from 'hooks/useLocales';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import { useSnackbar } from 'notistack';
import { validationSchema } from 'pages/Products/type';
import { normalizeProductCombo } from 'pages/Products/utils';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CreateComboForm } from 'types/product';
import { targetCustomerList } from '../components/config';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

interface Props {}
// const STEPS = ['Select promotion type', 'Setting', 'Save & Finish'];
const CreatePromotion = (props: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { translate } = useLocales();
  const [searchParams] = useSearchParams();
  const cloneProductId: any = searchParams.get('cloneProductId');

  const STEPS = [
    `${translate('promotionSystem.promotion.selectPromotionType')}`,
    `${translate('promotionSystem.promotion.setting')}`,
    `${translate('promotionSystem.promotion.saveAndFinish')}`
  ];
  const [activeStep, setActiveStep] = useState(0);

  const createComboForm = useForm({
    resolver: activeStep === 0 ? yupResolver(validationSchema) : undefined
  });

  const { data, isLoading } = useProduct(Number(cloneProductId), {
    select: (res) => normalizeProductCombo(res as any),
    onSuccess: (res) => {
      console.log(`res`, res);
      createComboForm.reset(res as CreateComboForm);
    },
    enabled: Boolean(cloneProductId),
    staleTime: Infinity
  });

  const onSubmit = (values: any) => {
    // return createMasterProd(transformComboForm(values, CombinationModeEnum.ChoiceCombo))
    //   .then((res) => {
    //     enqueueSnackbar(`Tạo thành công ${values.product_name}`, {
    //       variant: 'success'
    //     });
    //     navigate(`${PATH_DASHBOARD.combos.editById(res.data)}`);
    //   })
    //   .catch((err) => {
    //     enqueueSnackbar(`Có lỗi xảy ra. Vui lòng thử lại`, {
    //       variant: 'error'
    //     });
    //   });
    console.log(values);
  };
  const targetCustomer = targetCustomerList();
  const { handleSubmit, watch } = createComboForm;
  // targetCustomer[1] = member
  return (
    <FormProvider {...createComboForm}>
      <DashboardNavLayout>
        <Stack direction="row" spacing={2}>
          {activeStep !== 0 && (
            <Button onClick={() => setActiveStep(activeStep - 1)}>
              {translate('promotionSystem.promotion.back')}
            </Button>
          )}
          {activeStep !== STEPS.length - 1 && (
            <Button
              variant="contained"
              onClick={async () => {
                setActiveStep((prev) => prev + 1);
              }}
            >
              {translate('promotionSystem.promotion.next')}
            </Button>
          )}
          {activeStep === STEPS.length - 1 && (
            <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
              {translate('promotionSystem.promotion.save')}
            </LoadingAsyncButton>
          )}
        </Stack>
      </DashboardNavLayout>
      <Page title={`${translate('promotionSystem.promotion.createPromotion.createPromotion')}`}>
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
          {activeStep === 0 && <StepOne watch={watch} />}
          {activeStep === 1 && <StepTwo watch={watch} />}
          {activeStep === 2 && <StepThree watch={watch} />}
        </Box>
      </Page>
    </FormProvider>
  );
};

export default CreatePromotion;
