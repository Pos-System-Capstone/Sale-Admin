import { Box, Card, Chip, Grid, Stack, Typography } from '@material-ui/core';
import Label from 'components/Label';
import { CardTitle } from 'pages/Products/components/Card';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import MenuInStoreCalendar from '../components/MenuInStoreCalendar';

const StoreApplyTab = ({ checkedStores }) => {
  const [checked, setChecked] = useState(checkedStores ?? []);
  const stores = useSelector((state) => state.admin?.stores);

  const [appliedStores, setappliedStores] = useState([
    {
      time_range: ['07:00', '12:00'],
      stores: [
        {
          store_name: 'Cửa hàng 1'
        },
        {
          store_name: 'Cửa hàng 2'
        },
        {
          store_name: 'Cửa hàng 3'
        }
      ]
    },
    {
      time_range: ['12:30', '16:00'],
      stores: [
        {
          store_name: 'Cửa hàng 2'
        },
        {
          store_name: 'Cửa hàng 3'
        },
        {
          store_name: 'Cửa hàng 4'
        }
      ]
    }
  ]);

  const handleCheck = (e) => {
    let updated = [...checked];
    if (e.target.checked) {
      updated.push(Number(e.target.value));
    } else {
      updated = updated.filter((id) => id !== +e.target.value);
    }
    setChecked(updated);
  };
  const handleCheckAll = (e) => {
    const updated = e.target.checked ? stores?.map(({ id }) => id) : [];
    setChecked(updated);
  };

  const isChecked = (id) => checked.includes(id);
  return (
    <Box>
      <Card>
        <CardTitle>Danh sách các cửa hàng được áp dụng bảng giá</CardTitle>
        <MenuInStoreCalendar />
      </Card>
    </Box>
  );
};

export default StoreApplyTab;
