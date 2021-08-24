import { EventResizeDoneArg } from '@fullcalendar/interaction';
import { EventClickArg, EventDropArg, EventHoveringArg, EventInput } from '@fullcalendar/react'; // => request placed at the top
import {
  Box,
  Card,
  CardContent,
  Chip,
  DialogTitle,
  Grid,
  Stack,
  Typography,
  useMediaQuery
} from '@material-ui/core';
// @types
import { useRequest } from 'ahooks';
import { DialogAnimate } from 'components/animate';
import Label from 'components/Label';
// components
import Page from 'components/Page';
import { CalendarToolbar } from 'components/_dashboard/calendar';
import MappingStoreMenuForm from 'components/_dashboard/calendar/MappingStoreMenuForm';
import { DAY_OF_WEEK } from 'constraints';
import useLocales from 'hooks/useLocales';
import moment from 'moment';
import { useSnackbar } from 'notistack5';
import { useMemo, useState } from 'react';
import { addStoreApplyMenus, menuInStoreApi } from 'redux/menu/api';
import { COLOR_OPTIONS } from 'redux/slices/calendar';
import { RootState, useSelector } from 'redux/store';
import { TStoreApplyMenuRequest } from 'types/menu';
import { MenuInStoreAdmin, TStore, StoreInMenu } from 'types/store';
import { convertDateToStr } from 'utils/utils';
import { CalendarView } from '../../@types/calendar';
import FilterStore from './components/FilterStore';
import MenuInStoreCalendar from './components/MenuInStoreCalendar';

// ----------------------------------------------------------------------

const transformSIMtoEvent = (storeInMenus: StoreInMenu[] = []): EventInput[] =>
  storeInMenus.map((sInMenu) => ({
    id: sInMenu.menu_in_store_id.toString(),
    title: sInMenu.menu_name ?? `Thực đơn ${sInMenu.menu_id}`,
    // start: moment(sInMenu.time_range[0], 'HH:mm').toDate(),
    // end: moment(sInMenu.time_range[1], 'HH:mm').toDate(),
    startTime: moment(sInMenu.time_range[0], 'HH:mm').format('HH:mm:ss'),
    endTime: moment(sInMenu.time_range[1], 'HH:mm').format('HH:mm:ss'),
    daysOfWeek: sInMenu.dayFilters,
    allDay: sInMenu.time_range[0] === '00:00' && sInMenu.time_range[1] === '24:00',
    textColor: COLOR_OPTIONS[sInMenu.store.id % COLOR_OPTIONS.length],
    groupId: `menu_${sInMenu.menu_in_store_id}`,
    ...sInMenu
  }));

const tranform = (input: MenuInStoreAdmin[]): StoreInMenu[] => {
  const output: StoreInMenu[] = [];

  input.forEach((mInStore) => {
    if (mInStore.menus && mInStore.menus.length !== 0) {
      output.push(
        ...mInStore.menus.map<StoreInMenu>((menu, idx) => ({
          menu_in_store_id: output.length + idx + 1,
          store: { id: mInStore.id, store_name: mInStore.name },
          dayFilters: menu.day_filters,
          time_range: menu.time_range,
          menu_id: menu.menu_id,
          menu_name: menu.menu_name
        }))
      );
    }
  });

  return output;
};

export default function MenuInStorePage() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const { stores }: any = useSelector((state: RootState) => state.admin);

  const [view, setView] = useState<CalendarView>(isMobile ? 'listWeek' : 'timeGridWeek');
  const [date, setDate] = useState(new Date());
  const [filteredStores, setFilteredStores] = useState<TStore[]>(stores ?? []);

  const {
    data,
    mutate: setappliedStores,
    run
  } = useRequest(() => menuInStoreApi.get({ 'store-id': filteredStores.map((s) => s.id) }), {
    formatResult: (res) => {
      console.log(`tranform(res.data)`, tranform(res.data));
      return tranform(res.data);
    },
    refreshDeps: [filteredStores]
    // debounceInterval: 500
  });

  const appliedStores = data ?? [];

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStoreInMenu, setselectedStoreInMenu] = useState<StoreInMenu | null>(null);
  const [selectedRange, setSelectedRange] = useState<any>(null);
  const [popoverStoreInMenu, setPopoverStoreInMenu] = useState<StoreInMenu | null>(null);

  const handleAddEvent = async (storeData: Omit<StoreInMenu, 'menu_in_store_id'>) => {
    console.log(`storeData`, storeData);
    const _storeInMenuData: Partial<TStoreApplyMenuRequest> = {
      day_filters: storeData.dayFilters,
      store_id: storeData.store.id,
      time_range: [
        storeData.allDay ? '00:00' : storeData.time_range[0],
        storeData.allDay ? '24:00' : storeData.time_range[1]
      ]
    };
    try {
      const res = await addStoreApplyMenus(storeData.menu_id!, _storeInMenuData);
      console.log('res', res);
      if (res) run();
    } catch (error) {
      enqueueSnackbar('Error', {
        variant: 'error'
      });
    }
    // setappliedStores([...appliedStores, { ...storeData, menu_in_store_id: appliedStores.length }]);
  };

  const handleUpdateEvent = (updateData: StoreInMenu) => {
    const updateStores = [...appliedStores];

    const updateIdx = updateStores.findIndex(
      (s) => s.menu_in_store_id === updateData.menu_in_store_id
    );
    if (updateIdx !== -1) {
      updateStores[updateIdx] = updateData;
      setappliedStores(updateStores);
      setselectedStoreInMenu(null);
    }
  };

  const handleResizeEvent = async ({ event }: EventResizeDoneArg) => {
    try {
      const mInStoreIdx = appliedStores.findIndex(
        ({ menu_in_store_id }) => menu_in_store_id === Number(event.id)
      );
      if (mInStoreIdx !== -1) {
        // update startTime, endTime, allDay, dayOfWeek
        const startTime = convertDateToStr(event.start, 'HH:mm');
        const endTime = convertDateToStr(event.end, 'HH:mm');

        const updateSInMens = [...appliedStores];
        updateSInMens[mInStoreIdx] = {
          ...updateSInMens[mInStoreIdx],
          time_range: [startTime, endTime]
        };
        setappliedStores(updateSInMens);
        enqueueSnackbar('Update event success', {
          variant: 'success'
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDropEvent = async ({ event, ...args }: EventDropArg) => {
    try {
      const mInStoreIdx = appliedStores.findIndex(
        ({ menu_in_store_id }) => menu_in_store_id === Number(event.id)
      );
      if (mInStoreIdx !== -1) {
        // update startTime, endTime, allDay, dayOfWeek
        const startTime = convertDateToStr(event.start, 'HH:mm');
        const endTime = convertDateToStr(event.end, 'HH:mm');
        const daysOfWeek = [
          ...args.relatedEvents.map((eventApi) => eventApi.start?.getDay() ?? -1)
        ];
        if (event?.start) {
          daysOfWeek.push(event?.start?.getDay());
        }

        const updateSInMens = [...appliedStores];
        updateSInMens[mInStoreIdx] = {
          ...updateSInMens[mInStoreIdx],
          time_range: [startTime, endTime],
          dayFilters: daysOfWeek
        };
        setappliedStores(updateSInMens);
        enqueueSnackbar('Update event success', {
          variant: 'success'
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMouseEnter = (info: EventHoveringArg) => {
    const mInStoreIdx = appliedStores.findIndex(
      ({ menu_in_store_id }) => menu_in_store_id === Number(info.event.id)
    );
    if (mInStoreIdx !== -1) {
      setPopoverStoreInMenu(appliedStores[mInStoreIdx]);
    }
  };

  const handleSelectEvent = (arg: EventClickArg) => {
    const sInMenuId = arg.event.id;

    const storeInMenuIdx = appliedStores.findIndex(
      ({ menu_in_store_id: id }) => id === Number(sInMenuId)
    );

    if (storeInMenuIdx !== -1) {
      setselectedStoreInMenu(appliedStores[storeInMenuIdx]);
      setIsOpenModal(true);
    }
  };

  const handleChangeView = (newView: CalendarView) => {
    setView(newView);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setselectedStoreInMenu(null);
  };

  const filteredEvents = useMemo(() => {
    const viewMenuOfStores = appliedStores;
    return transformSIMtoEvent(viewMenuOfStores);
  }, [appliedStores]);

  console.log(`filteredEvents`, filteredEvents);

  const handleDelete = (data: StoreInMenu) => {
    setappliedStores((prev) =>
      prev.filter(({ menu_in_store_id }: StoreInMenu) => menu_in_store_id !== data.menu_in_store_id)
    );
  };

  const popoverContent = popoverStoreInMenu && (
    <>
      <CardContent>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h5" component="div">
              {popoverStoreInMenu.menu_name}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Box
                component="span"
                sx={{
                  width: 14,
                  height: 14,
                  flexShrink: 0,
                  borderRadius: '3px',
                  mr: 1,
                  mt: '2px'
                }}
                style={{
                  backgroundColor: COLOR_OPTIONS[popoverStoreInMenu.store.id % COLOR_OPTIONS.length]
                }}
              />
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {popoverStoreInMenu.store.store_name}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Typography variant="subtitle1">{translate('pages.menus.table.timeRange')}</Typography>
            <Box>
              {translate('pages.menus.table.fromTime')}{' '}
              <Label color="success">{popoverStoreInMenu.time_range[0]}</Label>{' '}
              {translate('pages.menus.table.toTime')}{' '}
              <Label color="success">{popoverStoreInMenu.time_range[1]}</Label>
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle1">{translate('pages.menus.table.dayFilter')}</Typography>
            <Stack direction="row" spacing={1}>
              {popoverStoreInMenu.dayFilters?.map((day) => (
                <Chip
                  size="small"
                  key={`${popoverStoreInMenu.menu_in_store_id}-${day}`}
                  label={DAY_OF_WEEK.find(({ value }) => value === day)?.label}
                />
              ))}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </>
  );

  return (
    <Page title="Calendar | Minimal-UI">
      <Card>
        <CalendarToolbar
          setOpenModel={() => setIsOpenModal(true)}
          date={date}
          view={view}
          onChangeView={handleChangeView}
        />
        <Grid container>
          <Grid item xs={12} sm={9}>
            <Box>
              <MenuInStoreCalendar
                popoverContent={popoverContent}
                events={filteredEvents}
                onMouseEnter={handleMouseEnter}
                initialDate={date}
                initialView={view}
                view={view}
                onSelectRange={(start, end) => {
                  setIsOpenModal(true);
                  setSelectedRange({ start, end });
                }}
                onDrop={handleDropEvent}
                onClick={handleSelectEvent}
                onEventResize={handleResizeEvent}
              />
              <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
                <DialogTitle>{selectedStoreInMenu ? 'Edit Event' : 'Add Event'}</DialogTitle>

                <MappingStoreMenuForm
                  range={selectedRange}
                  storeInMenu={selectedStoreInMenu}
                  onCancel={handleCloseModal}
                  onAddEvent={handleAddEvent}
                  onUpdateEvent={handleUpdateEvent}
                  onDelete={handleDelete}
                />
              </DialogAnimate>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FilterStore
              stores={stores}
              filteredStores={filteredStores}
              onChangeFilter={(filters) => {
                setFilteredStores(filters);
              }}
            />
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
}
