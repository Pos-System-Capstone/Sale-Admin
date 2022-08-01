/* eslint-disable camelcase */
import { FileDownload } from '@mui/icons-material';
import { DateRangePicker } from '@mui/lab';
// material
import { Button, Card, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import logApi from 'api/log';
// import AutoCompleteStoreSelect from 'components/form/common/AutocompleteStoreSelect/AutocompleteStoreSelect';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { TTableColumn } from 'types/table';

const LogSale = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();

  const [detailOrder, setDetailOrder] = useState<number | null>(null);

  const data = [
    {
      id: 0,
      content: 'string',
      store_id: 0,
      created_date: '2022-07-28T04:06:21.225Z'
    },
    {
      id: 1,
      content: 'Wisky',
      store_id: 1,
      created_date: '2022-07-28T04:06:21.225Z'
    },
    {
      id: 2,
      content: 'Beanoi',
      store_id: 2,
      created_date: '2022-07-28T04:06:21.225Z'
    }
  ];

  type LogSaleDetail = {
    id: number;
    content: string;
    stored_id: number;
    create_date: string;
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
      hideInSearch: true
    },
    {
      title: 'Cửa hàng',
      dataIndex: 'stored_id',
      valueType: 'select',
      hideInTable: true
    },
    {
      title: 'StoreId',
      dataIndex: 'stored_id',
      hideInSearch: true
      //   valueType: 'select'
      //   renderFormItem: () => <AutoCompleteStoreSelect name="store-id" label="Cửa hàng" />
    },
    {
      title: 'CreatedDate',
      dataIndex: 'create_date',
      hideInSearch: true
    }
  ];

  const tableRef = useRef<any>();
  const day = new Date();
  const yesterday = day.setDate(day.getDate() - 1);
  const [fromDate, setFromDate] = useState<Date>(new Date(yesterday));
  const [toDate, setToDate] = useState<Date>(new Date());

  //   useEffect(() => {
  //     if (tableRef.current) {
  //       tableRef.current.formControl.setValue('FromDate', formatDate(fromDate!));
  //       tableRef.current.formControl.setValue('ToDate', formatDate(toDate!));
  //     }
  //   }, [fromDate, toDate]);

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
      <Card>
        <Stack spacing={2}>
          <ResoTable
            showAction={false}
            rowKey="menu_id"
            getData={() => logApi.getLog()}
            // getData={data}
            columns={orderColumns}
          />
        </Stack>
      </Card>
    </Page>
  );
};

export default LogSale;
