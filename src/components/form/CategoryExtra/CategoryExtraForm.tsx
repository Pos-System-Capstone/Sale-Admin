import trashIcon from '@iconify/icons-eva/trash-outline';
import { Icon } from '@iconify/react';
import { Grid, Box, Typography, Slider, IconButton, Button, Stack } from '@mui/material';
import useLocales from 'hooks/useLocales';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { modifierSelectTypeOptions } from 'types/Modifier';
import { ErrorMessage } from '@hookform/error-message';
import { InputField, SelectField, CheckBoxField, AutoCompleteField } from '..';
import useCategories from 'hooks/categories/useCategories';
import useExtras from 'hooks/extras/useExtras';

interface Props {
  updateMode?: boolean;
}

const marks = [
  {
    value: 0,
    label: 'Đầu tiền'
  },
  {
    value: 100,
    label: 'Cuối cùng'
  }
];

const CategoryExtraForm = ({ updateMode }: Props) => {
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const { data: extras = [] } = useExtras();

  const extraOptions = extras.map((c) => ({ label: c.cate_name, value: c.cate_id }));

  const getOpObj = (option: any) => {
    if (!option) return option;
    if (!option.value) return extraOptions.find((opt) => opt.value === option);
    return option;
  };

  return (
    <Grid container spacing={2}>
      <InputField name="cate_id" sx={{ display: 'none' }} />
      <Grid item xs={6}>
        <AutoCompleteField
          disabled={updateMode}
          options={extraOptions}
          getOptionLabel={(value: any) => {
            console.log(`option label`, value);
            return getOpObj(value)?.label;
          }}
          isOptionEqualToValue={(option: any, value: any) => {
            if (!option) return option;
            return option.value === getOpObj(value)?.value;
          }}
          transformValue={(opt: any) => opt.value}
          name="extra_cate_id"
          size="small"
          type="text"
          label=""
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <SelectField
          options={modifierSelectTypeOptions}
          name="select_type"
          type="text"
          label="Kiểu"
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={6}>
        <InputField type="number" size="small" fullWidth name="min" label="Tối thiểu" />
      </Grid>
      <Grid item xs={6}>
        <InputField type="number" size="small" fullWidth name="max" label="Tối đa" />
      </Grid>
    </Grid>
  );
};

export default CategoryExtraForm;
