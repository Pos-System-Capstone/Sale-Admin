import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import { Store, StoreInMenu } from 'types/store';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip
} from '@material-ui/core';
import { MobileTimePicker } from '@material-ui/lab';
import { useRequest } from 'ahooks';
import { InputField, SelectField, SwitchField } from 'components/form';
import { DAY_OF_WEEK } from 'constraints';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import moment from 'moment';
import { useSnackbar } from 'notistack5';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { getMenus } from 'redux/menu/api';
import { convertDateToStr, convertStrToDate } from 'utils/utils';
// redux
import { RootState, useDispatch } from 'redux/store';
import { Menu } from 'types/menu';

// ----------------------------------------------------------------------

type StoreInMenuForm = StoreInMenu & { start: Date; end: Date; allDay: boolean };

const getInitialValues = (
  data: StoreInMenu | null,
  range?: {
    start: Date;
    end: Date;
  } | null
): Partial<StoreInMenuForm> => {
  // eslint-disable-next-line no-underscore-dangle
  const initState = {
    ...data,
    start: range
      ? new Date(range.start)
      : convertStrToDate(get(data, ['time_range', 0], moment().format('HH:mm')), 'HH:mm').toDate(),
    end: range
      ? new Date(range.end)
      : convertStrToDate(get(data, ['time_range', 1], moment().format('HH:mm')), 'HH:mm').toDate(),
    dayFilters: get(data, ['dayFilters'], [])
  };

  return initState;
};

// ----------------------------------------------------------------------

type StoreInMenuFormProps = {
  onCancel: VoidFunction;
  range?: {
    start: Date;
    end: Date;
  } | null;
  storeInMenu: StoreInMenu | null;
  onAddEvent?: (data: any) => void;
  onUpdateEvent?: (data: any) => void;
};

export default function StoreInMenuForm({
  onCancel,
  onAddEvent,
  onUpdateEvent,
  storeInMenu,
  range
}: StoreInMenuFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const { stores } = useSelector((state: RootState) => state.admin);
  const { data: menus } = useRequest<any>(getMenus, { formatResult: (res) => res.data.data });

  const isCreating = !storeInMenu;

  const form = useForm<StoreInMenuForm>({
    defaultValues: {
      ...getInitialValues(storeInMenu, range)
    }
  });

  useEffect(() => () => console.log('Unmount'), []);

  const onSubmit = (values: Partial<StoreInMenuForm>) => {
    try {
      if (!isCreating) {
        const _storeInMenuData: Partial<StoreInMenu> = {
          menu_id: values.menu_id,
          menu_name: values.menu_name,
          menu_in_store_id: storeInMenu?.menu_in_store_id,
          dayFilters: values.dayFilters,
          store: {
            id: values?.store?.id!,
            store_name: values?.store?.store_name!
          },
          time_range: [
            values.allDay ? '00:00' : convertDateToStr(values.start, 'HH:mm'),
            values.allDay ? '24:00' : convertDateToStr(values.end, 'HH:mm')
          ]
        };
        if (onUpdateEvent) {
          onUpdateEvent(_storeInMenuData);
          enqueueSnackbar('Update event success', { variant: 'success' });
        }
      } else {
        const _storeInMenuData: Partial<StoreInMenu> = {
          menu_id: values.menu_id,
          menu_name: values.menu_name,
          dayFilters: values.dayFilters,
          store: {
            id: values?.store?.id!,
            store_name: values?.store?.store_name!
          },
          time_range: [
            values.allDay ? '00:00' : convertDateToStr(values.start, 'HH:mm'),
            values.allDay ? '24:00' : convertDateToStr(values.end, 'HH:mm')
          ]
        };
        if (onAddEvent) {
          onAddEvent(_storeInMenuData);
          enqueueSnackbar('Create event success', { variant: 'success' });
        }
      }
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  const { control, handleSubmit, setValue } = form;

  const handleDelete = async () => {
    if (!storeInMenu?.menu_in_store_id) return;
    try {
      onCancel();
      // dispatch(deleteEvent(storeInMenu?.id));
      enqueueSnackbar('Delete event success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  // const isDateError = isBefore(new Date(values.end), new Date(values.start));

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ pb: 0, mt: 2, overflowY: 'unset' }}>
          <Box>
            <Stack spacing={2}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <SelectField
                    onChange={(e: any) => {
                      const selectedMenu = menus.find(
                        ({ meunu_id }: any) => meunu_id === e.target.value
                      );
                      setValue('menu_id', e.target.value);
                      setValue(
                        'menu_name',
                        selectedMenu?.menu_name ?? `Thực đơn ${selectedMenu?.meunu_id}`
                      );
                    }}
                    fullWidth
                    name="menu_id"
                    label="Chọn thực đơn"
                    defaultValue=""
                    size="small"
                  >
                    {menus?.map(({ meunu_id, menu_name }: Menu) => (
                      <MenuItem value={Number(meunu_id)} key={`menu_select_${meunu_id}`}>
                        {menu_name ?? `-${meunu_id}`}
                      </MenuItem>
                    ))}
                  </SelectField>
                </Grid>
                <Grid item xs={6}>
                  <SelectField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const selectStore: any = stores?.find(({ id }) => id === e.target.value);
                      setValue('store.id', Number(e.target.value));
                      setValue('store.store_name', selectStore?.name);
                    }}
                    fullWidth
                    name="store.id"
                    label="Chọn cửa hàng"
                    defaultValue=""
                    size="small"
                  >
                    {stores?.map(({ id, name }: any) => (
                      <MenuItem value={Number(id)} key={`cate_select_${id}`}>
                        {name}
                      </MenuItem>
                    ))}
                  </SelectField>
                </Grid>
              </Grid>

              <InputField hidden name="menu_name" sx={{ display: 'none' }} />
              <InputField hidden name="store.store_name" sx={{ display: 'none' }} />
              <SwitchField name="allDay" label="Cả ngày" fullWidth />

              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name="start"
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState,
                        formState
                      }) => (
                        <MobileTimePicker
                          label="Bắt đầu"
                          inputFormat="hh:mm a"
                          renderInput={(params) => <TextField size="small" {...params} fullWidth />}
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name="end"
                      render={({
                        field: { onChange, onBlur, value, name, ref },
                        fieldState,
                        formState
                      }) => (
                        <MobileTimePicker
                          label="Kết thúc"
                          inputFormat="hh:mm a"
                          renderInput={(params) => <TextField size="small" {...params} fullWidth />}
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>

              <SelectField
                options={DAY_OF_WEEK}
                fullWidth
                name="dayFilters"
                multiple
                label="Ngày hiệu lực"
              />
            </Stack>
          </Box>
        </DialogContent>

        <DialogActions>
          {!isCreating && (
            <Tooltip title="Delete Event">
              <IconButton onClick={handleDelete}>
                <Icon icon={trash2Fill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button type="button" variant="outlined" color="inherit" onClick={onCancel}>
            {translate('common.cancel')}
          </Button>
          <Button type="submit" variant="contained">
            {translate('common.create')}
          </Button>
        </DialogActions>
      </form>
    </FormProvider>
  );
}
