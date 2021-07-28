/* eslint-disable react/prop-types */
import { FormControl, FormControlLabel, FormHelperText, Switch } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const SwitchField = ({
  name,
  label,
  size,
  fullWidth,
  rules,
  defaultValue = false,
  className,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <FormControlLabel
          error={fieldState.error}
          className={className}
          fullWidth={fullWidth}
          size={size}
          label={label}
          control={<Switch checked={field.value} name={name} />}
          {...field}
          {...props}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
    />
  );
};

export default SwitchField;
