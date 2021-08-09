import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import navigation2Outline from '@iconify/icons-eva/navigation-2-outline';
import { Icon } from '@iconify/react';
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from '@material-ui/core';
// material
import { alpha, styled } from '@material-ui/core/styles';
import Label from 'components/Label';
import StoreNavigationDialog from 'components/StoreNavigationDialog';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PATH_STORE_APP } from 'routes/storeAppPaths';
import { Store } from 'types/store';
// components
import { AuthUser } from '../../@types/authentication';
import { MHidden } from '../../components/@material-extend';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import AccountPopover from './AccountPopover';
import ContactsPopover from './ContactsPopover';
import LanguagePopover from './LanguagePopover';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const COLLAPSE_WIDTH = 102;

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

type DashboardNavbarProps = {
  onOpenSidebar: VoidFunction;
};

export const DashboardNavLayout = ({ onOpenSidebar, children, ...props }: any) => (
  <RootStyle {...props}>
    <ToolbarStyle>
      <MHidden width="lgUp">
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
          <Icon icon={menu2Fill} />
        </IconButton>
      </MHidden>

      <Box sx={{ flexGrow: 1 }} />

      {children}
    </ToolbarStyle>
  </RootStyle>
);

export default function DashboardNavbar({ onOpenSidebar }: DashboardNavbarProps) {
  const { isCollapse } = useCollapseDrawer();
  const { changeUser } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectStore = (store: Store) => {
    const user: AuthUser = {
      name: 'Store Manager',
      displayName: `${store.name} Manager`,
      roles: ['store-admin']
    };
    if (changeUser) {
      changeUser(user);
      navigate(PATH_STORE_APP.root);
      setTimeout(() => {
        handleClose();
      }, 300);
    }
  };

  const envLabelColor = (env: any) => {
    switch (env) {
      case 'development':
        return 'warning';
      case 'qa':
        return 'primary';
      case 'production':
        return 'success';
      default:
        return 'info';
    }
  };

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          width: { lg: `calc(100% - ${COLLAPSE_WIDTH}px)` }
        })
      }}
    >
      <StoreNavigationDialog open={open} onClose={handleClose} onSelectStore={handleSelectStore} />
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <Label color={envLabelColor(process.env.REACT_APP_ENVIROMENT)}>
            {process.env.REACT_APP_ENVIROMENT}
          </Label>
          <LanguagePopover />
          <Button
            onClick={handleClickOpen}
            variant="outlined"
            startIcon={<Icon icon={navigation2Outline} />}
          >
            Điều hướng
          </Button>
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
