import { Box, Button, Stack, Tab, Tabs, Typography } from '@material-ui/core';
import React from 'react';
import { Icon } from '@iconify/react';
import { get } from 'lodash-es';
import { useSnackbar } from 'notistack5';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';

import { FormProvider, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import { addProductInMenus, updateMenuInfo } from 'redux/menu/api';
import Page from 'components/Page';
import { convertDateToStr, convertStrToDate } from 'utils/utils';
import MenuInfoTab from './tabs/MenuInfoTab';
import ProductInMenuTab from './tabs/ProductInMenuTab';

const UpdateMenuPage = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [currentTab, setCurrentTab] = React.useState('Thông tin chung');
  const ref = React.useRef();
  const { enqueueSnackbar } = useSnackbar();

  const form = useForm({
    defaultValues: {
      ...state,
      from: convertStrToDate(get(state, ['time_from_to', '0'], null), 'HH:mm').toDate(),
      to: convertStrToDate(get(state, ['time_from_to', '1'], null), 'HH:mm').toDate()
    }
  });

  const onUpdateMenu = (updateMenu) => {
    updateMenu.time_from_to = [
      convertDateToStr(updateMenu.from, 'HH:mm'),
      convertDateToStr(updateMenu.to, 'HH:mm')
    ];

    return updateMenuInfo(id, updateMenu)
      .then(() =>
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        })
      )
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variantF: 'error'
        });
      });
  };

  const addProductToMenu = (datas) =>
    addProductInMenus(id, datas)
      .then(() =>
        enqueueSnackbar(`Thêm thành công`, {
          variant: 'success'
        })
      )
      .then(() => ref?.current?.reload())
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const MENU_TABS = [
    {
      value: 'Thông tin chung',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <MenuInfoTab onSubmit={form.handleSubmit(onUpdateMenu)} />
    },
    {
      value: 'Sản phẩm',
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <ProductInMenuTab id={id} ref={ref} onAddProduct={addProductToMenu} />
    }
  ];

  return (
    <FormProvider {...form}>
      <Page title="Cập nhật thực đơn">
        <Box px={2} mx="auto">
          <Stack mb={2} direction="row" justifyContent="space-between">
            <Typography px={1} variant="h3" component="h4" gutterBottom>
              Cập nhật thực đơn
            </Typography>
            <Button color="error" variant="outlined">
              Xóa
            </Button>
          </Stack>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => setCurrentTab(value)}
          >
            {MENU_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={tab.value}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Box mt={2}>
            {MENU_TABS.map((tab) => {
              const isMatched = tab.value === currentTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
          </Box>
        </Box>
      </Page>
    </FormProvider>
  );
};

export default UpdateMenuPage;
