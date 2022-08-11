// material
import { Box, Card, Stack, Typography } from '@mui/material';
// utils

// ----------------------------------------------------------------------

const PERCENT = 'Passio Coffee - 542 Huỳnh Tấn Phát';

export default function TopPerformingStore() {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2">Top-performing store</Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <Typography component="span" variant="button">
            {PERCENT}
          </Typography>
        </Stack>
      </Box>

      <Box
        component="img"
        src="https://www.iconpacks.net/icons/2/free-icon-store-2017.png"
        width={60}
        height={60}
      />
    </Card>
  );
}
