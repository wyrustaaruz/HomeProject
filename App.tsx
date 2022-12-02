import React from 'react';
import {QueryClient, QueryClientProvider, focusManager} from 'react-query';
import {axiosInterceptor} from './src/service/common/apiClient';
import {useAppState} from './src/hooks/useAppState';
import Navigation from './src/navigation';
import GlobalState from './src/context/GlobalState';

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 2}},
});

function onAppStateChange(status) {
  focusManager.setFocused(status === 'active');
}

function App() {
  axiosInterceptor();
  useAppState(onAppStateChange);
  return (
    <GlobalState>
      <QueryClientProvider client={queryClient}>
        <Navigation />
      </QueryClientProvider>
    </GlobalState>
  );
}

export default App;
