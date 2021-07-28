/* eslint-disable no-unused-expressions */
import { Box, Stack } from '@material-ui/core';
import { useDebounceFn } from 'ahooks';
import React from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { PRODUCT_MASTER } from '../../constraints';
import { InputField, SelectField } from '../../components/form';

const SeachProductForm = ({ onChange = console.log }) => {
  const form = useForm({
    defaultValues: {
      code: null,
      'product-name': null,
      'product-type-id': PRODUCT_MASTER,
      'is-available': null
    }
  });

  const { run } = useDebounceFn(
    (values) => {
      if (onChange) {
        onChange(values);
      }
    },
    {
      wait: 500
    }
  );

  const { control } = form;

  const watchValues = useWatch({
    control
  });

  React.useEffect(() => {
    run(watchValues);
  }, [watchValues, run]);

  return (
    <FormProvider {...form}>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Stack direction="row" spacing={2}>
          <InputField name="code" size="small" type="text" label="Mã sản phẩm" />
          <InputField name="product-name" size="small" type="email" label="Tên sản phẩm" />
        </Stack>
        <Box>
          <SelectField
            sx={{ minWidth: '150px' }}
            options={[
              {
                label: 'Tất cả',
                value: ''
              },
              {
                label: 'Đang bán',
                value: 'true'
              },
              {
                label: 'Ngừng bán',
                value: 'false'
              }
            ]}
            name="is-available"
            size="small"
            label="Trạng thái"
          />
        </Box>
        {/* <FormControlLabel control={<Checkbox />} label="Đang bán" /> */}
      </Stack>
    </FormProvider>
  );
};

export default SeachProductForm;
