/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Avatar, Button, Card, Chip, Container, Stack, Typography } from '@material-ui/core';
// components
import { useNavigate } from 'react-router-dom';

import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import { getMenus } from 'redux/menu/api';
import { renderDayMenu } from 'utils/utils';
import { PATH_DASHBOARD } from 'routes/paths';

const columns = [
  {
    title: 'Tên',
    dataIndex: 'menu_name',
    fixed: 'left'
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'pic_url',
    render: (src, { name }) => (
      <Avatar alt={name} src={src} variant="square" style={{ width: '54px', height: '54px' }} />
    )
  },
  {
    title: 'Miêu tả',
    dataIndex: 'description'
  }
];

const CollectionListPage = () => {
  const navigate = useNavigate();
  return (
    <Page title="Dashboard: Bộ sưu tập | Sale Reso">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h4" gutterBottom>
            Bộ sưu tập
          </Typography>
          <Button
            onClick={() => {
              navigate(PATH_DASHBOARD.collections.new);
            }}
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
          >
            Thêm bộ sưu tập
          </Button>
        </Stack>
        <Card style={{ padding: '1em' }}>
          <Stack spacing={2}>
            <ResoTable
              onEdit={(menu) =>
                navigate(`${PATH_DASHBOARD.collections.root}/${menu.product_menu_id}`, {
                  state: menu
                })
              }
              rowKey="product_menu_in_store_id"
              getData={getMenus}
              columns={columns}
            />
          </Stack>
        </Card>
      </Container>
    </Page>
  );
};

export default CollectionListPage;
