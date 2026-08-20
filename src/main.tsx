import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PinEditor } from './pin-editor/PinEditor.tsx';
import * as Sentry from '@sentry/react';
import { APP_OPENED_METRIC } from './sentry/metrics.ts';
import { APP_VERSION } from './version.ts';

const isLocalhost = ['localhost', '127.0.0.1', '[::1]'].includes(
  window.location.hostname,
);
const showPinEditor = isLocalhost && window.location.hash === '#pin-editor';

Sentry.init({
  dsn: 'https://b23566a62354d1fae260c152bf7e031e@o4511936188514304.ingest.de.sentry.io/4511936221544528',
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#dataCollection
    userInfo: false,
    httpBodies: [],
    urlQueryParams: { deny: ['frnd'] },
  },
  debug: isLocalhost,
  release: isLocalhost ? 'local' : APP_VERSION,
  environment: isLocalhost ? 'local' : 'production',
  // Enable logs to be sent to Sentry
  enableLogs: !isLocalhost,
  enabled: !isLocalhost,
});

Sentry.metrics.count(APP_OPENED_METRIC, 1);

createRoot(document.getElementById('root')!, {
  // Error reporting: captures all errors
  onUncaughtError: Sentry.reactErrorHandler(),
  onCaughtError: Sentry.reactErrorHandler(),
  onRecoverableError: Sentry.reactErrorHandler(),
}).render(<StrictMode>{showPinEditor ? <PinEditor /> : <App />}</StrictMode>);
