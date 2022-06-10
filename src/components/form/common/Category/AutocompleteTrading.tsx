import { AutoCompleteField } from 'components/form';
import useTrading from 'hooks/report/useTrading';
import React from 'react';

interface Props {
  name: string;
  label?: string;
  [key: string]: any;
}

const AutocompleteTrading = (props: Props) => {
  const { data: extras = [] } = useTrading();
  console.log(extras);
  const extraOptions = extras.map((c: any) => ({ label: c.storeName, value: c.storeName }));
  const getOpObj = (option: any) => {
    if (!option) return option;
    if (!option.value) return extraOptions.find((opt: any) => opt.value === option);
    return option;
  };

  return (
    <AutoCompleteField
      options={extraOptions}
      getOptionLabel={(value: any) => {
        return getOpObj(value)?.label;
      }}
      isOptionEqualToValue={(option: any, value: any) => {
        if (!option) return option;
        return option.value === getOpObj(value)?.value;
      }}
      transformValue={(opt: any) => opt.value}
      size="small"
      type="text"
      {...props}
      label={props.label}
      name={props.name}
      fullWidth
    />
  );
};

export default AutocompleteTrading;
