/* eslint-disable camelcase */
import { Visibility } from '@mui/icons-material';
import { DateRangePicker } from '@mui/lab';
// material
import { Card, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import logApi from 'api/log';
import AutocompleteStore from 'components/form/common/report/AutocompleteStore';
// import logApi from 'api/log';
// import AutoCompleteStoreSelect from 'components/form/common/AutocompleteStoreSelect/AutocompleteStoreSelect';
import ResoTable from 'components/ResoTable/ResoTable';
import moment from 'moment';
import ReportPage from 'pages/report/components/ReportPage';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
// components
import { TLog } from 'types/log';
import { TTableColumn } from 'types/table';
import { formatDate } from 'utils/formatTime';
import LogDetailDialog from './components/LogDetailDialog';

const LogSale = () => {
  const [detailLog, setDetailLog] = useState<number | null>(null);
  const ref = useRef<any>();
  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);

  const [dateRange, setDateRange] = useState<any>([yesterday, today]);
  const { storeId } = useParams();
  const isSystemRole = storeId == '0';

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('FromDate', formatDate(dateRange[0]!));
      ref.current.formControl.setValue('ToDate', formatDate(dateRange[1]!));
    }
  }, [dateRange]);

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
  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('FromDate', formatDate(dateRange[0]!));
      ref.current.formControl.setValue('ToDate', formatDate(dateRange[1]!));
    }
  }, [dateRange]);

  return (
    <ReportPage
      title="Log"
      actions={[
        <DateRangePicker
          inputFormat="dd/MM/yyyy"
          minDate={moment(`${today.getFullYear()}/${today.getMonth()}/01`).toDate()}
          disableFuture
          disableCloseOnSelect
          value={dateRange}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} label="Từ" />
              <Box sx={{ mx: 2 }}> - </Box>
              <TextField {...endProps} label="Đến" />
            </>
          )}
          onChange={(e) => {
            if (e[0] && e[1]) {
              setDateRange(e);
            }
          }}
          key="date-range"
        />
      ]}
    >
      <LogDetailDialog
        id={detailLog}
        open={Boolean(detailLog)}
        onClose={() => setDetailLog(null)}
      />
      <Card>
        <Stack spacing={2}>
          <ResoTable
            ref={ref}
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
    </ReportPage>
  );
};

export default LogSale;
