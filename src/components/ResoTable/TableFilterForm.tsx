import { Grid } from '@material-ui/core';
import { CheckBoxField, InputField, RadioGroupField, SelectField } from 'components/form';
import React from 'react';
import { TableValueType, TTableColumn } from 'types/table';

type TableType = TTableColumn<any>;

interface Props {
  controls: TableType[];
}

const buildFormItem = (tableConfig: TableType) => {
  const { valueType, dataIndex, title, valueEnum = [], formProps = {} } = tableConfig;
  let C: any = InputField;
  const props: any = {
    label: title,
    name: dataIndex,
    size: 'small',
    fullWidth: true,
    ...formProps
  };
  switch (valueType) {
    case 'text':
      C = InputField;
      break;
    case 'radio':
      props.options = valueEnum;
      C = RadioGroupField;
      break;
    case 'select':
      props.options = valueEnum;
      C = SelectField;
      break;
    case 'checkbox':
      C = CheckBoxField;
      break;

    default:
      break;
  }
  return <C {...props} />;
};

const TableFilterForm = ({ controls }: Props) => {
  const buildFormList = () => {
    const gridItem: JSX.Element[] = controls
      .filter(({ hideInSearch, valueType }) => !hideInSearch && valueType !== 'option')
      .map((control) => {
        const controlComponent = buildFormItem(control);
        return (
          <Grid key={`${control.title}`} item xs={12} sm={4} md={3}>
            {controlComponent}
          </Grid>
        );
      });
    return gridItem;
  };

  return (
    <Grid container spacing={2}>
      {buildFormList()}
    </Grid>
  );
};

export default TableFilterForm;
