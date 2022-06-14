import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
  title?: string;
  subtitle?: string;
  sizeGrid?: number;
  children?: React.ReactNode;
}

export default function FormBox(props: Props) {
  const { title, subtitle, sizeGrid = 12, children } = props;
  return (
    <Box
      sx={{
        width: `${(sizeGrid / 12) * 100}%`,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px 0',
        paddingLeft: '8px'
      }}
    >
      {title && <Typography variant="h5">{title}</Typography>}
      {subtitle && <Typography variant="subtitle2">{subtitle}</Typography>}
      {children && <Box>{children}</Box>}
    </Box>
  );
}
