import { ReactElement } from 'react';

export type TTableColumn<T extends any> = {
  title: string | ReactElement;
  dataIndex: keyof T | 'index' | undefined;
  fixed?: 'left' | 'right' | undefined;
  render?: (value: any, data: T) => string | JSX.Element | undefined;
  width?: number | string;
  hideInSearch?: boolean;
} & (
  | {
      valueEnum?: TableValueEnum[];
      valueType?: TableValueType;
      formProps?: {
        fullWidth?: boolean;
        [key: string]: any;
      };
    }
  | {
      valueType: 'select';
      valueEnum: TableValueEnum[];
      formProps?: {
        options?: TableValueEnum[];
        [key: string]: any;
      };
    }
);

export type TableValueType = 'text' | 'select' | 'checkbox' | 'radio' | 'option';

type TableValueEnum = {
  label: any;
  value: any;
};
