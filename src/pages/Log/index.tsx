/* eslint-disable camelcase */
import { FileDownload, Visibility } from '@mui/icons-material';
import { DateRangePicker } from '@mui/lab';
// material
import { Button, Card, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
// import logApi from 'api/log';
// import AutoCompleteStoreSelect from 'components/form/common/AutocompleteStoreSelect/AutocompleteStoreSelect';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { TTableColumn } from 'types/table';
import LogDetailDialog from './components/LogDetailDialog';

const LogSale = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();

  const [detailLog, setDetailLog] = useState<number | null>(null);

  const data = [
    {
      id: 1233100,
      content:
        'ThirdPartyAPI\n{"status":1014,"message":{"description":"Mật khẩu bạn nhập không chính xác.","transid":25744741961,"amount":22500,"phoneNumber":"0908***734","walletId":"DE66C77717A399776AE87D2C6E5A8E1728F4C207"}}',
      store_id: 13,
      created_date: '2022-07-01T06:07:06.913'
    },
    {
      id: 1233101,
      content:
        'Skyconnect_POS_API \n{\r\n  "status_code": 16,\r\n  "message": "{\\"status\\":1014,\\"message\\":{\\"description\\":\\"Mật khẩu bạn nhập không chính xác.\\",\\"transid\\":25744741961,\\"amount\\":22500,\\"phoneNumber\\":\\"0908***734\\",\\"walletId\\":\\"DE66C77717A399776AE87D2C6E5A8E1728F4C207\\"}}",\r\n  "success": false\r\n}',
      store_id: 13,
      created_date: '2022-07-01T06:07:08.03'
    }
  ];

  type LogSaleDetail = {
    id: any;
    content: any;
    store_id: any;
    created_date: any;
  };

  const orderColumns: TTableColumn<LogSaleDetail>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      hideInSearch: true
    },
    {
      title: 'Content',
      dataIndex: 'content',
      width: '50',
      hideInSearch: true,
      render: (value: any) => {
        return (
          <Typography
            width={'500px'}
            variant={'body1'}
            sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {value}
          </Typography>
        );
      }
    },
    {
      title: 'Content',
      fixed: 'right',
      hideInSearch: true,
      render: (_: any, content: LogSaleDetail) => (
        <Tooltip title="Chi tiết">
          <IconButton onClick={() => setDetailLog(content.content)} size="large">
            <Visibility />
          </IconButton>
        </Tooltip>
      )
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
            // getData={() => logApi.getLog()}
            dataSource={data}
            columns={orderColumns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default LogSale;
