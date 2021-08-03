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
import { Box, Card, DialogTitle, useMediaQuery } from '@material-ui/core';
// material
import { useTheme } from '@material-ui/core/styles';
// @types
import { DialogAnimate } from 'components/animate';
// components
import Page from 'components/Page';
import { CalendarStyle, CalendarToolbar } from 'components/_dashboard/calendar';
import StoreInMenuForm from 'components/_dashboard/calendar/StoreInMenuForm';
// hooks
import useSettings from 'hooks/useSettings';
import moment from 'moment';
import { useSnackbar } from 'notistack5';
import { useEffect, useRef, useState } from 'react';
import { COLOR_OPTIONS, selectRange, updateEvent } from 'redux/slices/calendar';
// redux
import { RootState, useDispatch, useSelector } from 'redux/store';
import { CalendarView } from '../../../@types/calendar';

// ----------------------------------------------------------------------

const selectedEventSelector = (state: RootState) => {
  const { events, selectedEventId } = state.calendar;
  if (selectedEventId) {
    return events.find((_event) => _event.id === selectedEventId);
  }
  return null;
};

export type StoreInMenu = {
  menu_id: number;
  time_range: string[];
  dayFilters: number[];
  store: {
    id: number;
    store_name: string;
  };
};

const getDoWFromIndex = (index: number): Date => new Date();

const transformSIMtoEvent = (storeInMenus: StoreInMenu[] = []): EventInput[] =>
  storeInMenus.map((sInMenu) => ({
    id: sInMenu.menu_id.toString(),
    title: sInMenu.store.store_name,
    start: moment(sInMenu.time_range[0], 'HH:mm').toDate(),
    end: moment(sInMenu.time_range[1], 'HH:mm').toDate(),
    startTime: moment(sInMenu.time_range[0], 'HH:mm').format('HH:mm:ss'),
    endTime: moment(sInMenu.time_range[1], 'HH:mm').format('HH:mm:ss'),
    daysOfWeek: sInMenu.dayFilters,
    allDay: sInMenu.time_range[0] === '00:00' && sInMenu.time_range[1] === '24:00',
    textColor: COLOR_OPTIONS[sInMenu.store.id % COLOR_OPTIONS.length],
    groupId: `menu_${sInMenu.menu_id}`
  }));

export default function MenuInStoreCalendar() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const calendarRef = useRef<FullCalendar>(null);
  const { enqueueSnackbar } = useSnackbar();

  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>(isMobile ? 'listWeek' : 'timeGridWeek');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStoreInMenu, setselectedStoreInMenu] = useState<StoreInMenu | null>(null);
  const [appliedStores, setappliedStores] = useState<StoreInMenu[]>([
    {
      menu_id: 1,
      time_range: ['07:00', '12:00'],
      dayFilters: [0, 1, 2, 3],
      store: {
        id: 1,
        store_name: 'Cửa hàng Q1'
      }
    },
    {
      menu_id: 2,
      time_range: ['08:30', '14:00'],
      dayFilters: [0, 1, 2, 3],
      store: {
        id: 2,
        store_name: 'Cửa hàng Q2'
      }
    },
    {
      menu_id: 3,
      time_range: ['17:30', '20:00'],
      dayFilters: [2, 3, 4, 5],
      store: {
        id: 2,
        store_name: 'Cửa hàng Q2'
      }
    },
    {
      menu_id: 4,
      time_range: ['08:30', '14:00'],
      dayFilters: [0, 1, 2, 3],
      store: {
        id: 3,
        store_name: 'Cửa hàng Q3'
      }
    }
  ]);
  const [events, setEvents] = useState(transformSIMtoEvent(appliedStores));

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

  const handleAddEvent = (storeData: Omit<StoreInMenu, 'id'>) => {
    setappliedStores([...appliedStores, { ...storeData, menu_id: appliedStores.length }]);
  };

  const handleUpdateEvent = (updateData: StoreInMenu) => {
    const updateStores = [...appliedStores];

    const updateIdx = updateStores.findIndex((s) => s.menu_id === updateData.menu_id);
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

    const storeInMenuIdx = appliedStores.findIndex(({ menu_id: id }) => id === Number(sInMenuId));

    if (storeInMenuIdx !== -1) {
      setselectedStoreInMenu(appliedStores[storeInMenuIdx]);
      setIsOpenModal(true);
    }
  };

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

  const handleDropEvent = async ({ event }: EventDropArg) => {
    try {
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
  };

  return (
    <Page title="Calendar | Minimal-UI">
      <Box>
        <Card>
          <CalendarStyle>
            <CalendarToolbar
              setOpenModel={() => setIsOpenModal(true)}
              date={date}
              view={view}
              onChangeView={handleChangeView}
            />
            <FullCalendar
              weekends
              editable
              droppable
              selectable
              events={events}
              dayHeaderContent={(args) => moment(args.date).format('dddd')}
              ref={calendarRef}
              rerenderDelay={10}
              initialDate={date}
              initialView={view}
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
        </Card>

        <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
          <DialogTitle>{selectedEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>

          <StoreInMenuForm
            range={selectedRange}
            storeInMenu={selectedStoreInMenu}
            onCancel={handleCloseModal}
            onAddEvent={handleAddEvent}
            onUpdateEvent={handleUpdateEvent}
          />
        </DialogAnimate>
      </Box>
    </Page>
  );
}
