import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography
} from '@mui/material';
import orderApi from 'api/order';
import EmptyContent from 'components/EmptyContent';
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import ResoTable from 'components/ResoTable/ResoTable';
import useLocales from 'hooks/useLocales';
import React from 'react';
import { useQuery } from 'react-query';
import { TTableColumn } from 'types/table';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  content?: any | null;
};

const LogSummaryItem = styled(Grid)({
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'left',
  '& > h6': {
    width: '40%',
    marginRight: '1rem'
  },
  '& > p': {
    width: '60%',
    textAlign: 'left'
  }
});

const LogDetailDialog: React.FC<Props> = ({ open, onClose, content }) => {
  const { translate } = useLocales();

  const { data: contents, isLoading } = useQuery(
    ['log', content],
    () => orderApi.getOrderDetail(content!).then((res) => res.data),
    {
      enabled: Boolean(content)
    }
  );

  // const LogData = {
  //   metadata: {
  //     page: 1,
  //     size: 50,
  //     total: 52549
  //   },
  //   data: [
  //     {
  //       id: 1233100,
  //       content: {
  //         name: 'ThirdPartyAPI',
  //         status: 1014,
  //         message: {
  //           description: 'Mật khẩu bạn nhập không chính xác.',
  //           transid: 25744741961,
  //           amount: 22500,
  //           phoneNumber: '0908***734',
  //           walletId: 'DE66C77717A399776AE87D2C6E5A8E1728F4C207'
  //         }
  //       },
  //       store_id: 13,
  //       created_date: '2022-07-01T06:07:06.913'
  //     },
  //     {
  //       id: 1233101,
  //       content: {
  //         name: 'Skyconnect_POS_API',
  //         status_code: 16,
  //         status: 1014,
  //         message: {
  //           description: 'Mật khẩu bạn nhập không chính xác.',
  //           transid: 25744741961,
  //           amount: 22500,
  //           phoneNumber: '0908***734',
  //           walletId: 'DE66C77717A399776AE87D2C6E5A8E1728F4C207'
  //         }
  //       },
  //       store_id: 13,
  //       created_date: '2022-07-01T06:07:08.03'
  //     }
  //   ]
  // };

  const LogTest = {
    id: 1233100,
    content: 'ThirdPartyAPI',
    store_id: 13,
    created_date: '2022-07-01T06:07:06.913'
  };

  type LogSaleDetail = {
    id: number;
    content: string;
    store_id: number;
    created_date: string;
  };

  const orderColumns: ResoDescriptionColumnType<LogSaleDetail>[] = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Content',
      dataIndex: 'content'
    },
    {
      title: 'StoredId',
      dataIndex: 'store_id'
    },
    {
      title: 'CreatedDate',
      dataIndex: 'created_date'
    }
  ];

  const ContentStatus = {
    status: 1014
  };

  type LogStatus = {
    status: number;
  };

  const custColumns: ResoDescriptionColumnType<LogStatus>[] = [
    {
      title: 'Status',
      dataIndex: 'status'
    }
  ];

  const ContentDetail = [
    {
      description: 'Mật khẩu bạn nhập không chính xác.',
      transid: 25744741961,
      amount: 22500,
      phoneNumber: '0908***734',
      walletId: 'DE66C77717A399776AE87D2C6E5A8E1728F4C207'
    },
    {
      description: 'Mật khẩu bạn nhập không chính xác.',
      transid: 25744741961,
      amount: 22500,
      phoneNumber: '0908***734',
      walletId: 'DE66C77717A399776AE87D2C6E5A8E1728F4C207'
    }
  ];

  type LogDetailDialog = {
    description: string;
    transid: number;
    amount: number;
    phoneNumber: string;
    walletId: string;
  };

  const orderItemColumns: TTableColumn<LogDetailDialog>[] = [
    {
      title: 'STT',
      dataIndex: 'index'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'TransId',
      dataIndex: 'transid'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      valueType: 'money'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber'
    },
    {
      title: 'WalletId',
      dataIndex: 'walletId'
    }
  ];

  return (
    <Dialog maxWidth="lg" scroll="paper" open={open} onClose={onClose}>
      {isLoading ? (
        <CircularProgress />
      ) : !content ? (
        <EmptyContent title="Không tìm thấy đơn hàng" />
      ) : (
        <>
          <DialogTitle
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Typography variant="h4">Chi tiết Log</Typography>
            <IconButton aria-label="close" onClick={onClose} size="large">
              <Icon icon={closeFill} />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2}>
              <ResoDescriptions
                title="Thông tin"
                labelProps={{ fontWeight: 'bold' }}
                columns={orderColumns as any}
                datasource={LogTest}
                column={4}
              />
              <ResoDescriptions
                title="Thông tin chi tiết"
                labelProps={{ fontWeight: 'bold' }}
                columns={custColumns as any}
                datasource={ContentStatus}
                column={3}
              />
              <ResoTable
                showFilter={false}
                showSettings={false}
                showAction={false}
                pagination={false}
                columns={orderItemColumns}
                dataSource={ContentDetail}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Đóng</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default LogDetailDialog;
