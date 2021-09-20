import { ReactNode } from 'react';
import { Icon } from '@iconify/react';
import infoFill from '@iconify/icons-eva/info-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import { SnackbarProvider } from 'notistack';
// material
import { makeStyles, createStyles } from '@mui/styles';
import { alpha, Theme } from '@mui/material/styles';
import { Box } from '@mui/material';
// @types
import { ColorSchema } from '../@types/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme: Theme) => {
  const isLight = theme.palette.mode === 'light';

  const createStyle = {
    color: `${theme.palette.text.primary} !important`,
    backgroundColor: `${theme.palette.background.paper} !important`
  };

  return createStyles({
    containerRoot: {
      pointerEvents: 'unset',
      '& .MuiCollapse-wrapperInner': {
        width: '100%'
      }
    },
    contentRoot: {
      width: '100%',
      padding: theme.spacing(1.5),
      margin: theme.spacing(0.25, 0),
      boxShadow: theme.customShadows.z8,
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.grey[isLight ? 0 : 800],
      backgroundColor: theme.palette.grey[isLight ? 900 : 0]
    },
    message: {
      padding: 0,
      fontWeight: theme.typography.fontWeightMedium
    },
    action: {
      marginRight: -4,
      '& svg': {
        width: 20,
        height: 20,
        opacity: 0.48,
        '&:hover': { opacity: 1 }
      }
    },
    variantInfo: { ...createStyle },
    variantSuccess: { ...createStyle },
    variantWarning: { ...createStyle },
    variantError: { ...createStyle }
  });
});

// ----------------------------------------------------------------------

type SnackbarIconProps = {
  icon: Object;
  color: ColorSchema;
};

function SnackbarIcon({ icon, color }: SnackbarIconProps) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16)
      }}
    >
      <Icon icon={icon} width={24} height={24} />
    </Box>
  );
}

type NotistackProviderProps = {
  children: ReactNode;
};

function NotistackProvider({ children }: NotistackProviderProps) {
  const classes = useStyles();

  return (
    <SnackbarProvider
      dense
      maxSnack={5}
      // preventDuplicate
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      iconVariant={{
        success: <SnackbarIcon icon={checkmarkCircle2Fill} color="success" />,
        error: <SnackbarIcon icon={infoFill} color="error" />,
        warning: <SnackbarIcon icon={alertTriangleFill} color="warning" />,
        info: <SnackbarIcon icon={alertCircleFill} color="info" />
      }}
      classes={classes}
    >
      {children}
    </SnackbarProvider>
  );
}

export default NotistackProvider;
