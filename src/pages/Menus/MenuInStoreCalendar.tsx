import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventDropArg,
  EventInput
} from '@fullcalendar/react'; // => request placed at the top
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Popover,
  Stack,
  TextField,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import closeIcon from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import { useTheme } from '@material-ui/core/styles';
import { useRequest } from 'ahooks';
// @types
import { StoreInMenu, Store } from 'types/store';
import { DialogAnimate } from 'components/animate';
// components
import Page from 'components/Page';
import { CalendarStyle, CalendarToolbar } from 'components/_dashboard/calendar';
import MappingStoreMenuForm from 'components/_dashboard/calendar/MappingStoreMenuForm';
// hooks
import useSettings from 'hooks/useSettings';
import moment from 'moment';
import { useSnackbar } from 'notistack5';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getStores } from 'redux/admin/api';
import { COLOR_OPTIONS, selectRange, updateEvent } from 'redux/slices/calendar';
import { convertDateToStr } from 'utils/utils';
// redux
import useLocales from 'hooks/useLocales';
import { RootState, useDispatch, useSelector } from 'redux/store';
import Label from 'components/Label';
import { DAY_OF_WEEK } from 'constraints';
import { CalendarView } from '../../@types/calendar';

// ----------------------------------------------------------------------

const selectedEventSelector = (state: RootState) => {
  const { events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    return events.find((_event) => _event.id === selectedEventId);
  }
  return null;
};

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

export default function MenuInStoreCalendar() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const calendarRef = useRef<FullCalendar>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { stores }: any = useSelector((state: RootState) => state.admin);

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>(isMobile ? 'listWeek' : 'timeGridWeek');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStoreInMenu, setselectedStoreInMenu] = useState<StoreInMenu | null>(null);
  const [popoverStoreInMenu, setPopoverStoreInMenu] = useState<StoreInMenu | null>(null);
  const [appliedStores, setappliedStores] = useState<StoreInMenu[]>([
    {
      menu_id: 1,
      menu_name: 'Thực đơn 1',
      dayFilters: [1, 2],
      store: { id: 1161, store_name: 'store của tuấn' },
      time_range: ['02:30', '03:30'],
      menu_in_store_id: 0
    }
  ]);
  const [events, setEvents] = useState(transformSIMtoEvent(appliedStores));
  const [filteredStores, setFilteredStores] = useState<Store[]>(stores ?? []);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const selectedEvent = useSelector(selectedEventSelector);
  const { selectedRange } = useSelector((state: RootState) => state.calendar);

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isMobile ? 'listWeek' : 'timeGridWeek';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isMobile]);

  useEffect(() => {
    setEvents(transformSIMtoEvent(appliedStores));
  }, [appliedStores]);

  const handleAddEvent = (storeData: Omit<StoreInMenu, 'menu_in_store_id'>) => {
    setappliedStores([...appliedStores, { ...storeData, menu_in_store_id: appliedStores.length }]);
  };

  const handlePopoverOpen = (event: HTMLElement) => {
    setAnchorEl(event);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPopoverStoreInMenu(null);
  };

  const open = Boolean(anchorEl);

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

  const handleChangeView = (newView: CalendarView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleSelectRange = (arg: DateSelectArg) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.unselect();
    }
    dispatch(selectRange(arg.start, arg.end));
    setIsOpenModal(true);
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

  // TODO
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

  // TODO
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

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setselectedStoreInMenu(null);
  };

  const handleFilterAllStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setFilteredStores(stores);
    } else {
      setFilteredStores([]);
    }
  };

  const filteredEvents = useMemo(() => {
    const viewMenuOfStores = appliedStores.filter(({ store }) =>
      filteredStores.some(({ id }) => id === store.id)
    );
    return transformSIMtoEvent(viewMenuOfStores);
  }, [appliedStores, filteredStores]);

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

  const isCheckedAll = filteredStores.length === stores.length;

  return (
    <Page title="Calendar | Minimal-UI">
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none'
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {popoverContent}
      </Popover>
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
              <CalendarStyle>
                <FullCalendar
                  eventMouseEnter={(info) => {
                    handlePopoverOpen(info.el);
                    const mInStoreIdx = appliedStores.findIndex(
                      ({ menu_in_store_id }) => menu_in_store_id === Number(info.event.id)
                    );
                    if (mInStoreIdx !== -1) {
                      setPopoverStoreInMenu(appliedStores[mInStoreIdx]);
                    }
                  }}
                  eventMouseLeave={handlePopoverClose}
                  weekends
                  editable
                  droppable
                  selectable
                  events={filteredEvents}
                  dayHeaderContent={(args) => moment(args.date).format('dddd')}
                  ref={calendarRef}
                  rerenderDelay={10}
                  initialDate={date}
                  initialView={view}
                  views={{
                    timeGrid: {
                      eventLimit: 2 // adjust to 6 only for timeGridWeek/timeGridDay
                    }
                  }}
                  moreLinkContent={(args) => <>+{args.num} bảng giá</>}
                  dayMaxEventRows={3}
                  eventDisplay="block"
                  headerToolbar={false}
                  allDayMaintainDuration
                  eventResizableFromStart
                  select={handleSelectRange}
                  firstDay={1}
                  eventMaxStack={2}
                  eventDrop={handleDropEvent}
                  eventClick={handleSelectEvent}
                  eventResize={handleResizeEvent}
                  height={isMobile ? 'auto' : 720}
                  plugins={[
                    listPlugin,
                    dayGridPlugin,
                    timelinePlugin,
                    timeGridPlugin,
                    interactionPlugin
                  ]}
                />
              </CalendarStyle>

              <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
                <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>

                <MappingStoreMenuForm
                  range={selectedRange}
                  storeInMenu={selectedStoreInMenu}
                  onCancel={handleCloseModal}
                  onAddEvent={handleAddEvent}
                  onUpdateEvent={handleUpdateEvent}
                />
              </DialogAnimate>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Box border="1px solid" p={2} borderColor="grey.300" height="100%">
              <Stack spacing={2} direction="column">
                <Typography variant="caption">Chọn cửa hàng để xem các bảng giá</Typography>
                <Box>
                  <Autocomplete
                    multiple
                    limitTags={2}
                    disableCloseOnSelect
                    size="small"
                    id="multiple-limit-tags"
                    options={stores ?? []}
                    getOptionLabel={(option: any) => option?.name}
                    renderTags={() => null}
                    renderOption={(props, option: Store, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          checked={filteredStores.findIndex(({ id }) => id === option.id) !== -1}
                        />
                        <Box
                          sx={{
                            flexGrow: 1,
                            '& span': {
                              color: theme.palette.mode === 'light' ? '#586069' : '#8b949e'
                            }
                          }}
                        >
                          {option.name}
                          <br />
                          <span>{option.store_code}</span>
                        </Box>
                      </li>
                    )}
                    onChange={(e, newValue: Store[]) => {
                      setFilteredStores(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: <>{params.InputProps.endAdornment}</>
                        }}
                        label="Chọn cửa hàng"
                        placeholder="Chọn cửa hàng"
                      />
                    )}
                  />
                  <Box sx={{ float: 'right' }}>
                    <FormControlLabel
                      sx={{ mr: 0 }}
                      control={
                        <Checkbox
                          defaultChecked
                          checked={isCheckedAll}
                          onChange={handleFilterAllStore}
                        />
                      }
                      label="Xem tất cả"
                    />
                  </Box>
                </Box>
                <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <Grid container>
                    {filteredStores.map((store) => (
                      <Grid key={store.id} item xs={12}>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            alignItems: 'center'
                          }}
                        >
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
                              backgroundColor: COLOR_OPTIONS[store.id % COLOR_OPTIONS.length]
                            }}
                          />
                          <Typography>{store.name}</Typography>
                          <Box flex={1} />
                          <IconButton
                            onClick={() => {
                              setFilteredStores((prev) => prev.filter(({ id }) => id !== store.id));
                            }}
                          >
                            <Icon icon={closeIcon} width={20} height={20} />
                          </IconButton>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
}
