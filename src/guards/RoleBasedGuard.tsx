import { ReactNode } from 'react';
import { Container, Alert, AlertTitle } from '@material-ui/core';
import useAuth from 'hooks/useAuth';

// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  accessibleRoles: String[];
  children: ReactNode | string;
};

const useCurrentRole = (): String[] => {
  const { user } = useAuth();
  // Logic here to get current user role
  const role = user?.roles ?? [];
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }: RoleBasedGuardProp) {
  const currentRole = useCurrentRole();

  if (
    accessibleRoles?.length !== 0 &&
    !accessibleRoles.some((r) => currentRole.some((ur) => ur === r))
  ) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
