import { Icon } from '@iconify/react';
import roundViewDay from '@iconify/icons-ic/round-view-day';
import roundViewWeek from '@iconify/icons-ic/round-view-week';
import roundViewAgenda from '@iconify/icons-ic/round-view-agenda';
import roundViewModule from '@iconify/icons-ic/round-view-module';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Tooltip, Typography, IconButton, ToggleButton, Button } from '@material-ui/core';
// utils
import { fDate } from '../../../utils/formatTime';
//
import { MHidden } from '../../@material-extend';
import { CalendarView } from '../../../@types/calendar';

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: 'dayGridMonth', label: 'Month', icon: roundViewModule },
  { value: 'timeGridWeek', label: 'Week', icon: roundViewWeek },
  { value: 'timeGridDay', label: 'Day', icon: roundViewDay },
  { value: 'listWeek', label: 'Agenda', icon: roundViewAgenda }
] as const;

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3, 0),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    padding: theme.spacing(1.75, 3),
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

type CalendarToolbarProps = {
  date: Date;
  view: CalendarView;
  onChangeView: (view: CalendarView) => void;
  setOpenModel: VoidFunction;
};

export default function CalendarToolbar({
  date,
  view,
  onChangeView,
  setOpenModel
}: CalendarToolbarProps) {
  return (
    <RootStyle>
      <MHidden width="smDown">
        <Box sx={{ '& > *:not(:last-of-type)': { mr: 1 } }}>
          {VIEW_OPTIONS.map((viewOption) => (
            <Tooltip key={viewOption.value} title={viewOption.label}>
              <ToggleButton
                value={view}
                selected={viewOption.value === view}
                onChange={() => onChangeView(viewOption.value)}
                sx={{ width: 32, height: 32, padding: 0 }}
              >
                <Icon icon={viewOption.icon} width={20} height={20} />
              </ToggleButton>
            </Tooltip>
          ))}
        </Box>
      </MHidden>

      <Typography variant="h5" sx={{ my: { xs: 1, sm: 0 } }}>
        {fDate(date)}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button size="small" variant="contained" onClick={setOpenModel} sx={{ mx: 0.5 }}>
          Thêm cửa hàng
        </Button>
      </Box>
    </RootStyle>
  );
}
