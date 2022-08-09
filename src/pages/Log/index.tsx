/* eslint-disable camelcase */
import { Visibility } from '@mui/icons-material';
// material
import { Card, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import logApi from 'api/log';
import AutocompleteStore from 'components/form/common/report/AutocompleteStore';
// import logApi from 'api/log';
// import AutoCompleteStoreSelect from 'components/form/common/AutocompleteStoreSelect/AutocompleteStoreSelect';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import { useState } from 'react';
// components
import { TLog } from 'types/log';
import { TTableColumn } from 'types/table';
import LogDetailDialog from './components/LogDetailDialog';

const LogSale = () => {
  const [detailLog, setDetailLog] = useState<number | null>(null);

  const logColumns: TTableColumn<TLog>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Content',
      dataIndex: 'content',
      // hideInSearch: true,
      render: (value: any) => {
        return (
          <Typography
            width={'380px'}
            height={'80px'}
            variant={'body1'}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordBreak: 'break-all'
            }}
          >
            {value}
          </Typography>
        );
      }
    },
    {
      title: 'Cửa hàng',
      dataIndex: 'store_id',
      valueType: 'select',
      hideInTable: true,
      renderFormItem: () => <AutocompleteStore name="store-id" label="Cửa hàng" />
    },
    {
      title: 'StoreId',
      dataIndex: 'store_id',
      hideInSearch: true
      //   valueType: 'select'
      //   renderFormItem: () => <AutoCompleteStoreSelect name="store-id" label="Cửa hàng" />
    },
    {
      title: 'CreatedDate',
      dataIndex: 'created_date',
      hideInSearch: true
    },
    {
      title: 'Detail',
      fixed: 'right',
      hideInSearch: true,
      render: (_: any, content: TLog) => (
        <Tooltip title="Chi tiết">
          <IconButton onClick={() => setDetailLog(content.id)} size="large">
            <Visibility />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  return (
    <Page title={'Log'}>
      <LogDetailDialog
        id={detailLog}
        open={Boolean(detailLog)}
        onClose={() => setDetailLog(null)}
      />
      <Card>
        <Stack spacing={2}>
          <ResoTable
            sx={{ textOverflow: 'ellipsis' }}
            showAction={false}
            rowKey="menu_id"
            getData={logApi.getLog}
            columns={logColumns}
            scroll={{ y: '600px' }}
            pagination
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default LogSale;
