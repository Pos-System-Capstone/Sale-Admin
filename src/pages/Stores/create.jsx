/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { Box, Button, Card, Grid, Stack, Typography } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack5';
import useLocales from 'hooks/useLocales';
import { CardTitle } from 'pages/Products/components/Card';
import { InputField, SelectField, SwitchField, TimePickerField } from 'components/form';

import Page from 'components/Page';

import { createMasterProd } from 'redux/product/api';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import useDashboard from 'hooks/useDashboard';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';

const validationSchema = (translate) =>
  yup.object({
    store_code: yup
      .string()
      .required(translate('common.required', { name: translate('pages.stores.table.storeCode') })),
    name: yup
      .string()
      .required(translate('common.required', { name: translate('pages.stores.table.name') }))
  });

const CreateStorePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const { translate } = useLocales();

  const methods = useForm({
    resolver: yupResolver(validationSchema(translate)),
    defaultValues: {}
  });
  const { handleSubmit } = methods;

  const onSubmit = (values) => {
    console.log(`values`, values);

    const transformData = { ...values };

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

  const fieldSetting = {
    fullWidth: true,
    size: 'small'
  };

  return (
    <FormProvider {...methods}>
      <DashboardNavLayout
        onOpenSidebar={() => setNavOpen(true)}
        sx={{
          backgroundColor: 'white',
          boxShadow: 1
        }}
      >
        <Stack direction="row" spacing={2}>
          <Button onClick={() => navigate(-1)} variant="outlined">
            {translate('common.cancel')}
          </Button>
          <LoadingAsyncButton onClick={handleSubmit(onSubmit)} type="submit" variant="contained">
            {translate('common.save')}
          </LoadingAsyncButton>
        </Stack>
      </DashboardNavLayout>
      <Page title="Tạo sản phẩm">
        <Box px={2} mx="auto">
          <Typography px={1} variant="h3" component="h4" gutterBottom>
            {translate('pages.stores.addBtn')}
          </Typography>
          <Box display="flex">
            <Card>
              <CardTitle>{translate('pages.stores.storeInfoTitle')}</CardTitle>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <SwitchField
                    name="is_available"
                    label={
                      <Typography variant="caption">{translate('common.available')}</Typography>
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6} />
                <Grid item xs={12} sm={6}>
                  <InputField
                    {...fieldSetting}
                    required
                    name="store_code"
                    label={translate('pages.stores.table.storeCode')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    {...fieldSetting}
                    name="name"
                    required
                    label={translate('pages.stores.table.name')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    {...fieldSetting}
                    name="short-name"
                    label={translate('pages.stores.table.shortName')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SelectField
                    {...fieldSetting}
                    name="type"
                    label={translate('pages.stores.table.type')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TimePickerField
                    {...fieldSetting}
                    name="open_time"
                    label={translate('pages.stores.table.openTime')}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TimePickerField
                    {...fieldSetting}
                    name="close_time"
                    label={translate('pages.stores.table.closeTime')}
                  />
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Box>
      </Page>
    </FormProvider>
  );
};

export default CreateStorePage;
