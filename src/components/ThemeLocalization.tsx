import { ReactNode } from 'react';
// material
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
  useTheme,
  adaptV4Theme
} from '@mui/material/styles';
// hooks
import useLocales from '../hooks/useLocales';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

// ----------------------------------------------------------------------

type ThemeLocalizationProps = {
  children: ReactNode;
};

export default function ThemeLocalization({ children }: ThemeLocalizationProps) {
  const defaultTheme = useTheme();
  const { currentLang } = useLocales();

  // const theme = createTheme(adaptV4Theme(defaultTheme, currentLang.systemValue));
  const theme = createTheme(adaptV4Theme(defaultTheme));

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledEngineProvider>
  );
}
