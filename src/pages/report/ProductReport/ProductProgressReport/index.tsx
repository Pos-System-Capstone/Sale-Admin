/* eslint-disable camelcase */
// material
import { Box, Button, Card, Stack } from '@mui/material';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import ReportBtn from 'pages/report/components/ReportBtn';
import ReportDatePicker from 'pages/report/components/ReportDatePicker';
import ReportPage from 'pages/report/components/ReportPage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductProgressColumn from './column';

const ProductProgressReport = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const data = [
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    },
    {
      date: '21/06/2022',
      quantity: 0,
      revenueBefore: 0,
      discount: 0,
      revenue: 0
    }
  ];

  const [openChart, setOpenChart] = useState(false);

  const today = new Date();
  const [date, setDate] = useState<Date>(today);

  return (
    <ReportPage
      title="Báo cáo diễn tiến sản phẩm"
      content={
        date.toDateString() === today.toDateString()
          ? `Tính đến: ${moment().format('hh:mm:ss')}`
          : ''
      }
      actions={[
        <ReportDatePicker
          key="choose-day"
          value={date}
          onChange={(newValue) => {
            setDate(newValue || new Date());
          }}
        />,
        <ReportBtn key="export-excel" onClick={() => console.log('Export excel')} />
      ]}
    >
      <Card>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <Box>
              <Button variant="contained" onClick={() => setOpenChart((prev) => !prev)}>
                {openChart ? 'ẨN BIỂU ĐỒ' : 'HIỂN THỊ BIỂU ĐỒ'}
              </Button>
            </Box>

            {openChart && (
              <Box>
                <img
                  style={{ borderRadius: '10px' }}
                  src="https://i.pinimg.com/originals/84/37/28/843728503b72b20cd0ebad06ce4137c9.png"
                  alt=""
                />
              </Box>
            )}
          </Stack>

          <ResoTable showAction={false} columns={ProductProgressColumn} dataSource={data} />
        </Stack>
      </Card>
    </ReportPage>
  );
};

export default ProductProgressReport;
