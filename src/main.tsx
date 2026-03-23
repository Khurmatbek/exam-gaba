import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './settings/queryClient';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import Loader from './loading';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      onError={(error) => {
        console.log('Custom callback:', error);
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loader/>}>
          <App />
        </Suspense>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
