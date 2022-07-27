/* eslint-disable react/prop-types */
// import { Checkbox, FormControlLabel } from '@mui/material';
import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const CheckGroupBoxField = ({ name, arr = [], rules = null, defaultValue = false, ...props }) => {
  const { control } = useFormContext();
  //   const paymentMethod = paymentMethodList();
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <div>
          {arr.map((item) => {
            return (
              <FormControlLabel
                key={item.value}
                control={
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        const updatedValue = [...(field.value ?? []), item.value];
                        field.onChange(updatedValue);
                      } else {
                        const updatedValue = [...(field.value ?? [])];
                        const reUpdateValue = updatedValue.filter((item) => item === item.value);
                        field.onChange(reUpdateValue);
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
        </div>
      )}
      control={control}
    />
  );
};

export default CheckGroupBoxField;
