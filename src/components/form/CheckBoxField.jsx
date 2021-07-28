/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const CheckBoxField = ({ name, label, rules, defaultValue = false, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <FormControlLabel
          {...props}
          control={
            <Checkbox
              error={fieldState.isTouched && fieldState.error}
              helperText={fieldState.error ? fieldState.error.message : props.helperText}
              {...field}
              checked={field.value}
              inputRef={field.ref}
            />
          }
          label={label}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
    />
  );
};

export default CheckBoxField;
