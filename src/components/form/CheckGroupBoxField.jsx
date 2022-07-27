/* eslint-disable react/prop-types */
// import { Checkbox, FormControlLabel } from '@mui/material';
import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const CheckGroupBoxField = ({ name, arr = [], rules = null, defaultValue = false, ...props }) => {
  const { control } = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <>
          {arr.map((item) => {
            return (
              <FormControlLabel
                {...props}
                key={item.value}
                control={
                  <Checkbox
                    helperText={fieldState.error ? fieldState.error.message : props.helperText}
                    {...field}
                    error={Boolean(fieldState.isTouched && fieldState.error)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        const updatedValue = [...(field.value ?? []), field.value];
                        field.onChange(updatedValue);
                      } else {
                        const updatedValue = [...(field.value ?? [])].filter(
                          (x) => x !== item.value
                        );
                        field.onChange(updatedValue);
                      }
                    }}
                    inputRef={field.ref}
                    icon={props.icon}
                    checkedIcon={props.checkedIcon}
                  />
                }
                label={item.label}
              />
            );
          })}
        </>
      )}
      name={name}
      control={control}
      rules={rules}
    />
  );
};

export default CheckGroupBoxField;
