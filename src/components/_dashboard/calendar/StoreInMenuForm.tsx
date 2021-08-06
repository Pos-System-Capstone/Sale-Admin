import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip
} from '@material-ui/core';
import { MobileTimePicker } from '@material-ui/lab';
import { InputField, SelectField, SwitchField } from 'components/form';
import { DAY_OF_WEEK } from 'constraints';
import useLocales from 'hooks/useLocales';
import { get } from 'lodash';
import moment from 'moment';
import { useSnackbar } from 'notistack5';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { convertDateToStr, convertStrToDate } from 'utils/utils';
// redux
import { RootState, useDispatch } from 'redux/store';
import { Store } from 'types/store';
import { TStoreApplyMenu, TStoreApplyMenuRequest } from 'types/menu';

// ----------------------------------------------------------------------

const getInitialValues = (
  data: TStoreApplyMenu | null,
  range?: {
    start: Date;
    end: Date;
  } | null
): any => {
  // eslint-disable-next-line no-underscore-dangle
  const initState = {
    id: get(data, ['store', 'id'], ''),
    start: range
      ? new Date(range.start)
      : convertStrToDate(get(data, ['time_range', 0], moment().format('HH:mm')), 'HH:mm'),
    end: range
      ? new Date(range.end)
      : convertStrToDate(get(data, ['time_range', 1], moment().format('HH:mm')), 'HH:mm'),
    day_filters: get(data, ['day_filters'], []),
    allDay: data?.time_range[0] === '00:00' && data?.time_range[1] === '24:00'
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
  storeInMenu: TStoreApplyMenu | null;
  onAddStoreApply?: (data: any) => Promise<any>;
  onUpdateEvent?: (data: any) => Promise<any>;
  onDelete?: (data: any) => Promise<any>;
};

export default function StoreInMenuForm({
  onCancel,
  onAddStoreApply,
  onUpdateEvent,
  onDelete,
  storeInMenu,
  range
}: StoreInMenuFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const { stores }: any = useSelector((state: RootState) => state.admin);

  const isCreating = !storeInMenu;

  const form = useForm({
    defaultValues: getInitialValues(storeInMenu, range)
  });

  const onSubmit = async (values: any) => {
    try {
      if (!isCreating) {
        const _storeInMenuData: Partial<TStoreApplyMenuRequest> = {
          day_filters: values.day_filters,
          store_id: values.id,
          time_range: [
            values.allDay ? '00:00' : convertDateToStr(values.start, 'HH:mm'),
            values.allDay ? '24:00' : convertDateToStr(values.end, 'HH:mm')
          ]
        };
        if (onUpdateEvent) {
          await onUpdateEvent(_storeInMenuData);
          enqueueSnackbar('Updated menu success', { variant: 'success' });
        }
      } else {
        const _storeInMenuData: Partial<TStoreApplyMenuRequest> = {
          day_filters: values.day_filters,
          store_id: values.id,
          time_range: [
            values.allDay ? '00:00' : convertDateToStr(values.start, 'HH:mm'),
            values.allDay ? '24:00' : convertDateToStr(values.end, 'HH:mm')
          ]
        };
        if (onAddStoreApply) {
          await onAddStoreApply(_storeInMenuData);
          enqueueSnackbar('Applied store to menu', { variant: 'success' });
        }
      }
      onCancel();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(get(error, 'message', 'Some thing wrong'), {
        variant: 'error'
      });
    }
  };

  const { control, handleSubmit, setValue } = form;

  const handleDelete = async () => {
    if (!storeInMenu?.menu_in_store_id) return;
    try {
      if (!onDelete) return;
      await onDelete(storeInMenu);
      onCancel();
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
          <Stack spacing={2}>
            <SelectField
              onChange={(e: any) => {
                setValue('id', e.target.value);
              }}
              fullWidth
              name="id"
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

            <InputField hidden name="store_name" sx={{ display: 'none' }} />
            <SwitchField name="allDay" label="Cả ngày" fullWidth />

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
                  renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 3 }} />}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
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
                  renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 3 }} />}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <SelectField
              options={DAY_OF_WEEK}
              fullWidth
              name="day_filters"
              multiple
              label="Ngày hiệu lực"
            />
          </Stack>
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
