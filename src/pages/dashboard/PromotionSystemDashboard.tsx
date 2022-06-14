// material
import { Grid } from '@mui/material';
// hooks
// components
import Page from '../../components/Page';
// icons
import archiveFill from '@iconify/icons-eva/archive-fill';
import calendarFill from '@iconify/icons-eva/calendar-fill';
import castFill from '@iconify/icons-eva/cast-fill';
import PromotionWidgets from 'components/_dashboard/general-app/PromotionWidgets';

// ----------------------------------------------------------------------
const PWidgets = [
  {
    title: 'TOTAL PROMOTION',
    icon: calendarFill,
    color: '#aa0a0a',
    hoverColor: '#F51720',
    amount: 19
  },
  {
    title: 'RUNNING PROMOTION',
    icon: castFill,
    color: '#E1C340',
    hoverColor: '#fbc02d',
    amount: 19
  },
  {
    title: 'EXPIRED PROMOTION',
    icon: archiveFill,
    color: '#18A558',
    hoverColor: '#00c853',
    amount: 0
  },
  {
    title: 'DRAFT PROMOTION',
    icon: castFill,
    color: '#00bcd4',
    hoverColor: '#4dd0e1',
    amount: 0
  }
];

export default function PromotionDash() {
  return (
    <Page title="Dashboard">
      <Grid container spacing={3}>
        {PWidgets.map((item) => (
          <Grid key={item.title} item xs={12} md={3}>
            <PromotionWidgets Widget={item} />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
