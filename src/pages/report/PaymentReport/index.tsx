/* eslint-disable camelcase */
import { Card, Stack } from '@mui/material';
// components
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
// material
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TTableColumn } from 'types/table';
import { fDate } from 'utils/formatTime';
import { formatCurrency } from 'utils/utils';
import ReportBtn from '../components/ReportBtn';
import ReportDatePicker from '../components/ReportDatePicker';
import ReportPage from '../components/ReportPage';

const CollectionListPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const [date, setDate] = useState<Date>(new Date());

  type ProductSaleDetail = {
    name?: any;
    date?: any;
    cash?: any;
    memberCard?: any;
    bank?: any;
    eWallet?: any;
  };
  const data = [
    {
      name: 'รายการที่ 1',
      date: '2022/12/20',
      cash: 12321,
      memberCard: 1,
      bank: 12321,
      eWallet: 123
    },
    {
      name: 'รายการที่ 1',
      date: '2022/12/20',
      cash: 12321,
      memberCard: 1,
      bank: 12321,
      eWallet: 123
    },
    {
      name: 'รายการที่ 1',
      date: '2022/12/20',
      cash: 12321,
      memberCard: 1,
      bank: 12321,
      eWallet: 123
    },
    {
      name: 'รายการที่ 1',
      date: '2022/12/20',
      cash: 12321,
      memberCard: 1,
      bank: 12321,
      eWallet: 123
    },
    {
      name: 'รายการที่ 1',
      date: '2022/12/20',
      cash: 12321,
      memberCard: 1,
      bank: 12321,
      eWallet: 123
    },
    {
      name: 'รายการที่ 1',
      date: '2022/12/20',
      cash: 12321,
      memberCard: 1,
      bank: 12321,
      eWallet: 123
    },
    {
      name: 'รายการที่ 1',
      date: '2022/12/20',
      cash: 12321,
      memberCard: 1,
      bank: 12321,
      eWallet: 123
    },
    {
      name: 'รายการที่ 1',
      date: '2022/12/20',
      cash: 12321,
      memberCard: 1,
      bank: 12321,
      eWallet: 123
    },
    {
      name: 'รายการที่ 1',
      date: '2022/12/20',
      cash: 12321,
      memberCard: 1,
      bank: 12321,
      eWallet: 123
    }
  ];
  const orderColumns: TTableColumn<ProductSaleDetail>[] = [
    {
      title: 'Ngày',
      hideInSearch: true,
      dataIndex: 'date',
      render: (value) => fDate(value)
    },
    {
      title: 'Cửa hàng',
      valueType: 'select',
      hideInTable: true
    },
    {
      title: 'Tiền mặt',
      hideInSearch: true,
      dataIndex: 'cash',
      render: (value) => formatCurrency(value)
    },
    {
      title: 'Thẻ thành viên',
      hideInSearch: true,
      dataIndex: 'memberCard',
      render: (value) => formatCurrency(value)
    },
    {
      title: 'Ngân hàng',
      hideInSearch: true,
      dataIndex: 'bank',
      render: (value) => formatCurrency(value)
    },
    {
      title: 'Ví điện tử',
      hideInSearch: true,
      dataIndex: 'eWallet',
      render: (value) => formatCurrency(value)
    }
  ];

  return (
    <ReportPage
      title="Báo cáo theo hình thức thanh toán"
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
          <ResoTable showAction={false} columns={orderColumns} dataSource={data} />
        </Stack>
      </Card>
    </ReportPage>
  );
};

export default CollectionListPage;
