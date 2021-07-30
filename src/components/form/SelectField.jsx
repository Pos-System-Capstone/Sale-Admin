/* eslint-disable react/prop-types */
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const SelectField = ({
  name,
  label,
  size,
  children = null,
  fullWidth = false,
  rules = null,
  disabled = false,
  options,
  className = null,
  multiple = false,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <FormControl
          error={Boolean(fieldState.error)}
          className={className}
          fullWidth={fullWidth}
          size={size}
          disabled={disabled}
        >
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Select
            multiple={multiple}
            {...props}
            id={name}
            helperText={fieldState.error ? fieldState.error.message : props.helperText}
            label={label}
            {...field}
            error={Boolean(fieldState.error)}
            value={field.value || []}
          >
            {children ??
              options?.map(({ label, value, id }) => (
                <MenuItem value={value} key={`${id}`}>
                  {label}
                </MenuItem>
              ))}
            {!children && !options?.length && (
              <MenuItem value="" disabled key={`${name}-select-empty`}>
                Trống
              </MenuItem>
            )}
          </Select>
          <FormHelperText>{fieldState.error && fieldState.error.message}</FormHelperText>
        </FormControl>
      )}
      name={name}
      control={control}
      defaultValue={multiple ? [] : ''}
      rules={rules}
    />
  );
};

export default SelectField;
