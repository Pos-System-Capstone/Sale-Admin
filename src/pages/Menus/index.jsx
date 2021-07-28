/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Chip, Container, Stack, Typography } from '@material-ui/core';
// components
import { useNavigate } from 'react-router-dom';

import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import { getMenus } from 'redux/menu/api';
import { renderDayMenu } from 'utils/utils';

const columns = [
  {
    title: 'Tên thực đơn',
    dataIndex: 'menu_name',
    fixed: 'left'
  },
  {
    title: 'Ngày áp dụng',
    dataIndex: 'day_filter',
    render: (days) => renderDayMenu(days)?.map((day) => <Chip key={day} label={day} />)
  },
  {
    title: 'Thời gian áp dụng',
    dataIndex: 'time_from_to',
    render: (time_from_to = []) => {
      if (!time_from_to) return <span>-</span>;
      const [from, to] = time_from_to;
      return (
        <span>
          {from}-{to}
        </span>
      );
    }
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
              onEdit={(menu) => navigate(`/menus/${menu.menu_id}`, { state: menu })}
              getData={getMenus}
              columns={columns}
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
};

export default MenusPage;
