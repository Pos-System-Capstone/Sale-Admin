import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import logApi from 'api/log';
import ResoDescriptions, { ResoDescriptionColumnType } from 'components/ResoDescriptions';
import useLocales from 'hooks/useLocales';
import React from 'react';
import { useQuery } from 'react-query';
import { TLog } from 'types/log';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  content?: any | null;
};

const LogDetailDialog: React.FC<Props> = ({ open, onClose, content }) => {
  const { translate } = useLocales();

  const { data: details } = useQuery(['log', content], () =>
    logApi.getLog(content!).then((res) => res.data)
  );

  const detailLogColumns: ResoDescriptionColumnType<TLog>[] = [
    {
      title: 'StoredId',
      dataIndex: 'store_id'
    },
    {
      title: 'CreatedDate',
      dataIndex: 'created_date'
    }
  ];

  const contentColumns: ResoDescriptionColumnType<TLog>[] = [
    {
      title: 'Content',
      dataIndex: 'content'
    }
  ];

  return (
    <Dialog maxWidth="lg" scroll="paper" open={open} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            columns={detailLogColumns as any}
            datasource={details}
            column={2}
          />
          <ResoDescriptions
            title="Thông tin chi tiết"
            labelProps={{ fontWeight: 'bold' }}
            columns={contentColumns as any}
            datasource={details}
            column={4}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogDetailDialog;
