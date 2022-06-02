/* eslint-disable camelcase */
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
// material
import { Box, Button, Card, SelectChangeEvent, Stack, Typography } from '@mui/material';
import CategoryModal from 'components/CategoryModal';
import DeleteConfirmDialog from 'components/DelectConfirmDialog';
import AutoCompleteStoreSelect from 'components/form/common/AutocompleteStoreSelect/AutocompleteStoreSelect';
import Page from 'components/Page';
import ResoTable from 'components/ResoTable/ResoTable';
import { DAY_OF_WEEK } from 'constraints';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import { useSnackbar } from 'notistack';
import { useEffect, useMemo, useRef, useState } from 'react';
// components
import { useNavigate } from 'react-router-dom';
import { addCategoy, deleteCategoyById, editCategory } from 'redux/category/api';
import { PATH_DASHBOARD } from 'routes/paths';
import { TCategory } from 'types/category';
//
import { Menu } from 'types/menu';
import { TTableColumn } from 'types/table';

const CategoryListPage = ({ isExtra = false }: { isExtra?: boolean }) => {
  const navigate = useNavigate();
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  console.log(`isExtra`, isExtra);

  const tableRef = useRef<any>();
  const [formModal, setFormModal] = useState(false);
  const [updateCateId, setUpdateCateId] = useState<number | null>(null);
  const [currentDeleteItem, setCurrentDeleteItem] = useState<TCategory | null>(null);

  // const columns: TTableColumn<TCategory>[] = [
  //   {
  //     title: 'Hình ảnh',
  //     dataIndex: 'pic_url',
  //     hideInSearch: true,
  //     render: (src, { product_name }: any) => (
  //       <Avatar
  //         alt={product_name}
  //         src={src}
  //         variant="square"
  //         style={{ width: '54px', height: '54px' }}
  //       />
  //     )
  //   },
  //   {
  //     title: translate('categories.table.cateName'),
  //     dataIndex: 'cate_name'
  //   },
  //   {
  //     title: translate('categories.table.position'),
  //     dataIndex: 'position',
  //     hideInSearch: true
  //   }
  // ];
  const orderColumns: TTableColumn<Menu>[] = [
    {
      title: 'STT',

      hideInSearch: true
    },
    {
      title: translate('pages.orders.table.store'),
      dataIndex: ['store', 'name'],
      renderFormItem: () => <AutoCompleteStoreSelect name="store-id" label="Cửa hàng" />
    },
    {
      title: 'Loại',
      hideInTable: true,
      valueEnum: [
        {
          label: 'Sản phẩm',
          value: 'true'
        },
        {
          label: 'Nhóm sản phẩm',
          value: 'false'
        }
      ],
      valueType: 'select'
    },
    {
      title: 'Chọn biểu đồ',
      hideInTable: true,
      valueEnum: [
        {
          label: 'Giảm giá',
          value: 'true'
        },
        {
          label: 'Trước giảm giá',
          value: 'false'
        }
      ],
      valueType: 'select'
    },
    {
      title: 'Ngày',
      valueType: 'select',
      valueEnum: DAY_OF_WEEK
      // render: (_: any, { day_filters: dayFilters, menu_id }: Menu) => (
      //   <Stack direction="row" spacing={1}>
      //     {dayFilters?.map((day) => (
      //       <Chip
      //         size="small"
      //         key={`${menu_id}-${day}`}
      //         label={DAY_OF_WEEK.find(({ value }) => value === day)?.label}
      //       />
      //     ))}
      //   </Stack>
      // )
    }
  ];

  useEffect(() => {
    const form = tableRef.current?.formControl;
    if (form) {
      form.setValue('is-extra', isExtra);
    }
  }, [isExtra, tableRef]);

  const addCategoryHander = (values: TCategory) =>
    addCategoy(values)
      .then(() =>
        enqueueSnackbar(`Tạo thành công`, {
          variant: 'success'
        })
      )
      .then(() => setUpdateCateId(null))
      .then(tableRef.current?.reload)
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const editCategoryHander = (values: TCategory) =>
    editCategory(updateCateId!, values)
      .then(tableRef.current?.reload)
      .then(() =>
        enqueueSnackbar(`Cập nhật thành công`, {
          variant: 'success'
        })
      )
      .catch((err) => {
        const errMsg = get(err.response, ['data', 'message'], `Có lỗi xảy ra. Vui lòng thử lại`);
        enqueueSnackbar(errMsg, {
          variant: 'error'
        });
      });

  const deleteCategoryHander = () =>
    deleteCategoyById(currentDeleteItem?.cate_id!)
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
  const containsText = (text: string, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const allOptions = ['Option One', 'Option Two', 'Option Three', 'Option Four'];
  const [selectedOption, setSelectedOption] = useState(allOptions[0]);

  const [searchText, setSearchText] = useState('');
  const displayedOptions = useMemo(
    () => allOptions.filter((option) => containsText(option, searchText)),
    [searchText]
  );

  //
  const [dow, setDow] = useState('Hôm nay');

  const handleChangeDayOfWeek = (event: SelectChangeEvent) => {
    setDow(event.target.value as string);
  };
  //
  const [openChart, setOpenChart] = useState(false);
  //
  const [value, setValue] = useState<Date | null>(null);
  //
  return (
    <>
      {isExtra ? (
        <Page
          title="Báo cáo diễn tiến sản phẩm"
          actions={() => [
            <Button
              key="add-category"
              onClick={() => {
                navigate(`${PATH_DASHBOARD.categories.new}?isExtra=${isExtra}`);
              }}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
              {/* {translate('categories.addBtn')} */}
              XUẤT RA FILE EXCEL
            </Button>
          ]}
        >
          <Typography sx={{ mt: '-32px', mb: '32px' }}>(23/05/2022)</Typography>
          <CategoryModal
            open={formModal}
            cate_id={updateCateId}
            onClose={() => setFormModal(false)}
            onAdd={addCategoryHander}
            onEdit={editCategoryHander}
          />
          <DeleteConfirmDialog
            open={Boolean(currentDeleteItem)}
            onClose={() => setCurrentDeleteItem(null)}
            onDelete={deleteCategoryHander}
            title={
              <>
                {translate('common.confirmDeleteTitle')}{' '}
                <strong>{currentDeleteItem?.cate_name}</strong>
              </>
            }
          />
          <Card>
            <Stack spacing={2}>
              {/* <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '50%' }}>
                  <FormControl sx={{ width: '50%' }}>
                    <FormLabel id="demo-radio-buttons-group-label">Chọn loại :</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="san pham"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel value="san pham" control={<Radio />} label="Sản Phẩm" />
                      <FormControlLabel
                        value="nhom san pham"
                        control={<Radio />}
                        label="Nhóm Sản Phẩm"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl sx={{ width: '50%' }}>
                    <FormLabel id="demo-radio-buttons-group-label">Chọn biểu đồ :</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="truoc giam gia"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="truoc giam gia"
                        control={<Radio />}
                        label="Trước giảm giá"
                      />
                      <FormControlLabel
                        value="sau giam gia"
                        control={<Radio />}
                        label="Sau giảm giá"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
                <Box sx={{ width: '50%' }}>
                  <FormControl fullWidth>
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Basic example"
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    <Typography>đến</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Basic example"
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '50%' }}>
                  <Button variant="contained" onClick={() => setOpenChart((prev) => !prev)}>
                    {openChart ? 'ẨN BIỂU ĐỒ' : 'HIỂN THỊ BIỂU ĐỒ'}
                  </Button>
                </Box>
                <Box sx={{ width: '50%', textAlign: 'center' }}>
                  <Button variant="contained">LỌC KẾT QUẢ</Button>
                </Box>
              </Box>
              {openChart && (
                <Box>
                  <img
                    src="https://i.pinimg.com/originals/84/37/28/843728503b72b20cd0ebad06ce4137c9.png"
                    alt=""
                  />
                </Box>
              )}
              <Box>
                <ResoTable />
              </Box> */}
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '50%' }}>
                  <Button variant="contained" onClick={() => setOpenChart((prev) => !prev)}>
                    {openChart ? 'ẨN BIỂU ĐỒ' : 'HIỂN THỊ BIỂU ĐỒ'}
                  </Button>
                </Box>
              </Box>
              {openChart && (
                <Box>
                  <img
                    src="https://i.pinimg.com/originals/84/37/28/843728503b72b20cd0ebad06ce4137c9.png"
                    alt=""
                  />
                </Box>
              )}
              <Box>
                <ResoTable
                  showAction={false}
                  columns={orderColumns}
                  // rowKey="menu_id"
                  // getData={(params: any) => orderApi.get(params)}
                />
              </Box>
            </Stack>
          </Card>
        </Page>
      ) : (
        <Page
          title="Báo cáo doanh thu sản phẩm"
          actions={() => [
            <Button
              key="add-category"
              onClick={() => {
                navigate(`${PATH_DASHBOARD.categories.new}?isExtra=${isExtra}`);
              }}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
              {/* {translate('categories.addBtn')} */}
              XUẤT RA FILE EXCEL
            </Button>
          ]}
        >
          <Typography sx={{ mt: '-32px', mb: '32px' }}>(23/05/2022)</Typography>
          <CategoryModal
            open={formModal}
            cate_id={updateCateId}
            onClose={() => setFormModal(false)}
            onAdd={addCategoryHander}
            onEdit={editCategoryHander}
          />
          <DeleteConfirmDialog
            open={Boolean(currentDeleteItem)}
            onClose={() => setCurrentDeleteItem(null)}
            onDelete={deleteCategoryHander}
            title={
              <>
                {translate('common.confirmDeleteTitle')}{' '}
                <strong>{currentDeleteItem?.cate_name}</strong>
              </>
            }
          />
          <Card>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '50%' }}>
                  <Button variant="contained" onClick={() => setOpenChart((prev) => !prev)}>
                    {openChart ? 'ẨN BIỂU ĐỒ' : 'HIỂN THỊ BIỂU ĐỒ'}
                  </Button>
                </Box>
              </Box>
              {openChart && (
                <Box>
                  <img
                    src="https://i.pinimg.com/originals/84/37/28/843728503b72b20cd0ebad06ce4137c9.png"
                    alt=""
                  />
                </Box>
              )}
              <Box>
                <ResoTable
                  showAction={false}
                  // rowKey="menu_id"
                  // getData={(params: any) => orderApi.get(params)}
                  columns={orderColumns}
                />
              </Box>
            </Stack>
          </Card>
        </Page>
      )}
    </>
  );
};

export default CategoryListPage;
