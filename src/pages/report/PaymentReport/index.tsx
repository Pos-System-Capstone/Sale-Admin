/* eslint-disable camelcase */
import { Card, Stack } from '@mui/material';
// components
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import { useSnackbar } from 'notistack';
// material
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TCollection } from 'types/collection';
import { TTableColumn } from 'types/table';
import ReportBtn from '../components/ReportBtn';
import ReportDatePicker from '../components/ReportDatePicker';
import ReportPage from '../components/ReportPage';

const CollectionListPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const [date, setDate] = useState<Date>(new Date());
  const [currentDeleteItem, setCurrentDeleteItem] = useState<TCollection | null>(null);

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
      dataIndex: 'date'
    },
    {
      title: 'Cửa hàng',
      valueType: 'select',
      hideInTable: true
    },
    {
      title: 'Tiền mặt',
      hideInSearch: true,
      dataIndex: 'cash'
    },
    {
      title: 'Thẻ thành viên',
      hideInSearch: true,
      dataIndex: 'memberCard'
    },
    {
      title: 'Ngân hàng',
      hideInSearch: true,
      dataIndex: 'bank'
    },
    {
      title: 'Ví điện tử',
      hideInSearch: true,
      dataIndex: 'eWallet'
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
