import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import navigation2Outline from '@iconify/icons-eva/navigation-2-outline';
import { Icon } from '@iconify/react';
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from '@mui/material';
// material
import { alpha, styled } from '@mui/material/styles';
import Label from 'components/Label';
import StoreNavigationDialog from 'components/StoreNavigationDialog';
import useStore from 'hooks/report/useStore';
import useAuth from 'hooks/useAuth';
import useLocales from 'hooks/useLocales';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { TStoreReport } from 'types/report/store';
import { TStore } from 'types/store';
import { getAppToken } from 'utils/utils';
import { MHidden } from '../../components/@material-extend';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import AccountPopover from './AccountPopover';
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
  padding: 0,
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 2)
  }
}));

// ----------------------------------------------------------------------

type DashboardNavbarProps = {
  onOpenSidebar: VoidFunction;
};

export const DashboardNavLayout = ({ onOpenSidebar, children, ...props }: any) => {
  const { isCollapse } = useCollapseDrawer();
  return (
    <RootStyle
      position="fixed"
      {...props}
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: 'background.paper',
        boxShadow: 1,
        ...(isCollapse && {
          width: { lg: `calc(100% - 80px)` }
        }),
        ...(props.sx || {})
      }}
    >
      <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />

        {children}
      </ToolbarStyle>
    </RootStyle>
  );
};

export default function DashboardNavbar({ onOpenSidebar }: DashboardNavbarProps) {
  const { isCollapse } = useCollapseDrawer();
  const { translate } = useLocales();
  const { changeUser } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const firstElementOfPath = pathname.split('/')[1];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectStore = (store: TStore) => {
    const token = getAppToken();
    window.open(
      `${process.env.REACT_APP_STORE_MANAGEMENT_APP_URL}/auth/login?accessToken=${token}`,
      '_blank'
    );
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

  const { storeId } = useParams();
  const { data: storeData } = useStore();
  const [nameStoreReport, setNameStoreReport] = useState<TStoreReport>();

  useEffect(() => {
    const storeName = storeData?.find((item: any) => item.id == storeId);
    setNameStoreReport(storeName!);
  }, [nameStoreReport, storeData, storeId]);

  return (
    <RootStyle
      sx={{
        ...(isCollapse && {
          width: { lg: `calc(100% - 80px)` }
        })
      }}
    >
      <StoreNavigationDialog open={open} onClose={handleClose} onSelectStore={handleSelectStore} />
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }} size="large">
            <Icon icon={menu2Fill} />
          </IconButton>
        </MHidden>

        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {firstElementOfPath === 'report' && (
            <Label color="success" sx={{ marginRight: '350px', height: '30px', fontSize: '15px' }}>
              {nameStoreReport?.name || 'HỆ THỐNG'}
            </Label>
          )}
          {process.env.REACT_APP_ENVIROMENT !== 'production' && (
            <Label color={envLabelColor(process.env.REACT_APP_ENVIROMENT)}>
              {process.env.REACT_APP_ENVIROMENT}
            </Label>
          )}
          <Button
            onClick={() => {
              // const action = ResoSale();
              // dispatch(action);
              // localStorage.setItem('system', 'sale');
              navigate('/dashboard');
            }}
          >
            Sale
          </Button>
          <Button
            onClick={() => {
              // const action = ResoReport();
              // dispatch(action);
              // localStorage.setItem('system', 'report');
              navigate('/report/0/dashboard');
            }}
          >
            Report
          </Button>
          <Button
            onClick={() => {
              // const action = ResoPromotion();
              // dispatch(action);
              // localStorage.setItem('system', 'promotion');
              navigate('/promotion-system');
            }}
          >
            Promotion
          </Button>

          <LanguagePopover />
          <Button
            onClick={handleClickOpen}
            variant="outlined"
            startIcon={<Icon icon={navigation2Outline} />}
          >
            {translate('common.navigation')}
          </Button>
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}
