import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

type ReportBtnProps = {
  onClick: () => void;
  label?: string;
  variant?: 'text' | 'outlined' | 'contained';
};

function ReportBtn(props: ReportBtnProps) {
  const { onClick, label = 'XUẤT FILE EXCEL', variant = 'contained' } = props;
  return (
    <Button onClick={onClick} variant={variant} startIcon={<FileDownloadIcon />}>
      {label}
    </Button>
  );
}

export default ReportBtn;
