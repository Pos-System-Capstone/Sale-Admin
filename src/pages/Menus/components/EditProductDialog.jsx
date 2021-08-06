import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack
} from '@material-ui/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import LoadingAsyncButton from 'components/LoadingAsyncButton/LoadingAsyncButton';
import { InputField } from 'components/form';

// eslint-disable-next-line react/prop-types
const EditProductDialog = ({ open, onClose, onSubmit, data = {} }) => {
  const form = useForm({
    defaultValues: data
  });

  const { reset } = form;
  React.useEffect(() => {
    reset(data);
  }, [reset, data]);

  const priceInputs = React.useMemo(() => {
    const inputs = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 10; index++) {
      inputs.push(
        <Grid key={`price_${index}`} item xs={6}>
          <InputField
            autoFocus
            type="number"
            name={`price${index + 1}`}
            label={`Giá ${index + 1}`}
            fullWidth
            variant="outlined"
            size="small"
          />
        </Grid>
      );
    }
    return inputs;
  }, []);

  return (
    <FormProvider {...form}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Điều chỉnh sản phẩm {data?.product_name}</DialogTitle>
        <DialogContent>
          <Grid container py={2} spacing={2}>
            {priceInputs}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <LoadingAsyncButton onClick={form.handleSubmit(onSubmit)} variant="contained">
            Cập nhật
          </LoadingAsyncButton>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
};
export default EditProductDialog;
