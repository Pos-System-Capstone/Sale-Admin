import { Box, Grid, Stack, Typography } from '@material-ui/core';
import { UploadAvatar } from 'components/upload';
import React from 'react';
import { InputField, UploadImageField } from '../../../components/form';
import LoadingAsyncButton from '../../../components/LoadingAsyncButton/LoadingAsyncButton';
import { CardTitle, Card } from '../../Products/components/Card';

const CollectionInfoTab = ({ onSubmit }: { onSubmit: Function }) => (
  <Box>
    <Card>
      <CardTitle>Thông tin Bộ sưu tập</CardTitle>
      <Grid spacing={2} container>
        <Grid item xs={4}>
          <Card>
            <UploadImageField.Avatar label="Hình ảnh" name="thumbnail" />
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <InputField fullWidth name="menu_name" label="Tên menu" />
            <InputField rows={4} multiline fullWidth name="description" label="Miêu tả" />
          </Stack>
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
