/* eslint-disable react/prop-types */
import { Autocomplete, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const AutoCompleteField = ({ name, label, rules, defaultValue = '', placeholder, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <Autocomplete
          {...props}
          {...field}
          label={label}
          onChange={(event, newValue) => {
            field.onChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              label={label}
              placeholder={placeholder}
            />
          )}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
    />
  );
};

export default AutoCompleteField;
