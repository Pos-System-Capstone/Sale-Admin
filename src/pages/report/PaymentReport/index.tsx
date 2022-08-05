/* eslint-disable camelcase */
import { DateRangePicker } from '@mui/lab';
import { Box, Card, Stack, TextField } from '@mui/material';
import paymentApi from 'api/report/payment';
// components
import ResoTable from 'components/ResoTable/ResoTable';
import moment from 'moment';
// material
import { useEffect, useRef, useState } from 'react';
import { formatDate } from 'utils/formatTime';
import ReportBtn from '../components/ReportBtn';
import ReportPage from '../components/ReportPage';
import { paymentColumns } from './column';

const CollectionListPage = () => {
  const ref = useRef<any>();
  const today = new Date();
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  const [dateRange, setDateRange] = useState<any>([yesterday, today]);

  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue('FromDate', formatDate(dateRange[0]!));
      ref.current.formControl.setValue('ToDate', formatDate(dateRange[1]!));
    }
  }, [dateRange]);

  return (
    <ReportPage
      title="Báo cáo theo hình thức thanh toán"
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
        />,
        <ReportBtn key="export-excel" onClick={() => console.log('Export excel')} />
      ]}
    >
      <Card>
        <Stack spacing={2}>
          <ResoTable
            showAction={false}
            columns={paymentColumns}
            getData={paymentApi.get}
            // dataSource={data}
            ref={ref}
            pagination
            defaultFilters={{
              FromDate: formatDate(dateRange[0]!),
              ToDate: formatDate(dateRange[1]!)
            }}
          />
        </Stack>
      </Card>
    </ReportPage>
  );
};

export default CollectionListPage;
