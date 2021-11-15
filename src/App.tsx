// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// hooks
import useAuth from './hooks/useAuth';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import NotistackProvider from './components/NotistackProvider';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import ThemeLocalization from './components/ThemeLocalization';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { ReactQueryDevtools } from 'react-query/devtools';
import LoadingScreen, { ProgressBarStyle } from './components/LoadingScreen';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const { isInitialized } = useAuth();

  console.log(`isInitialized`, isInitialized);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <ThemeConfig>
        <ThemePrimaryColor>
          <ThemeLocalization>
            <RtlLayout>
              <NotistackProvider>
                <GlobalStyles />
                <ProgressBarStyle />
                <BaseOptionChartStyle />
                {/* <Settings /> */}
                <ScrollToTop />
                <GoogleAnalytics />
                <Router />
                {/* {isInitialized ? <Router /> : <LoadingScreen />} */}
              </NotistackProvider>
            </RtlLayout>
          </ThemeLocalization>
        </ThemePrimaryColor>
      </ThemeConfig>
    </QueryClientProvider>
  );
}
