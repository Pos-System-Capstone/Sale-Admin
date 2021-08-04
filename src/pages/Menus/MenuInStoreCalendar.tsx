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
  Checkbox,
  CircularProgress,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
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
// redux
import { RootState, useDispatch, useSelector } from 'redux/store';
import { CalendarView } from '../../@types/calendar';
import { MENUINSTORES } from './fakeData';

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
    start: moment(sInMenu.time_range[0], 'HH:mm').toDate(),
    end: moment(sInMenu.time_range[1], 'HH:mm').toDate(),
    startTime: moment(sInMenu.time_range[0], 'HH:mm').format('HH:mm:ss'),
    endTime: moment(sInMenu.time_range[1], 'HH:mm').format('HH:mm:ss'),
    daysOfWeek: sInMenu.dayFilters,
    allDay: sInMenu.time_range[0] === '00:00' && sInMenu.time_range[1] === '24:00',
    textColor: COLOR_OPTIONS[sInMenu.store.id % COLOR_OPTIONS.length],
    groupId: `menu_${sInMenu.menu_in_store_id}`
  }));

export default function MenuInStoreCalendar() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const calendarRef = useRef<FullCalendar>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { stores }: any = useSelector((state: RootState) => state.admin);

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>(isMobile ? 'listWeek' : 'timeGridWeek');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStoreInMenu, setselectedStoreInMenu] = useState<StoreInMenu | null>(null);
  const [appliedStores, setappliedStores] = useState<StoreInMenu[]>([]);
  const [events, setEvents] = useState(transformSIMtoEvent(appliedStores));
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);

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
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
      enqueueSnackbar('Update event success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  // TODO
  const handleDropEvent = async ({ event, ...args }: EventDropArg) => {
    try {
      console.log(`event`, event);
      console.table(args);
      dispatch(
        updateEvent(event.id, {
          allDay: event.allDay,
          start: event.start,
          end: event.end
        })
      );
      enqueueSnackbar('Update event success', {
        variant: 'success'
      });
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
              <CalendarStyle>
                <FullCalendar
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
                      control={<Checkbox onChange={handleFilterAllStore} />}
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
