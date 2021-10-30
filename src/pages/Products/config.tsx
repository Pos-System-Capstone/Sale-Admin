import { Avatar, Chip } from '@mui/material';
import Label from 'components/Label';
import { PRODUCT_TYPE_DATA } from 'constraints';
import React from 'react';
import { TProductBase } from 'types/product';
import { TTableColumn } from 'types/table';

export const productColumns: TTableColumn<TProductBase>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    hideInSearch: true
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'pic_url',
    hideInSearch: true,
    render: (src, { product_name }: any) => (
      <Avatar
        alt={product_name}
        src={src}
        variant="square"
        style={{ width: '54px', height: '54px' }}
      />
    )
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'product_name'
  },
  {
    title: 'Nhóm Sản Phẩm',
    dataIndex: 'cate_name',
    valueType: 'select',
    hideInSearch: true
  },
  {
    title: 'Loại Sản Phẩm',
    dataIndex: 'product_type',
    valueType: 'select',
    valueEnum: PRODUCT_TYPE_DATA,
    render: (type) => <Chip label={PRODUCT_TYPE_DATA.find(({ value }) => value == type)?.label} />
  },
  {
    title: 'Thực đơn',
    dataIndex: 'product_in_menu',
    hideInSearch: true,
    render: (productInMenus) => (
      <Label color={!productInMenus?.length ? 'default' : 'info'}>
        {!productInMenus?.length
          ? 'Chưa được bán ở thực đơn nào'
          : `Đang bán trong ${productInMenus.length} thực đơn`}
      </Label>
    )
  },
  {
    title: 'Trạng thái',
    dataIndex: 'is_available',
    width: 150,
    render: (available) => (
      <Label color={available ? 'primary' : 'default'}>
        {available ? 'Đang bán' : 'Ngừng bán'}
      </Label>
    ),
    valueEnum: [
      {
        label: 'Đang bán',
        value: 'true'
      },
      {
        label: 'Ngừng bán',
        value: 'false'
      }
    ],
    valueType: 'select',
    formProps: {
      fullWidth: true
    }
  }
];
