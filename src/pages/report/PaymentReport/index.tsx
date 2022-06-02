/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Box, Button, Card, Chip, SelectChangeEvent, Stack, Typography } from '@mui/material';
// components
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import { DAY_OF_WEEK } from 'constraints';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
// material
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCollection } from 'redux/collections/api';
import { TCollection } from 'types/collection';
import { Menu } from 'types/menu';
import { TTableColumn } from 'types/table';

const CollectionListPage = () => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const tableRef = useRef<any>();

  const [currentDeleteItem, setCurrentDeleteItem] = useState<TCollection | null>(null);

  const orderColumns: TTableColumn<Menu>[] = [
    {
      title: 'Ngày',
      valueType: 'select',
      valueEnum: DAY_OF_WEEK,
      render: (_: any, { day_filters: dayFilters, menu_id }: Menu) => (
        <Stack direction="row" spacing={1}>
          {dayFilters?.map((day) => (
            <Chip
              size="small"
              key={`${menu_id}-${day}`}
              label={DAY_OF_WEEK.find(({ value }) => value === day)?.label}
            />
          ))}
        </Stack>
      )
    },
    {
      title: 'Tiền mặt bán hàng',
      hideInSearch: true
    },
    {
      title: 'Tiền mặt nạp thẻ',
      hideInSearch: true
    },
    {
      title: 'Tiền sử dụng TTV',
      hideInSearch: true
    },
    {
      title: 'Ngân hàng',
      hideInSearch: true
    },
    {
      title: 'Ví điện tử',
      hideInSearch: true
    }
  ];

  const deleteCategoryHander = () =>
    deleteCollection(currentDeleteItem?.id!)
      .then(() => setCurrentDeleteItem(null))
      .then(tableRef.current?.reload)
      .then(() =>
        enqueueSnackbar(`Xóa thành công`, {
          variant: 'success'
        })
      )
      .then(() => tableRef.current?.reload())
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  //
  const [dow, setDow] = useState('Hôm nay');

  const handleChangeDayOfWeek = (event: SelectChangeEvent) => {
    setDow(event.target.value as string);
  };
  //

  return (
    // <Page
    //   title={translate('collections.list')}
    //   actions={() => [
    //     <Button
    //       key="add-group-combo"
    //       onClick={() => {
    //         navigate(
    //           `${PATH_DASHBOARD.collections.new}?type=${CollectionTypeEnum.GroupCollection}`
    //         );
    //       }}
    //       variant="outlined"
    //     >
    //       Tạo nhóm combo
    //     </Button>,
    //     <Button
    //       key="add-collection"
    //       onClick={() => {
    //         navigate(PATH_DASHBOARD.collections.new);
    //       }}
    //       variant="contained"
    //       startIcon={<Icon icon={plusFill} />}
    //     >
    //       {translate('collections.addBtn')}
    //     </Button>
    //   ]}
    // >
    //   <DeleteConfirmDialog
    //     open={Boolean(currentDeleteItem)}
    //     onClose={() => setCurrentDeleteItem(null)}
    //     onDelete={deleteCategoryHander}
    //     title={
    //       <>
    //         {translate('common.confirmDeleteTitle')} <strong>{currentDeleteItem?.name}</strong>
    //       </>
    //     }
    //   />
    //   <Card>
    //     <Stack spacing={2}>
    //       <ResoTable
    //         ref={tableRef}
    //         onEdit={(collecton: TCollection) =>
    //           navigate(`${PATH_DASHBOARD.collections.root}/${collecton.id}`, {
    //             state: collecton
    //           })
    //         }
    //         onDelete={setCurrentDeleteItem}
    //         rowKey="id"
    //         getData={getCollections}
    //         columns={columns}
    //       />
    //     </Stack>
    //   </Card>
    // </Page>
    <Page
      title="Báo cáo theo hình thức thanh toán"
      actions={() => [
        <Button key="add-category" variant="contained" startIcon={<Icon icon={plusFill} />}>
          {/* {translate('categories.addBtn')} */}
          XUẤT RA FILE EXCEL
        </Button>
      ]}
    >
      <Typography>Tính đến 13:52:13</Typography>

      <Card>
        <Stack spacing={2}>
          {/* <Box sx={{ textAlign: 'right' }}>
            <FormControl>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dow}
                onChange={handleChangeDayOfWeek}
              >
                <MenuItem value={'Hôm nay'}>Hôm nay</MenuItem>
                <MenuItem value={'Hôm qua'}>Hôm qua</MenuItem>
                <MenuItem value={'Tuần này'}>Tuần này</MenuItem>
                <MenuItem value={'Tuần trước'}>Tuần trước</MenuItem>
                <MenuItem value={'Tháng này'}>Tháng này</MenuItem>
                <MenuItem value={'Tháng trước'}>Tháng trước</MenuItem>
                <MenuItem value={'Tùy chọn'}>Tùy chọn</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Button variant="contained">XUẤT RA FILE EXCEL</Button>
          </Box> */}
          <Box>
            <ResoTable showAction={false} columns={orderColumns} />
          </Box>
        </Stack>
      </Card>
    </Page>
  );
};

export default CollectionListPage;
