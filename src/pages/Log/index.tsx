/* eslint-disable camelcase */
import { FileDownload, Visibility } from '@mui/icons-material';
import { DateRangePicker } from '@mui/lab';
// material
import { Button, Card, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import logApi from 'api/log';
// import logApi from 'api/log';
// import AutoCompleteStoreSelect from 'components/form/common/AutocompleteStoreSelect/AutocompleteStoreSelect';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { TLog } from 'types/log';
import { TTableColumn } from 'types/table';
import LogDetailDialog from './components/LogDetailDialog';

const LogSale = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();

  const [detailLog, setDetailLog] = useState<string | null>(null);

  const orderColumns: TTableColumn<TLog>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Content',
      dataIndex: 'content',
      hideInSearch: true,
      render: (value: any) => {
        return (
          <Typography
            width={'180px'}
            variant={'body1'}
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
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
      hideInTable: true
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
          <IconButton onClick={() => setDetailLog(content.content)} size="large">
            <Visibility />
          </IconButton>
        </Tooltip>
      )
    }
  ];

  const tableRef = useRef<any>();
  const day = new Date();
  const yesterday = day.setDate(day.getDate() - 1);
  const [fromDate, setFromDate] = useState<Date>(new Date(yesterday));
  const [toDate, setToDate] = useState<Date>(new Date());

  return (
    <Page
      title={'Log'}
      actions={() => [
        <>
          <DateRangePicker
            disableFuture
            value={[fromDate, toDate]}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} label="Từ" />
                <Box sx={{ mx: 2 }}> - </Box>
                <TextField {...endProps} label="Đến" />
              </>
            )}
            onChange={(e) => {
              setFromDate(e[0]!);
              setToDate(e[1]!);
            }}
            key="date-range"
          />
          <Button
            key="export-file"
            onClick={() => {
              //   navigate('/menus/create');
            }}
            variant="contained"
            startIcon={<FileDownload />}
          >
            Xuất file
          </Button>
        </>
      ]}
    >
      <LogDetailDialog
        content={detailLog}
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
            columns={orderColumns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default LogSale;
