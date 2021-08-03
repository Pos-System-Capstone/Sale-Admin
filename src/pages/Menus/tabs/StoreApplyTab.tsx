import { Box, Card } from '@material-ui/core';
import { CardTitle } from 'pages/Products/components/Card';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import MenuInStoreCalendar from '../components/MenuInStoreCalendar';

const StoreApplyTab = ({ checkedStores }: any) => {
  const stores = useSelector((state: RootState) => state.admin?.stores);

  return (
    <Box>
      <Card>
        <Box display="flex" justifyContent="space-between">
          <CardTitle>Danh sách các cửa hàng được áp dụng bảng giá</CardTitle>
        </Box>
        <MenuInStoreCalendar />
      </Card>
    </Box>
  );
};

export default StoreApplyTab;
