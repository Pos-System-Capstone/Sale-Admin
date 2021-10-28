import { TableCell } from '@mui/material';

export const getCellValue = (cell: any, ...args: any[]) => {
  switch (typeof cell) {
    case 'string':
      return cell;
    case 'function':
      return cell(...args);
    default:
      return '-';
  }
};

export const removeEmptyField = (obj: any) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null && v !== ''));

export const transformParamToHyphen = (params: any) => {
  const transformParams: any = {};

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      const transformKey = key.replaceAll('_', '-');
      transformParams[transformKey] = value;
    }
  }

  return removeEmptyField(transformParams);
};
