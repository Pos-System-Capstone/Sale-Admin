import React from 'react';

/* eslint-disable camelcase */
import { Chip, Avatar } from '@material-ui/core';
import { PRODUCT_TYPE_DATA } from '../../constraints';

export const productColumns = [
  {
    title: 'Mã sản phẩm',
    dataIndex: 'code'
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'pic_url',
    render: (src, { product_name }) => (
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
    title: 'Loại Sản Phẩm',
    dataIndex: 'product_type',
    render: (type) => <Chip label={PRODUCT_TYPE_DATA.find(({ value }) => value === type).label} />
  },
  {
    title: 'Nhóm Sản Phẩm',
    dataIndex: 'cate_name',
    valueType: 'select'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'is_available',
    width: 150,
    render: (available) => (
      <Chip
        label={available ? 'Đang bán' : 'Ngừng bán'}
        color={available ? 'primary' : 'secondary'}
      />
    )
  }
];
