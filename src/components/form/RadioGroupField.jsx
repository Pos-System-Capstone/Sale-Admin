/* eslint-disable react/prop-types */
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup
} from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const RadioGroupField = ({
  name,
  label,
  size,
  children,
  fullWidth,
  rules,
  disabled,
  defaultValue = '',
  options,
  className,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <FormControl
          component="fieldset"
          error={fieldState.error}
          className={className}
          fullWidth={fullWidth}
          size={size}
          disabled={disabled}
        >
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup name={name} {...field} {...props}>
            {children ??
              options?.map(({ label, value, id }) => (
                <FormControlLabel
                  key={`${name}-radio-${value}`}
                  value={value}
                  control={<Radio size="small" />}
                  label={label}
                />
              ))}
          </RadioGroup>
          <FormHelperText>{fieldState.error && fieldState.error.message}</FormHelperText>
        </FormControl>
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
    />
  );
};

export default RadioGroupField;
