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
// components
import { useNavigate } from 'react-router-dom';
//
import { Menu } from 'types/menu';
import { TTableColumn } from 'types/table';

const ProductSaleReport = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const orderColumns: TTableColumn<Menu>[] = [
    {
      title: 'Cửa hàng',
      hideInTable: true,
      valueType: 'select'
    },
    {
      title: 'Ngày',
      hideInTable: true,
      valueType: 'select',
      hideInSearch: true
    },
    {
      title: 'Tên sản phẩm',
      hideInSearch: true
    },
    {
      title: 'Số lượng',
      hideInSearch: true
    },
    {
      title: 'Tỉ trọng(%)',
      hideInSearch: true
    },
    {
      title: 'Tổng tiền trước giảm giá',
      hideInSearch: true
    },
    {
      title: 'Giảm giá',
      hideInSearch: true
    },
    {
      title: 'Tổng tiền sau giảm giá',
      hideInSearch: true
    },
    {
      title: 'Loại',
      hideInTable: true,
      valueEnum: [
        {
          label: 'Sản phẩm',
          value: 'true'
        },
        {
          label: 'Nhóm sản phẩm',
          value: 'false'
        }
      ],
      valueType: 'select'
    },
    {
      title: 'Chọn biểu đồ',
      hideInTable: true,
      valueEnum: [
        {
          label: 'Giảm giá',
          value: 'true'
        },
        {
          label: 'Trước giảm giá',
          value: 'false'
        }
      ],
      valueType: 'select'
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
        <Stack spacing={2}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '50%' }}>
              <Button variant="contained" onClick={() => setOpenChart((prev) => !prev)}>
                {openChart ? 'ẨN BIỂU ĐỒ' : 'HIỂN THỊ BIỂU ĐỒ'}
              </Button>
            </Box>
          </Box>
          {openChart && (
            <Box>
              <img
                src="https://i.pinimg.com/originals/84/37/28/843728503b72b20cd0ebad06ce4137c9.png"
                alt=""
              />
            </Box>
          )}
          <Box>
            <ResoTable showAction={false} columns={orderColumns} />
          </Box>
        </Stack>
      </Card>
    </ReportPage>
  );
};

export default ProductSaleReport;
