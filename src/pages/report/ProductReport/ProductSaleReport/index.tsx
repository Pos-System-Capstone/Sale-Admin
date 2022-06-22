/* eslint-disable camelcase */
// material
import { Box, Button, Card, Stack } from '@mui/material';
import productApi from 'api/report/products';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
import ReportDatePicker from 'pages/report/components/ReportDatePicker';
import ReportPage from 'pages/report/components/ReportPage';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
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
    productId?: any;
    productName?: any;
    quantity?: any;
    percent?: any;
    totalBeforeDiscount?: any;
    discount?: any;
    totalAfterDiscount?: any;
  };

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
      dataIndex: 'productName'
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
      dataIndex: 'percent',
      render: (value) => fPercent(value)
    },
    {
      title: 'Tổng tiền trước giảm giá',
      hideInSearch: true,
      dataIndex: 'totalBeforeDiscount',
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
      dataIndex: 'totalAfterDiscount',
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
  const yesterday = today.setDate(today.getDate() - 1);
  const [fromDate, setFromDate] = useState<Date>(new Date(yesterday));
  const [toDate, setToDate] = useState<Date>(new Date());

  const ref = useRef<any>();
  const { watch } = useForm();
  useEffect(() => {
    if (ref.current) {
      ref.current.formControl.setValue(
        'FromDate',
        fromDate?.toLocaleDateString('zh-Hans-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      );
      ref.current.formControl.setValue(
        'toDate',
        toDate?.toLocaleDateString('zh-Hans-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      );
    }
  }, [fromDate, toDate]);

  return (
    <ReportPage
      title="Báo cáo doanh thu sản phẩm"
      // content={`${fDate(fromDate)} to ${fDate(toDate)}`}
      actions={[
        <ReportDatePicker
          key="choose-from-date"
          value={fromDate || null}
          onChange={(newValue) => {
            setFromDate(newValue || new Date());
          }}
        />,
        <ReportDatePicker
          key="choose-to-date"
          value={toDate || null}
          onChange={(newValue) => {
            setToDate(newValue || new Date());
          }}
        />
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

          <ResoTable
            ref={ref}
            columns={orderColumns}
            getData={productApi.getProductReport}
            showAction={false}
            pagination={true}
            scroll={{ y: '320px' }}
          />
        </Stack>
      </Card>
    </ReportPage>
  );
};

export default ProductSaleReport;
