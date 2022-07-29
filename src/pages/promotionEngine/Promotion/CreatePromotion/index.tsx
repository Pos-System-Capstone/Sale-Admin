import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, Step, StepLabel, Stepper } from '@mui/material';
import promotionApi from 'api/promotion/promotion';
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
import { PATH_PROMOTION_APP } from 'routes/promotionAppPaths';
import { CreateComboForm } from 'types/product';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

interface Props {}
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
    console.log('values', values);
    const data = {
      promotionCode: values.promotionCode,
      promotionName: values.promotionName,
      brandId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      isAuto: values.automatic,
      exclusive: values.exclusive
    };
    const testPayload = {
      delFlg: true,
      insDate: '2022-07-29T09:19:29.543Z',
      updDate: '2022-07-29T09:19:29.543Z',
      promotionId: '2062d776-ca5c-4429-9652-e3a662bc8dfa',
      brandId: '2062d776-ca5c-4429-9652-e3a662bc8dfa',
      promotionCode: 'test 1',
      promotionName: 'test 1',
      actionType: 0,
      postActionType: 0,
      imgUrl: 'string',
      description: 'string',
      startDate: '2022-07-29T09:19:29.543Z',
      endDate: '2022-07-29T09:19:29.543Z',
      exclusive: 0,
      applyBy: 0,
      saleMode: 0,
      gender: 0,
      paymentMethod: 0,
      forHoliday: 0,
      forMembership: 0,
      dayFilter: 0,
      hourFilter: 0,
      status: 0,
      hasVoucher: true,
      isAuto: true,
      voucherGroupId: '2062d776-ca5c-4429-9652-e3a662bc8dfa',
      voucherQuantity: 0,
      conditionRuleId: '2062d776-ca5c-4429-9652-e3a662bc8dfa',
      promotionType: 0,
      promotionStoreMapping: [
        {
          delFlg: true,
          insDate: '2022-07-29T09:19:29.543Z',
          updDate: '2022-07-29T09:19:29.543Z',
          id: '2062d776-ca5c-4429-9652-e3a662bc8dfa',
          storeId: '2062d776-ca5c-4429-9652-e3a662bc8dfa',
          promotionId: '2062d776-ca5c-4429-9652-e3a662bc8dfa'
        }
      ],
      memberLevelMapping: [
        {
          id: '2062d776-ca5c-4429-9652-e3a662bc8dfa',
          memberLevelId: '2062d776-ca5c-4429-9652-e3a662bc8dfa',
          promotionId: '2062d776-ca5c-4429-9652-e3a662bc8dfa',
          insDate: '2022-07-29T09:19:29.543Z',
          updDate: '2022-07-29T09:19:29.543Z'
        }
      ]
    };
    promotionApi
      .createPromotion(testPayload)
      .then((res) => {
        enqueueSnackbar(`Tạo thành công ${values.promotionName}`, {
          variant: 'success'
        });
        navigate(PATH_PROMOTION_APP.promotion.root);
      })
      .catch((err) => {
        enqueueSnackbar(`${err}`, {
          variant: 'error'
        });
      });
  };
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
