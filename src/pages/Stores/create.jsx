/* eslint-disable camelcase */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
import { Box, Button, Card, Stack, Typography } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack5';
import useLocales from 'hooks/useLocales';

import Page from 'components/Page';

import { createMasterProd } from 'redux/product/api';
import { DashboardNavLayout } from 'layouts/dashboard/DashboardNavbar';
import useDashboard from 'hooks/useDashboard';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { useTheme } from '@material-ui/styles';
import { CardTitle } from 'pages/Products/components/Card';
import StoreForm from './components/StoreForm';

import { storeSchemaBuilder } from './utils';

const CreateStorePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setNavOpen } = useDashboard();
  const navigate = useNavigate();
  const { translate } = useLocales();
  const theme = useTheme();

  const methods = useForm({
    resolver: yupResolver(storeSchemaBuilder(translate)),
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
              <StoreForm />
            </Card>
          </Box>
        </Box>
      </Page>
    </FormProvider>
  );
};

export default CreateStorePage;
