import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
  title?: string;
  subtitle?: string;
  sizeGrid?: number;
  children?: React.ReactNode;
  minHeight?: string;
}

export default function FormBox(props: Props) {
  const { title, subtitle, sizeGrid = 12, children, minHeight } = props;
  return (
    <Box
      sx={{
        width: `${(sizeGrid / 12) * 100}%`,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px 0'
        // paddingLeft: '8px'
      }}
    >
      {title && <Typography variant="h5">{title}</Typography>}
      {subtitle && (
        <Box sx={{ minHeight: minHeight }}>
          <Typography variant="subtitle2">{subtitle}</Typography>
        </Box>
      )}
      {children && <Box>{children}</Box>}
    </Box>
  );
}
