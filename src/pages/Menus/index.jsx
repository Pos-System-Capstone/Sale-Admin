/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Container, Stack, Typography } from '@material-ui/core';
import { SelectField } from 'components/form';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import { useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { getMenus } from 'redux/menu/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { daysInWeek } from 'utils/utils';
import MenuSearchForm from './components/MenuSearchForm';

export const menuColumns = [
  {
    title: 'Tên thực đơn',
    dataIndex: 'menu_name',
    fixed: 'left'
  },

  {
    title: 'Ngày hoạt động',
    hideInTable: true,
    renderFormItem: (_, formProps) => (
      <SelectField
        options={[
          {
            label: 'Tất cả',
            value: null
          },
          ...daysInWeek.map((label, index) => ({
            label,
            value: index
          }))
        ]}
        multiple
        fullWidth
        {...formProps}
        size="small"
        name="day-filters"
      />
    )
  }
];

const MenusPage = () => {
  const navigate = useNavigate();
  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Thực đơn
          </Typography>
          <Button
            onClick={() => {
              navigate('/menus/create');
            }}
            variant="contained"
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Thêm Thực đơn
          </Button>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <ResoTable
              rowKey="menu_id"
              onEdit={(menu) =>
                navigate(`${PATH_DASHBOARD.menus.root}/${menu.menu_id}`, { state: menu })
              }
              getData={getMenus}
              columns={menuColumns}
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
};

export default MenusPage;
