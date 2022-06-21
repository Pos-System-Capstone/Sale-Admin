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
import { Menu } from 'types/menu';
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

  const orderColumns: TTableColumn<Menu>[] = [
    {
      title: 'Ngày',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: 'Cửa hàng',
      valueType: 'select'
    },
    {
      title: 'Tiền mặt bán hàng',
      hideInSearch: true
    },
    {
      title: 'Tiền mặt nạp thẻ',
      hideInSearch: true
    },
    {
      title: 'Tiền sử dụng TTV',
      hideInSearch: true
    },
    {
      title: 'Ngân hàng',
      hideInSearch: true
    },
    {
      title: 'Ví điện tử',
      hideInSearch: true
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
          <ResoTable showAction={false} columns={orderColumns} />
        </Stack>
      </Card>
    </ReportPage>
  );
};

export default CollectionListPage;
