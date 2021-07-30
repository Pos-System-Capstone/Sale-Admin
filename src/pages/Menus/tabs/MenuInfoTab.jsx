import { Box, Grid } from '@material-ui/core';
import { TimePicker } from '@material-ui/lab';
import React from 'react';
import { SelectField, InputField, TimePickerField } from '../../../components/form';
import LoadingAsyncButton from '../../../components/LoadingAsyncButton/LoadingAsyncButton';
import { CardTitle, Card } from '../../Products/components/Card';

const MenuInfoTab = ({ onSubmit }) => (
  <Box>
    <Card>
      <CardTitle>Thông tin Menu</CardTitle>
      <Grid spacing={2} container>
        <Grid item xs={6}>
          <InputField fullWidth name="menu_name" label="Tên menu" />
        </Grid>
        <Grid item xs={6}>
          <SelectField
            fullWidth
            options={[
              {
                label: 'Thứ hai',
                value: 0
              },
              {
                label: 'Thứ ba',
                value: 1
              },
              {
                label: 'Thứ tư',
                value: 2
              },
              {
                label: 'Thứ năm',
                value: 3
              },
              {
                label: 'Thứ sáu',
                value: 4
              },
              {
                label: 'Thứ bảy',
                value: 5
              },
              {
                label: 'Chủ nhật',
                value: 6
              }
            ]}
            multiple
            name="day_filters"
            label="Ngày hiệu lực"
          />
        </Grid>
        <Grid item xs={3}>
          <TimePickerField fullWidth name="from" label="Từ" />
        </Grid>
        <Grid item xs={3}>
          <TimePickerField fullWidth name="to" label="Đến" />
        </Grid>
      </Grid>
      <Box textAlign="right" mt={2}>
        <LoadingAsyncButton onClick={onSubmit} variant="contained">
          Cập nhật
        </LoadingAsyncButton>
      </Box>
    </Card>
  </Box>
);

export default MenuInfoTab;
