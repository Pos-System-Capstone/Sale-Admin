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
import { TTableColumn } from 'types/table';
import { fNumber, fPercent } from 'utils/formatNumber';

const ProductSaleReport = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  type ProductSaleDetail = {
    name?: any;
    quantity?: any;
    radio?: any;
    revenueBefore?: any;
    discount?: any;
    revenue?: any;
  };
  const data = [
    {
      name: 'Iced Espresso With Milk (M)',
      quantity: 3855,
      radio: '30.90',
      revenueBefore: 97145000,
      discount: 10307000,
      revenue: 86838000
    },
    {
      name: 'Iced Espresso With Milk (M)',
      quantity: 3855,
      radio: '30.90',
      revenueBefore: 97145000,
      discount: 10307000,
      revenue: 86838000
    },
    {
      name: 'Iced Espresso With Milk (M)',
      quantity: 3855,
      radio: '30.90',
      revenueBefore: 97145000,
      discount: 10307000,
      revenue: 86838000
    },
    {
      name: 'Iced Espresso With Milk (M)',
      quantity: 3855,
      radio: '30.90',
      revenueBefore: 97145000,
      discount: 10307000,
      revenue: 86838000
    },
    {
      name: 'Iced Espresso With Milk (M)',
      quantity: 3855,
      radio: '30.90',
      revenueBefore: 97145000,
      discount: 10307000,
      revenue: 86838000
    },
    {
      name: 'Iced Espresso With Milk (M)',
      quantity: 3855,
      radio: '30.90',
      revenueBefore: 97145000,
      discount: 10307000,
      revenue: 86838000
    },
    {
      name: 'Iced Espresso With Milk (M)',
      quantity: 3855,
      radio: '30.90',
      revenueBefore: 97145000,
      discount: 10307000,
      revenue: 86838000
    },
    {
      name: 'Iced Espresso With Milk (M)',
      quantity: 3855,
      radio: '30.90',
      revenueBefore: 97145000,
      discount: 10307000,
      revenue: 86838000
    },
    {
      name: 'Iced Espresso With Milk (M)',
      quantity: 3855,
      radio: '30.90',
      revenueBefore: 97145000,
      discount: 10307000,
      revenue: 86838000
    },
    {
      name: 'Iced Espresso With Milk (M)',
      quantity: 3855,
      radio: '30.90 ',
      revenueBefore: 97145000,
      discount: 10307000,
      revenue: 86838000
    },
    {
      name: 'Iced Espresso With Milk (M)',
      quantity: 3855,
      radio: '30.90',
      revenueBefore: 97145000,
      discount: 10307000,
      revenue: 86838000
    },
    {
      name: 'Iced Espresso With Milk (M)',
      quantity: 3855,
      radio: '30.90',
      revenueBefore: 97145000,
      discount: 10307000,
      revenue: 86838000
    }
  ];

  const orderColumns: TTableColumn<ProductSaleDetail>[] = [
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
      hideInSearch: true,
      dataIndex: 'name'
    },
    {
      title: 'Số lượng',
      hideInSearch: true,
      dataIndex: 'quantity',
      render: (value) => fNumber(value)
    },
    {
      title: 'Tỉ trọng (%)',
      hideInSearch: true,
      dataIndex: 'radio',
      render: (value) => fPercent(value)
    },
    {
      title: 'Tổng tiền trước giảm giá',
      hideInSearch: true,
      dataIndex: 'revenueBefore',
      render: (value) =>
        value.toLocaleString('vi', {
          style: 'currency',
          currency: 'VND'
        })
    },
    {
      title: 'Giảm giá',
      hideInSearch: true,
      dataIndex: 'discount',
      render: (value) =>
        value.toLocaleString('vi', {
          style: 'currency',
          currency: 'VND'
        })
    },
    {
      title: 'Tổng tiền sau giảm giá',
      hideInSearch: true,
      dataIndex: 'revenue',
      render: (value) =>
        value.toLocaleString('vi', {
          style: 'currency',
          currency: 'VND'
        })
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
      title="Báo cáo doanh thu sản phẩm"
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

          <ResoTable showAction={false} columns={orderColumns} dataSource={data} />
        </Stack>
      </Card>
    </ReportPage>
  );
};

export default ProductSaleReport;
