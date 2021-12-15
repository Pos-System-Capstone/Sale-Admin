/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Button, Card, Stack } from '@mui/material';
import { SelectField } from 'components/form';
import Label from 'components/Label';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
// components
import { useNavigate } from 'react-router-dom';
import { getStores } from 'redux/store/api';
import { PATH_DASHBOARD } from 'routes/paths';

const StoreListPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();

  const columns = [
    {
      title: translate('pages.stores.table.storeCode'),
      dataIndex: 'store_code'
    },
    {
      title: translate('pages.stores.table.name'),
      dataIndex: 'name'
    },
    {
      title: translate('pages.stores.table.shortName'),
      dataIndex: 'short_name',
      hideInSearch: true
    },
    {
      title: translate('pages.stores.table.openTime'),
      dataIndex: 'open_time',
      hideInSearch: true
    },
    {
      title: translate('pages.stores.table.closeTime'),
      dataIndex: 'close_time',
      hideInSearch: true
    },
    {
      title: translate('pages.stores.table.isAvailable'),
      dataIndex: 'is_available',
      render: (isAvai) => (
        <Label color={isAvai ? 'success' : 'default'}>
          {isAvai ? translate('common.available') : translate('common.notAvailable')}
        </Label>
      ),
      renderFormItem: () => (
        <SelectField
          fullWidth
          sx={{ minWidth: '150px' }}
          options={[
            {
              label: translate('common.all'),
              value: ''
            },
            {
              label: translate('common.available'),
              value: 'true'
            },
            {
              label: translate('common.notAvailable'),
              value: 'false'
            }
          ]}
          name="is-available"
          size="small"
          label={translate('pages.stores.table.isAvailable')}
        />
      )
    }
  ];

  return (
    <Page
      title={`${translate('pages.stores.listTitle')}`}
      actions={() => [
        <Button
          key="create-store"
          onClick={() => {
            navigate(PATH_DASHBOARD.stores.new);
          }}
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
        >
          {translate('pages.stores.addBtn')}
        </Button>
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoTable
            rowKey="id"
            onEdit={(stores) =>
              navigate(`${PATH_DASHBOARD.stores.root}/${stores.id}`, { state: stores })
            }
            getData={getStores}
            columns={columns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default StoreListPage;
