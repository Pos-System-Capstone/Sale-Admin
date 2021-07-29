import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { InputField } from '../../../components/form';
import LoadingAsyncButton from '../../../components/LoadingAsyncButton/LoadingAsyncButton';
import { CardTitle, Card } from '../../Products/components/Card';

const CollectionInfoTab = ({ onSubmit }: { onSubmit: Function }) => (
  <Box>
    <Card>
      <CardTitle>Thông tin Bộ sưu tập</CardTitle>
      <Grid spacing={2} container>
        <Grid item xs={6}>
          <InputField rules={null} fullWidth name="menu_name" label="Tên menu" />
        </Grid>
        <Grid item xs={12}>
          <InputField rules={null} multiline fullWidth name="description" label="Miêu tả" />
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

export default CollectionInfoTab;
