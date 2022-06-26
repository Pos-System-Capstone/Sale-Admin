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
import { useNavigate } from 'react-router-dom';
import productSaleColumn from './column';

const ProductSaleReport = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const { watch } = useForm();

  const ref = useRef<any>();

  const [openChart, setOpenChart] = useState(false);
  const today = new Date();
  const yesterday = today.setDate(today.getDate() - 1);
  const [fromDate, setFromDate] = useState<Date>(new Date(yesterday));
  const [toDate, setToDate] = useState<Date>(new Date());

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
            columns={productSaleColumn}
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
