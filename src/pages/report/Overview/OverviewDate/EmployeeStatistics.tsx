import { TabPanel } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import ResoTable from 'components/ResoTable/ResoTable';
import React, { useRef } from 'react';
import { Menu } from 'types/menu';
import { TTableColumn } from 'types/table';

function EmployeeStatistics() {
  const ref = useRef<any>();
  const employeeColumns: TTableColumn<Menu>[] = [
    {
      title: 'Họ và tên',
      hideInSearch: true
    },
    {
      title: 'Thành phần',
      hideInSearch: true
    },
    {
      title: 'Tổng',
      hideInSearch: true
    }
  ];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '11px',
        mt: '30px'
      }}
    >
      {/*Thống kê doanh thu theo nhân viên*/}
      <Stack spacing={2}>
        <Typography>
          <TabPanel value="3">Thống kê doanh thu theo nhân viên</TabPanel>
        </Typography>
        <ResoTable showAction={false} columns={employeeColumns} ref={ref} />
      </Stack>
    </Box>
  );
}

export default EmployeeStatistics;
