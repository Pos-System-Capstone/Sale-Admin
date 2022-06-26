import { Stack, Typography } from '@mui/material';
import ResoTable from 'components/ResoTable/ResoTable';
import { useRef } from 'react';
import { TTableColumn } from 'types/table';

function EmployeeStatistics() {
  const ref = useRef<any>();
  type ProductSaleDetail = {
    name?: any;
    cash?: any;
    memberCard?: any;
    eWallet?: any;
    bank?: any;
    other?: any;
    total?: any;
  };
  const employeeColumns: TTableColumn<ProductSaleDetail>[] = [
    {
      title: 'Họ và tên',
      hideInSearch: true,
      dataIndex: 'name'
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
      title: 'E-Wallet',
      hideInSearch: true,
      dataIndex: 'eWallet'
    },
    {
      title: 'Bank',
      hideInSearch: true,
      dataIndex: 'bank'
    },
    {
      title: 'Khác',
      hideInSearch: true,
      dataIndex: 'other'
    },
    {
      title: 'Tổng',
      hideInSearch: true,
      dataIndex: 'total'
    }
  ];
  const data = [
    {
      name: 'Lê Văn Trung',
      cash: 4682720,
      memberCard: 222700,
      eWallet: 829240,
      bank: 0,
      other: 0,
      total: 222700 + 829240
    },
    {
      name: 'Lê Văn Trung',
      cash: 4682720,
      memberCard: 222700,
      eWallet: 829240,
      bank: 0,
      other: 0,
      total: 222700 + 829240
    },
    {
      name: 'Lê Văn Trung',
      cash: 4682720,
      memberCard: 222700,
      eWallet: 829240,
      bank: 0,
      other: 0,
      total: 222700 + 829240
    },
    {
      name: 'Lê Văn Trung',
      cash: 4682720,
      memberCard: 222700,
      eWallet: 829240,
      bank: 0,
      other: 0,
      total: 222700 + 829240
    },
    {
      name: 'Lê Văn Trung',
      cash: 4682720,
      memberCard: 222700,
      eWallet: 829240,
      bank: 0,
      other: 0,
      total: 222700 + 829240
    },
    {
      name: 'Lê Văn Trung',
      cash: 4682720,
      memberCard: 222700,
      eWallet: 829240,
      bank: 0,
      other: 0,
      total: 222700 + 829240
    },
    {
      name: 'Lê Văn Trung',
      cash: 4682720,
      memberCard: 222700,
      eWallet: 829240,
      bank: 0,
      other: 0,
      total: 222700 + 829240
    },
    {
      name: 'Lê Văn Trung',
      cash: 4682720,
      memberCard: 222700,
      eWallet: 829240,
      bank: 0,
      other: 0,
      total: 222700 + 829240
    },
    {
      name: 'Lê Văn Trung',
      cash: 4682720,
      memberCard: 222700,
      eWallet: 829240,
      bank: 0,
      other: 0,
      total: 222700 + 829240
    }
  ];
  return (
    <Stack direction={'column'}>
      {/*Thống kê doanh thu theo nhân viên*/}
      <Stack spacing={2}>
        <Typography pl={2} variant="h4">
          Thống kê doanh thu theo nhân viên
        </Typography>
        <ResoTable showAction={false} columns={employeeColumns} ref={ref} dataSource={data} />
      </Stack>
    </Stack>
  );
}

export default EmployeeStatistics;
