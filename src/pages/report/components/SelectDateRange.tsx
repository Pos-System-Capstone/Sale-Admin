import { DateRangePicker } from '@mui/lab';
import { Box, Button, Menu, MenuItem, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';

interface SelectDateRangeProps {
  label?: string;
  onChange: (value: any) => void;
  // dateRange: any;
  // setDateRange: (value: any) => void;
}

function SelectDateRange({ label, onChange }: SelectDateRangeProps) {
  const getFirstDateOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1);
  };
  const getLastDateOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0);
  };
  const getDateAndMonth = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
  };
  const getDateRangeDateAndMonth = (dateRange: any) => {
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    return `${getDateAndMonth(startDate)} - ${getDateAndMonth(endDate)}`;
  };
  const getMonday = (d: any) => {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  };
  const yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  // 7 ngay truoc ma khong tinh hom nay
  const SEVEN_DAY_PREVIOUS = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 7);
  const THIRTY_DAY_PREVIOUS = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 30);
  const NINETY_DAY_PREVIOUS = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 90);
  const firstDateOfLastWeek = getMonday(SEVEN_DAY_PREVIOUS);
  const lastDateOfLastWeek = new Date(firstDateOfLastWeek.valueOf() + 1000 * 60 * 60 * 24 * 6);
  const getFirstDateOfLastMonth = getFirstDateOfMonth(
    new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 31)
  );
  const getLastDateOfLastMonth = getLastDateOfMonth(
    new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * 31)
  );
  const [dateRange, setDateRange] = useState<any>([yesterday, yesterday]);
  const data = [
    {
      value: 'PREV_WEEK',
      label: 'Tuần trước',
      label2: getDateRangeDateAndMonth([firstDateOfLastWeek, lastDateOfLastWeek])
    },
    {
      value: 'PREV_MONTH',
      label: 'Tháng trước',
      label2: getDateRangeDateAndMonth([getFirstDateOfLastMonth, getLastDateOfLastMonth])
    },
    {
      value: '7_DAYS',
      label: '7 ngày trước',
      label2: getDateRangeDateAndMonth([SEVEN_DAY_PREVIOUS, yesterday])
    },
    {
      value: '30_DAYS',
      label: '30 ngày trước',
      label2: getDateRangeDateAndMonth([THIRTY_DAY_PREVIOUS, yesterday])
    },
    {
      value: '90_DAYS',
      label: '90 ngày trước',
      label2: getDateRangeDateAndMonth([NINETY_DAY_PREVIOUS, yesterday])
    }
  ];
  const [openDate, setOpenDate] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const [open, setOpen] = useState(false);
  // const handleClick = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const handleClick1 = () => {
    setOpenDate(true);
  };
  const handleCloseDate = () => {
    setOpenDate(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
      >
        {label ?? 'Chọn khoảng thời gian'}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {data.map((item: any) => (
          <MenuItem
            key={item.value}
            value={item.value}
            onClick={() => {
              onChange(item.value);
              handleClose();
            }}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}
          >
            <Typography variant="body1" fontWeight={500}>
              {item.label}
            </Typography>
            <Typography variant="body2">{item.label2 ?? ''}</Typography>
          </MenuItem>
        ))}
        <MenuItem
          value="DATE_RANGE"
          onClick={() => {
            handleClick1();
            handleClose();
          }}
        >
          <Typography variant="body1" fontWeight={500}>
            Chọn khoảng thời gian
          </Typography>
        </MenuItem>
      </Menu>
      <Modal
        open={openDate}
        onClose={handleCloseDate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '25%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            borderRadius: 1,
            boxShadow: 24,
            p: 5
          }}
        >
          <DateRangePicker
            inputFormat="dd/MM/yyyy"
            // minDate={moment(`${today.getFullYear()}/${today.getMonth()}/01`).toDate()}
            maxDate={yesterday}
            disableFuture
            disableCloseOnSelect
            value={dateRange}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} label="Từ" />
                <Box sx={{ mx: 2 }}> - </Box>
                <TextField {...endProps} label="Đến" />
              </>
            )}
            onChange={(e) => {
              if (e[0] && e[1]) {
                setDateRange(e);
                onChange(e);
              }
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default SelectDateRange;
