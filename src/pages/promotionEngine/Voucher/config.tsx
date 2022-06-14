// import { Avatar } from '@mui/material';
// import AutocompleteCategory from 'components/form/common/Category/AutocompleteCategory';
// import Label from 'components/Label';
// import { PRODUCT_TYPE_DATA } from 'constraints';
// import React from 'react';
import { TProductBase } from 'types/product';
import { TTableColumn } from 'types/table';

export const productColumns: TTableColumn<TProductBase>[] = [
  {
    title: 'NO',
    hideInSearch: true
  },
  // {
  //   title: 'Hình ảnh',
  //   dataIndex: 'pic_url',
  //   hideInSearch: true,
  //   render: (src, { product_name }: any) => (
  //     <Avatar
  //       alt={product_name}
  //       src={src}
  //       variant="square"
  //       style={{ width: '54px', height: '54px' }}
  //     />
  //   )
  // },
  {
    title: 'NAME',
    dataIndex: 'product_name',
    hideInSearch: true
  },
  // {
  //   title: 'Giá mặc định',
  //   dataIndex: 'price',
  //   hideInSearch: true
  // },
  {
    title: 'ACTION NAME',
    dataIndex: 'cate_name',
    // renderFormItem: () => <AutocompleteCategory name="cat-id" label="Danh mục" />
    hideInSearch: true
  },
  {
    title: 'TOTAL',
    hideInSearch: true

    // dataIndex: 'product_type',
    // valueType: 'select',
    // valueEnum: PRODUCT_TYPE_DATA
    // hideInSearch: true
    // render: (type) => <Chip label={PRODUCT_TYPE_DATA.find(({ value }) => value == type)?.label} />
  },
  {
    title: 'REDEMPED',
    hideInSearch: true
  },
  {
    title: 'USED',
    hideInSearch: true
  }

  // {
  //   title: 'Trạng thái',
  //   dataIndex: 'is_available',
  //   width: 150,
  //   render: (available) => (
  //     <Label color={available ? 'primary' : 'default'}>
  //       {available ? 'Đang bán' : 'Ngừng bán'}
  //     </Label>
  //   ),
  //   valueEnum: [
  //     {
  //       label: 'Đang bán',
  //       value: 'true'
  //     },
  //     {
  //       label: 'Ngừng bán',
  //       value: 'false'
  //     }
  //   ],
  //   valueType: 'select',
  //   formProps: {
  //     fullWidth: true
  //   }
  // }
];
