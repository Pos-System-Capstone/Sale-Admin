import { Box, Grid } from '@material-ui/core';
import { SelectField, InputField, TimePickerField } from '../../../components/form';
import LoadingAsyncButton from '../../../components/LoadingAsyncButton/LoadingAsyncButton';
import { CardTitle, Card } from '../../Products/components/Card';

const MenuInfoTab = ({ onSubmit }) => (
  <Box>
    <Card>
      <CardTitle>Thông tin Menu</CardTitle>
      <Grid spacing={2} container>
        <Grid item xs={12} sm={6}>
          <InputField fullWidth size="small" name="menu_name" label="Tên menu" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            fullWidth
            size="small"
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
        <Grid item xs={12} sm={3}>
          <TimePickerField size="small" fullWidth name="from" label="Từ" />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TimePickerField size="small" fullWidth name="to" label="Đến" />
        </Grid>
      </Grid>
      <Box textAlign="right" mt={2}>
        <LoadingAsyncButton size="small" onClick={onSubmit} variant="contained">
          Cập nhật
        </LoadingAsyncButton>
      </Box>
    </Card>
  </Box>
);

export default MenuInfoTab;
