import { TTableColumn } from 'types/table';

export const promotionColumn: TTableColumn[] = [
  {
    title: 'NO',
    hideInSearch: true
  },

  {
    title: 'NAME'
  },
  {
    title: 'TYPE',
    hideInSearch: true
  },
  {
    title: 'ACTION',
    hideInSearch: true
  },
  {
    title: 'START',
    hideInSearch: true
  },
  {
    title: 'STATUS',
    valueEnum: [
      {
        label: 'ALL',
        value: 'true'
      },
      {
        label: 'DRAFT',
        value: 'false'
      },
      {
        label: 'PUBLISH',
        value: 'true'
      },
      {
        label: 'UNPUBLISH',
        value: 'false'
      },
      {
        label: 'EXPIRED',
        value: 'false'
      }
    ],
    valueType: 'select',
    formProps: {
      fullWidth: true
    }
  }
];
