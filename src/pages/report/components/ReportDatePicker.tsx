import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';

type ReportDatePickerProps = {
  onChange: (date: Date | null) => void;
  value: Date | null;
  label?: string;
  disabled?: boolean;
};

const ReportDatePicker = ({ value, onChange, ...props }: ReportDatePickerProps) => {
  const { disabled, label } = props;
  return (
    <LocalizationProvider key="choose-day" dateAdapter={AdapterDateFns}>
      <DatePicker
        value={value}
        // onChange={(newValue) => {
        //   setDate(newValue || new Date());
        // }}
        onChange={onChange}
        disableFuture
        inputFormat="dd/MM/yyyy"
        renderInput={(params) => <TextField {...params} />}
        label={label}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
};

export default ReportDatePicker;
