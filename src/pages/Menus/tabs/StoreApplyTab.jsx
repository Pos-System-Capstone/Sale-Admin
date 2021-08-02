import { Box, Card, Chip, Grid, Stack, Typography } from '@material-ui/core';
import Label from 'components/Label';
import { CardTitle } from 'pages/Products/components/Card';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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
        <Grid container spacing={2}>
          {appliedStores.map(({ time_range, stores }) => (
            <>
              <Grid item xs={12} sm={4}>
                <Typography variant="h5">Khung giờ</Typography>
                Từ <Label color="success">{time_range[0]}</Label> đến{' '}
                <Label color="success">{time_range[1]}</Label>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box>
                  <Typography variant="h5">Cửa hàng áp dụng</Typography>
                  <Stack direction="row" spacing={2}>
                    {stores.map(({ store_name }) => (
                      <Chip key={store_name} label={store_name} />
                    ))}
                  </Stack>
                </Box>
              </Grid>
            </>
          ))}
        </Grid>
      </Card>
    </Box>
  );
};

export default StoreApplyTab;
