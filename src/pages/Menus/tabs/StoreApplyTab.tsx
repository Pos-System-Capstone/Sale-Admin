import {
  Button,
  Box,
  Card,
  Grid,
  FormControlLabel,
  Checkbox,
  Stack,
  Typography,
  Divider,
  Alert
} from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const StoreApplyTab = ({ checkedStores }: { checkedStores: number[] | null }) => {
  const [checked, setChecked] = useState<number[]>(checkedStores ?? []);
  const stores = useSelector((state: any) => state.admin?.stores);

  const handleCheck = (e: any) => {
    let updated = [...checked];
    if (e.target.checked) {
      updated.push(Number(e.target.value));
    } else {
      updated = updated.filter((id) => id !== +e.target.value);
    }
    setChecked(updated);
  };
  const handleCheckAll = (e: any) => {
    const updated = e.target.checked ? stores?.map(({ id }: { id: number }) => id) : [];
    setChecked(updated);
  };

  const isChecked = (id: number) => checked.includes(id);

  return (
    <Box>
      <Card>
        <Alert
          sx={{
            alignItems: 'center'
          }}
          action={
            <Button size="small" variant="contained">
              Cập nhật
            </Button>
          }
          severity="info"
          icon={false}
        >
          <FormControlLabel
            control={
              <Checkbox
                name="check-all"
                indeterminate={!!checked.length && checked.length !== stores?.length}
                color="primary"
                onChange={handleCheckAll}
              />
            }
            label={
              <Typography>
                Đã chọn <strong>{checked.length}</strong> cửa hàng
              </Typography>
            }
          />
        </Alert>
        <Grid p={2} spacing={2} container>
          {stores?.map((store: any, index: number) => (
            <Grid item xs={3} key={`stores-${store?.id}`}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheck}
                    value={store?.id}
                    name={`check-${index}`}
                    color="primary"
                    checked={isChecked(store.id)}
                  />
                }
                label={store.name}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
};

export default StoreApplyTab;
