import { Icon } from '@iconify/react';
// material
import { Box, Card, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// utils

// ----------------------------------------------------------------------
type PromotionWidgetsProp = {
  Widget: {
    title: string;
    icon: any;
    color: any;
    hoverColor: any;
    amount: number;
  };
};
const RootStyle = styled(Card)(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  padding: theme.spacing(3),
  width: '260px',
  height: '150px'
}));

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white
}));

// ----------------------------------------------------------------------

export default function PromotionWidgets({ Widget }: PromotionWidgetsProp) {
  const theme = useTheme();

  return (
    <RootStyle
      sx={{
        backgroundColor: `${Widget.color}`,
        cursor: 'pointer',
        '&:hover': { backgroundColor: `${Widget.hoverColor}` },
        padding: '48px'
      }}
    >
      <Box sx={{ ml: 3, color: 'common.white', cursor: 'pointer' }}>
        <Typography variant="h6" sx={{ opacity: 0.72, marginLeft: '-48px', marginTop: '30px' }}>
          {Widget.title}
        </Typography>
        <Typography variant="h2" sx={{ marginLeft: '-48px', p: '20px' }}>
          {Widget.amount}
        </Typography>
      </Box>
      <IconStyle icon={Widget.icon} />
    </RootStyle>
  );
}
