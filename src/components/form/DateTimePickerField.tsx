/* eslint-disable react/prop-types */
import { DateTimePicker } from '@mui/lab';
import { TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

const DateTimePickerField = ({ name, label, defaultValue = '', transform, ...props }: any) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      defaultValue={defaultValue || null}
      render={({ field, fieldState }) => (
        <DateTimePicker
          label={label}
          renderInput={(params) => (
            <TextField error={Boolean(fieldState.error)} {...params} {...props} />
          )}
          {...field}
          onChange={(e) => field.onChange(transform ? transform.output(e) : e)}
          {...props}
        />
      )}
      name={name}
    />
  );
};

export default DateTimePickerField;
